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
 *
 * TWO SINKS, ONE SCHEMA (Sep 2026)
 * The sheet is a record, not an alert. A lead could sit in it unread for a day
 * because nothing tells anyone it arrived. So the same canonical row is now
 * also POSTed to Web3Forms, which emails it to the team.
 *
 * They are sinks, not a chain: both are written in parallel from the one row
 * built by `toLeadRow`, so their fields cannot drift, and either one surviving
 * means the lead survived. Web3Forms is not a replacement for the sheet —
 * its Google Sheets sync is a paid feature, and the sheet is where the team
 * already works.
 */

import { trackEvent, trackFormSubmit } from "./analytics";

/** Apps Script web app that appends the row to the Leads sheet. */
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/**
 * Public by design — Web3Forms documents this key as safe in client code. It
 * authorises delivery to the linked inbox and nothing else; it cannot read
 * submissions. The recipient address is configured in the Web3Forms dashboard,
 * not here, so changing who gets alerted needs no deploy.
 */
const WEB3FORMS_ACCESS_KEY = "d97383cd-9adf-412e-bf97-c7cccf0dfff9";

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
   * At least one sink acknowledged the lead in a readable reply — the row is
   * written, or the notification email is queued. A real confirmation, not an
   * inference from a 2xx.
   */
  | "confirmed"
  /**
   * Sent, but no sink gave a readable answer (an older Apps Script deployment
   * returns an HTML wrapper; a CORS rejection makes the reply opaque).
   * Probably landed; unprovable.
   */
  | "unconfirmed"
  /** Every sink failed. The lead is lost unless the parent gets a fallback. */
  | "failed";

export interface SubmitResult {
  status: SubmitStatus;
  error?: string;
}

interface SinkResult {
  status: SubmitStatus;
  error?: string;
}

/**
 * Builds the notification subject.
 *
 * This is the line the team reads in an inbox at a glance, so it leads with
 * who the lead is and what they want. A step-1 enquiry has no name yet — the
 * email address is the identity — and a step-2 submission enriches a lead that
 * already sent an email, so it is labelled an update rather than arriving as a
 * second, apparently duplicate, lead.
 */
function subjectFor(row: Record<string, unknown>): string {
  const str = (k: string) => (typeof row[k] === "string" ? (row[k] as string) : "");
  const who = str("name") || str("email") || str("phone") || "Unknown";
  const what = str("service") || str("concern");
  const isUpdate = str("stage") === "enquiry-step-2";

  const parts = [who];
  if (what) parts.push(what);
  parts.push(str("form") || "website");

  return `${isUpdate ? "Lead updated" : "New lead"} — ${parts.join(" · ")}`;
}

/**
 * Sink 1 — the Google Sheet, via the Apps Script web app.
 *
 * A POST with `Content-Type: application/json` triggers a CORS preflight and
 * Apps Script web apps do not answer OPTIONS. Sending the same JSON body as
 * `text/plain` keeps it a "simple request", so the reply stays readable and
 * success is verifiable.
 */
async function postToSheet(body: string): Promise<SinkResult> {
  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
    });

    if (!res.ok) {
      // Reached the server but it refused — retrying opaquely would not help.
      return { status: "failed", error: `sheet HTTP ${res.status}` };
    }

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Old deployment: 200 with an HTML wrapper. The script ran, but it did
      // not say whether the write succeeded, so we must not claim it did.
      parsed = null;
    }

    if (parsed && parsed.ok === true) return { status: "confirmed" };
    if (parsed && parsed.ok === false) {
      // The script ran and explicitly failed — the row does not exist.
      return { status: "failed", error: parsed.error ?? "Script error" };
    }
    return { status: "unconfirmed" };
  } catch {
    // CORS rejection or network failure. Fall through to the opaque attempt —
    // the request may still be delivered even though we cannot read the reply.
  }

  try {
    await fetch(SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      mode: "no-cors",
    });
    return { status: "unconfirmed" };
  } catch (err) {
    return {
      status: "failed",
      error: err instanceof Error ? err.message : "sheet network error",
    };
  }
}

/**
 * Sink 2 — Web3Forms, which emails the lead to the team.
 *
 * The Sheet is a record, not an alert: nobody watches it, so a parent could
 * wait a day for a reply. This sink is the reminder. It receives the *same*
 * canonical row the Sheet does, so the two can never drift — the only extras
 * are Web3Forms' own reserved keys.
 *
 * `replyto` is set to the parent's address so replying to the notification
 * answers the parent directly instead of the form.
 *
 * The access key is public by design (Web3Forms documents it as safe in client
 * code); it authorises delivery to one fixed inbox, not access to any data.
 */
async function postToWeb3Forms(
  row: Record<string, unknown>,
): Promise<SinkResult> {
  const email = typeof row.email === "string" ? row.email : "";

  const body = JSON.stringify({
    ...row,
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: subjectFor(row),
    from_name: "Poorvam Care Website",
    ...(email ? { replyto: email } : {}),
  });

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body,
    });

    const parsed = (await res.json().catch(() => null)) as
      | { success?: boolean; message?: string; body?: { message?: string } }
      | null;

    if (res.ok && parsed?.success === true) return { status: "confirmed" };

    return {
      status: "failed",
      error:
        parsed?.body?.message ?? parsed?.message ?? `web3forms HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      status: "failed",
      error: err instanceof Error ? err.message : "web3forms network error",
    };
  }
}

/** The best outcome across sinks — one surviving sink means the lead survived. */
function combine(sinks: SinkResult[]): SubmitResult {
  if (sinks.some((s) => s.status === "confirmed")) return { status: "confirmed" };
  if (sinks.some((s) => s.status === "unconfirmed")) return { status: "unconfirmed" };
  return {
    status: "failed",
    error: sinks.map((s) => s.error).filter(Boolean).join("; ") || "Network error",
  };
}

/**
 * Submits a lead to every sink in parallel.
 *
 * Parallel, not sequential: the parent waits for the slower of the two rather
 * than the sum, and neither sink can block the other. Independent, too — a
 * Sheet outage still sends the email, and a Web3Forms outage still writes the
 * row. The parent only sees a failure when both are gone.
 *
 * When exactly one sink fails the parent is correctly told the lead landed,
 * but something is broken and nothing on screen would ever say so. That case
 * fires its own analytics event, because a half-working pipeline that reports
 * success is the same failure mode this file was written to end.
 *
 * @param payload  The form's own fields; mapped onto the lead schema here.
 * @param formName Identifies the converting surface (e.g. "contact-page").
 */
export async function submitLead(
  payload: Record<string, unknown>,
  formName: string,
): Promise<SubmitResult> {
  const row = toLeadRow(payload, formName);

  const [sheet, mail] = await Promise.all([
    postToSheet(JSON.stringify(row)),
    postToWeb3Forms(row),
  ]);

  const result = combine([sheet, mail]);

  if (sheet.status === "failed" && mail.status !== "failed") {
    trackEvent("lead_sink_degraded", { form_name: formName, sink: "sheet" });
  } else if (mail.status === "failed" && sheet.status !== "failed") {
    trackEvent("lead_sink_degraded", { form_name: formName, sink: "web3forms" });
  }

  trackFormSubmit(formName, result.status);
  return result;
}
