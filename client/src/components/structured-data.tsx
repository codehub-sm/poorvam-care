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
  "name": "Poorvam Care",
  "alternateName": ["Poorvam Therapy Center", "Poorvam Child Development Center", "Poorvam Hearing Center"],
  "description": "Best child development therapy, speech therapy, occupational therapy, hearing care, and enrichment programs in Electronic City, Bangalore. RCI registered, ISHA certified. Serving 2500+ families.",
  "url": "https://poorvamcare.in",
  "logo": "https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg",
  "image": "https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg",
  "telephone": "+918861764343",
  "email": "info@poorvamcare.in",
  "priceRange": "₹₹",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Hulimangla Road, Near Westside & Sai Baba Temple Road, Electronic City Phase 1",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560100",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Electronic City Phase 2",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560100",
      "addressCountry": "IN"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.8311",
    "longitude": "77.6483"
  },
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
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hearing Assessment" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hearing Aids" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enrichment Programs" } }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "61",
    "bestRating": "5"
  },
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
    { "@type": "Place", "name": "Bommanahalli" }
  ],
  "medicalSpecialty": ["Pediatric Therapy", "Speech-Language Pathology", "Audiology", "Occupational Therapy"]
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
