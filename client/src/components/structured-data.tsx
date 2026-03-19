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
  "description": "Comprehensive child development therapy, hearing care, and enrichment programs in Bangalore",
  "url": "https://poorvamcare.in",
  "logo": "https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg",
  "telephone": "+918861764343",
  "email": "info@poorvamcare.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Electronic City Phase 2, Ananth Nagar",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
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
