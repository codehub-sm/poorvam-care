import SeoHead from "@/components/seo-head";
import StructuredData, { organizationSchema } from "@/components/structured-data";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import ServicePillars from "@/components/service-pillars";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import FAQSection from "@/components/faq-section";
import WaveDivider from "@/components/wave-divider";
import SummerCampBanner from "@/components/summer-camp-banner";
import { Link } from "wouter";

const homeFAQs = [
  {
    question: "What services does Poorvam Care offer?",
    answer:
      "Poorvam Care is a multi-disciplinary early intervention centre offering speech therapy, occupational therapy, ABA/behavioural therapy, special education, parent counselling, and therapeutic enrichment programmes (sensory art, movement therapy, therapeutic yoga, music & rhythm, social skills groups) for children aged 2–14.",
  },
  {
    question: "How do I know if my child needs therapy?",
    answer:
      "If your child is not meeting developmental milestones, has difficulty communicating, shows behavioral concerns, or struggles with motor skills, a professional evaluation can help. We offer free initial consultations to assess whether therapy is right for your child.",
  },
  {
    question: "What makes Poorvam different from other therapy centers?",
    answer:
      "Poorvam Care combines 13+ years of experience with a warm, family-centered approach. Our team includes RCI-registered and ISHA-certified professionals. We offer comprehensive early intervention across therapy and therapeutic enrichment — all under one roof across two locations in Electronic City, Bangalore.",
  },
  {
    question: "What is the difference between speech therapy and occupational therapy?",
    answer:
      "Speech therapy focuses on communication — helping children develop language, improve articulation, and build social communication skills. Occupational therapy focuses on functional skills — helping children with sensory processing, fine motor skills, and daily living activities. Many children at Poorvam Care receive both.",
  },
  {
    question: "What is Therapeutic Enrichment?",
    answer:
      "Our Therapeutic Enrichment programmes — sensory art, movement therapy, therapeutic yoga, music & rhythm, and social skills groups — are not general activity classes. They are designed specifically for children with developmental differences, run by our therapy team, and structured to build on each child's individual goals.",
  },
  {
    question: "How many sessions does my child need?",
    answer:
      "The number of sessions depends on the child's condition, age at which therapy starts, and how consistently therapy is practiced at home. After an initial assessment, our therapists will recommend a therapy plan with a realistic timeline and frequency.",
  },
  {
    question: "Where are your centres located?",
    answer:
      "We have two centres in Electronic City, Bangalore. Phase 1: Hulimangala Road, Near Sai Mandir Temple, Above RxDx Multi Speciality Clinic. Phase 2: Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant.",
  },
  {
    question: "How do I book an appointment at Poorvam Care?",
    answer:
      "Call us at +91 886 176 4343 or email info@poorvamcare.in. We offer a free initial consultation to understand your child's needs before recommending a therapy plan.",
  },
  {
    question: "Does Poorvam Care have a summer therapy camp for children?",
    answer:
      "Yes! Poorvam Care runs a Summer Therapy Camp every year during April–May. The camp includes sensory art, therapeutic yoga, movement therapy, music & rhythm, and social skills groups — all designed specifically for children with autism, ADHD, speech delay, and developmental differences. It's a fun, therapy-driven summer experience led by our qualified therapists. Call +91 886 176 4343 to enquire about the 2026 summer camp.",
  },
  {
    question: "What is the cost of speech therapy at Poorvam Care?",
    answer:
      "Speech therapy session fees vary based on the type of therapy, frequency, and your child's specific needs. We offer flexible therapy packages to suit different family budgets. Contact us at +91 886 176 4343 for a free initial consultation where we discuss your child's needs and provide transparent pricing with no hidden charges.",
  },
  {
    question: "Do you offer online therapy or teletherapy?",
    answer:
      "Yes, Poorvam Care offers teletherapy options for speech therapy, behavioural consultations, and parent training sessions. Online therapy is ideal for follow-up sessions and for families who find it difficult to travel to our Electronic City centres. In-person sessions are available at both our Phase 1 and Phase 2 locations.",
  },
];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Early Intervention Centre in Electronic City Bangalore | Poorvam Care"
        description="Poorvam Care is a multi-disciplinary early intervention centre in Electronic City, Bangalore. Speech therapy, OT, ABA, special education and therapeutic enrichment for children aged 2–14 with autism and developmental delays. RCI registered. ISHA certified."
        canonical="https://poorvamcare.in/"
        ogImage="https://poorvamcare.in/og-image.jpg"
        keywords="early intervention centre Electronic City, speech therapy Bangalore, occupational therapy Electronic City, child development center Bangalore, ABA therapy Bangalore, autism therapy near me, best speech therapist Electronic City, pediatric therapy Bangalore, Poorvam Care, speech therapy near me Bommanahalli, child therapy Hosa Road, speech therapy cost Bangalore, best child therapy center near me, occupational therapy near me Kudlu Gate, speech therapist HSR Layout, therapy for autism near Electronic City, speech therapy fees Bangalore, free consultation child therapy Bangalore, RCI registered therapist near me, teletherapy for children Bangalore"
      />
      <StructuredData data={organizationSchema} />

      <SummerCampBanner />
      <Hero />
      <TrustBar />
      <ServicePillars />
      <WaveDivider color="#FAFAF8" />
      <HowItWorks />
      <WaveDivider color="#ffffff" flip />
      <Testimonials />

      <FAQSection
        faqs={homeFAQs}
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about our services"
      />

      {/* Final CTA Banner */}
      <section className="py-20 bg-brown-deep relative overflow-hidden">
        {/* Subtle radial gradient overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl" aria-hidden="true" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-lg text-warm-bg/80 font-body mb-8 max-w-2xl mx-auto">
            Every journey begins with a conversation. Book a free consultation and discover how Poorvam Care can support your family.
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
