/**
 * Payments HTTP contract, independent of transport.
 *
 * `handlePaymentsRequest` takes a plain `{ method, path, body }` and returns a
 * plain `{ status, headers, body }`, or `null` when the path is not ours so the
 * caller can fall through to whatever it was doing (static files, SPA shell).
 * That shape is what lets server.js, the Vite dev middleware and the Lambda
 * adapter share one implementation of validation, status codes and CORS.
 *
 * Routes:
 *  POST /api/create-order    { amount, currency?, receipt?, notes? } → { order_id, amount, currency }
 *  POST /api/verify-payment  { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *                            → 200 { verified: true, ... } | 400 { verified: false, error }
 *
 * Every error body is `{ error: <stable code>, message: <human text> }` so the
 * client can branch on `error` without parsing prose.
 */

import {
  MIN_AMOUNT_PAISE,
  RazorpayApiError,
  RazorpayAuthError,
  RazorpayConfigError,
  createOrder,
  verifyPaymentSignature,
} from "./razorpay.js";

export const PAYMENT_ROUTES = Object.freeze({
  createOrder: "/api/create-order",
  verifyPayment: "/api/verify-payment",
});

const ROUTE_PATHS = new Set(Object.values(PAYMENT_ROUTES));

/** Razorpay caps `receipt` at 40 characters. */
const RECEIPT_MAX_LENGTH = 40;

/** @param {string} path */
export function isPaymentsPath(path) {
  return ROUTE_PATHS.has(path);
}

/**
 * CORS is only needed when the API lives on a different origin from the site
 * (prod: API Gateway vs Amplify). Same-origin dev needs nothing, so the
 * headers are opt-in via PAYMENTS_CORS_ORIGIN rather than a permissive default.
 */
function corsHeaders() {
  const origin = process.env.PAYMENTS_CORS_ORIGIN;
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    Vary: "Origin",
  };
}

function reply(status, body) {
  return {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...corsHeaders() },
    body,
  };
}

function fail(status, error, message, extra = {}) {
  return reply(status, { error, message, ...extra });
}

function newReceipt() {
  return `rcpt_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/** @param {unknown} body */
function handleCreateOrder(body) {
  const amount = body?.amount;
  if (!Number.isInteger(amount) || amount < MIN_AMOUNT_PAISE) {
    return fail(
      400,
      "invalid_amount",
      `amount must be an integer number of paise, at least ${MIN_AMOUNT_PAISE}`,
    );
  }

  const currency = body.currency === undefined ? "INR" : body.currency;
  if (typeof currency !== "string" || !/^[A-Z]{3}$/.test(currency)) {
    return fail(400, "invalid_currency", "currency must be a 3-letter ISO code, e.g. INR");
  }

  let receipt = body.receipt === undefined ? newReceipt() : body.receipt;
  if (typeof receipt !== "string" || receipt.length === 0 || receipt.length > RECEIPT_MAX_LENGTH) {
    return fail(400, "invalid_receipt", `receipt must be 1–${RECEIPT_MAX_LENGTH} characters`);
  }

  const notes = body.notes === undefined ? undefined : body.notes;
  if (
    notes !== undefined &&
    (typeof notes !== "object" ||
      notes === null ||
      Array.isArray(notes) ||
      Object.values(notes).some((v) => typeof v !== "string"))
  ) {
    return fail(400, "invalid_notes", "notes must be an object of string values");
  }

  return createOrder({ amount, currency, receipt, notes }).then(
    (order) => reply(200, order),
    (err) => mapError(err),
  );
}

/** @param {unknown} body */
function handleVerifyPayment(body) {
  const required = ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"];
  const missing = required.filter((k) => typeof body?.[k] !== "string" || body[k].length === 0);
  if (missing.length) {
    return fail(400, "missing_fields", `Missing: ${missing.join(", ")}`, { missing });
  }

  let verified;
  try {
    verified = verifyPaymentSignature({
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });
  } catch (err) {
    return mapError(err);
  }

  if (!verified) {
    // Not paid as far as we are concerned. The client must not treat this as
    // success, and nothing here records a payment.
    return reply(400, {
      verified: false,
      error: "signature_mismatch",
      message: "Payment signature did not match",
    });
  }

  return reply(200, {
    verified: true,
    order_id: body.razorpay_order_id,
    payment_id: body.razorpay_payment_id,
  });
}

function mapError(err) {
  if (err instanceof RazorpayConfigError) {
    return fail(500, "config_error", err.message);
  }
  if (err instanceof RazorpayAuthError) {
    return fail(401, "razorpay_auth", `Razorpay rejected the API keys: ${err.message}`);
  }
  if (err instanceof RazorpayApiError) {
    return fail(500, "razorpay_api", err.message, {
      razorpay_status: err.statusCode,
      razorpay_code: err.code,
    });
  }
  return fail(500, "internal", err instanceof Error ? err.message : "Unexpected error");
}

/**
 * @param {{ method: string, path: string, body: unknown }} request
 *   `body` is the already-parsed JSON, or the sentinel `INVALID_JSON` when the
 *   transport could not parse it.
 * @returns {Promise<{ status: number, headers: Record<string,string>, body: unknown } | null>}
 */
export async function handlePaymentsRequest({ method, path, body }) {
  if (!isPaymentsPath(path)) return null;

  if (method === "OPTIONS") {
    return { status: 204, headers: corsHeaders(), body: null };
  }
  if (method !== "POST") {
    return fail(405, "method_not_allowed", `${method} is not allowed on ${path}`);
  }
  if (body === INVALID_JSON) {
    return fail(400, "invalid_json", "Request body must be valid JSON");
  }

  return path === PAYMENT_ROUTES.createOrder
    ? handleCreateOrder(body)
    : handleVerifyPayment(body);
}

/** Sentinel a transport passes as `body` when the raw payload was not JSON. */
export const INVALID_JSON = Symbol("INVALID_JSON");
