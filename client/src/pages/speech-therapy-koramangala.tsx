import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Phone, ArrowRight, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "Is there a speech therapist near Koramangala?",
    answer: "Poorvam Care in Electronic City is a highly regarded speech therapy centre serving families from Koramangala. Located approximately 9 km from Koramangala, our centre is around 20–25 minutes by car. We have RCI-licensed speech-language pathologists who provide assessment and therapy for speech delays, language disorders, autism-related communication challenges, stuttering, and more. Many families from the 1st through 8th Blocks in Koramangala attend our centre regularly.",
  },
  {
    question: "How far is Poorvam Care from Koramangala?",
    answer: "Poorvam Care is approximately 9 km from Koramangala. The distance and drive time vary slightly depending on which block you live in. Families from Koramangala 1st Block and 2nd Block typically take around 20 minutes, while those from the 7th Block or 8th Block may take closer to 25 minutes. The journey is straightforward via Hosur Road through Silk Board or via Agara Lake Road.",
  },
  {
    question: "What is the best route from Koramangala to Electronic City?",
    answer: "There are two popular routes from Koramangala to Poorvam Care in Electronic City. The first is via Silk Board Junction — take Intermediate Ring Road or 80 Feet Road to Silk Board, then head south on Hosur Road towards Electronic City and exit at Hulimangala Road. The second is via Agara Lake Road — take Inner Ring Road to Agara and join Hosur Road further south. Both routes take around 20–25 minutes in normal traffic conditions. We recommend checking Google Maps for live traffic before heading out.",
  },
  {
    question: "Does Poorvam offer teletherapy for Koramangala families?",
    answer: "Yes, Poorvam Care offers online teletherapy sessions for families from Koramangala who prefer to attend therapy from home, particularly during peak traffic hours. Our therapists conduct live video sessions and provide detailed home activity plans. Many Koramangala families — especially those in tech roles with demanding schedules — use a blended model combining fortnightly in-person visits with weekly teletherapy check-ins. Contact us to discuss the best arrangement for your child.",
  },
];

const services = [
  { name: "Speech Therapy", href: "/speech-therapy", desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more." },
  { name: "Occupational Therapy", href: "/occupational-therapy", desc: "Sensory integration, fine motor skills, and activities of daily living." },
  { name: "ABA Therapy", href: "/aba-therapy", desc: "Evidence-based behavioural therapy for autism and developmental challenges." },
];

export default function SpeechTherapyKoramangalaPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Koramangala Bangalore | Poorvam Care Electronic City"
        description="Looking for speech therapy near Koramangala, Bangalore? Poorvam Care in Electronic City is 9km away. RCI-licensed therapists. Book a consultation."
        canonical="https://poorvamcare.in/speech-therapy-koramangala"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care — Early Intervention & Therapy Centre",
          "description": "Speech therapy and early intervention services for families from Koramangala, Bangalore",
          "url": "https://poorvamcare.in/speech-therapy-koramangala",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hulimangala Road, Electronic City Phase 1",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560100",
            "addressCountry": "IN",
          },
          "areaServed": ["Koramangala", "Koramangala 1st Block", "Koramangala 5th Block", "Indiranagar adjacent"],
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Speech Therapy Koramangala", url: "https://poorvamcare.in/speech-therapy-koramangala" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Serving Families from Koramangala
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy in{" "}
              <span className="text-blue-600">Koramangala</span>, Bangalore
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Poorvam Care in Electronic City is just 9 km from Koramangala — a 20–25 minute drive via Silk Board or Agara Lake Road. Our RCI-licensed speech-language pathologists deliver evidence-based therapy for children with speech delays, autism, language disorders, and more. Book a consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book a Consultation
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

      {/* Distance & Route Info */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Distance from Koramangala</p>
                <p className="text-gray-600 font-body text-sm mt-1">Approximately 9 km via Silk Board Junction or Agara Lake Road</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Travel Time</p>
                <p className="text-gray-600 font-body text-sm mt-1">Around 20–25 minutes by car under normal traffic conditions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Teletherapy Available</p>
                <p className="text-gray-600 font-body text-sm mt-1">Online speech therapy sessions from your Koramangala home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Trusted by Families Across Koramangala
              </h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                <p>
                  Koramangala is home to some of Bangalore's most vibrant residential communities — from the quiet lanes of the 1st Block to the bustling 5th and 6th Blocks lined with parks and schools. Parents across all eight blocks of Koramangala have been bringing their children to Poorvam Care for speech and language therapy, making us one of the most recommended centres in South Bangalore.
                </p>
                <p>
                  The drive from Koramangala to our Electronic City centre is manageable even with a young child. Most families take the Inner Ring Road or 80 Feet Road to Silk Board Junction, then head south on Hosur Road. An alternative that many from the 4th and 5th Block prefer is the Agara Lake Road route — quieter in the mornings and often faster during school rush hours.
                </p>
                <p>
                  Koramangala is a hub for Bangalore's technology and startup community, and many parents we serve are professionals working in the area's numerous tech parks and co-working spaces. These families appreciate our flexible scheduling, comprehensive progress reports, and the option to combine in-person therapy with online sessions. Our teletherapy programme is particularly valued by parents who travel frequently or work irregular hours.
                </p>
                <p>
                  Our speech therapists work with children across a broad age range — from toddlers showing early signs of a language delay to school-age children dealing with articulation difficulties, comprehension challenges, or autism-related communication differences. Every child who comes to Poorvam Care from Koramangala receives a thorough initial assessment and a personalised therapy plan with clear, measurable goals.
                </p>
                <p>
                  With RCI registration, ISHA certification, and over 13 years of clinical experience, Poorvam Care has built a strong reputation among Koramangala families. Parents in the 3rd Block, 7th Block, and 8th Block communities regularly refer each other to our centre. We are proud to have supported more than 500 families across Bangalore on their therapy journey.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Trust badges */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">Why Koramangala Families Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "RCI-licensed, ISHA-certified therapists",
                    "13+ years of clinical experience",
                    "500+ families served across Bangalore",
                    "Flexible scheduling for working parents",
                    "Multidisciplinary team under one roof",
                    "Detailed progress reports every session",
                    "Teletherapy available for busy families",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-body text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Poorvam Care location — directions from Koramangala"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d77.6608!3d12.8448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b0a2f7e2b2b%3A0x0!2sPoorvam+Care!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-4 bg-white">
                  <a
                    href="https://maps.app.goo.gl/gwKDYNhfzywxhvd5A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-heading font-semibold text-sm hover:underline flex items-center gap-1"
                  >
                    Get directions to Poorvam Care <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Therapy Services for Koramangala Families
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Comprehensive early intervention and therapy under one roof in Electronic City
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="text-blue-600 font-heading font-semibold text-sm flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Speech Therapy for Koramangala — Common Questions"
        subtitle="Everything you need to know before booking your first appointment"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Your Child's Speech Therapy Journey Today
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Families from Koramangala trust Poorvam Care for expert, compassionate speech therapy. Book a consultation and let us create a personalised plan for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
