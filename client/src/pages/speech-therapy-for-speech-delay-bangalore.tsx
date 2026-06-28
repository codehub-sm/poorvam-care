import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, createServiceSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const speechDelayFAQs = [
  {
    question: "My toddler is not talking yet — is that normal?",
    answer: "While all children develop at different rates, most toddlers say their first words by 12–18 months and combine words by age 2. If your child is not babbling by 12 months or not using words by 18 months, it's worth getting a professional evaluation. Early intervention for speech delay produces the best outcomes.",
  },
  {
    question: "What causes speech delay in children?",
    answer: "Speech delay can be caused by hearing problems, oral-motor issues, developmental conditions (like autism or ADHD), lack of stimulation, premature birth, or it can be idiopathic (no clear cause). A speech-language pathologist can help identify the underlying cause and create an appropriate therapy plan.",
  },
  {
    question: "How long does speech therapy take for speech delay?",
    answer: "The duration varies based on the severity of the delay and the child's age. Many children with mild speech delay show significant improvement within 3–6 months of consistent therapy (2–3 sessions per week). More complex cases may require longer-term support. We conduct regular assessments to track progress.",
  },
  {
    question: "Do you offer speech therapy for toddlers under 2 years old?",
    answer: "Yes. At Poorvam Care, we provide early intervention speech therapy for children as young as 12–18 months. For very young children, therapy is play-based and involves extensive parent coaching so you can support your child's communication development at home between sessions.",
  },
];

export default function SpeechTherapyForSpeechDelay() {
  return (
    <>
      <SeoHead
        title="Speech Therapy for Speech Delay in Bangalore | Poorvam Care, Electronic City"
        description="Expert speech therapy for children with speech delay and late talkers in Electronic City, Bangalore. Early intervention by Apoorva Rai, MASLP, 13+ years experience. Call +91 88617 64343 to book."
        canonical="https://poorvamcare.in/speech-therapy-for-speech-delay-bangalore"
        keywords="speech therapy for speech delay Bangalore, late talker therapy Electronic City, speech delay treatment Bangalore, toddler not talking, child speech delay therapy near me, speech language pathologist Electronic City, speech therapy near me Bommanahalli, speech delay treatment cost Bangalore, best speech therapist for toddlers near me, speech therapy Hosa Road, late talker therapy Kudlu Gate, speech therapy fees Bangalore, online speech therapy for toddlers Bangalore, early intervention speech therapy near me, RCI licensed speech therapist Bangalore"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createServiceSchema({
        name: "Speech Therapy for Speech Delay",
        description: "Specialized speech therapy for children with speech delay and late talkers in Electronic City, Bangalore. Early intervention programs for toddlers and young children.",
        url: "https://poorvamcare.in/speech-therapy-for-speech-delay-bangalore",
      })} />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Services", url: "https://poorvamcare.in/child-development" },
        { name: "Speech Therapy for Speech Delay", url: "https://poorvamcare.in/speech-therapy-for-speech-delay-bangalore" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-gold/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-gold font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Early Intervention · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Speech Therapy for{" "}
              <span className="text-gold">Speech Delay</span> in Bangalore
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Is your child a late talker? Early intervention speech therapy can make a significant difference. Our experienced therapists help children find their voice through play-based, evidence-based approaches.
            </p>
          </div>
        </div>
      </section>

      {/* Understanding */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Understanding Speech Delay in Children
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Speech delay occurs when a child's speech and language skills develop slower than expected for their age. Warning signs include not babbling by 12 months, not using single words by 18 months, not combining two words by age 2, or being difficult to understand by age 3. Speech delay can be caused by hearing issues, developmental conditions, oral-motor difficulties, or environmental factors.
            </p>
            <p>
              The most important thing parents should know: early intervention works. Children who receive speech therapy before age 3 have the best outcomes. Research shows that 70-80% of late talkers who receive early intervention catch up with their peers by school age. Waiting to "see if they grow out of it" can mean missing a critical window for brain development.
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
              Our speech delay therapy program begins with a comprehensive evaluation to understand the root cause of the delay. Led by Apoorva Rai (MASLP, RCI Licensed, 13+ years experience), our team designs individualized therapy plans that target your child's specific communication needs.
            </p>
            <p>
              We use play-based therapy techniques that keep young children engaged while systematically building their vocabulary, sentence structure, and communication confidence. For very young children (12-24 months), we focus heavily on parent coaching — teaching you strategies to encourage language development during everyday activities at home.
            </p>
          </div>

          <h3 className="text-xl font-heading font-bold text-brown-deep mt-10 mb-4">What Parents Can Expect</h3>
          <ul className="space-y-3">
            {[
              "Comprehensive speech-language evaluation including hearing screening",
              "Clear explanation of your child's current communication level and expected milestones",
              "Individualized therapy plan with specific, measurable goals",
              "Play-based therapy sessions (30-45 minutes) designed for young children's attention spans",
              "Parent coaching in evidence-based strategies like focused stimulation and expansion techniques",
              "Vocabulary building activities using your child's interests and daily routines",
              "Regular progress monitoring with video examples shared with parents",
              "Referral for hearing assessment or developmental evaluation if needed",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-sage mt-0.5 flex-shrink-0" />
                <span className="text-brown-mid font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            Expert Care for Late Talkers
          </h2>
          <div className="text-brown-mid font-body leading-relaxed space-y-4">
            <p>
              Apoorva Rai, our lead speech-language pathologist, has spent over 13 years helping children with speech delay find their voice. She holds a Master of Audiology and Speech-Language Pathology (MASLP), is licensed by the Rehabilitation Council of India, and is a member of the Indian Speech and Hearing Association (ISHA).
            </p>
            <p>
              Our two centres in Electronic City (Phase 1 and Phase 2) are conveniently located for families across south Bangalore. We also offer teletherapy for follow-up sessions, making it easier for working parents to stay consistent with their child's therapy schedule.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={speechDelayFAQs}
        title="Speech Delay Therapy — FAQs"
        subtitle="Common questions from parents about speech delay and late talkers"
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Concerned About Your Child's Speech?
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Don't wait. Book a consultation and let our team assess your child's communication development.
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
