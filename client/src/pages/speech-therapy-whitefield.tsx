import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Wifi, ArrowRight, CheckCircle, Video } from "lucide-react";

const faqs = [
  {
    question: "Is there a speech therapist near Whitefield?",
    answer: "While there are some general clinics in Whitefield, Poorvam Care in Electronic City is a dedicated early intervention and speech therapy centre with RCI-licensed, ISHA-certified therapists and over 13 years of experience. For Whitefield families, we strongly recommend our teletherapy (online speech therapy) service, which delivers the same high-quality, personalised therapy your child would receive in our centre — without the long commute. In-person visits are also welcome for assessments and intensive blocks.",
  },
  {
    question: "Is online speech therapy available for Whitefield families?",
    answer: "Absolutely. Poorvam Care's teletherapy programme is specifically designed for families in areas like Whitefield who would otherwise face a long commute to Electronic City. Our therapists conduct live, interactive video sessions tailored to your child's therapy goals. We provide detailed home activity guides, regular progress updates, and parent coaching — all online. Teletherapy at Poorvam Care is particularly popular among Whitefield's IT community, where parents value flexibility and high standards of professional care.",
  },
  {
    question: "How far is Poorvam Care from Whitefield?",
    answer: "Poorvam Care is approximately 30 km from Whitefield. The most practical route is via the Outer Ring Road (ORR) south to Marathahalli, then continuing on ORR towards Sarjapur Road and Electronic City. In normal traffic, this journey takes around 50–60 minutes. Given the distance, we recommend our teletherapy service for regular weekly sessions, with in-person visits reserved for initial assessments, detailed progress reviews, or intensive therapy blocks.",
  },
  {
    question: "What conditions does Poorvam Care treat?",
    answer: "Poorvam Care provides therapy for speech sound disorders, expressive and receptive language delays, autism spectrum disorder (ASD), ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stuttering, voice disorders, and childhood feeding or swallowing challenges. Our multidisciplinary team includes speech-language pathologists, occupational therapists, ABA therapists, and special educators. All services are available both in-person at our Electronic City centre and via our online teletherapy platform.",
  },
];

const services = [
  { name: "Speech Therapy", href: "/speech-therapy", desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more." },
  { name: "Occupational Therapy", href: "/occupational-therapy", desc: "Sensory integration, fine motor skills, and activities of daily living." },
  { name: "ABA Therapy", href: "/aba-therapy", desc: "Evidence-based behavioural therapy for autism and developmental challenges." },
];

export default function SpeechTherapyWhitefieldPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Whitefield Bangalore | Poorvam Care Electronic City"
        description="Expert speech therapy for children from Whitefield, Bangalore. Poorvam Care in Electronic City is 30km away. Teletherapy also available. Book free consult."
        canonical="https://poorvamcare.in/speech-therapy-whitefield"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care — Early Intervention & Therapy Centre",
          "description": "Speech therapy and early intervention services for families from Whitefield, Bangalore — in-person and online teletherapy available",
          "url": "https://poorvamcare.in/speech-therapy-whitefield",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hulimangala Road, Electronic City Phase 1",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "postalCode": "560100",
            "addressCountry": "IN",
          },
          "areaServed": ["Whitefield", "ITPL", "Varthur", "Mahadevapura"],
          "openingHours": ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Speech Therapy Whitefield", url: "https://poorvamcare.in/speech-therapy-whitefield" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Serving Families from Whitefield — In-Person & Online
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy for{" "}
              <span className="text-blue-600">Whitefield</span> Families
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Poorvam Care is Bangalore's trusted early intervention and speech therapy centre. For families in Whitefield, we offer a convenient online teletherapy programme — expert, personalised therapy without the long commute. In-person sessions at our Electronic City centre are also available for assessments and intensive therapy blocks.
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

      {/* Teletherapy highlight banner */}
      <section className="py-8 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 flex-shrink-0" />
              <p className="font-heading font-semibold text-lg">
                Teletherapy — The Ideal Option for Whitefield Families
              </p>
            </div>
            <p className="font-body text-white/90 text-sm md:text-base md:max-w-md text-center md:text-right">
              Skip the 50-minute commute. Get the same expert speech therapy from Poorvam Care delivered live via video — flexible, effective, and from the comfort of your home.
            </p>
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
                <p className="font-heading font-bold text-gray-900">Distance from Whitefield</p>
                <p className="text-gray-600 font-body text-sm mt-1">Approximately 30 km via Outer Ring Road → Marathahalli → Electronic City</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Travel Time (In-Person)</p>
                <p className="text-gray-600 font-body text-sm mt-1">Around 50–60 minutes by car depending on traffic on ORR</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
              <Wifi className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Recommended: Teletherapy</p>
                <p className="text-gray-600 font-body text-sm mt-1">Live online sessions — expert therapy without the commute from Whitefield</p>
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
                Expert Speech Therapy for Whitefield Children — Online and In-Person
              </h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                <p>
                  Whitefield has grown into one of Bangalore's most important residential and technology hubs. Families in ITPL, Varthur, Whitefield Main Road, and Mahadevapura are well-connected to Bangalore's IT ecosystem but often face challenging commutes when seeking specialist healthcare. Poorvam Care has designed a solution specifically for this: a comprehensive teletherapy programme that brings expert speech and language therapy directly to your home.
                </p>
                <p>
                  For most Whitefield families, online teletherapy is the most practical and efficient way to access Poorvam Care's services. Our therapists conduct live video sessions using secure, child-friendly platforms. Sessions are engaging and interactive — your child will not know the difference from a face-to-face visit, and research increasingly confirms that teletherapy delivers outcomes comparable to in-person therapy for many speech and language goals.
                </p>
                <p>
                  Many parents working in the IT parks around ITPL, Varthur Road, and Whitefield Main Road have told us that the flexibility of teletherapy transformed their family's ability to maintain consistent therapy. Weekly online sessions can be scheduled around school timetables, work meetings, and other commitments — making it far more sustainable than a 50–60 minute commute each way on the Outer Ring Road.
                </p>
                <p>
                  For families who do prefer in-person visits — for an initial assessment, a detailed progress review, or an intensive therapy block — we welcome you at our Electronic City centre. The recommended route from Whitefield is via the Outer Ring Road south to Marathahalli Bridge, continuing on ORR past Sarjapur Road Junction, then joining Hosur Road into Electronic City. Our centre is on Hulimangala Road in EC Phase 1.
                </p>
                <p>
                  Poorvam Care holds RCI registration and ISHA certification, and our therapists bring over 13 years of clinical experience working with children across Bangalore. Whether your child is a late talker, has been diagnosed with autism, or is navigating a more complex communication challenge, our team will create an individualised plan that meets your child exactly where they are — and from wherever you are in Whitefield.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Trust badges */}
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">Why Whitefield Families Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "Online teletherapy — no commute needed",
                    "RCI-licensed, ISHA-certified therapists",
                    "13+ years of clinical experience",
                    "500+ families served across Bangalore",
                    "Flexible scheduling around work and school",
                    "In-person assessments available at EC centre",
                    "Parent coaching and home activity plans",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-700 font-body text-sm">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* How teletherapy works */}
              <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">How Teletherapy Works</h3>
                <ol className="space-y-3">
                  {[
                    "Book a free online consultation with our team",
                    "Your child is assessed via video call",
                    "We design a personalised therapy plan",
                    "Weekly live sessions with your therapist",
                    "Home activity guides after every session",
                    "Monthly progress reviews and goal updates",
                  ].map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-gray-700 font-body text-sm">
                      <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-heading font-bold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Map embed */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title="Poorvam Care location — directions from Whitefield"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d77.6608!3d12.8448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b0a2f7e2b2b%3A0x0!2sPoorvam+Care!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="240"
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
              Our Therapy Services for Whitefield Families
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              All services available online via teletherapy, and in-person at our Electronic City centre
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
        title="Speech Therapy for Whitefield — Common Questions"
        subtitle="Everything you need to know about in-person and online therapy options"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Expert Speech Therapy — From Whitefield, Without the Drive
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a consultation today and discover how Poorvam Care's teletherapy programme can help your child achieve real communication progress — wherever you are in Whitefield.
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
