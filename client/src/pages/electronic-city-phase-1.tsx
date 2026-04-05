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
    name: "Apoorva Rai",
    title: "Clinical Director & Speech Therapist",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg",
    exp: "13+",
  },
  {
    name: "Niranjana",
    title: "Sr. Speech & Language Pathologist",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg",
    exp: "8+",
  },
];

const faqs = [
  {
    question: "Where exactly is Poorvam Care Phase 1 located?",
    answer:
      "Poorvam Care Electronic City Phase 1 is located on Hulimangala Road, near Sai Mandir, above RxDx Clinic, Electronic City Phase 1, Bangalore – 560100. It is easily accessible from Bommanahalli, Hongasandra, and Begur Road. You can use the Google Maps link on this page for turn-by-turn directions.",
  },
  {
    question: "What are the timings at the Phase 1 centre?",
    answer:
      "The Phase 1 centre is open Monday to Friday from 9:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays. We recommend calling ahead to schedule an appointment so we can allocate dedicated time for your child.",
  },
  {
    question: "Which services are available at Phase 1?",
    answer:
      "At our Electronic City Phase 1 centre we offer Speech Therapy, Occupational Therapy, ABA Therapy, Special Education, Parent Counselling, Therapeutic Enrichment programs, and Hearing Services including hearing assessments. Our clinical director Apoorva Rai and senior SLP Niranjana lead the therapy team here.",
  },
  {
    question: "How do I reach Poorvam Care from Silk Board?",
    answer:
      "From Silk Board Junction take Hosur Road towards Electronic City. Travel approximately 6 km and turn onto Hulimangala Road (you will pass the Electronic City flyover). Continue for about 1 km; look for RxDx Clinic on your left — Poorvam Care is on the floor above it, near Sai Mandir. Total drive time is roughly 15–20 minutes depending on traffic.",
  },
  {
    question: "Is parking available at the Phase 1 centre?",
    answer:
      "Yes, parking space is available in and around the building on Hulimangala Road. There is street parking along the service lane as well. If you are arriving by auto-rickshaw or cab, the landmark 'RxDx Clinic, Hulimangala Road' is widely known among local drivers and makes for an easy drop-off point.",
  },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Poorvam Care — Electronic City Phase 1",
  "url": "https://poorvamcare.in/electronic-city-phase-1",
  "telephone": "+918861764343",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Hulimangala Road, Near Sai Mandir, Above RxDx Clinic",
    "addressLocality": "Electronic City Phase 1, Bangalore",
    "addressRegion": "Karnataka",
    "postalCode": "560100",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": "12.8456", "longitude": "77.6603" },
  "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  "areaServed": ["Electronic City Phase 1", "Bommanahalli", "Hongasandra", "Hulimangala", "Begur"],
};

export default function ElectricCityPhase1Page() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Electronic City Phase 1 Bangalore | Poorvam Care"
        description="Poorvam Care Electronic City Phase 1 — speech therapy, OT & early intervention on Hulimangala Road. RCI licensed. Call +91 886 176 4343 to book today."
        canonical="https://poorvamcare.in/electronic-city-phase-1"
      />
      <StructuredData data={localBusinessSchema} />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Electronic City Phase 1", url: "https://poorvamcare.in/electronic-city-phase-1" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Electronic City Phase 1 · Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Poorvam Care Electronic City Phase 1 —{" "}
              <span className="text-blue-600">Speech Therapy &amp; Therapy Centre</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Our Phase 1 centre on Hulimangala Road brings expert speech therapy, occupational therapy,
              and early intervention to families across Electronic City, Bommanahalli, Hongasandra, and
              Begur Road. RCI-licensed therapists. Proven outcomes. Compassionate care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book Free Assessment
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
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
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <div>
                    <p className="font-heading font-semibold text-gray-900">Poorvam Care — Phase 1</p>
                    <p className="text-gray-600 font-body mt-1">
                      Hulimangala Road, Near Sai Mandir,<br />
                      Above RxDx Clinic,<br />
                      Electronic City Phase 1, Bangalore – 560100
                    </p>
                    <a
                      href="https://maps.app.goo.gl/gwKDYNhfzywxhvd5A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-blue-600 font-heading font-semibold hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                  <div className="font-body text-gray-600 text-sm">
                    <span className="font-semibold text-gray-800">Mon–Fri:</span> 9:00 AM – 6:00 PM &nbsp;|&nbsp;
                    <span className="font-semibold text-gray-800">Sat:</span> 9:00 AM – 2:00 PM &nbsp;|&nbsp;
                    <span className="font-semibold text-gray-800">Sun:</span> Closed
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                  <a
                    href="tel:+918861764343"
                    className="font-heading font-semibold text-blue-600 hover:underline"
                  >
                    +91 886 176 4343
                  </a>
                </div>
              </div>

              {/* Directions */}
              <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" /> Driving Directions
              </h3>
              <ul className="space-y-3 font-body text-gray-600 text-sm">
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From Silk Board Junction (~6 km):</span>
                  Take Hosur Road south, cross the Electronic City flyover, then turn onto Hulimangala Road. Proceed 1 km — look for RxDx Clinic on the left. Poorvam Care is on the floor above.
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From BTM Layout (~5 km):</span>
                  Head south on Bannerghatta Road, turn right on Begur Road, then continue to Hulimangala Road junction. Turn right and follow the road to RxDx Clinic.
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-gray-800 shrink-0">From Bannerghatta Road (~8 km):</span>
                  Take the Begur Road connector towards Electronic City, merge onto Hulimangala Road heading south. The RxDx Clinic landmark is visible from the road.
                </li>
              </ul>
            </div>

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                src="https://www.google.com/maps?q=12.8456,77.6603&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Poorvam Care Phase 1 Location"
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
              About Our Electronic City Phase 1 Centre
            </h2>
            <div className="prose prose-lg font-body text-gray-600 space-y-4 leading-relaxed">
              <p>
                Poorvam Care's Electronic City Phase 1 centre sits at the heart of one of Bangalore's
                fastest-growing residential and tech corridors. Located on Hulimangala Road — near the
                prominent Sai Mandir landmark and on the first floor above the well-known RxDx Clinic —
                the centre is easy to find and simple to reach by private vehicle, auto-rickshaw, or
                BMTC bus.
              </p>
              <p>
                Families from Bommanahalli, Hongasandra, Begur Road, Hulimangala village, and the
                broader Electronic City Phase 1 residential layouts have consistently found this location
                to be the most convenient therapy centre in the area. The RxDx Clinic below serves as a
                reliable landmark that every local cab driver and auto-rickshaw driver recognises
                instantly, making the commute stress-free even for first-time visitors.
              </p>
              <p>
                The Phase 1 facility houses dedicated therapy rooms for speech and language sessions,
                an occupational therapy gym stocked with sensory integration equipment, an ABA therapy
                room designed for structured one-to-one sessions, and a comfortable parent waiting and
                counselling area. Every room is designed to be child-friendly — calming colours, age-
                appropriate furniture, and visual schedules to help children feel safe and engaged from
                their very first visit.
              </p>
              <p>
                The centre is led by <strong>Apoorva Rai</strong>, Poorvam Care's Clinical Director
                and a highly experienced speech-language pathologist, and supported by
                <strong> Niranjana</strong>, a Senior SLP with over 8 years of specialised paediatric
                practice. Together they bring an evidence-based, family-centred approach that ensures
                every child's therapy plan is individualised, measurable, and regularly reviewed.
              </p>
              <p>
                Early intervention is at the core of what we do at Phase 1. Research consistently shows
                that children who receive targeted therapy before the age of 5 make significantly
                faster progress. Whether your child has been diagnosed with autism spectrum disorder,
                speech and language delays, developmental delays, ADHD, or a sensory processing
                difficulty, our team at Phase 1 is equipped to assess, plan, and deliver
                high-quality therapy from the very first session.
              </p>
              <p>
                We also run structured parent counselling and home-programme sessions from Phase 1,
                ensuring that the progress made during clinic hours is reinforced in everyday family
                life. Our therapists work in close collaboration with parents, and we welcome questions
                and active involvement at every stage of the therapeutic journey.
              </p>
              <p>
                If you live anywhere along the Hulimangala Road, Begur Road, or Hongasandra Road
                corridors, Poorvam Care Phase 1 is your nearest, most accessible, and most trusted
                therapy centre. We welcome walk-in enquiries during clinic hours, though we encourage
                you to book in advance to secure your preferred slot.
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
              Services at Phase 1
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              A full range of paediatric therapy services under one roof on Hulimangala Road
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3"
              >
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-body text-gray-800 text-sm font-medium">{service}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/child-development"
              className="text-blue-600 font-heading font-semibold hover:underline"
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
              <Users className="w-7 h-7 text-blue-600" /> Team at Phase 1
            </h2>
            <p className="text-lg text-gray-600 font-body">
              Meet the experienced professionals who lead your child's care at our Phase 1 centre
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            {team.map((member) => (
              <div key={member.name} className="text-center w-48">
                <div className="w-32 h-32 rounded-2xl overflow-hidden mx-auto mb-3 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=3B82F6&color=fff`;
                    }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 font-body">{member.title}</p>
                <p className="text-sm text-blue-600 font-body">{member.exp} years exp.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="FAQs — Electronic City Phase 1 Centre"
        subtitle="Everything you need to know before visiting us at Hulimangala Road"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Visit Us at Electronic City Phase 1
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Call us or book a free consultation — our Phase 1 team is ready to help your child thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
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
