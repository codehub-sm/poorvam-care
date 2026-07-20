/**
 * The therapy disciplines offered online.
 *
 * Kept as data rather than hardcoded per page so the service list, the nav, the
 * cross-links on every market page, and llms.txt can never disagree about what
 * we actually offer online.
 *
 * `suitsOnline` and `needsInPerson` are deliberately both required. Not every
 * discipline transfers to video equally — telehealth evidence is strong for
 * speech and for caregiver-mediated behaviour work, and weaker where hands-on
 * assessment matters. Stating the limits is what makes the claims credible, and
 * it stops us taking bookings we cannot serve well.
 */

export interface OnlineService {
  /** URL segment under /online. */
  slug: string;
  /** Display name, e.g. "Occupational Therapy". */
  name: string;
  /** Short label for nav and cards. */
  shortName: string;
  /** schema.org serviceType value. */
  serviceType: string;
  /** One-line summary used on cards and in llms.txt. */
  summary: string;
}

export const ONLINE_SERVICES: OnlineService[] = [
  {
    slug: "speech-therapy",
    name: "Speech & Language Therapy",
    shortName: "Speech Therapy",
    serviceType: "Online speech and language therapy",
    summary:
      "For late talkers, unclear speech, language delay, stammering, and autism-related communication.",
  },
  {
    slug: "occupational-therapy",
    name: "Occupational Therapy",
    shortName: "Occupational Therapy",
    serviceType: "Online paediatric occupational therapy",
    summary:
      "Sensory strategies, fine motor and handwriting, self-care routines, and regulation — coached through the parent.",
  },
  {
    slug: "behavioural-therapy",
    name: "Behavioural Therapy & Parent Training",
    shortName: "Behavioural Therapy",
    serviceType: "Online behavioural therapy and caregiver training",
    summary:
      "ABA-informed support for meltdowns, transitions, sleep, toileting, and daily routines — delivered by coaching you.",
  },
  {
    slug: "special-education",
    name: "Special Education & Learning Support",
    shortName: "Special Education",
    serviceType: "Online special education and remedial learning support",
    summary:
      "Individualised remedial teaching for reading, writing, and maths difficulties, including dyslexia and ADHD.",
  },
];

export const serviceBySlug = (slug: string): OnlineService | undefined =>
  ONLINE_SERVICES.find((s) => s.slug === slug);
