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
 * The second silent-loss bug, found Aug 2026: each form posted its own field
 * names (`parentName` here, `firstName`/`lastName` there, `notes` vs `message`)
 * and the Apps Script wrote a row by looking each sheet header up in the posted
 * object. Keys with no matching column were dropped without error. A real
 * online-enquiry lead landed in the sheet as an email address, a child's age
 * and a timestamp — name, country and concern gone.
 *
 * So there is now exactly one lead schema, defined here, and every form is
 * mapped onto it before it leaves the browser. The sheet's columns are that
 * schema. See `infra/apps-script/leads-doPost.gs` for the receiving end, which
 * creates a column for any key it does not recognise rather than dropping it.
 */

import { trackFormSubmit } from "./analytics";

const ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec";

/**
 * The lead schema, in sheet column order.
 *
 * Adding a field here is the only supported way to add a column. The Apps
 * Script mirrors this order, so keep the two in sync when it changes.
 */
export const LEAD_FIELDS = [
  "timestamp",
  "leadId",
  "form",
  "stage",
  "name",
  "email",
  "phone",
  "country",
  "childName",
  "childAge",
  "service",
  "concern",
  "language",
  "message",
  "consent",
  "pageUrl",
] as const;

/**
 * Form-local field names that mean the same thing as a canonical field.
 *
 * A form is free to name its own state whatever reads best in its component;
 * the mapping is centralised here so the sheet never has to care.
 */
const ALIASES: Record<string, string> = {
  parentName: "name",
  serviceType: "service",
  notes: "message",
  formName: "form",
};

/**
 * Projects a form's payload onto the lead schema.
 *
 * Unknown keys are kept under their own name rather than discarded — the Apps
 * Script appends a column for them. A new field costs a column; it must never
 * cost a lead.
 */
function toLeadRow(
  payload: Record<string, unknown>,
  formName: string,
): Record<string, unknown> {
  const mapped: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    // Handled below — the sheet stores one `name`, not two half-names.
    if (key === "firstName" || key === "lastName") continue;
    if (value === undefined || value === null || value === "") continue;
    mapped[ALIASES[key] ?? key] = value;
  }

  const first = typeof payload.firstName === "string" ? payload.firstName : "";
  const last = typeof payload.lastName === "string" ? payload.lastName : "";
  const joined = [first, last].filter(Boolean).join(" ").trim();
  if (joined) mapped.name = joined;

  mapped.form = formName;
  mapped.timestamp = new Date().toISOString();
  mapped.pageUrl = typeof window !== "undefined" ? window.location.href : "";

  // Emit in schema order so the row reads left-to-right the way the sheet does.
  const row: Record<string, unknown> = {};
  for (const field of LEAD_FIELDS) {
    if (field in mapped) row[field] = mapped[field];
  }
  for (const [key, value] of Object.entries(mapped)) {
    if (!(key in row)) row[key] = value;
  }
  return row;
}

export type SubmitStatus =
  /**
   * The endpoint replied with `{"ok":true}` — the row is written. This is a
   * real confirmation, not an inference from a 2xx.
   */
  | "confirmed"
  /**
   * Sent, but the reply was opaque or not the JSON contract (an older Apps
   * Script deployment returns an HTML wrapper). Probably landed; unprovable.
   */
  | "unconfirmed"
  /** The lead is lost unless the parent is given a fallback channel. */
  | "failed";

export interface SubmitResult {
  status: SubmitStatus;
  error?: string;
}

/**
 * Submits a lead payload.
 *
 * @param payload  The form's own fields; mapped onto the lead schema here.
 * @param formName Identifies the converting surface (e.g. "contact-page").
 */
export async function submitLead(
  payload: Record<string, unknown>,
  formName: string,
): Promise<SubmitResult> {
  const body = JSON.stringify(toLeadRow(payload, formName));

  // Preferred path: readable response, so success is verifiable.
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });

    if (!res.ok) {
      // Reached the server but it refused — retrying opaquely would not help.
      trackFormSubmit(formName, "failed");
      return { status: "failed", error: `HTTP ${res.status}` };
    }

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Old deployment: 200 with an HTML wrapper. The script ran, but it did
      // not tell us whether the write succeeded, so we must not claim it did.
      parsed = null;
    }

    if (parsed && parsed.ok === true) {
      trackFormSubmit(formName, "confirmed");
      return { status: "confirmed" };
    }
    if (parsed && parsed.ok === false) {
      // The script ran and explicitly failed — the row does not exist.
      trackFormSubmit(formName, "failed");
      return { status: "failed", error: parsed.error ?? "Script error" };
    }

    trackFormSubmit(formName, "unconfirmed");
    return { status: "unconfirmed" };
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
