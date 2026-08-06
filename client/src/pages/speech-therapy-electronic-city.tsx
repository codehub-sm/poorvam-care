import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema, organizationSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { CentreMaps, ReviewSnippets } from "@/components/local-proof";
import { Link } from "wouter";
import { CheckCircle, MapPin, Phone } from "lucide-react";

const ecFAQs = [
  {
    question: "Where is the best speech therapy center in Electronic City?",
    answer: "Poorvam Care operates two centres in Electronic City — Phase 1 (Hulimangla Road, near Westside & Sai Baba Temple Road) and Phase 2 (Ananth Nagar, above Bata Showroom). Both centres offer comprehensive speech therapy, occupational therapy, ABA therapy, and special education, led by Apoorva Rai (MASLP) with 13+ years of experience.",
  },
  {
    question: "What speech therapy services are available in Electronic City?",
    answer: "At our Electronic City centres, we offer speech therapy for autism, speech delay, articulation disorders, stuttering/fluency issues, language development, and social communication challenges. We also provide occupational therapy, ABA therapy, special education, and therapeutic enrichment programs — all under one roof.",
  },
  {
    question: "How far is Poorvam Care from major areas near Electronic City?",
    answer: "Our Electronic City Phase 1 centre is 5-10 minutes from Bommanahalli and Hosa Road, 15 minutes from HSR Layout and Kudlu Gate, and 10 minutes from Singasandra and Hongasandra. Our Phase 2 centre is easily accessible from Ananth Nagar, Neeladri Nagar, Doddathogur, and Chandapura.",
  },
  {
    question: "Do you offer a consultation for speech therapy in Electronic City?",
    answer: "Yes. We offer an initial consultation at both our Electronic City centres. During this session, our team will observe your child, discuss your concerns, and recommend an appropriate assessment and therapy plan. You can book a consultation by calling +91 88617 64343 or through our website.",
  },
  {
    question: "What are the fees for speech therapy in Electronic City, Bangalore?",
    answer: "Speech therapy fees at Poorvam Care vary based on the type and frequency of sessions. We offer flexible session packages to accommodate different budgets. Contact us for a consultation where we can discuss your child's specific needs and provide a detailed cost estimate.",
  },
];

export default function SpeechTherapyElectronicCity() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Electronic City, Bangalore | Poorvam Care"
        description="Speech therapy in Electronic City, Bangalore — two centres in Phase 1 & Phase 2 for autism, speech delay & articulation disorders. Led by Apoorva Rai, MASLP (13+ yrs). Call +91 88617 64343 to book."
        canonical="https://poorvamcare.in/speech-therapy-electronic-city"
        keywords="speech therapy Electronic City, speech therapist near Electronic City, best speech therapy center Electronic City Bangalore, speech therapy near me Electronic City Phase 1, speech therapy Electronic City Phase 2, speech therapy Bommanahalli, speech therapist Hosa Road, speech therapy cost Electronic City, child speech therapy Electronic City, speech delay treatment Electronic City, speech therapy near Ananth Nagar, speech therapy Neeladri Nagar, best speech therapist south Bangalore"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Speech Therapy in Electronic City",
        description: "Comprehensive speech and language therapy services at two centres in Electronic City Phase 1 and Phase 2, Bangalore. Specializing in speech therapy for autism, speech delay, articulation disorders, and language development for children aged 2–14.",
        url: "https://poorvamcare.in/speech-therapy-electronic-city",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Speech Therapy in Electronic City", url: "https://poorvamcare.in/speech-therapy-electronic-city" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Two Centres · Electronic City Phase 1 & Phase 2
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Speech Therapy in{" "}
              <span className="text-coral">Electronic City</span>, Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Trusted by 900+ families across south Bangalore. Comprehensive speech and language therapy for children at two convenient locations in Electronic City.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+918861764343"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-coral text-white font-heading font-semibold rounded-full hover:bg-coral/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call +91 88617 64343
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-warm-bg font-heading font-semibold rounded-full border border-warm-bg/30 hover:bg-white/20 transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-8">
            Our Electronic City Centres
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/electronic-city-phase-1" className="block p-8 bg-warm-bg rounded-2xl hover:shadow-lg transition-shadow border border-warm-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-coral" />
                <h3 className="text-xl font-heading font-bold text-brown-deep">Phase 1 Centre</h3>
              </div>
              <p className="text-brown-mid font-body mb-3">Hulimangla Road, Near Westside & Sai Baba Temple Road, Electronic City Phase 1</p>
              <p className="text-sm text-brown-mid/70 font-body">Mon–Fri: 9 AM – 6 PM · Sat: 9 AM – 2 PM</p>
            </Link>
            <Link href="/electronic-city-phase-2" className="block p-8 bg-warm-bg rounded-2xl hover:shadow-lg transition-shadow border border-warm-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-coral" />
                <h3 className="text-xl font-heading font-bold text-brown-deep">Phase 2 Centre</h3>
              </div>
              <p className="text-brown-mid font-body mb-3">Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Electronic City Phase 2</p>
              <p className="text-sm text-brown-mid/70 font-body">Mon–Fri: 9 AM – 6 PM · Sat: 9 AM – 2 PM</p>
            </Link>
          </div>
        </div>
      </section>

      <CentreMaps heading="Find Our Electronic City Centres" />

      {/* Services */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Speech & Language Services at Our Electronic City Centres
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Both our Electronic City centres offer the full range of Poorvam Care's speech and language therapy services. Whether your child needs help with early language development, articulation, social communication, or overcoming speech delays related to autism or other developmental conditions, our experienced team is here to help.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              { title: "Speech Therapy for Autism", link: "/speech-therapy-for-autism-bangalore", desc: "Communication and social language support for children on the spectrum" },
              { title: "Speech Delay Therapy", link: "/speech-therapy-for-speech-delay-bangalore", desc: "Helping late talkers develop language skills and verbal communication" },
              { title: "Articulation Therapy", link: "/child-development", desc: "Correcting speech sound errors for clearer, more confident communication" },
              { title: "Language Development", link: "/child-development", desc: "Building vocabulary, sentence structure, and comprehension skills" },
              { title: "Fluency / Stuttering Therapy", link: "/child-development", desc: "Strategies to improve speech flow and reduce disfluencies" },
              { title: "Social Communication Training", link: "/child-development", desc: "Peer interaction, conversational skills, and pragmatic language" },
            ].map((service) => (
              <Link key={service.title} href={service.link} className="flex items-start gap-3 p-4 bg-white rounded-xl hover:shadow-sm transition-shadow">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-heading font-bold text-brown-deep text-sm">{service.title}</h3>
                  <p className="text-brown-mid text-sm font-body mt-1">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-disciplinary */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            More Than Speech Therapy — A Complete Therapy Centre
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Poorvam Care is not just a speech therapy centre — we're a multi-disciplinary early intervention centre. In addition to speech therapy, our Electronic City centres offer occupational therapy, ABA (Applied Behaviour Analysis), special education, parent counselling, and therapeutic enrichment programs. This means your child can receive all their therapies under one roof, with a coordinated team working towards shared goals.
            </p>
            <p>
              Our team is led by Apoorva Rai, who holds a Master of Audiology and Speech-Language Pathology (MASLP) and is licensed by the Rehabilitation Council of India (RCI). With over 13 years of clinical experience, she has helped hundreds of children across south Bangalore improve their communication and developmental outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Serving Families Across South Bangalore
          </h2>
          <p className="text-brown-mid font-body leading-relaxed mb-6">
            Our Electronic City centres are conveniently located for families across these neighbourhoods:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Electronic City Phase 1",
              "Electronic City Phase 2",
              "Bommanahalli",
              "Hosa Road",
              "HSR Layout",
              "Kudlu Gate",
              "Singasandra",
              "Hongasandra",
              "Ananth Nagar",
              "Neeladri Nagar",
              "Doddathogur",
              "Chandapura",
              "Konanakunte",
              "Hulimangala",
              "Konappana Agrahara",
              "Kammasandra",
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
                <span className="text-brown-mid text-sm font-body">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewSnippets />

      <FAQSection
        faqs={ecFAQs}
        title="Speech Therapy in Electronic City — FAQs"
        subtitle="Common questions about our Electronic City speech therapy centres"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Visit Our Electronic City Centre
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Book a consultation at either of our Electronic City locations. Walk-ins welcome during business hours.
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
              Call: +91 88617 64343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
