/**
 * Market configuration for the online/teletherapy offering.
 *
 * The site previously had no internationalisation substrate at all — prices
 * were `"₹800"` string literals, dates were formatted with a hardcoded locale,
 * and there was no currency, timezone, or country model anywhere. This module
 * is that substrate.
 *
 * MARKET SELECTION IS A LEGAL CONSTRAINT, NOT A GROWTH CHOICE.
 *
 * Speech-language pathology is a licensed profession in the US (all 50 states),
 * Canada (provincial colleges), and the UAE (DHA). Licensure follows the
 * CLIENT's location, not the clinician's, so RCI registration confers no right
 * to treat a child resident in those jurisdictions. Australia is the exception:
 * speech pathology there is self-regulated, with no AHPRA registration
 * requirement.
 *
 * Hence: India (RCI is the correct credential), Australia (legal), UAE
 * (accepted risk — prohibited on paper, weakly enforced in practice).
 * There is deliberately NO US market entry here. Adding one is a legal
 * decision requiring counsel, not a config change.
 */

export type MarketId = "india" | "australia" | "uae";

/** How this market prefers to be contacted. */
export type CtaChannel = "whatsapp" | "form";

export interface Market {
  id: MarketId;
  /** ISO 3166-1 alpha-2, for hreflang and schema areaServed. */
  country: string;
  countryName: string;
  /** BCP 47 tag for hreflang and Intl formatting. */
  locale: string;
  currency: string;
  /** Symbol used for display; Intl handles the rest. */
  currencySymbol: string;
  /** Price per 45-minute session, in minor-unit-free whole currency. */
  sessionPrice: number;
  /**
   * What a comparable local private session costs, for honest anchoring.
   * Sourced from market research (Jul 2026) — see the plan's research brief.
   */
  localPriceFrom: number;
  localPriceTo: number;
  timezone: string;
  /**
   * Session availability, expressed in the FAMILY's local 24h time.
   *
   * Deliberately defined locally rather than derived from an IST window:
   * parents care about "after school", and a fixed IST window converts into
   * nonsense in some markets (an early-morning IST slot lands at 5am in Dubai).
   * Each entry must be a window we can actually staff from India — check the
   * IST equivalent before widening one.
   */
  sessionWindowLocal: { fromHour: number; toHour: number };
  /**
   * WhatsApp is near-universal in India and the UAE but sits around a quarter
   * of the population in Anglophone Western markets, so Australia gets a form
   * as the primary path instead.
   */
  ctaChannel: CtaChannel;
  /** URL path segment under /online. */
  slug: string;
}

export const MARKETS: Record<MarketId, Market> = {
  india: {
    id: "india",
    country: "IN",
    countryName: "India",
    locale: "en-IN",
    currency: "INR",
    currencySymbol: "₹",
    // Matches the existing online tier in service-packages.tsx.
    sessionPrice: 800,
    localPriceFrom: 800,
    localPriceTo: 1500,
    timezone: "Asia/Kolkata",
    // IST 09:00-20:00 — our own working day plus evening slots.
    sessionWindowLocal: { fromHour: 9, toHour: 20 },
    ctaChannel: "whatsapp",
    slug: "india",
  },
  australia: {
    id: "australia",
    country: "AU",
    countryName: "Australia",
    locale: "en-AU",
    currency: "AUD",
    currencySymbol: "A$",
    // PROPOSED — confirm before launch. Research put the credible offshore
    // band at USD 35–55; below ~USD 25 reads as unlicensed rather than cheap.
    // A$65 sits inside that band and well under the NDIS cap of A$193.99/hr,
    // so plan-managed participants can use it without breaching price limits.
    sessionPrice: 65,
    localPriceFrom: 150,
    localPriceTo: 250,
    timezone: "Australia/Sydney",
    // Local 15:00-20:00 = roughly IST 09:30-14:30 (AEST is IST+4:30).
    sessionWindowLocal: { fromHour: 15, toHour: 20 },
    ctaChannel: "form",
    slug: "australia",
  },
  uae: {
    id: "uae",
    country: "AE",
    countryName: "UAE",
    locale: "en-AE",
    currency: "AED",
    currencySymbol: "AED",
    // PROPOSED — confirm before launch. Research band was AED 130–200 against
    // a local anchor of AED 250–600. Note most Dubai clinics do not publish
    // rates, so that anchor is aggregator-sourced and worth mystery-shopping.
    sessionPrice: 150,
    localPriceFrom: 250,
    localPriceTo: 600,
    timezone: "Asia/Dubai",
    // Local 15:00-20:00 = IST 16:30-21:30 (GST is IST-1:30).
    sessionWindowLocal: { fromHour: 15, toHour: 20 },
    ctaChannel: "whatsapp",
    slug: "uae",
  },
};

export const MARKET_LIST: Market[] = Object.values(MARKETS);

/** Formats a price in the market's currency, e.g. "A$65". */
export function formatPrice(market: Market, amount = market.sessionPrice): string {
  return new Intl.NumberFormat(market.locale, {
    style: "currency",
    currency: market.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Formats a bare 24h hour in the market's locale, e.g. 15 → "3 pm". */
function formatHour(market: Market, hour: number): string {
  const d = new Date(Date.UTC(2026, 0, 15, hour, 0));
  return new Intl.DateTimeFormat(market.locale, {
    hour: "numeric",
    timeZone: "UTC",
  }).format(d);
}

/**
 * The session window as a parent in that market reads it, e.g. "3 pm – 8 pm".
 *
 * Stated in the family's own local time. Whether we can staff it from India is
 * a scheduling constraint recorded against each market in MARKETS above, not
 * something the parent should have to reason about.
 */
export function sessionWindowLabel(market: Market): string {
  const { fromHour, toHour } = market.sessionWindowLocal;
  return `${formatHour(market, fromHour)} – ${formatHour(market, toHour)}`;
}

/**
 * Best-effort market guess from the browser timezone.
 *
 * Used only to preselect a currency or CTA — never to gate access, since it is
 * trivially wrong for travellers and VPN users. Returns null when unsure so
 * callers fall back to showing all markets.
 */
export function guessMarket(): Market | null {
  if (typeof Intl === "undefined") return null;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (!tz) return null;
  const match = MARKET_LIST.find((m) => m.timezone === tz);
  if (match) return match;
  if (tz.startsWith("Australia/")) return MARKETS.australia;
  if (tz.startsWith("Asia/Calcutta")) return MARKETS.india;
  return null;
}
