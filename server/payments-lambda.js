/**
 * AWS Lambda adapter for the payments routes — the production backend.
 *
 * poorvamcare.in is static hosting on Amplify; server.js only runs on Replit.
 * So in prod these two routes have to live behind API Gateway, the same way
 * the legacy admin API does (see VITE_API_URL in client/src/lib/queryClient.ts).
 *
 * Deploy (manual, one-off):
 *  1. Zip `server/` + `node_modules/razorpay` (and its deps) with this file as
 *     the entry: handler = `server/payments-lambda.handler`, runtime nodejs20.x+.
 *  2. Lambda env: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
 *     PAYMENTS_CORS_ORIGIN=https://poorvamcare.in
 *  3. API Gateway HTTP API: routes `POST /api/create-order`,
 *     `POST /api/verify-payment`, `OPTIONS /api/{proxy+}` → this function.
 *  4. Amplify Console → Environment variables:
 *     VITE_PAYMENTS_API_URL=https://<api-id>.execute-api.ap-south-1.amazonaws.com
 *     VITE_RAZORPAY_KEY_ID=<key id>  (never the secret)
 *
 * Accepts both API Gateway payload formats (HTTP API v2 and REST v1).
 */

import { INVALID_JSON, handlePaymentsRequest } from "./payments.js";

function parseBody(event) {
  if (event.body === undefined || event.body === null || event.body === "") return undefined;
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body;
  try {
    return JSON.parse(raw);
  } catch {
    return INVALID_JSON;
  }
}

export async function handler(event) {
  const method = event.requestContext?.http?.method ?? event.httpMethod ?? "GET";
  const path = event.rawPath ?? event.path ?? "/";

  const result = await handlePaymentsRequest({ method, path, body: parseBody(event) });
  if (!result) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ error: "not_found", message: `No route for ${method} ${path}` }),
    };
  }

  return {
    statusCode: result.status,
    headers: result.headers,
    body: result.body === null ? "" : JSON.stringify(result.body),
  };
}
