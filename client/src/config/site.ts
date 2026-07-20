/**
 * Single source of truth for business contact details, locations, and hours.
 *
 * Before this module these values were duplicated by hand — the phone number
 * appeared 51 times across 30 files, and the email had drifted apart between
 * structured-data.tsx (info@poorvamcare.in), the footer, and llms.txt
 * (poorvam.care@gmail.com). Inconsistent NAP across a site weakens the local
 * entity signal, so these must stay identical everywhere they are rendered.
 *
 * Import from here rather than re-typing a value.
 */

export const SITE_URL = "https://poorvamcare.in";

export const CONTACT = {
  /** E.164, for tel: links and schema. */
  phone: "+918861764343",
  /** Human-readable, for display. */
  phoneDisplay: "+91 88617 64343",
  /** Digits only, for wa.me links. */
  whatsapp: "918861764343",
  email: "poorvam.care@gmail.com",
} as const;

export const SOCIAL = [
  "https://www.facebook.com/profile.php?id=61572411165781",
  "https://www.instagram.com/poorvam_care/",
] as const;

export interface Location {
  id: string;
  name: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  latitude: string;
  longitude: string;
  mapUrl: string;
}

export const LOCATIONS: Location[] = [
  {
    id: "phase-1",
    name: "Poorvam Care - Electronic City Phase 1",
    streetAddress:
      "Hulimangla Road, Near Westside & Sai Baba Temple Road, Electronic City Phase 1",
    addressLocality: "Electronic City Phase 1",
    addressRegion: "Karnataka",
    postalCode: "560100",
    addressCountry: "IN",
    latitude: "12.8456",
    longitude: "77.6603",
    mapUrl:
      "https://maps.google.com/?q=Poorvam+Care+Electronic+City+Phase+1+Bangalore",
  },
  {
    id: "phase-2",
    name: "Poorvam Care - Electronic City Phase 2",
    streetAddress:
      "Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Electronic City Phase 2",
    addressLocality: "Electronic City Phase 2",
    addressRegion: "Karnataka",
    postalCode: "560100",
    addressCountry: "IN",
    latitude: "12.8511",
    longitude: "77.6690",
    mapUrl:
      "https://maps.google.com/?q=Poorvam+Care+Electronic+City+Phase+2+Bangalore",
  },
];

/** Primary location — used where a single address is required (schema, footer). */
export const PRIMARY_LOCATION = LOCATIONS[0];

export const OPENING_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  { dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
] as const;

/** IANA zone for the centres — needed once overseas visitors see session times. */
export const BUSINESS_TIMEZONE = "Asia/Kolkata";

/**
 * Builds a wa.me deep link, optionally with a prefilled message.
 *
 * A prefilled message tells us which page the enquiry came from, which is the
 * only attribution we get on a WhatsApp tap — the click leaves the site, so
 * nothing downstream can tell us what the parent was reading.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${CONTACT.phone}`;
export const mailtoLink = `mailto:${CONTACT.email}`;
