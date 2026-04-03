import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const abaFAQs = [
  {
    question: "What is ABA therapy and how does it help children?",
    answer: "ABA (Applied Behaviour Analysis) is an evidence-based therapy that uses positive reinforcement to teach new skills and reduce challenging behaviours. It helps children with autism, ADHD, and other developmental conditions improve communication, social skills, self-care, and academic readiness through structured, measurable interventions.",
  },
  {
    question: "At what age should a child start ABA therapy?",
    answer: "ABA therapy is most effective when started early, ideally between ages 2 and 5. However, children of all ages can benefit. At Poorvam Care, we work with children aged 2–14 and customize the intensity and approach based on the child's developmental stage and individual needs.",
  },
  {
    question: "How many hours of ABA therapy does my child need per week?",
    answer: "The recommended hours depend on your child's needs. Some children benefit from 10–15 hours per week, while others may need 20–25 hours for intensive intervention. At Poorvam Care, we assess each child individually and recommend a therapy schedule that balances effectiveness with the family's routine.",
  },
  {
    question: "Does Poorvam Care combine ABA therapy with other therapies?",
    answer: "Yes. Our multi-disciplinary approach integrates ABA therapy with speech therapy, occupational therapy, and special education. This combined approach addresses communication, sensory processing, motor skills, and behaviour simultaneously, leading to more comprehensive and faster progress.",
  },
  {
    question: "How much does ABA therapy cost in Bangalore?",
    answer: "ABA therapy costs at Poorvam Care vary based on the number of sessions and intensity of the program. We offer flexible session packages to suit different budgets. Contact us for a free consultation where we can discuss your child's needs and provide a detailed cost estimate.",
  },
];

export default function ABATherapyForChildren() {
  return (
    <>
      <SeoHead
        title="ABA Therapy for Children in Bangalore | Poorvam Care, Electronic City"
        description="Evidence-based ABA (Applied Behaviour Analysis) therapy for children with autism and developmental conditions in Electronic City, Bangalore. Led by experienced therapists. Multi-disciplinary approach with speech therapy and OT integration."
        canonical="https://poorvamcare.in/aba-therapy-for-children-bangalore"
        keywords="ABA therapy Bangalore, ABA therapy for children, applied behaviour analysis Electronic City, ABA therapy near me, ABA therapy cost Bangalore, ABA therapy for autism Bangalore, behavioural therapy for children Electronic City, ABA therapy center Bommanahalli, best ABA therapy Hosa Road, ABA therapy Kudlu Gate, applied behaviour analysis near me, ABA therapy HSR Layout, child behaviour therapy Bangalore, RCI registered ABA therapist"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "ABA Therapy for Children",
        description: "Evidence-based Applied Behaviour Analysis (ABA) therapy for children with autism, ADHD, and developmental conditions in Electronic City, Bangalore. Integrated with speech therapy, occupational therapy, and special education.",
        url: "https://poorvamcare.in/aba-therapy-for-children-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "ABA Therapy for Children", url: "https://poorvamcare.in/aba-therapy-for-children-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Evidence-Based Therapy · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              ABA Therapy for{" "}
              <span className="text-coral">Children</span> in Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Helping children build essential life skills through Applied Behaviour Analysis — a proven, structured approach to improving communication, social interaction, and adaptive behaviours.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding ABA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            What Is ABA Therapy?
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Applied Behaviour Analysis (ABA) is a scientifically validated therapy approach widely recognized as one of the most effective treatments for children with Autism Spectrum Disorder (ASD) and other developmental conditions. ABA uses systematic techniques based on learning theory to teach new skills and reduce behaviours that interfere with learning and daily functioning.
            </p>
            <p>
              Unlike a one-size-fits-all approach, ABA therapy is highly individualized. Each child's program is built around their unique strengths, challenges, and goals — whether that's improving verbal communication, developing self-care skills, learning to follow instructions, or building social relationships with peers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Our ABA Therapy Approach at Poorvam Care
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              At Poorvam Care, we integrate ABA therapy within our multi-disciplinary framework. Our trained behaviour therapists work alongside speech-language pathologists, occupational therapists, and special educators to deliver a holistic therapy program that addresses the whole child.
            </p>
            <p>
              We use a combination of Discrete Trial Training (DTT), Natural Environment Teaching (NET), and Pivotal Response Training (PRT) to keep sessions engaging while maintaining structured learning objectives. Every session is data-driven — we track progress meticulously to ensure your child is meeting their goals.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Our ABA Program Includes</h3>
          <ul className="space-y-3">
            {[
              "Comprehensive functional behaviour assessment (FBA) to identify target behaviours and skill gaps",
              "Individualized behaviour intervention plan (BIP) with measurable, achievable goals",
              "Structured one-on-one sessions (45–60 minutes) using positive reinforcement strategies",
              "Social skills training in small group settings to practise peer interaction",
              "Integration with speech therapy and OT for children with multiple developmental needs",
              "Parent training sessions to help you implement ABA strategies consistently at home",
              "Monthly progress reports with data-driven insights on your child's development",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Conditions We Address with ABA Therapy
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Our ABA therapy program supports children diagnosed with a range of developmental and behavioural conditions:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 mt-4">
              {[
                "Autism Spectrum Disorder (ASD)",
                "Attention Deficit Hyperactivity Disorder (ADHD)",
                "Developmental Delays",
                "Oppositional Defiant Disorder (ODD)",
                "Sensory Processing Difficulties",
                "Learning Disabilities",
              ].map((condition) => (
                <li key={condition} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-sage flex-shrink-0" />
                  <span>{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why Poorvam */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Why Choose Poorvam Care for ABA Therapy in Bangalore
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Poorvam Care is one of the few centres in Electronic City, Bangalore that offers ABA therapy as part of an integrated multi-disciplinary program. Our team, led by Apoorva Rai (MASLP, RCI Licensed), brings over 13 years of clinical experience working with children on the autism spectrum and other developmental conditions.
            </p>
            <p>
              Our two centres in Electronic City Phase 1 and Phase 2 are equipped with structured therapy rooms, visual schedule systems, and sensory-friendly environments — designed specifically for children who need ABA intervention. We serve families from across south Bangalore, including Bommanahalli, HSR Layout, Hosa Road, Kudlu Gate, and Singasandra.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Link href="/electronic-city-phase-1" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-warm-gray-100">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Electronic City Phase 1</h3>
              <p className="text-brown-mid text-sm font-body">Hulimangla Road, Near Westside & Sai Baba Temple Road</p>
            </Link>
            <Link href="/electronic-city-phase-2" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-warm-gray-100">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Electronic City Phase 2</h3>
              <p className="text-brown-mid text-sm font-body">Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Related Services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/speech-therapy-for-autism-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Speech Therapy for Autism</h3>
              <p className="text-brown-mid text-sm font-body">Specialized speech and language therapy for children on the spectrum.</p>
            </Link>
            <Link href="/occupational-therapy-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Occupational Therapy</h3>
              <p className="text-brown-mid text-sm font-body">Sensory integration, fine motor skills, and daily living activities.</p>
            </Link>
            <Link href="/special-education-for-children-bangalore" className="block p-6 bg-warm-bg rounded-xl hover:shadow-md transition-shadow">
              <h3 className="font-heading font-bold text-brown-deep mb-2">Special Education</h3>
              <p className="text-brown-mid text-sm font-body">Individualized education plans for children with learning differences.</p>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={abaFAQs}
        title="ABA Therapy — Frequently Asked Questions"
        subtitle="Common questions from parents about ABA therapy at Poorvam Care"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Start Your Child's ABA Therapy Journey
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Book a free consultation to discuss your child's needs and learn how ABA therapy can help them reach their full potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
            >
              Book Free Consultation
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
