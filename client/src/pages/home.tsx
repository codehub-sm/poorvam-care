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
      "Poorvam Care provides three specialized areas of care: Child Development Center (speech therapy, occupational therapy, ABA therapy, special education), Hearing Center (hearing assessments, hearing aids, cochlear implant support), and Ucube enrichment programs (dance, yoga, music, art, public speaking, soft skills).",
  },
  {
    question: "How do I know if my child needs therapy?",
    answer:
      "If your child is not meeting developmental milestones, has difficulty communicating, shows behavioral concerns, or struggles with motor skills, a professional evaluation can help. We offer free initial consultations to assess whether therapy is right for your child.",
  },
  {
    question: "What age should I get my child's hearing tested?",
    answer:
      "Newborn hearing screening is recommended within the first month of life. If your child passed the newborn screening but you notice signs of hearing difficulty later (not responding to sounds, speech delays), get tested immediately. Early detection is critical.",
  },
  {
    question: "What makes Poorvam different from other therapy centers?",
    answer:
      "Poorvam Care combines 12+ years of experience with a warm, family-centered approach. Our team includes RCI-registered and ISHA-certified professionals. We offer comprehensive care across therapy, hearing, and enrichment — all under one roof in Electronic City, Bangalore.",
  },
  {
    question: "How do I book a consultation?",
    answer:
      "You can book a free consultation by calling us at +91 886 176 4343, sending a WhatsApp message, filling out our online contact form, or visiting our center in Electronic City. We typically respond within 24 hours.",
  },
  {
    question: "Do you offer online therapy sessions?",
    answer:
      "Yes, we offer teletherapy options for speech therapy, behavioral consultations, and parent training sessions. In-person sessions are available at our Electronic City locations in Bangalore.",
  },
];

export default function Home() {
  return (
    <>
      <SeoHead
        title="Poorvam Care - Best Child Therapy & Hearing Center in Electronic City, Bangalore"
        description="Poorvam Care offers speech therapy, occupational therapy, ABA therapy, and special education for children in Electronic City, Bangalore. Led by Apoorva Rai, MASLP, 13+ years experience. Call +91 886 176 4343."
        canonical="https://poorvamcare.in/"
        ogImage="https://poorvamcare.in/og-image.jpg"
        keywords="speech therapy Bangalore, occupational therapy Electronic City, child development center Bangalore, hearing center Electronic City, ABA therapy Bangalore, autism therapy near me, best speech therapist Electronic City, hearing test Bangalore, pediatric therapy Bangalore, Poorvam Care, speech therapy for autism Electronic City, early intervention therapy Bangalore"
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
