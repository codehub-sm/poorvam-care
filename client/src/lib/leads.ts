/**
 * Lead submission.
 *
 * Previously both contact forms POSTed with `mode: 'no-cors'` and then
 * hardcoded `return { success: true }`. That combination is why a failing
 * endpoint was invisible: no-cors makes the response opaque, so the code had
 * nothing to check and simply claimed success. A parent saw "Message Sent!"
 * whether or not the lead landed.
 *
 * The reason no-cors was reached for is that a POST with
 * `Content-Type: application/json` triggers a CORS preflight, and Apps Script
 * web apps do not answer OPTIONS. Sending the same JSON body as `text/plain`
 * keeps it a "simple request" — no preflight — so the response becomes
 * readable and real success/failure detection is possible.
 *
 * For that to yield a *confirmed* result the Apps Script must return something,
 * e.g. `ContentService.createTextOutput(JSON.stringify({ok: true}))`. Until it
 * does, we fall back to a best-effort opaque send and report `unconfirmed`
 * rather than lying. Callers must treat `failed` as "show the parent another
 * way to reach us" — never as a silent drop.
 */

import { trackFormSubmit } from "./analytics";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec";

export type SubmitStatus =
  /**
   * Endpoint replied 2xx. Verified as of Jul 2026: the deployment is live and
   * sends `access-control-allow-origin: *`, so this is a real signal — it
   * catches network failure, a deleted deployment, 4xx/5xx, and quota errors.
   *
   * It is not proof the row was written: doPost currently returns Apps Script's
   * HTML wrapper rather than a JSON status, so we only know the script ran. To
   * make this a true confirmation, have doPost return
   * `ContentService.createTextOutput(JSON.stringify({ok: true}))` and check the
   * body here.
   */
  | "confirmed"
  /** Sent, but the response was unreadable. Probably landed; cannot prove it. */
  | "unconfirmed"
  /** Both attempts failed. The lead is lost unless the parent is given a fallback. */
  | "failed";

export interface SubmitResult {
  status: SubmitStatus;
  error?: string;
}

/**
 * Submits a lead payload.
 *
 * @param payload  Arbitrary form fields; a timestamp is added automatically.
 * @param formName Used for the analytics event, so we can tell which surface
 *                 converts (e.g. "contact-page" vs "online-enquiry").
 */
export async function submitLead(
  payload: Record<string, unknown>,
  formName: string,
): Promise<SubmitResult> {
  const body = JSON.stringify({
    ...payload,
    formName,
    timestamp: new Date().toISOString(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
  });

  // Preferred path: readable response, so success is verifiable.
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });
    if (res.ok) {
      trackFormSubmit(formName, "confirmed");
      return { status: "confirmed" };
    }
    // Reached the server but it refused — retrying opaquely would not help.
    trackFormSubmit(formName, "failed");
    return { status: "failed", error: `HTTP ${res.status}` };
  } catch (err) {
    // CORS rejection or network failure. Fall through to the opaque attempt —
    // the request may still be delivered even though we cannot read the reply.
    void err;
  }

  try {
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      mode: "no-cors",
    });
    trackFormSubmit(formName, "unconfirmed");
    return { status: "unconfirmed" };
  } catch (err) {
    trackFormSubmit(formName, "failed");
    return {
      status: "failed",
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
