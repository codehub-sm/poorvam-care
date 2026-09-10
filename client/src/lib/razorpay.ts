/**
 * Razorpay Standard Checkout, browser side.
 *
 * The flow has three legs and each can fail differently, so the result is a
 * discriminated union rather than a boolean:
 *
 *  1. POST /api/create-order        → "failed" (stage "order")
 *  2. Razorpay modal                 → "cancelled" (dismissed), or
 *                                      "failed" (stage "checkout", Razorpay's
 *                                      own payment.failed reason)
 *  3. POST /api/verify-payment       → "paid", or "unverified"
 *
 * "unverified" is deliberately NOT "failed": Razorpay has already taken the
 * money by the time step 3 runs. If our verify call is down or rejects the
 * signature, the parent must be told to keep their payment id and contact
 * us, not told the payment failed. Collapsing the two would create refund
 * disputes we cannot trace.
 *
 * checkout.js is loaded on first use, not in index.html — every route is
 * prerendered by Puppeteer and only the pricing page needs it.
 *
 * Config (build-time, Vite):
 *  VITE_RAZORPAY_KEY_ID     public key id; when absent the button hides itself
 *  VITE_PAYMENTS_API_URL    API base; empty = same origin (dev, server.js)
 */

const CHECKOUT_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export const RAZORPAY_KEY_ID: string =
  (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) || "";

const API_BASE: string = (
  (import.meta.env.VITE_PAYMENTS_API_URL as string | undefined) || ""
).replace(/\/$/, "");

/** True when the site was built with a key id, i.e. payments are switched on. */
export function paymentsConfigured(): boolean {
  return RAZORPAY_KEY_ID.length > 0;
}

/* ---------------------------------------------------------------- */
/* Razorpay checkout.js surface (only what we use)                   */
/* ---------------------------------------------------------------- */

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayFailedEvent {
  error: {
    code?: string;
    description?: string;
    reason?: string;
    metadata?: { order_id?: string; payment_id?: string };
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open(): void;
  on(event: "payment.failed", cb: (e: RazorpayFailedEvent) => void): void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

/* ---------------------------------------------------------------- */
/* Public types                                                       */
/* ---------------------------------------------------------------- */

export interface PayRequest {
  /** Smallest currency unit — paise for INR. */
  amountPaise: number;
  currency?: string;
  /** Shown in the modal, e.g. "Developmental Assessment". */
  description: string;
  /** Optional, ≤40 chars. The server generates one when omitted. */
  receipt?: string;
  /** Free-form key/values stored on the Razorpay order. */
  notes?: Record<string, string>;
  prefill?: { name?: string; email?: string; contact?: string };
}

export type PaymentOutcome =
  | { status: "paid"; orderId: string; paymentId: string }
  | { status: "cancelled" }
  | { status: "failed"; stage: "order" | "checkout"; error: string }
  | { status: "unverified"; orderId: string; paymentId: string; error: string };

/* ---------------------------------------------------------------- */
/* Script loading                                                     */
/* ---------------------------------------------------------------- */

let scriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      // Allow a retry on the next click instead of caching the failure.
      scriptPromise = null;
      script.remove();
      reject(new Error("Could not load Razorpay checkout"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/* ---------------------------------------------------------------- */
/* API calls                                                          */
/* ---------------------------------------------------------------- */

interface ApiError {
  error?: string;
  message?: string;
}

/**
 * POSTs JSON and returns the parsed reply plus HTTP status.
 *
 * A non-JSON body is reported as such rather than thrown: in prod a missing
 * VITE_PAYMENTS_API_URL sends this request to Amplify, whose SPA catch-all
 * answers 200 with the homepage HTML. That must surface as a config error,
 * not as a JSON parse exception in the console.
 */
async function postJson<T>(
  path: string,
  payload: unknown,
): Promise<{ ok: boolean; status: number; data: (T & ApiError) | null; transportError?: string }> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      transportError: err instanceof Error ? err.message : "Network error",
    };
  }

  const text = await res.text();
  try {
    return { ok: res.ok, status: res.status, data: JSON.parse(text) as T & ApiError };
  } catch {
    return {
      ok: false,
      status: res.status,
      data: null,
      transportError: `Payments API returned a non-JSON response (HTTP ${res.status}) — is VITE_PAYMENTS_API_URL set?`,
    };
  }
}

interface CreateOrderReply {
  order_id: string;
  amount: number;
  currency: string;
}

interface VerifyReply {
  verified: boolean;
}

/* ---------------------------------------------------------------- */
/* The flow                                                           */
/* ---------------------------------------------------------------- */

/**
 * Runs the full checkout: create order → open modal → verify signature.
 *
 * Resolves exactly once. Razorpay's modal stays open after a payment.failed
 * event so the parent can retry with another method, so that event only
 * records the reason; the promise settles when the modal finally closes
 * (as "failed" with that reason) or when the handler fires (as paid).
 */
export async function payWithRazorpay(req: PayRequest): Promise<PaymentOutcome> {
  if (!paymentsConfigured()) {
    return { status: "failed", stage: "order", error: "Payments are not configured" };
  }

  const order = await postJson<CreateOrderReply>("/api/create-order", {
    amount: req.amountPaise,
    currency: req.currency ?? "INR",
    receipt: req.receipt,
    notes: req.notes,
  });
  if (!order.ok || !order.data?.order_id) {
    return {
      status: "failed",
      stage: "order",
      error: order.data?.message ?? order.transportError ?? `Could not create order (HTTP ${order.status})`,
    };
  }

  try {
    await loadCheckoutScript();
  } catch (err) {
    return {
      status: "failed",
      stage: "checkout",
      error: err instanceof Error ? err.message : "Could not load Razorpay checkout",
    };
  }
  if (!window.Razorpay) {
    return { status: "failed", stage: "checkout", error: "Razorpay checkout did not initialise" };
  }

  const { order_id, amount, currency } = order.data;

  const checkout = await new Promise<
    | { kind: "success"; response: RazorpaySuccessResponse }
    | { kind: "closed"; lastError: string | null }
  >((resolve) => {
    let lastError: string | null = null;

    const rzp = new window.Razorpay!({
      key: RAZORPAY_KEY_ID,
      amount,
      currency,
      order_id,
      name: "Poorvam Care",
      description: req.description,
      prefill: req.prefill,
      notes: req.notes,
      theme: { color: "#E8725A" },
      handler: (response) => resolve({ kind: "success", response }),
      modal: { ondismiss: () => resolve({ kind: "closed", lastError }) },
    });

    rzp.on("payment.failed", (e) => {
      lastError = e.error?.description ?? e.error?.reason ?? "Payment failed";
    });

    rzp.open();
  });

  if (checkout.kind === "closed") {
    return checkout.lastError
      ? { status: "failed", stage: "checkout", error: checkout.lastError }
      : { status: "cancelled" };
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = checkout.response;

  const verify = await postJson<VerifyReply>("/api/verify-payment", {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (verify.ok && verify.data?.verified === true) {
    return { status: "paid", orderId: razorpay_order_id, paymentId: razorpay_payment_id };
  }

  return {
    status: "unverified",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    error:
      verify.data?.message ??
      verify.transportError ??
      `Verification failed (HTTP ${verify.status})`,
  };
}
