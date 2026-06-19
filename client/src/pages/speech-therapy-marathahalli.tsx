import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Wifi, ArrowRight, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "Is there a speech therapist near Marathahalli?",
    answer: "Poorvam Care in Electronic City is one of the closest dedicated speech and language therapy centres for families in Marathahalli. Located approximately 20 km from Marathahalli Bridge, our centre is around 35–45 minutes by car via the Outer Ring Road or Sarjapur Road. We also offer teletherapy (online speech therapy) for Marathahalli families who prefer not to commute. Our RCI-licensed therapists have over 13 years of experience and have helped hundreds of families from the Bellandur, Sarjapur Road, and ORR corridor.",
  },
  {
    question: "How do I reach Poorvam Care from Marathahalli?",
    answer: "From Marathahalli Bridge, there are two good routes to Poorvam Care in Electronic City. The first is via the Outer Ring Road south — take ORR from Marathahalli towards Bellandur, continue past Sarjapur Road Junction, and join Hosur Road into Electronic City. The second route is via HAL Old Airport Road to Sarjapur Road, then south to Electronic City. The ORR route is typically faster during morning and evening peak hours. Total drive time is approximately 35–45 minutes depending on traffic.",
  },
  {
    question: "Does Poorvam Care offer online therapy for Marathahalli families?",
    answer: "Yes. Poorvam Care offers online teletherapy sessions that are a convenient option for families in Marathahalli and the Bellandur and Sarjapur Road corridor. Our therapists conduct live video sessions, provide detailed home activity plans, and offer parent coaching — all via our online platform. Many Marathahalli families use a blended approach, attending the centre for monthly assessments and progress reviews while completing weekly therapy sessions online. Contact us to learn more about our teletherapy programme.",
  },
  {
    question: "What is the cost of speech therapy at Poorvam Care?",
    answer: "Therapy fees at Poorvam Care vary depending on the type of therapy, session frequency, and your child's individual care plan. We believe every child deserves expert care, so we offer competitive rates and flexible scheduling options. We recommend starting with an initial consultation, during which our therapist will assess your child's needs and provide a clear explanation of recommended therapy and associated costs — with no obligation to book. Call us on +91 886 176 4343 or use our contact form to arrange your consultation.",
  },
];

const services = [
  { name: "Speech Therapy", href: "/speech-therapy", desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more." },
  { name: "Occupational Therapy", href: "/occupational-therapy", desc: "Sensory integration, fine motor skills, and activities of daily living." },
  { name: "ABA Therapy", href: "/aba-therapy", desc: "Evidence-based behavioural therapy for autism and developmental challenges." },
];

export default function SpeechTherapyMaratahalliPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Marathahalli Bangalore | Poorvam Care Electronic City"
        description="Speech therapy for children near Marathahalli, Bangalore. Poorvam Care in Electronic City is 20km away. Teletherapy available. Book a consultation."
        canonical="https://poorvamcare.in/speech-therapy-marathahalli"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care — Early Intervention & Therapy Centre",
          "description": "Speech therapy and early intervention services for families from Marathahalli, Bellandur, and Sarjapur Road, Bangalore",
          "url": "https://poorvamcare.in/speech-therapy-marathahalli",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hulimangala Road, Electronic City Phase 1",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560100",
            "addressCountry": "IN",
          },
          "areaServed": ["Marathahalli", "Bellandur", "Sarjapur Road", "Outer Ring Road"],
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Speech Therapy Marathahalli", url: "https://poorvamcare.in/speech-therapy-marathahalli" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Serving Families from Marathahalli, Bellandur & Sarjapur Road
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy near{" "}
              <span className="text-blue-600">Marathahalli</span>, Bangalore
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Poorvam Care in Electronic City is approximately 20 km from Marathahalli — around 35–45 minutes via the Outer Ring Road. We also offer convenient online teletherapy for families who prefer not to commute. Our RCI-licensed speech-language pathologists provide expert, personalised therapy for children with speech delays, autism, language disorders, and more.
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
                <p className="font-heading font-bold text-gray-900">Distance from Marathahalli</p>
                <p className="text-gray-600 font-body text-sm mt-1">Approximately 20 km via Outer Ring Road south or via Sarjapur Road</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Travel Time</p>
                <p className="text-gray-600 font-body text-sm mt-1">Around 35–45 minutes by car depending on traffic on ORR</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Wifi className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Teletherapy Available</p>
                <p className="text-gray-600 font-body text-sm mt-1">Online sessions for Marathahalli, Bellandur, and Sarjapur Road families</p>
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
                Trusted by Families from Marathahalli, Bellandur & the ORR Corridor
              </h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                <p>
                  The Marathahalli–Bellandur–Sarjapur Road corridor is one of Bangalore's fastest-growing residential zones, home to thousands of families working in the surrounding tech parks and IT campuses. Many of these families have discovered Poorvam Care as a trusted destination for speech therapy, early intervention, and developmental support for their children.
                </p>
                <p>
                  Families from Marathahalli Bridge and the Bellandur Lake area typically drive to our Electronic City centre via the Outer Ring Road. From Marathahalli, head south on ORR past the Bellandur flyover and continue towards Sarjapur Road Junction. From there, Hosur Road leads directly into Electronic City — our Hulimangala Road centre in EC Phase 1 is well-signposted. An alternative for families from the HAL area is to take Sarjapur Road south directly into Electronic City.
                </p>
                <p>
                  Poorvam Care's teletherapy programme has become especially popular with families along the Sarjapur Road and Outer Ring Road corridor, where peak-hour traffic can make a 20 km journey take considerably longer than expected. Our online sessions are conducted live via secure video call and are just as effective as in-person therapy for many speech and language goals. Parent coaching and detailed home activity guides are provided after every session, so your child's progress continues between appointments.
                </p>
                <p>
                  Our speech therapists work with children across a wide range of conditions, including early language delays, articulation and phonological disorders, autism-related communication challenges, fluency difficulties such as stuttering, and social communication disorders. We also provide assessment and therapy for children with cerebral palsy, Down syndrome, ADHD, and sensory processing difficulties. The initial assessment gives us a detailed picture of your child's strengths and areas to work on, and from there we build an individualised care plan with clear, achievable goals.
                </p>
                <p>
                  With RCI licensing, ISHA certification, 13 years of clinical experience, and more than 500 families helped across Bangalore, Poorvam Care has earned the trust of parents throughout South and East Bangalore. Whether you are in Marathahalli, Bellandur, Varthur, or along the Sarjapur Road corridor, we are here to support your child's communication journey — in person or online.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Trust badges */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">Why Marathahalli Families Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "RCI-licensed, ISHA-certified therapists",
                    "13+ years of clinical experience",
                    "500+ families served across Bangalore",
                    "Teletherapy — avoid the ORR commute",
                    "Multidisciplinary team under one roof",
                    "Parent training and home programme support",
                    "Flexible appointment times including evenings",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-body text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Route summary */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-base font-heading font-bold text-gray-900 mb-4">Route from Marathahalli to Poorvam Care</h3>
                <ol className="space-y-2">
                  {[
                    "Start at Marathahalli Bridge",
                    "Take Outer Ring Road south towards Bellandur",
                    "Continue past Sarjapur Road Junction",
                    "Join Hosur Road heading into Electronic City",
                    "Exit at Hulimangala Road — EC Phase 1",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-gray-600 font-body text-sm">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-heading font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <a
                  href="https://maps.app.goo.gl/gwKDYNhfzywxhvd5A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-blue-600 font-heading font-semibold text-sm hover:underline"
                >
                  Open in Google Maps <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Poorvam Care location — directions from Marathahalli"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d77.6608!3d12.8448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b0a2f7e2b2b%3A0x0!2sPoorvam+Care!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
              Our Therapy Services for Marathahalli Families
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Comprehensive early intervention and therapy — in-person in Electronic City and online via teletherapy
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
        title="Speech Therapy for Marathahalli — Common Questions"
        subtitle="Everything you need to know before booking your first appointment"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Your Child's Speech Therapy Journey Today
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Families from Marathahalli, Bellandur, and Sarjapur Road trust Poorvam Care for expert speech therapy — in person and online. Book a consultation today.
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
