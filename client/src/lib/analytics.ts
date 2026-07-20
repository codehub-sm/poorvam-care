/**
 * GA4 analytics and conversion tracking.
 *
 * The site previously had no analytics of any kind — no GA4, no GTM, no pixel,
 * no click tracking. Every lead was unattributable, which meant SEO work could
 * not be measured and paid traffic could not be optimised against. This module
 * is the minimum needed before any ad spend.
 *
 * Configure by setting VITE_GA4_MEASUREMENT_ID at build time (Amplify Console →
 * Environment variables), or by filling in the fallback below. Until an ID is
 * present every function here is a no-op, so this is safe to ship unconfigured.
 */

const FALLBACK_GA4_ID = ""; // e.g. "G-XXXXXXXXXX"

const GA4_ID: string =
  (import.meta.env?.VITE_GA4_MEASUREMENT_ID as string | undefined) ||
  FALLBACK_GA4_ID;

/** True once the gtag snippet has been injected. */
let initialised = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

/**
 * Injects the GA4 snippet. Safe to call more than once.
 *
 * Deliberately skipped during prerender: the build renders every route in
 * Puppeteer, and we do not want those runs counted as pageviews. We detect it
 * via the same navigator.webdriver flag Puppeteer sets.
 */
export function initAnalytics(): void {
  if (!GA4_ID || initialised || !isBrowser()) return;
  if (navigator.webdriver) return;

  initialised = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  // Pageviews are sent manually from the router instead: this is an SPA, so
  // wouter navigations do not reload the page and would otherwise go
  // uncounted. Sending one here too would double-count the landing page.
  window.gtag("config", GA4_ID, { send_page_view: false });
}

/** Fires a GA4 event. No-ops when analytics is unconfigured. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {},
): void {
  if (!isBrowser() || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Records a virtual pageview — the app is an SPA, so route changes need this. */
export function trackPageView(path: string): void {
  if (!GA4_ID || !isBrowser() || typeof window.gtag !== "function") return;
  window.gtag("config", GA4_ID, { page_path: path });
}

/* ------------------------------------------------------------------ */
/* Conversion events                                                    */
/*                                                                      */
/* These three are the actual lead surfaces. On mobile the tel: and     */
/* wa.me taps are likely the dominant conversion path, and both leave   */
/* the site — so if they are not tracked here they are invisible.       */
/* ------------------------------------------------------------------ */

/**
 * Records a lead submission outcome.
 *
 * Only a verified submit fires `generate_lead`. An unconfirmed send gets its
 * own event instead — counting sends we cannot verify would inflate the
 * conversion metric that ad bidding optimises against, which is worse than
 * under-counting. A rising `form_submit_unconfirmed` count is also the signal
 * that the Apps Script needs to start returning a response.
 */
export function trackFormSubmit(
  formName: string,
  status: "confirmed" | "unconfirmed" | "failed",
): void {
  const event =
    status === "confirmed"
      ? "generate_lead"
      : status === "unconfirmed"
        ? "form_submit_unconfirmed"
        : "form_submit_failed";
  trackEvent(event, { form_name: formName });
}

export function trackWhatsAppClick(source: string): void {
  trackEvent("whatsapp_click", { source });
}

export function trackCallClick(source: string): void {
  trackEvent("call_click", { source });
}
