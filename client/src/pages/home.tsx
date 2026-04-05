import SeoHead from "@/components/seo-head";
import StructuredData, { organizationSchema } from "@/components/structured-data";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import ServicePillars from "@/components/service-pillars";
import HowItWorks from "@/components/how-it-works";
import Testimonials from "@/components/testimonials";
import FAQSection from "@/components/faq-section";
import WaveDivider from "@/components/wave-divider";
import { Link } from "wouter";

const homeFAQs = [
  {
    question: "What services does Poorvam Care offer?",
    answer:
      "Poorvam Care provides three specialized areas of care: Child Development Center (speech therapy, occupational therapy, ABA therapy, special education, parent counselling), Hearing Center (hearing assessments, hearing aids, cochlear implant support), and Ucube enrichment programs (dance, yoga, music, art, public speaking, soft skills).",
  },
  {
    question: "How do I know if my child needs therapy?",
    answer:
      "If your child is not meeting developmental milestones, has difficulty communicating, shows behavioral concerns, or struggles with motor skills, a professional evaluation can help. We offer free initial consultations to assess whether therapy is right for your child.",
  },
  {
    question: "What makes Poorvam different from other therapy centers?",
    answer:
      "Poorvam Care combines 13+ years of experience with a warm, family-centered approach. Our team includes RCI-registered and ISHA-certified professionals. We offer comprehensive care across therapy, hearing, and enrichment — all under one roof in Electronic City, Bangalore.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a free consultation by calling us at +91 886 176 4343, sending a WhatsApp message, filling out our online contact form, or visiting our center in Electronic City. We typically respond within 24 hours.",
  },
  {
    question: "What age should I start speech therapy for my child?",
    answer:
      "The earlier, the better. If your child is not babbling by 12 months, not saying single words by 16 months, or not using two-word phrases by 24 months, you should consult a speech therapist immediately. Early intervention — ideally before age 3 — produces significantly better outcomes. At Poorvam Care in Electronic City, Bangalore, we begin therapy for children as young as 12 months old.",
  },
  {
    question: "How much does speech therapy cost in Bangalore?",
    answer:
      "At Poorvam Care, centre-based speech therapy sessions are ₹800 per 45-minute session. Intensive therapy packages (48 sessions/month) are available at ₹750 per session. Online/teletherapy sessions are ₹600 per session. Home visits are ₹1,500 per session (travel included within Electronic City). Initial developmental assessments start at ₹2,500.",
  },
  {
    question: "What is the difference between a speech therapist and speech pathologist?",
    answer:
      "In India, the terms are used interchangeably. A speech-language pathologist (SLP) or speech therapist is a trained professional who evaluates and treats communication, speech, language, voice, and swallowing disorders. In India, SLPs must be registered with the Rehabilitation Council of India (RCI). Our therapists hold MASLP degrees and RCI registration.",
  },
  {
    question: "Does Poorvam Care offer home visits for therapy?",
    answer:
      "Yes, we offer home-based therapy sessions within Electronic City and nearby areas. Home visits are available for speech therapy and occupational therapy at ₹1,500 per session (₹1,600 for OT), with travel included within Electronic City. Please call +91 886 176 4343 to check availability for your location.",
  },
  {
    question: "How long does it take to see results from occupational therapy?",
    answer:
      "Most families begin noticing meaningful improvements within 3–6 months of consistent occupational therapy. The timeline depends on the child's condition, age at start, session frequency, and how well home practice strategies are followed. Our therapists provide regular progress reports every 6–8 weeks so you always know how your child is progressing.",
  },
  {
    question: "What are the signs of autism in toddlers?",
    answer:
      "Early signs of autism in toddlers include: not making eye contact, not responding to their name by 12 months, no babbling by 12 months, no gestures (pointing, waving) by 12 months, no single words by 16 months, no two-word phrases by 24 months, loss of previously acquired language skills, repetitive behaviors, and difficulty with social interaction. If you notice any of these signs, contact Poorvam Care for a free consultation.",
  },
  {
    question: "Is ABA therapy covered by insurance in India?",
    answer:
      "Currently, most health insurance policies in India do not cover ABA therapy or other developmental therapies. However, some corporate insurance plans are beginning to include therapy coverage. We recommend checking with your insurer directly. Poorvam Care offers flexible session packages to make therapy affordable for families.",
  },
  {
    question: "Can speech therapy help with stuttering in children?",
    answer:
      "Yes, speech therapy is highly effective for stuttering (dysfluency) in children. Early intervention — especially between ages 2 and 5 — leads to the best recovery outcomes, with many children achieving fluent speech. At Poorvam Care, our RCI-licensed speech therapists use evidence-based stuttering treatment approaches tailored to each child's age and severity.",
  },
  {
    question: "What is sensory integration therapy?",
    answer:
      "Sensory integration therapy (also called sensory processing therapy) helps children who have difficulty processing information from their senses — touch, sound, sight, taste, smell, movement, and body awareness. It involves structured activities that challenge the nervous system in a playful way. At Poorvam Care, sensory integration is embedded in occupational therapy and our Therapeutic Enrichment programs.",
  },
  {
    question: "Does Poorvam Care offer teletherapy sessions?",
    answer:
      "Yes! Poorvam Care offers online teletherapy for speech therapy, parent counselling, and behavioral consultations. Online sessions are ₹600 per session and are conducted via video call. Teletherapy is ideal for families outside Electronic City, for follow-up sessions, or during school hours. Book at +91 886 176 4343.",
  },
];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Speech Therapy & Early Intervention Centre in Electronic City Bangalore | Poorvam Care"
        description="Poorvam Care — RCI licensed speech therapy & early intervention in Electronic City, Bangalore. 13+ yrs experience, 500+ families helped. Book a free consultation."
        canonical="https://poorvamcare.in/"
      />
      <StructuredData data={organizationSchema} />

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
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-lg text-white/90 font-body mb-8 max-w-2xl mx-auto">
            Every journey begins with a conversation. Book a free consultation and discover how Poorvam Care can support your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
