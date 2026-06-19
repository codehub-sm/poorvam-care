import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Phone, ArrowRight, CheckCircle } from "lucide-react";

const faqs = [
  {
    question: "Is there a speech therapist near BTM Layout?",
    answer: "Poorvam Care in Electronic City is the nearest dedicated speech and language therapy centre for families in BTM Layout. Located approximately 7 km from BTM Layout Stage 1 and Stage 2, our centre is around 15–20 minutes by car via Silk Board Junction. Our team of RCI-licensed speech-language pathologists has more than 13 years of experience helping children with speech delays, language disorders, autism-related communication challenges, and stuttering.",
  },
  {
    question: "How do I reach Poorvam Care from BTM Layout?",
    answer: "From BTM Layout Stage 1 or Stage 2, take 6th Main Road towards Silk Board Junction. From Silk Board, join Hosur Road heading south towards Electronic City. Take the Hulimangala Road exit into EC Phase 1. Alternatively, you can use the Jayadeva flyover to reach Hosur Road more quickly from the 27th Cross area. Total drive time is approximately 15–20 minutes in normal traffic. You can also get directions via our Google Maps link on the contact page.",
  },
  {
    question: "Does Poorvam Care offer home visits to BTM Layout?",
    answer: "We do not currently offer in-home therapy visits, but we do provide teletherapy (online speech therapy) sessions that are an excellent option for families in BTM Layout who prefer to avoid the commute on some days. Our therapists conduct live video sessions using proven methods and supply home activity guides so your child's progress continues between centre visits. Speak to our team to find out if a blended in-person and teletherapy schedule would suit your child.",
  },
  {
    question: "What conditions are treated at Poorvam Care?",
    answer: "Poorvam Care treats a wide range of developmental and communication conditions, including speech sound disorders, expressive and receptive language delays, autism spectrum disorder (ASD), ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stuttering and fluency disorders, voice disorders, and feeding and swallowing difficulties in children. Our multidisciplinary team includes speech therapists, occupational therapists, ABA therapists, and special educators who work collaboratively to create individualised care plans.",
  },
];

const services = [
  { name: "Speech Therapy", href: "/speech-therapy", desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more." },
  { name: "Occupational Therapy", href: "/occupational-therapy", desc: "Sensory integration, fine motor skills, and activities of daily living." },
  { name: "ABA Therapy", href: "/aba-therapy", desc: "Evidence-based behavioural therapy for autism and developmental challenges." },
];

export default function SpeechTherapyBtmLayoutPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in BTM Layout Bangalore | Poorvam Care Electronic City"
        description="Speech therapy for children in BTM Layout, Bangalore. Poorvam Care in Electronic City is just 7km away. RCI-licensed therapists. Book a consultation."
        canonical="https://poorvamcare.in/speech-therapy-btm-layout"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care — Early Intervention & Therapy Centre",
          "description": "Speech therapy and early intervention services for families from BTM Layout, Bangalore",
          "url": "https://poorvamcare.in/speech-therapy-btm-layout",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hulimangala Road, Electronic City Phase 1",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560100",
            "addressCountry": "IN",
          },
          "areaServed": ["BTM Layout", "BTM Layout Stage 1", "BTM Layout Stage 2", "Madiwala"],
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Speech Therapy BTM Layout", url: "https://poorvamcare.in/speech-therapy-btm-layout" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Serving Families from BTM Layout
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy in{" "}
              <span className="text-blue-600">BTM Layout</span>, Bangalore
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Poorvam Care in Electronic City is just 7 km from BTM Layout — approximately 15–20 minutes via Silk Board Junction. Our RCI-licensed speech-language pathologists provide expert therapy for children with speech delays, autism, language disorders, and more. Book a consultation today.
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
                <p className="font-heading font-bold text-gray-900">Distance from BTM Layout</p>
                <p className="text-gray-600 font-body text-sm mt-1">Approximately 7 km via Silk Board Junction and Hosur Road</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Travel Time</p>
                <p className="text-gray-600 font-body text-sm mt-1">Around 15–20 minutes by car under normal traffic conditions</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Teletherapy Available</p>
                <p className="text-gray-600 font-body text-sm mt-1">Online speech therapy sessions from your BTM Layout home</p>
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
                Trusted by Families Across BTM Layout
              </h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                <p>
                  Poorvam Care has been supporting children and families from BTM Layout Stage 1 and Stage 2 for many years. Parents from neighbourhoods including 6th Main, the AECS Layout area, Madiwala, and the 29th Cross residential blocks have made us their trusted therapy partner for early intervention and speech-language services.
                </p>
                <p>
                  Getting to our Electronic City centre from BTM Layout is quick and straightforward. The most popular route for BTM families is via 6th Main Road to Silk Board Junction, then south along Hosur Road. Families from the northern parts of BTM often find the Jayadeva flyover a convenient shortcut to Hosur Road. Our centre on Hulimangala Road in EC Phase 1 is well-signposted from the main Hosur Road corridor.
                </p>
                <p>
                  Speech therapy for young children delivers the best outcomes when started early. If you have noticed that your toddler is not meeting speech milestones — or if your school-age child is struggling with articulation, comprehension, or social communication — a professional assessment at Poorvam Care is the right first step. Our speech-language pathologists carry RCI registration and have helped hundreds of children from BTM Layout and surrounding areas achieve meaningful communication progress.
                </p>
                <p>
                  At Poorvam Care, no two therapy plans are alike. After a thorough initial assessment, our therapist creates goals specific to your child's strengths and areas of difficulty. Therapy sessions are play-based and engaging for younger children, while older children benefit from structured language and literacy activities. Parent coaching is built into every programme so that the progress made in the clinic continues at home in BTM Layout.
                </p>
                <p>
                  We also serve families from Madiwala and the surrounding areas. Whether your child needs intensive weekly sessions or a lighter fortnightly schedule with teletherapy top-ups, we will work with you to design a plan that fits your family's routine. With over 500 families helped across Bangalore and 13 years of experience, Poorvam Care is the speech therapy centre that BTM Layout parents recommend to each other.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Trust badges */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">Why BTM Layout Families Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "RCI-licensed, ISHA-certified therapists",
                    "13+ years of clinical experience",
                    "500+ families served across Bangalore",
                    "Play-based, child-friendly therapy rooms",
                    "Multidisciplinary team under one roof",
                    "Parent training and home programme support",
                    "Teletherapy available for flexibility",
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
                  title="Poorvam Care location — directions from BTM Layout"
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
              Our Therapy Services for BTM Layout Families
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
        title="Speech Therapy for BTM Layout — Common Questions"
        subtitle="Everything you need to know before booking your first appointment"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Your Child's Speech Therapy Journey Today
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Families from BTM Layout trust Poorvam Care for expert, compassionate speech therapy. Book a consultation and let us create a personalised plan for your child.
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
