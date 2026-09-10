/**
 * Razorpay client — the only file that knows the SDK or the secret.
 *
 * Deliberately framework-free: no req/res, no Lambda event. `payments.js`
 * turns these calls into HTTP responses and the adapters (`payments-node.js`,
 * `payments-lambda.js`) bind that to a transport. Keeping the SDK behind this
 * boundary means the same code serves server.js, the Vite dev server and a
 * Lambda without forking.
 *
 * Failure modes are distinct classes rather than one generic throw, because
 * they need different HTTP statuses and different fixes:
 *  - RazorpayConfigError  → keys missing on the server. Ops problem, 500.
 *  - RazorpayAuthError    → Razorpay rejected the keys. Wrong/rotated key, 401.
 *  - RazorpayApiError     → any other Razorpay failure (validation, network,
 *                           5xx). Carries Razorpay's own code/description.
 */

import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "node:crypto";

/** Razorpay's floor: 100 paise (₹1). */
export const MIN_AMOUNT_PAISE = 100;

export class RazorpayConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "RazorpayConfigError";
  }
}

export class RazorpayAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "RazorpayAuthError";
  }
}

export class RazorpayApiError extends Error {
  /**
   * @param {string} message
   * @param {{ statusCode?: number, code?: string }} [meta]
   */
  constructor(message, meta = {}) {
    super(message);
    this.name = "RazorpayApiError";
    this.statusCode = meta.statusCode;
    this.code = meta.code;
  }
}

function credentials() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    throw new RazorpayConfigError(
      "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in the server environment",
    );
  }
  return { key_id, key_secret };
}

/** @type {Razorpay | undefined} */
let client;

function getClient() {
  if (!client) client = new Razorpay(credentials());
  return client;
}

/**
 * The SDK rejects with `{ statusCode, error: { code, description } }` for API
 * errors and a plain Error for transport failures. Map both onto our classes
 * so callers never have to know the SDK's shape.
 */
function mapSdkError(err) {
  const statusCode = typeof err?.statusCode === "number" ? err.statusCode : undefined;
  const code = err?.error?.code;
  const description =
    err?.error?.description ?? (err instanceof Error ? err.message : "Razorpay request failed");

  if (statusCode === 401) return new RazorpayAuthError(description);
  return new RazorpayApiError(description, { statusCode, code });
}

/**
 * Creates a Razorpay order.
 *
 * @param {{ amount: number, currency?: string, receipt?: string, notes?: Record<string, string> }} input
 *   `amount` is in the smallest unit (paise for INR) and must already be
 *   validated by the caller — this function trusts it.
 * @returns {Promise<{ order_id: string, amount: number, currency: string }>}
 */
export async function createOrder({ amount, currency = "INR", receipt, notes }) {
  // Outside the try: a missing key is a config error, not an SDK error, and
  // must not be rewrapped by mapSdkError into the generic API failure.
  const razorpay = getClient();
  try {
    const order = await razorpay.orders.create({ amount, currency, receipt, notes });
    return { order_id: order.id, amount: order.amount, currency: order.currency };
  } catch (err) {
    throw mapSdkError(err);
  }
}

/**
 * Verifies the signature Razorpay Checkout hands back after a payment:
 * HMAC-SHA256(order_id + "|" + payment_id, key_secret), hex-encoded.
 *
 * Constant-time comparison so a mismatch cannot be timed byte by byte.
 *
 * @param {{ order_id: string, payment_id: string, signature: string }} input
 * @returns {boolean}
 */
export function verifyPaymentSignature({ order_id, payment_id, signature }) {
  const { key_secret } = credentials();
  const expected = createHmac("sha256", key_secret)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}
