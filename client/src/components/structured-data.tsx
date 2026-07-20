import {
  CONTACT,
  SITE_URL,
  OPENING_HOURS,
  type Location,
} from "@/config/site";

interface StructuredDataProps {
  data: Record<string, unknown>;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": "https://poorvamcare.in/#organization",
  "name": "Poorvam Care",
  "alternateName": ["Poorvam Therapy Center", "Poorvam Child Development Center", "Poorvam Early Intervention Centre"],
  "description": "Multi-disciplinary early intervention centre offering speech therapy, occupational therapy, ABA, behavioural therapy, special education, and therapeutic enrichment for children aged 2–14 in Electronic City, Bangalore.",
  "url": "https://poorvamcare.in",
  "logo": "https://poorvamcare.in/img/poorvam-logo.png",
  "image": "https://poorvamcare.in/img/poorvam-logo.png",
  "telephone": CONTACT.phone,
  "email": CONTACT.email,
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hulimangla Road, Near Westside & Sai Baba Temple Road, Electronic City Phase 1",
    "addressLocality": "Electronic City",
    "addressRegion": "Karnataka",
    "postalCode": "560100",
    "addressCountry": "IN"
  },
  "location": [
    {
      "@type": "Place",
      "name": "Poorvam Care - Electronic City Phase 1",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hulimangla Road, Near Westside & Sai Baba Temple Road, Electronic City Phase 1",
        "addressLocality": "Electronic City Phase 1",
        "addressRegion": "Karnataka",
        "postalCode": "560100",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.8456",
        "longitude": "77.6603"
      },
      "hasMap": "https://maps.google.com/?q=Poorvam+Care+Electronic+City+Phase+1+Bangalore"
    },
    {
      "@type": "Place",
      "name": "Poorvam Care - Electronic City Phase 2",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Electronic City Phase 2",
        "addressLocality": "Electronic City Phase 2",
        "addressRegion": "Karnataka",
        "postalCode": "560100",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.8511",
        "longitude": "77.6690"
      },
      "hasMap": "https://maps.google.com/?q=Poorvam+Care+Electronic+City+Phase+2+Bangalore"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.8456",
    "longitude": "77.6603"
  },
  "hasMap": "https://maps.google.com/?q=Poorvam+Care+Electronic+City+Bangalore",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61572411165781",
    "https://www.instagram.com/poorvam_care/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Therapy & Enrichment Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Speech Therapy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Occupational Therapy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ABA Therapy" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Special Education" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Parent Counselling" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Therapeutic Enrichment" } }
    ]
  },
  // NOTE: `aggregateRating` was removed here deliberately.
  //
  // It was hardcoded to 4.5/61 with zero accompanying `Review` nodes. Google
  // does not award review rich results to self-serving markup a site asserts
  // about itself, so it produced no benefit — while an unverifiable, manually
  // maintained rating that drifts from the real Google Business Profile count
  // is exactly the pattern the structured-data spam policy targets.
  //
  // Star ratings already surface through the Business Profile. If we want them
  // in schema, they must come from a live reviews feed with real `Review`
  // nodes attached, not a literal.
  "areaServed": [
    { "@type": "City", "name": "Bangalore" },
    { "@type": "Place", "name": "Electronic City" },
    { "@type": "Place", "name": "Electronic City Phase 1" },
    { "@type": "Place", "name": "Electronic City Phase 2" },
    { "@type": "Place", "name": "Ananth Nagar" },
    { "@type": "Place", "name": "Neeladri Nagar" },
    { "@type": "Place", "name": "Doddathogur" },
    { "@type": "Place", "name": "Hulimangala" },
    { "@type": "Place", "name": "Hosa Road" },
    { "@type": "Place", "name": "Bommanahalli" },
    { "@type": "Place", "name": "Kudlu Gate" },
    { "@type": "Place", "name": "HSR Layout" },
    { "@type": "Place", "name": "Singasandra" },
    { "@type": "Place", "name": "Hongasandra" },
    { "@type": "Place", "name": "Chandapura" },
    { "@type": "Place", "name": "Konanakunte" },
    { "@type": "Place", "name": "Konappana Agrahara" },
    { "@type": "Place", "name": "Kammasandra" },
    { "@type": "Place", "name": "Koramangala" },
    { "@type": "Place", "name": "BTM Layout" }
  ],
  "medicalSpecialty": ["Pediatric Therapy", "Speech-Language Pathology", "Occupational Therapy", "Behavioural Therapy"]
};

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export const personSchemaApoorva = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Apoorva Rai",
  "jobTitle": "Lead Speech-Language Pathologist",
  "email": "poorvam.care@gmail.com",
  "worksFor": {
    "@type": "MedicalBusiness",
    "@id": "https://poorvamcare.in/#organization"
  },
  "hasCredential": [
    "Master of Audiology and Speech-Language Pathology (MASLP)",
    "Licensed by Rehabilitation Council of India",
    "Member, Indian Speech and Hearing Association"
  ],
  "knowsAbout": [
    "Autism Spectrum Disorder",
    "ADHD",
    "Articulation Disorders",
    "Developmental Delays",
    "Speech Delay",
    "Occupational Therapy for Children",
    "ABA Therapy"
  ]
};

export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    "name": service.name,
    "description": service.description,
    "url": service.url,
    "provider": {
      "@type": "MedicalBusiness",
      "@id": "https://poorvamcare.in/#organization"
    },
    "availableService": {
      "@type": "MedicalTherapy",
      "name": service.name
    }
  };
}

/** PostalAddress node for a configured centre. The only place addresses are built. */
export function postalAddressFor(location: Location) {
  return {
    "@type": "PostalAddress",
    "streetAddress": location.streetAddress,
    "addressLocality": location.addressLocality,
    "addressRegion": location.addressRegion,
    "postalCode": location.postalCode,
    "addressCountry": location.addressCountry,
  };
}

/** OpeningHoursSpecification nodes derived from the single hours definition. */
export function openingHoursSchema() {
  return OPENING_HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": h.dayOfWeek,
    "opens": h.opens,
    "closes": h.closes,
  }));
}

/**
 * LocalBusiness schema for a physical centre.
 *
 * Every page that describes a centre must go through here. Eleven pages
 * previously hand-rolled this object, and the copies drifted into nine
 * different spellings of the same two street addresses — inconsistent NAP is
 * one of the strongest suppressors of local pack ranking, so the addresses
 * now come from LOCATIONS in @/config/site and cannot diverge per page.
 */
export function createLocalBusinessSchema(opts: {
  /** Which physical centre this page is about. */
  location: Location;
  /** Page-specific name override, e.g. "Poorvam Care — Speech Therapy, BTM Layout". */
  name?: string;
  description: string;
  /** Canonical URL of the page. Must match the route, or the page self-canonicalises to a 404. */
  url: string;
  /** Neighbourhoods this page targets. */
  areaServed?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": opts.name ?? opts.location.name,
    "description": opts.description,
    "url": opts.url,
    "telephone": CONTACT.phone,
    "email": CONTACT.email,
    "priceRange": "₹₹",
    "address": postalAddressFor(opts.location),
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": opts.location.latitude,
      "longitude": opts.location.longitude,
    },
    "hasMap": opts.location.mapUrl,
    "openingHoursSpecification": openingHoursSchema(),
    ...(opts.areaServed?.length
      ? { areaServed: opts.areaServed.map((name) => ({ "@type": "Place", name })) }
      : {}),
    "parentOrganization": {
      "@type": "MedicalBusiness",
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

/**
 * Schema for the online/teletherapy offering.
 *
 * Deliberately NOT a MedicalBusiness and deliberately carrying no postal
 * address. The local pages describe two physical centres in Electronic City;
 * these pages describe a service delivered remotely to another country. Giving
 * them a Bangalore address would tell Google they are local Bangalore results
 * and blur the entity that currently ranks for Electronic City queries.
 *
 * Price is optional. Pricing is currently discussed on the consultation call
 * rather than published, so the Offer node carries availability and a session
 * description but no figure — asserting a price in schema that the site does
 * not show would be both misleading and unmaintainable.
 */
export function createOnlineServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** ISO country codes this service is offered in. */
  areaServed: string[];
  /** Omit unless the price is genuinely published on the page. */
  price?: number;
  priceCurrency?: string;
  /** Session length in minutes, for the offer description. */
  sessionMinutes?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${opts.url}#service`,
    "name": opts.name,
    "description": opts.description,
    "url": opts.url,
    "serviceType": "Online speech and language therapy",
    "provider": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Poorvam Care",
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": opts.url,
      "availableLanguage": ["en", "hi", "ta", "te", "kn", "ml"],
    },
    "areaServed": opts.areaServed.map((c) => ({ "@type": "Country", name: c })),
    "offers": {
      "@type": "Offer",
      ...(opts.price !== undefined && opts.priceCurrency
        ? { price: opts.price, priceCurrency: opts.priceCurrency }
        : {}),
      "availability": "https://schema.org/InStock",
      "description": `${opts.sessionMinutes ?? 45}-minute live online session`,
      "url": opts.url,
    },
  };
}

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
