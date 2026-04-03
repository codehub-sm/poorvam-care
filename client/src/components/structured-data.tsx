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
  "telephone": "+918861764343",
  "email": "info@poorvamcare.in",
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

export function createLocalBusinessSchema(location: {
  name: string;
  description: string;
  url: string;
  streetAddress: string;
  locality: string;
  latitude: string;
  longitude: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": location.name,
    "description": location.description,
    "url": location.url,
    "telephone": "+918861764343",
    "email": "info@poorvamcare.in",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": location.streetAddress,
      "addressLocality": location.locality,
      "addressRegion": "Karnataka",
      "postalCode": "560100",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
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
    "parentOrganization": {
      "@type": "MedicalBusiness",
      "@id": "https://poorvamcare.in/#organization"
    }
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
