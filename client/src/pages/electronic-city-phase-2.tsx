import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock, Check, ArrowRight } from "lucide-react";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://poorvamcare.in/electronic-city-phase-2#business",
  "name": "Poorvam Care — Electronic City Phase 2",
  "description": "Multi-disciplinary early intervention centre offering speech therapy, occupational therapy, ABA, behavioural therapy, special education, and therapeutic enrichment for children aged 2–14 in Electronic City Phase 2, Bangalore.",
  "url": "https://poorvamcare.in/electronic-city-phase-2",
  "telephone": "+918861764343",
  "email": "info@poorvamcare.in",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant",
    "addressLocality": "Electronic City Phase 2",
    "addressRegion": "Karnataka",
    "postalCode": "560100",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "12.8511",
    "longitude": "77.6690",
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00",
    },
  ],
  "areaServed": [
    { "@type": "Place", "name": "Electronic City Phase 2" },
    { "@type": "Place", "name": "Ananth Nagar" },
    { "@type": "Place", "name": "Kammasandra" },
    { "@type": "Place", "name": "Hosa Road" },
    { "@type": "Place", "name": "Bommanahalli" },
  ],
  "hasMap": "https://maps.app.goo.gl/gWCjwHqTvoRYs6Mj9",
};

const services = [
  "Speech Therapy",
  "Occupational Therapy",
  "ABA / Behavioural Therapy",
  "Special Education",
  "Parent Counselling",
  "Therapeutic Enrichment",
];

const nearbyAreas = [
  "Electronic City Phase 2",
  "Ananth Nagar",
  "Kammasandra",
  "Hosa Road",
  "Bommanahalli",
  "Begur",
];

export default function ElectronicCityPhase2() {
  return (
    <>
      <SeoHead
        title="Early Intervention Centre in Electronic City Phase 2 | Poorvam Care"
        description="Poorvam Care in Ananth Nagar offers speech therapy, occupational therapy, ABA, and special education for children with autism and developmental delays in Electronic City Phase 2, Bangalore."
        canonical="https://poorvamcare.in/electronic-city-phase-2"
        keywords="speech therapy Electronic City Phase 2, occupational therapy Ananth Nagar, early intervention centre EC Phase 2, child therapy Hosa Road, autism therapy Electronic City Phase 2 Bangalore, Poorvam Care Phase 2, speech therapy near me Chandapura, child therapy Bommanahalli, best therapy center near Electronic City Phase 2, occupational therapy Hosa Road, speech therapist Kudlu Gate, consultation child therapy EC Phase 2"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Our Centres", url: "https://poorvamcare.in/electronic-city-phase-2" },
        { name: "Electronic City Phase 2", url: "https://poorvamcare.in/electronic-city-phase-2" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #7BA87B 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-sage/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Our Centres · Electronic City Phase 2
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Early Intervention Centre —{" "}
              <span className="text-coral">Electronic City Phase 2, Bangalore</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Our Electronic City Phase 2 centre in Ananth Nagar provides multi-disciplinary early intervention for children aged 2–14 with autism, developmental delays, ADHD, and learning differences. RCI registered. ISHA certified.
            </p>
          </div>
        </div>
      </section>

      {/* About This Centre */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">About This Centre</h2>
              <div className="space-y-4 text-brown-mid font-body leading-relaxed">
                <p>
                  Our Electronic City Phase 2 centre is located in Ananth Nagar, above Bata Showroom and opposite Udipi Aaradhya Restaurant. It serves families across Hosa Road, Bommanahalli, Kammasandra, and surrounding neighbourhoods.
                </p>
                <p>
                  Led by Apoorva Rai, MASLP, with 13+ years of paediatric experience, our team provides evidence-based speech therapy, occupational therapy, ABA therapy, special education, parent counselling, and therapeutic enrichment programmes.
                </p>
                <p>
                  We serve over 500 families and take a compassionate, family-centred approach to early intervention — working closely with parents to support each child's growth at home and in the clinic.
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-warm-bg rounded-2xl p-8 border border-warm-gray-200">
              <h3 className="text-lg font-heading font-bold text-brown-deep mb-5">Visit Us</h3>
              <ul className="space-y-4 text-sm font-body text-brown-mid">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brown-deep block mb-1">Address</span>
                    Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Electronic City Phase 2, Bengaluru 560100
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brown-deep block mb-1">Phone</span>
                    <a href="tel:+918861764343" className="hover:text-coral transition-colors">+91 886 176 4343</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brown-deep block mb-1">Email</span>
                    <a href="mailto:info@poorvamcare.in" className="hover:text-coral transition-colors">info@poorvamcare.in</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brown-deep block mb-1">Hours</span>
                    Mon–Fri: 9:00 AM – 6:00 PM<br />
                    Sat: 9:00 AM – 2:00 PM
                  </div>
                </li>
              </ul>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.app.goo.gl/gWCjwHqTvoRYs6Mj9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-coral text-white px-6 py-3 rounded-xl font-heading font-bold text-sm text-center hover:bg-coral-dark transition-colors shadow-md shadow-coral/20"
                >
                  Get Directions
                </a>
                <Link
                  href="/contact"
                  className="border-2 border-coral text-coral px-6 py-3 rounded-xl font-heading font-bold text-sm text-center hover:bg-coral/5 transition-colors"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services at This Location */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-8">Services at This Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service} className="bg-white rounded-xl p-5 border border-warm-gray-200 flex items-center gap-3">
                <Check className="w-5 h-5 text-sage flex-shrink-0" />
                <span className="font-body text-brown-deep font-medium">{service}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/child-development" className="inline-flex items-center gap-2 text-coral font-heading font-semibold hover:underline">
              View all therapy services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/therapeutic-enrichment" className="inline-flex items-center gap-2 text-sage-dark font-heading font-semibold hover:underline">
              View enrichment programmes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Find Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">How to Find Us</h2>
          <div className="bg-warm-bg rounded-2xl p-8 border border-warm-gray-200">
            <div className="space-y-4 text-brown-mid font-body leading-relaxed">
              <p>
                Our Electronic City Phase 2 centre is located in <strong>Ananth Nagar</strong>, above the Bata Showroom and opposite Udipi Aaradhya Restaurant. It is well-connected to Hosa Road and Bommanahalli.
              </p>
              <p>
                <strong>Landmarks:</strong> Above Bata Showroom, opposite Udipi Aaradhya Restaurant, near the Electronic City Phase 2 main road.
              </p>
              <p>
                <strong>By car/auto:</strong> From Hosa Road or Bommanahalli, head towards Electronic City Phase 2 main road. The centre is visible from the road above the Bata Showroom.
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/gWCjwHqTvoRYs6Mj9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 bg-coral text-white px-6 py-3 rounded-xl font-heading font-bold text-sm hover:bg-coral-dark transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Nearby Areas We Serve */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">Nearby Areas We Serve</h2>
          <p className="text-brown-mid font-body mb-8 max-w-2xl">
            Families from these neighbourhoods visit our Electronic City Phase 2 centre for speech therapy, occupational therapy, and early intervention services.
          </p>
          <div className="flex flex-wrap gap-3">
            {nearbyAreas.map((area) => (
              <span key={area} className="px-4 py-2 bg-white rounded-full text-sm font-body font-medium text-brown-deep border border-warm-gray-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-brown-deep mb-6">
            Explore Poorvam Care
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/child-development" className="px-6 py-3 rounded-xl border border-coral/20 text-coral font-heading font-semibold hover:bg-coral/5 transition-colors">
              Our Services
            </Link>
            <Link href="/about" className="px-6 py-3 rounded-xl border border-sage/20 text-sage-dark font-heading font-semibold hover:bg-sage/5 transition-colors">
              About Us
            </Link>
            <Link href="/electronic-city-phase-1" className="px-6 py-3 rounded-xl border border-gold/20 text-gold-dark font-heading font-semibold hover:bg-gold/5 transition-colors">
              Hulimanagla, ECity Phase 1 Centre
            </Link>
            <Link href="/contact" className="px-6 py-3 rounded-xl border border-coral/20 text-coral font-heading font-semibold hover:bg-coral/5 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Ready to Visit Our Phase 2 Centre?
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Book a consultation and discover how Poorvam Care can support your child's development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
            >
              Book a Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-warm-bg text-warm-bg px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-bg hover:text-brown-deep transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
