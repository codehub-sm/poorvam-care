import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";

const faqData = [
  {
    question: "What age should I start speech therapy for my child?",
    answer:
      "Early intervention is most effective when started before age 3. If your child is not babbling by 12 months, not using single words by 18 months, or not combining words by age 2, consult a speech-language pathologist. At Poorvam Care, we work with children as young as 12 months to support early communication development through play-based therapy.",
  },
  {
    question: "How do I know if my child needs occupational therapy?",
    answer:
      "Signs your child may benefit from occupational therapy include difficulty with fine motor tasks like holding a pencil, sensitivity to textures or sounds, trouble with balance and coordination, challenges with self-care routines like dressing or eating, and difficulty focusing in school. An OT evaluation at Poorvam Care can identify specific areas where support is needed.",
  },
  {
    question: "Do you work with children with autism?",
    answer:
      "Yes, autism therapy is one of our core specialties. We provide speech therapy, ABA (Applied Behaviour Analysis), occupational therapy, and special education tailored for children on the autism spectrum. Our team, led by Apoorva Rai (MASLP, 13+ years experience), creates individualized therapy plans based on each child's unique needs and strengths.",
  },
  {
    question: "What is the cost of speech therapy in Bangalore?",
    answer:
      "Session fees vary based on the type of therapy and frequency of sessions. We offer flexible therapy packages to suit different family budgets, from individual sessions to comprehensive monthly plans. Contact us at +91 886 176 4343 for a free initial consultation where we can discuss your child's needs and recommend a therapy plan with transparent pricing.",
  },
  {
    question: "How many sessions does a child typically need?",
    answer:
      "The number of sessions depends on the child's condition, severity, and therapy goals. Most children attend 2-3 sessions per week. Some see noticeable improvement within 3-6 months, while others benefit from longer-term support. We conduct regular assessments and adjust the therapy plan as your child progresses, always keeping you informed.",
  },
  {
    question: "What is the difference between speech therapy and occupational therapy?",
    answer:
      "Speech therapy focuses on communication skills — helping children speak clearly, understand language, and express themselves. Occupational therapy addresses fine motor skills, sensory processing, coordination, and daily living activities. Many children benefit from both therapies working together, which is why Poorvam Care offers integrated multi-disciplinary care under one roof.",
  },
  {
    question: "What is Therapeutic Enrichment at Poorvam Care?",
    answer:
      "Our Therapeutic Enrichment programmes — sensory art, movement therapy, therapeutic yoga, music & rhythm, and social skills groups — are not general activity classes. They are designed specifically for children with developmental differences, run by our therapy team, and structured to build on each child's individual goals. Every session is purposeful and connects back to their development plan.",
  },
  {
    question: "How do I book an appointment at Poorvam Care?",
    answer:
      "You can book a free consultation by calling us at +91 886 176 4343, sending a WhatsApp message to the same number, filling out our online contact form, or visiting our centres in Electronic City Phase 1 or Phase 2, Bangalore. We typically respond within 24 hours and will schedule a convenient time for your first visit.",
  },
];

export default function FAQPage() {
  return (
    <>
      <SeoHead
        title="FAQ — Speech Therapy & Child Development Questions | Poorvam Care, Electronic City Bangalore"
        description="Answers to common questions about speech therapy, occupational therapy, autism therapy, and child development services at Poorvam Care, Electronic City, Bangalore."
        canonical="https://poorvamcare.in/faq"
        keywords="speech therapy FAQ, occupational therapy questions, autism therapy Bangalore, child development questions, speech therapy cost Bangalore, when to start speech therapy"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "FAQ", url: "https://poorvamcare.in/faq" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Parent Resources
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-4 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              Answers to the questions parents most commonly ask about speech therapy, occupational therapy, and child development services at Poorvam Care.
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={faqData}
        title="Common Questions from Parents"
        subtitle="Can't find your answer? Call us at +91 886 176 4343 or book a free consultation."
      />

      {/* CTA */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-warm-bg mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Book a free consultation and speak directly with our therapy team.
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
