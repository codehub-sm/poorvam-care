import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle, MapPin, Clock, Phone } from "lucide-react";

const hsrFAQs = [
  {
    question: "Is there a good child therapy center near HSR Layout, Bangalore?",
    answer: "Yes. Poorvam Care in Electronic City is one of the most trusted child therapy centres near HSR Layout. Located just 15 minutes away, we offer speech therapy, occupational therapy, ABA therapy, special education, and therapeutic enrichment. Our team is led by Apoorva Rai (MASLP, RCI Licensed) with 13+ years of experience.",
  },
  {
    question: "How far is Poorvam Care from HSR Layout?",
    answer: "Poorvam Care's Electronic City Phase 1 centre is approximately 6–8 km from HSR Layout, which is about a 15-minute drive via Bommanahalli and Hosur Road. Many of our families travel from HSR Layout, Koramangala, and BTM Layout for our specialized multi-disciplinary therapy services.",
  },
  {
    question: "What therapies do you offer for children near HSR Layout?",
    answer: "We offer comprehensive child development services including speech therapy (for autism, speech delay, articulation disorders), occupational therapy (sensory integration, fine motor skills), ABA therapy (applied behaviour analysis), special education (IEP-based), parent counselling, and therapeutic enrichment programs. All services are available at our Electronic City centres.",
  },
  {
    question: "Do you offer online therapy for families in HSR Layout?",
    answer: "Yes. For families who prefer not to travel, we offer online speech therapy and parent counselling sessions. However, we recommend in-person sessions for occupational therapy and ABA therapy as they require hands-on interaction. Contact us to discuss the best option for your child.",
  },
  {
    question: "Why do parents from HSR Layout choose Poorvam Care?",
    answer: "Parents from HSR Layout choose Poorvam Care because we offer a multi-disciplinary approach under one roof — speech therapy, OT, ABA, and special education work together for each child. Our experienced team, individualized therapy plans, sensory-friendly facilities, and transparent progress reporting make us a trusted choice for families across south Bangalore.",
  },
];

export default function ChildTherapyHSRLayout() {
  return (
    <>
      <SeoHead
        title="Child Therapy Near HSR Layout, Bangalore | Poorvam Care"
        description="Best child therapy center near HSR Layout, Bangalore. Speech therapy, occupational therapy, ABA therapy, and special education. Just 15 min from HSR Layout. Led by Apoorva Rai, MASLP, 13+ years experience. Call +91 88617 64343 to book."
        canonical="https://poorvamcare.in/child-therapy-hsr-layout-bangalore"
        keywords="child therapy HSR Layout, speech therapy near HSR Layout, occupational therapy HSR Layout Bangalore, therapy center near HSR Layout, speech therapist HSR Layout, ABA therapy near HSR Layout, child development center HSR Layout, best therapy center near HSR Layout Bangalore, speech therapy Bommanahalli, child therapy Koramangala, therapy near BTM Layout, autism therapy HSR Layout, speech delay therapy near HSR Layout, pediatric therapy south Bangalore"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Child Therapy Services Near HSR Layout",
        description: "Comprehensive child therapy services near HSR Layout, Bangalore. Speech therapy, occupational therapy, ABA therapy, and special education at Poorvam Care, Electronic City — just 15 minutes from HSR Layout.",
        url: "https://poorvamcare.in/child-therapy-hsr-layout-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Child Therapy Near HSR Layout", url: "https://poorvamcare.in/child-therapy-hsr-layout-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              15 Minutes from HSR Layout · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Child Therapy Near{" "}
              <span className="text-coral">HSR Layout</span>, Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Comprehensive speech therapy, occupational therapy, ABA therapy, and special education for children — trusted by families across HSR Layout, Koramangala, BTM Layout, and south Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 bg-warm-bg rounded-xl">
              <MapPin className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-brown-deep mb-1">Location</h3>
                <p className="text-brown-mid text-sm font-body">Electronic City Phase 1 & 2, just 15 min from HSR Layout via Bommanahalli</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-warm-bg rounded-xl">
              <Clock className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-brown-deep mb-1">Hours</h3>
                <p className="text-brown-mid text-sm font-body">Mon–Fri: 9 AM – 6 PM<br />Saturday: 9 AM – 2 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-warm-bg rounded-xl">
              <Phone className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-heading font-bold text-brown-deep mb-1">Contact</h3>
                <p className="text-brown-mid text-sm font-body">
                  <a href="tel:+918861764343" className="hover:text-coral transition-colors">+91 886 176 4343</a><br />
                  Call to book a consultation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents from HSR Choose Us */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Why Parents from HSR Layout Choose Poorvam Care
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Many families in HSR Layout, Koramangala, and BTM Layout travel to Poorvam Care in Electronic City because of our unique multi-disciplinary approach. Unlike standalone speech therapy clinics, we bring together speech therapists, occupational therapists, ABA therapists, and special educators under one roof — working as a coordinated team for your child.
            </p>
            <p>
              Our Electronic City centres are an easy 15-minute drive from HSR Layout via Bommanahalli and Hosur Road. Parents appreciate the convenience of having all their child's therapies at one location, with a team that communicates daily to ensure consistent progress across all developmental areas.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Sets Us Apart</h3>
          <ul className="space-y-3">
            {[
              "Multi-disciplinary team: speech therapy, OT, ABA, and special education working together",
              "Led by Apoorva Rai (MASLP, RCI Licensed) with 13+ years of clinical experience",
              "Individualized therapy plans with clear, measurable goals reviewed monthly",
              "Sensory-friendly, child-centred therapy environments at both centres",
              "Regular parent training so you can reinforce progress at home",
              "Transparent progress reporting with quarterly reviews and video updates",
              "Trusted by 900+ families across south Bangalore",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Our Therapy Services
          </h2>
          <p className="text-brown-mid font-body leading-relaxed mb-8">
            We offer comprehensive child development services for children aged 2–14 with autism, speech delay, ADHD, developmental delays, and other conditions.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/speech-therapy-for-autism-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Speech Therapy for Autism</h3>
              <p className="text-brown-mid text-sm font-body">Communication, social language, and verbal skills for children on the autism spectrum.</p>
            </Link>
            <Link href="/speech-therapy-for-speech-delay-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Speech Delay Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Helping late talkers develop language and verbal communication skills.</p>
            </Link>
            <Link href="/occupational-therapy-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Occupational Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Sensory integration, fine motor skills, self-care, and daily living activities.</p>
            </Link>
            <Link href="/aba-therapy-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">ABA Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Applied behaviour analysis for skill building and behaviour management.</p>
            </Link>
            <Link href="/special-education-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Special Education</h3>
              <p className="text-brown-mid text-sm font-body">Individualized education plans for children with learning differences.</p>
            </Link>
            <Link href="/therapeutic-enrichment" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Therapeutic Enrichment</h3>
              <p className="text-brown-mid text-sm font-body">Art therapy, music therapy, sensory play, and social skills groups.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Getting to Poorvam Care from HSR Layout
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Our Electronic City Phase 1 centre is located on Hulimangla Road, near Westside and Sai Baba Temple Road. From HSR Layout, the most convenient route is via Bommanahalli and Hosur Road — approximately 6–8 km, taking about 15 minutes by car.
            </p>
            <p>
              We also serve families from nearby areas including:
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              "HSR Layout",
              "Koramangala",
              "BTM Layout",
              "Bommanahalli",
              "Kudlu Gate",
              "Hosa Road",
              "Singasandra",
              "Hongasandra",
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 p-3 bg-white rounded-lg">
                <MapPin className="w-4 h-4 text-coral flex-shrink-0" />
                <span className="text-brown-mid text-sm font-body">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection
        faqs={hsrFAQs}
        title="Child Therapy Near HSR Layout — FAQs"
        subtitle="Common questions from HSR Layout parents about therapy at Poorvam Care"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Book a Consultation
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Just 15 minutes from HSR Layout. Visit our Electronic City centre or start with a phone consultation to discuss your child's needs.
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
