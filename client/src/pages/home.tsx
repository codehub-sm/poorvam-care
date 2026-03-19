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
        title="Poorvam Care - Child Development, Hearing Center & Enrichment in Bangalore"
        description="Expert child development therapy, hearing care, and enrichment programs in Electronic City, Bangalore. Trusted by 2500+ families. Book a free consultation."
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
