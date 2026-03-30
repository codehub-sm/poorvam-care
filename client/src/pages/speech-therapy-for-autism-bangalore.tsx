import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const autismFAQs = [
  {
    question: "At what age should I start speech therapy for my child with autism?",
    answer: "Early intervention is most effective when started before age 3. Research shows that children with autism who receive speech therapy early have significantly better communication outcomes. At Poorvam Care, we work with children as young as 18 months.",
  },
  {
    question: "How many speech therapy sessions per week does a child with autism need?",
    answer: "Most children with autism benefit from 2–3 speech therapy sessions per week. The exact frequency depends on the severity of communication challenges, the child's age, and individual therapy goals. We create customized therapy plans based on each child's needs.",
  },
  {
    question: "Do you combine ABA therapy with speech therapy for autism?",
    answer: "Yes. At Poorvam Care, we offer integrated multi-disciplinary therapy. ABA (Applied Behaviour Analysis) can be combined with speech therapy to address both behavioural and communication goals simultaneously, leading to faster progress.",
  },
  {
    question: "What signs indicate my child with autism needs speech therapy?",
    answer: "Key signs include: not babbling by 12 months, no single words by 16 months, loss of previously acquired speech, difficulty understanding simple instructions, limited eye contact, repetitive language (echolalia), and difficulty with social communication or making friends.",
  },
];

export default function SpeechTherapyForAutism() {
  return (
    <>
      <SeoHead
        title="Speech Therapy for Autism in Bangalore | Poorvam Care, Electronic City"
        description="Specialized speech therapy for children with autism spectrum disorder in Electronic City, Bangalore. Led by Apoorva Rai, MASLP, 13+ years experience. ABA therapy, language development, and social communication support."
        canonical="https://poorvamcare.in/speech-therapy-for-autism-bangalore"
        keywords="speech therapy for autism Bangalore, autism speech therapy Electronic City, ASD therapy Bangalore, autism treatment for children Bangalore, speech delay autism therapy, ABA therapy Electronic City, best autism therapy near me Bommanahalli, autism speech therapy cost Bangalore, autism therapy Hosa Road, ABA therapy near me Kudlu Gate, autism therapy center HSR Layout, speech therapy for autism near me, autism treatment cost Bangalore, RCI registered autism therapist Bangalore, online speech therapy autism Bangalore"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Speech Therapy for Autism",
        description: "Specialized speech and language therapy for children with Autism Spectrum Disorder (ASD) in Electronic City, Bangalore. Includes ABA therapy, social communication training, and individualized language development programs.",
        url: "https://poorvamcare.in/speech-therapy-for-autism-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Speech Therapy for Autism", url: "https://poorvamcare.in/speech-therapy-for-autism-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Specialized Therapy · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Speech Therapy for Children with{" "}
              <span className="text-coral">Autism</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Helping children on the autism spectrum develop communication skills, social interaction, and language through evidence-based, individualized therapy programs.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding the Condition */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Understanding Autism & Speech Development
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Autism Spectrum Disorder (ASD) is a neurodevelopmental condition that affects communication, social interaction, and behaviour. Many children with autism experience speech and language delays — some may be non-verbal, while others may have difficulty with conversational skills, understanding abstract language, or reading social cues.
            </p>
            <p>
              Early speech therapy intervention for autism can significantly improve communication outcomes. Research consistently shows that children who receive therapy before age 5 make the greatest gains in language development, social communication, and overall adaptive behaviour.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Our Approach at Poorvam Care
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              At Poorvam Care, our autism speech therapy program is led by Apoorva Rai (MASLP), who has over 13 years of experience working with children on the spectrum. We use a combination of evidence-based approaches tailored to each child's unique communication profile.
            </p>
            <p>
              Our multi-disciplinary team integrates speech therapy with ABA (Applied Behaviour Analysis), occupational therapy, and special education to address the whole child — not just speech. This comprehensive approach ensures consistent progress across all developmental areas.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Parents Can Expect</h3>
          <ul className="space-y-3">
            {[
              "Comprehensive initial assessment to understand your child's communication strengths and challenges",
              "Individualized therapy plan with clear, measurable goals reviewed monthly",
              "Play-based and structured therapy sessions (45-60 minutes) designed to build language naturally",
              "Social communication groups to practise interaction with peers in a supportive setting",
              "ABA-integrated sessions for children who benefit from behavioural support alongside speech therapy",
              "Regular parent training sessions so you can reinforce progress at home",
              "Progress reports and video updates shared with parents every quarter",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Apoorva's Experience */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Why Choose Poorvam Care for Autism Therapy
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Apoorva Rai, our lead speech-language pathologist, holds a Master of Audiology and Speech-Language Pathology (MASLP) and is licensed by the Rehabilitation Council of India (RCI). With 13+ years of clinical experience, she has worked with hundreds of children on the autism spectrum, from minimally verbal toddlers to school-age children working on complex social communication.
            </p>
            <p>
              Our Electronic City centre is equipped with dedicated sensory-friendly therapy rooms, visual schedule systems, and augmentative communication tools — everything needed to create a comfortable, effective therapy environment for children with ASD.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={autismFAQs}
        title="Speech Therapy for Autism — FAQs"
        subtitle="Common questions from parents about autism therapy at Poorvam Care"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Get Started with a Free Consultation
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Every child's journey is different. Book a free consultation to discuss your child's needs and learn how our therapy team can help.
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
