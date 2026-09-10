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
  /** ₹100 booking fee that reserves a priority consultation slot. */
  consultation: buttonId("VITE_RAZORPAY_BUTTON_CONSULTATION"),
  /** ₹2,500 Developmental Assessment. */
  developmentalAssessment: buttonId("VITE_RAZORPAY_BUTTON_DEVELOPMENTAL_ASSESSMENT"),
  /** ₹3,000 Autism Screening. */
  autismScreening: buttonId("VITE_RAZORPAY_BUTTON_AUTISM_SCREENING"),
} as const;

/**
 * The consultation booking fee, in rupees. Fixed in INR for every market —
 * Razorpay settles in INR, and an Australian or Emirati card is charged the
 * equivalent — so the copy quotes ₹ everywhere rather than a converted figure
 * that would drift from what the statement shows.
 */
export const CONSULTATION_FEE_INR = 100;

export const CONSULTATION_FEE_DISPLAY = `₹${CONSULTATION_FEE_INR}`;

/**
 * The promise behind the fee, in one place so every page says the same thing.
 * Changing the policy is a copy change here, not a hunt across pages.
 */
export const CONSULTATION_FEE_COPY = {
  /** Why we charge it — the sentence that turns a fee into a trust signal. */
  why: `A ${CONSULTATION_FEE_DISPLAY} booking fee reserves a priority slot and tells us you're a real family who'll turn up, so we can hold a therapist's time for you.`,
  /** What happens to the money. */
  terms: `Adjusted against your first session, or fully refunded if the consultation doesn't happen.`,
  /** Short form for bullet lists. */
  bullet: `${CONSULTATION_FEE_DISPLAY} booking fee reserves a priority slot — adjusted against your first session`,
  /** Primary call-to-action label. */
  cta: `Book a consultation · ${CONSULTATION_FEE_DISPLAY}`,
} as const;

/** Subheading under the three-step explainer on every online page. */
export const CONSULTATION_STEPS_SUBHEADING = `Fifteen minutes to work out whether we can actually help your child. ${CONSULTATION_FEE_COPY.bullet}.`;

/**
 * One-line reassurance shown directly under every fee-bearing CTA, so the
 * parent reads the safety net at the same moment they read the price.
 */
export const CONSULTATION_FEE_REASSURANCE = `Priority slot · adjusted against your first session · fully refunded if it doesn't happen`;
