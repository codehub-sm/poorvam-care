/**
 * Razorpay Payment Buttons — hosted checkout, no backend.
 *
 * Each button is created in the Razorpay dashboard (Payment Button → Create)
 * with a fixed amount and its own `pl_…` id. The id is public by design: it
 * appears in the page HTML and only identifies which button to render. Money,
 * verification and receipts are handled entirely on Razorpay's side, and the
 * record of every payment is the Razorpay dashboard plus its email alert.
 *
 * Ids come from the environment rather than being hardcoded because a
 * test-mode button only works with test-mode keys: a build for prod must
 * carry the live ids, and a dev build the test ones. An unset id means the
 * button does not render at all, so a build without config looks exactly
 * like the site did before payments existed.
 *
 * The Standard Checkout integration (client/src/lib/razorpay.ts + server/)
 * still exists for the day amounts become dynamic — session packs, market
 * pricing in AUD/AED — but it needs a backend, which these do not.
 */

function buttonId(name: string): string {
  const value = import.meta.env[name] as string | undefined;
  return typeof value === "string" ? value.trim() : "";
}

export const PAYMENT_BUTTONS = {
  /** ₹2,500 Developmental Assessment. */
  developmentalAssessment: buttonId("VITE_RAZORPAY_BUTTON_DEVELOPMENTAL_ASSESSMENT"),
  /** ₹3,000 Autism Screening. */
  autismScreening: buttonId("VITE_RAZORPAY_BUTTON_AUTISM_SCREENING"),
} as const;
