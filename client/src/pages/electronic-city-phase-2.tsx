import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Phone, Car, Users, CheckCircle } from "lucide-react";

const services = [
  "Speech Therapy",
  "Occupational Therapy",
  "ABA Therapy",
  "Special Education",
  "Parent Counselling",
  "Therapeutic Enrichment",
  "Hearing Services",
];

const team = [
  {
    name: "Mariapan",
    title: "Sr. Occupational Therapist",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/mariapan.png",
    exp: "15+",
  },
  {
    name: "Pooja",
    title: "Sr. Special Education Teacher",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Pooja.jpg",
    exp: "6+",
  },
  {
    name: "Ananya",
    title: "Clinic Manager & Behavioural Therapist",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/ananya.jpeg",
    exp: "3+",
  },
];

const faqs = [
  {
    question: "Where is Poorvam Care Phase 2 located?",
    answer:
      "Poorvam Care Electronic City Phase 2 is located above the Bata Showroom, opposite Udipi Aaradhya restaurant, Ananth Nagar, Electronic City Phase 2, Bangalore – 560100. The Bata Showroom is a well-known landmark on the EC Phase 2 main road and is easily spotted from Neeladri Road.",
  },
  {
    question: "What are the timings at Phase 2?",
    answer:
      "Our Phase 2 centre is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays. We strongly recommend booking your appointment in advance to ensure your preferred therapist and time slot are available.",
  },
  {
    question: "How is Phase 2 different from Phase 1?",
    answer:
      "Both centres offer the same full range of therapy services and follow the same evidence-based standards of care. Phase 1 (Hulimangala Road) is led by Clinical Director Apoorva Rai and Sr. SLP Niranjana, while Phase 2 (Ananth Nagar) is led by Sr. OT Mariapan, Sr. Special Educator Pooja, and Clinic Manager Ananya. Families typically choose the centre closest to their home or workplace.",
  },
  {
    question: "How do I reach from Kudlu Gate?",
    answer:
      "From Kudlu Gate, take Hosur Road heading south towards Electronic City. After approximately 2 km you will reach Neeladri Road; turn left and continue into EC Phase 2 Ananth Nagar. Look for the Bata Showroom on your right — Poorvam Care is on the floor directly above it, opposite Udipi Aaradhya. The journey is roughly 5–10 minutes.",
  },
  {
    question: "Can I access both centres with one appointment?",
    answer:
      "Each appointment is scheduled at a specific centre. However, if your circumstances change, you can transfer to the other centre by speaking with our team. Your therapy records and individualised programme are shared across both centres, so continuity of care is fully maintained regardless of which centre you attend.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Poorvam Care — Electronic City Phase 2",
  "url": "https://poorvamcare.in/electronic-city-phase-2",
  "telephone": "+918861764343",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Above Bata Showroom, Opp. Udipi Aaradhya",
    "addressLocality": "Electronic City Phase 2, Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560100",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "12.8511", "longitude": "77.6690" },
  "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  "areaServed": ["Electronic City Phase 2", "Ananth Nagar", "Kudlu Gate", "Neeladri Road", "Hosur Road"],
};

export default function ElectronicCityPhase2Page() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Electronic City Phase 2 Bangalore | Poorvam Care"
        description="Poorvam Care Electronic City Phase 2 — speech therapy, OT & therapy centre above Bata Showroom, Ananth Nagar. RCI licensed. Call +91 886 176 4343."
        canonical="https://poorvamcare.in/electronic-city-phase-2"
      />
      <StructuredData data={localBusinessSchema} />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Electronic City Phase 2", url: "https://poorvamcare.in/electronic-city-phase-2" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-green-700 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Electronic City Phase 2 · Ananth Nagar · Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Poorvam Care Electronic City Phase 2 —{" "}
              <span className="text-green-700">Therapy Centre in Ananth Nagar</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Conveniently located above the Bata Showroom in Ananth Nagar, our Phase 2 centre
              serves families from EC Phase 2, Kudlu Gate, Neeladri Road, and surrounding
              neighbourhoods. Experienced RCI-licensed therapists. Individualised care. Proven results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-green-700 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-green-800 transition-colors shadow-lg shadow-green-700/25"
              >
                Book Free Assessment
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-green-700 hover:text-green-700 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Address & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Address card */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
                Address &amp; Contact
              </h2>
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-green-700 mt-1 shrink-0" />
                  <div>
                    <p className="font-heading font-semibold text-gray-900">Poorvam Care — Phase 2</p>
                    <p className="text-gray-600 font-body mt-1">
                      Above Bata Showroom,<br />
                      Opp. Udipi Aaradhya, Ananth Nagar,<br />
                      Electronic City Phase 2, Bangalore – 560100
                    </p>
                    <a
                      href="https://maps.app.goo.gl/gWCjwHqTvoRYs6Mj9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-green-700 font-heading font-semibold hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-green-700 shrink-0" />
                  <div className="font-body text-gray-600 text-sm">
                    <span className="font-semibold text-gray-800">Mon–Fri:</span> 9:00 AM – 6:00 PM &nbsp;|&nbsp;
                    <span className="font-semibold text-gray-800">Sat:</span> 9:00 AM – 2:00 PM &nbsp;|&nbsp;
                    <span className="font-semibold text-gray-800">Sun:</span> Closed
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-700 shrink-0" />
                  <a
                    href="tel:+918861764343"
                    className="font-heading font-semibold text-green-700 hover:underline"
                  >
                    +91 886 176 4343
                  </a>
                </div>
              </div>

              {/* Directions */}
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-green-700" /> Driving Directions
              </h3>
              <ul className="space-y-3 font-body text-gray-600 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From Hosur Road (~4 km):</span>
                  Travel south on Hosur Road from Bommasandra or the Electronic City Flyover, turn into
                  Neeladri Road at the EC Phase 2 signal. Follow Neeladri Road into Ananth Nagar; the
                  Bata Showroom is visible on the right side of the main road.
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From Kudlu Gate (~2 km):</span>
                  Take Hosur Road south from Kudlu Gate. Turn left onto Neeladri Road at the EC Phase 2
                  junction. Continue 1.5 km until you see the Bata Showroom. Poorvam Care is on the
                  first floor directly above, opposite Udipi Aaradhya.
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From EC Phase 1 (~3 km):</span>
                  Head north from Hulimangala Road onto Neeladri Road, continue through the Phase 1–2
                  connector road into Ananth Nagar. Look for the Bata Showroom on the left as you enter
                  the main Phase 2 commercial stretch.
                </li>
              </ul>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=12.8511,77.6690&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Poorvam Care Phase 2 Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About this centre */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              About Our Electronic City Phase 2 Centre
            </h2>
            <div className="prose prose-lg font-body text-gray-600 space-y-4 leading-relaxed">
              <p>
                Poorvam Care's Electronic City Phase 2 centre is nestled in the heart of Ananth
                Nagar — one of the most densely populated residential pockets of EC Phase 2. Situated
                above the widely recognised Bata Showroom and directly opposite Udipi Aaradhya
                restaurant, the centre is impossible to miss and straightforward to reach from every
                direction within the Electronic City corridor.
              </p>
              <p>
                This centre was established in response to the growing demand from families in EC
                Phase 2, Kudlu Gate, and the Neeladri Road belt who needed a therapy centre that was
                within easy walking or driving distance from their homes. Families no longer need to
                travel far — expert speech therapy, occupational therapy, and early intervention
                services are available right in their neighbourhood.
              </p>
              <p>
                The Phase 2 facility features dedicated therapy rooms purpose-built for occupational
                therapy, a specialist sensory gym, ABA therapy workspaces, special education
                classrooms for individual and small-group sessions, and a welcoming parent waiting area.
                The space is designed to be visually calm, structured, and stimulating in equal measure
                — key principles of a therapeutic environment that helps children feel comfortable and
                engaged from their very first visit.
              </p>
              <p>
                The Phase 2 team is led by <strong>Mariapan</strong>, one of Bangalore's most
                experienced paediatric occupational therapists with over 15 years of clinical
                practice. He is joined by <strong>Pooja</strong>, a Senior Special Education Teacher
                with deep expertise in designing inclusive learning programmes for children with
                diverse needs, and <strong>Ananya</strong>, the Clinic Manager and Behavioural
                Therapist who ensures seamless day-to-day operations and client care.
              </p>
              <p>
                EC Phase 2 has seen rapid residential growth over the last decade, with a large
                number of young families making it their home. Many of these families include children
                who benefit from early intervention, speech and language support, or occupational
                therapy. Our Phase 2 centre was built to serve this community specifically — providing
                professional, RCI-licensed therapy without the need for a long cross-city commute.
              </p>
              <p>
                Whether your child has been referred by a paediatrician, is showing early signs of
                a developmental concern, or you simply wish to have them assessed as a precaution,
                the Poorvam Care Phase 2 team is here to guide you. We follow the same rigorous,
                evidence-based assessment and therapy protocols used at our Phase 1 centre, ensuring
                consistent, high-quality outcomes at both locations.
              </p>
              <p>
                We invite families from Ananth Nagar, Kudlu Gate, Neeladri Road, EC Phase 2 Main Road,
                and the broader Hosur Road belt to visit us, ask questions, and experience the
                Poorvam Care difference. Your child's progress is our deepest commitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Services at Phase 2
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              The same comprehensive therapy services available to families in Ananth Nagar and EC Phase 2
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 text-green-700 shrink-0" />
                <span className="font-body text-gray-800 text-sm font-medium">{service}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/child-development"
              className="text-green-700 font-heading font-semibold hover:underline"
            >
              Learn more about our therapy programmes →
            </Link>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Users className="w-7 h-7 text-green-700" /> Team at Phase 2
            </h2>
            <p className="text-lg text-gray-600 font-body">
              Skilled, caring professionals dedicated to your child's growth and development
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center flex-wrap">
            {team.map((member) => (
              <div key={member.name} className="text-center w-48">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-3 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=15803D&color=fff`;
                    }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 font-body">{member.title}</p>
                <p className="text-sm text-green-700 font-body">{member.exp} years exp.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="FAQs — Electronic City Phase 2 Centre"
        subtitle="Everything you need to know before visiting us in Ananth Nagar"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Visit Us at Electronic City Phase 2
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation at our Ananth Nagar centre and start your child's therapy journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
            >
              Call +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
