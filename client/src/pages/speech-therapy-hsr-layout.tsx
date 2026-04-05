import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Phone, ArrowRight, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "Is there a speech therapist near HSR Layout?",
    answer: "Poorvam Care in Electronic City is the closest dedicated speech therapy centre for families in HSR Layout. Our centre is approximately 8–10 km from HSR Layout — just a 20–25 minute drive via Silk Board Junction. We have RCI-licensed speech-language pathologists with over 13 years of clinical experience serving children with speech delays, autism, stuttering, and language disorders.",
  },
  {
    question: "How far is Poorvam Care from HSR Layout?",
    answer: "Poorvam Care is approximately 8–10 km from HSR Layout, Bangalore. The most convenient route is via Silk Board Junction onto Hosur Road, then into Electronic City Phase 1 or Phase 2. Under normal traffic conditions, the drive takes around 20–25 minutes. We also offer teletherapy sessions for families who prefer to attend from home.",
  },
  {
    question: "What speech therapy services are available for HSR Layout families?",
    answer: "Poorvam Care offers a comprehensive range of speech and language therapy services for children from HSR Layout, including assessment and therapy for speech sound disorders, expressive and receptive language delays, autism-related communication challenges, fluency (stuttering), voice disorders, and AAC (Augmentative and Alternative Communication). Our team also provides parent guidance programmes so you can support your child's communication goals at home.",
  },
  {
    question: "Can I get online speech therapy from HSR Layout?",
    answer: "Yes. Poorvam Care provides teletherapy (online speech therapy) sessions that are ideal for families in HSR Layout who prefer not to commute. Our therapists conduct live video sessions using evidence-based approaches and provide home activity plans so your child makes consistent progress. Teletherapy is available for children aged 2 and above. Contact us to discuss whether online therapy is suitable for your child's specific needs.",
  },
];

const services = [
  { name: "Speech Therapy", href: "/speech-therapy", desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more." },
  { name: "Occupational Therapy", href: "/occupational-therapy", desc: "Sensory integration, fine motor skills, and activities of daily living." },
  { name: "ABA Therapy", href: "/aba-therapy", desc: "Evidence-based behavioural therapy for autism and developmental challenges." },
];

export default function SpeechTherapyHsrLayoutPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in HSR Layout Bangalore | Poorvam Care Electronic City"
        description="Looking for speech therapy in HSR Layout, Bangalore? Poorvam Care in Electronic City is just 8km away. RCI-licensed therapists. Book a free consultation."
        canonical="https://poorvamcare.in/speech-therapy-hsr-layout"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care — Early Intervention & Therapy Centre",
          "description": "Speech therapy and early intervention services for families from HSR Layout, Bangalore",
          "url": "https://poorvamcare.in/speech-therapy-hsr-layout",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hulimangala Road, Electronic City Phase 1",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560100",
            "addressCountry": "IN",
          },
          "areaServed": ["HSR Layout", "HSR Layout Sector 1", "HSR Layout Sector 2", "Agara"],
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Speech Therapy HSR Layout", url: "https://poorvamcare.in/speech-therapy-hsr-layout" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Serving Families from HSR Layout
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy in{" "}
              <span className="text-blue-600">HSR Layout</span>, Bangalore
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Poorvam Care, Electronic City's leading early intervention centre, is just 8–10 km from HSR Layout — a quick 20–25 minute drive via Silk Board Junction. Our RCI-licensed speech-language pathologists provide expert, compassionate care for children with speech delays, language disorders, autism, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book Free Consultation
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
                <p className="font-heading font-bold text-gray-900">Distance from HSR Layout</p>
                <p className="text-gray-600 font-body text-sm mt-1">Approximately 8–10 km via Silk Board Junction and Hosur Road</p>
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
                <p className="text-gray-600 font-body text-sm mt-1">Online speech therapy sessions from the comfort of your HSR Layout home</p>
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
                Trusted by Families Across HSR Layout
              </h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                <p>
                  Over the years, Poorvam Care has become the therapy centre of choice for many families living in HSR Layout — from Sector 1, Sector 2, and Sector 3 right through to the BDA Complex, 27th Main, and the HSR BDA residential blocks. Parents across these neighbourhoods recognise that expert early intervention does not need to be far away.
                </p>
                <p>
                  Reaching our centre from HSR Layout is straightforward. From Sector 1 or Sector 7, head towards Silk Board Junction, then take Hosur Road south towards Electronic City. The Hulimangala Road entry into EC Phase 1 puts you directly at our doorstep. Most families from the 27th Main and BDA Complex area report the journey takes under 25 minutes outside peak hours.
                </p>
                <p>
                  Families from HSR Layout choose Poorvam Care because of our multidisciplinary team, child-centred therapy rooms, and proven track record. With over 500 families served and 13 years of clinical experience, our therapists bring both depth of knowledge and genuine warmth to every session. We hold RCI (Rehabilitation Council of India) registration and ISHA certification — credentials that matter when you are choosing who works with your child.
                </p>
                <p>
                  Our speech therapy programmes address a wide range of needs: late talkers and toddlers with language delays, school-age children with articulation or phonological disorders, children on the autism spectrum who need AAC or social communication support, and older children dealing with fluency challenges such as stuttering. Every child receives an individualised care plan developed after a thorough assessment.
                </p>
                <p>
                  We understand that commuting from HSR Layout with a young child can be tiring. That is why we offer flexible appointment times, teletherapy options, and parent coaching so that therapy goals continue at home between sessions. Many HSR Layout families combine in-person centre visits with weekly online check-ins — giving their child the best of both approaches.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Trust badges */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">Why HSR Layout Families Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "RCI-licensed, ISHA-certified therapists",
                    "13+ years of clinical experience",
                    "500+ families served across Bangalore",
                    "Individualised, evidence-based therapy plans",
                    "Multidisciplinary team under one roof",
                    "Parent training and home programme guidance",
                    "Teletherapy available for all therapy types",
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
                  title="Poorvam Care location — directions from HSR Layout"
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
              Our Therapy Services for HSR Layout Families
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
        title="Speech Therapy for HSR Layout — Common Questions"
        subtitle="Everything you need to know before booking your first appointment"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Your Child's Speech Therapy Journey Today
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Families from HSR Layout trust Poorvam Care for expert, compassionate speech therapy. Book a free consultation and let us create a personalised plan for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
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
