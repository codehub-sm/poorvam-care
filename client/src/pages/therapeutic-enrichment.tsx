import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { TherapeuticEnrichmentIllustration } from "@/components/illustrations";
import { Link } from "wouter";
import { Palette, Activity, Heart, Music, Users, Check } from "lucide-react";

const programmes = [
  {
    title: "Sensory Art",
    description:
      "Therapeutic art sessions designed to support sensory processing, fine motor development, and emotional expression for children with developmental differences.",
    icon: Palette,
    features: ["Sensory-safe art materials", "Fine motor skill building", "Emotional expression through art", "Integrated with therapy goals"],
    color: "from-coral to-coral-dark",
    bg: "bg-coral/10 border-coral/20",
  },
  {
    title: "Movement Therapy",
    description:
      "Structured movement activities that build coordination, body awareness, and motor planning — designed by our therapy team for children who learn differently.",
    icon: Activity,
    features: ["Gross motor skill development", "Body awareness & coordination", "Motor planning activities", "Sensory integration through movement"],
    color: "from-sage to-sage-dark",
    bg: "bg-sage/10 border-sage/20",
  },
  {
    title: "Therapeutic Yoga",
    description:
      "Adapted yoga sessions that support self-regulation, body awareness, and calm — structured specifically for children with autism, ADHD, and sensory needs.",
    icon: Heart,
    features: ["Adapted poses for all abilities", "Self-regulation techniques", "Breathing & calming strategies", "Sensory-friendly environment"],
    color: "from-sage to-sage-dark",
    bg: "bg-sage/10 border-sage/20",
  },
  {
    title: "Music & Rhythm",
    description:
      "Rhythm-based sessions that support communication, social engagement, and auditory processing — every activity connects back to each child's development plan.",
    icon: Music,
    features: ["Rhythm & auditory processing", "Communication through music", "Social engagement activities", "Cognitive development support"],
    color: "from-gold to-gold-dark",
    bg: "bg-gold/10 border-gold/20",
  },
  {
    title: "Social Skills Groups",
    description:
      "Small-group sessions that practise turn-taking, joint attention, conversation skills, and peer interaction in a safe, structured, therapist-led setting.",
    icon: Users,
    features: ["Turn-taking & sharing", "Joint attention activities", "Conversation & pragmatic skills", "Peer interaction practice"],
    color: "from-coral-dark to-coral",
    bg: "bg-coral/10 border-coral/20",
  },
];

const faqs = [
  {
    question: "How is Therapeutic Enrichment different from regular activity classes?",
    answer: "Our enrichment programmes are not general activity classes. They are designed specifically for children with developmental differences, run by our therapy team, and structured to build on each child's individual goals. Every session is purposeful and connects back to their development plan.",
  },
  {
    question: "Which children benefit from Therapeutic Enrichment?",
    answer: "These programmes are designed for children aged 2–14 with autism, ADHD, developmental delays, sensory processing differences, and learning differences. Each session is adapted to the child's individual needs and abilities.",
  },
  {
    question: "Do I need a referral or assessment first?",
    answer: "We recommend an initial consultation so our team can understand your child's needs and recommend the right programme. Contact us at +91 886 176 4343 to schedule a free consultation.",
  },
  {
    question: "Can Therapeutic Enrichment replace therapy?",
    answer: "Therapeutic Enrichment complements core therapies like speech therapy, occupational therapy, and ABA. It is not a replacement, but an extension that reinforces therapeutic goals through structured, engaging activities.",
  },
  {
    question: "How are groups structured?",
    answer: "Groups are kept small (typically 3–5 children) and matched by age and developmental level. Each group is facilitated by a trained therapist who adapts activities to support every child's participation and growth.",
  },
];

const benefits = [
  { title: "Goal-Aligned", desc: "Every activity connects back to the child's individual development plan and therapy goals." },
  { title: "Therapist-Led", desc: "Run by our trained therapy team — not general instructors. Clinical expertise in every session." },
  { title: "Sensory-Safe", desc: "Environments and materials are chosen to be sensory-appropriate for children with diverse needs." },
  { title: "Builds Connection", desc: "Small groups foster peer interaction, social skills, and a sense of belonging." },
];

export default function TherapeuticEnrichmentPage() {
  return (
    <>
      <SeoHead
        title="Therapeutic Enrichment Programme for Children with Developmental Differences | Poorvam Care"
        description="Therapeutic enrichment programmes at Poorvam Care, Electronic City Bangalore. Sensory art, movement therapy, therapeutic yoga, music & rhythm, and social skills groups — designed for children who learn differently. Run by our therapy team."
        canonical="https://poorvamcare.in/therapeutic-enrichment"
        keywords="therapeutic enrichment Bangalore, sensory art therapy Electronic City, movement therapy children Bangalore, therapeutic yoga autism, social skills group children Electronic City, enrichment for developmental delays, therapy-based activities children Bangalore, Poorvam Care enrichment"
        ogImage="https://poorvamcare.in/og-image.jpg"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Therapeutic Enrichment Programme",
          "description": "Enrichment programmes — sensory art, movement therapy, music, yoga, and social skills groups — designed specifically for children with developmental differences, run by our therapy team.",
          "url": "https://poorvamcare.in/therapeutic-enrichment",
          "provider": {
            "@type": "MedicalBusiness",
            "name": "Poorvam Care",
            "url": "https://poorvamcare.in",
          },
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Therapeutic Enrichment", url: "https://poorvamcare.in/therapeutic-enrichment" },
      ])} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #7BA87B 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-sage/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-gold/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div>
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Therapeutic Enrichment · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Therapeutic Enrichment —{" "}
              <span className="text-coral">Designed for Children Who Learn Differently</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body mb-8 leading-relaxed">
              Our enrichment programmes — sensory art, movement therapy, music, and yoga — are not general activity classes. They are designed specifically for children with developmental differences, run by our therapy team, and structured to build on each child's individual goals. Every session is purposeful. Every activity connects back to their development plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
              >
                Book a Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-warm-bg/30 text-warm-bg px-8 py-4 rounded-xl font-heading font-bold hover:border-coral hover:text-coral transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <TherapeuticEnrichmentIllustration className="w-full max-w-md h-auto opacity-80" />
          </div>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Our Programmes
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Five structured programmes that extend therapy goals through purposeful, engaging activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programmes.map((programme) => {
              const Icon = programme.icon;
              return (
                <article
                  key={programme.title}
                  className={`rounded-2xl p-6 border ${programme.bg} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${programme.color} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brown-deep mb-2">
                    {programme.title}
                  </h3>
                  <p className="text-brown-mid font-body text-sm mb-4 leading-relaxed">
                    {programme.description}
                  </p>
                  <ul className="space-y-2">
                    {programme.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-brown-mid font-body">
                        <Check className="w-4 h-4 text-coral flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Why Therapeutic Enrichment?
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Purposeful activities that complement therapy and support your child's growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-warm-gray-200">
                <h3 className="text-base font-heading font-bold text-brown-deep mb-2">{b.title}</h3>
                <p className="text-sm text-brown-mid font-body leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-heading font-bold text-brown-deep mb-6">
            Explore Poorvam Care
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/child-development" className="px-6 py-3 rounded-xl border border-coral/20 text-coral font-heading font-semibold hover:bg-coral/5 transition-colors">
              Core Therapies
            </Link>
            <Link href="/electronic-city-phase-1" className="px-6 py-3 rounded-xl border border-sage/20 text-sage-dark font-heading font-semibold hover:bg-sage/5 transition-colors">
              Hulimanagla, ECity Phase 1 Centre
            </Link>
            <Link href="/electronic-city-phase-2" className="px-6 py-3 rounded-xl border border-sage/20 text-sage-dark font-heading font-semibold hover:bg-sage/5 transition-colors">
              Ananth Nagar, ECity Phase 2 Centre
            </Link>
            <Link href="/about" className="px-6 py-3 rounded-xl border border-gold/20 text-gold-dark font-heading font-semibold hover:bg-gold/5 transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Common Questions About Therapeutic Enrichment"
        subtitle="Everything you need to know about our enrichment programmes"
      />

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Ready to Explore Therapeutic Enrichment?
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Book a free consultation and find out how our enrichment programmes can support your child's development.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-coral px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-gray-50 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
