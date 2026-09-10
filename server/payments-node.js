/**
 * Node `http` adapter for the payments routes.
 *
 * Used by server.js (Replit / `npm start`) and mounted into the Vite dev
 * server from vite.config.ts, so `npm run dev` serves the API on the same
 * origin as the site with no second process and no proxy config.
 */

import { INVALID_JSON, handlePaymentsRequest, isPaymentsPath } from "./payments.js";

/** Nothing legitimate here is bigger than a few hundred bytes. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * @param {import("node:http").IncomingMessage} req
 * @returns {Promise<unknown>} parsed JSON, `INVALID_JSON`, or `undefined` for an empty body
 */
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("payload_too_large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (raw.length === 0) return resolve(undefined);
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(INVALID_JSON);
      }
    });
    req.on("error", reject);
  });
}

/**
 * Serves the request if it is a payments route.
 *
 * @param {import("node:http").IncomingMessage} req
 * @param {import("node:http").ServerResponse} res
 * @returns {Promise<boolean>} true when the response has been written; false
 *   when the path is not ours and the caller should continue.
 */
export async function servePayments(req, res) {
  const path = (req.url ?? "/").split("?")[0];
  if (!isPaymentsPath(path)) return false;

  let body;
  try {
    body = await readJsonBody(req);
  } catch (err) {
    const tooLarge = err instanceof Error && err.message === "payload_too_large";
    res.writeHead(tooLarge ? 413 : 400, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify({
        error: tooLarge ? "payload_too_large" : "bad_request",
        message: tooLarge ? "Request body too large" : "Could not read request body",
      }),
    );
    return true;
  }

  const result = await handlePaymentsRequest({ method: req.method ?? "GET", path, body });
  // isPaymentsPath already matched, so result is never null here.
  res.writeHead(result.status, result.headers);
  res.end(result.body === null ? undefined : JSON.stringify(result.body));
  return true;
}
