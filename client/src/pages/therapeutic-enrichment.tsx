import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Palette, Activity, Wind, Users, Star, Heart, ArrowRight, CheckCircle } from "lucide-react";

const programs = [
  {
    title: "Sensory Art Therapy",
    description: "Creative expression meets sensory exploration. Children use paint, clay, sand, and textured materials to build emotional regulation, sensory tolerance, and self-expression — all within a structured, therapeutic framework guided by our occupational therapist.",
    highlights: ["Sensory tolerance building", "Emotional regulation through creative expression", "Fine motor skill development", "Non-verbal communication"],
    icon: Palette,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
    accentColor: "text-pink-600",
  },
  {
    title: "Movement Therapy",
    description: "Body-based therapy that uses rhythm, dance, and structured movement activities to improve gross motor skills, body awareness, spatial understanding, and sensory regulation. Sessions are energetic, joyful, and therapeutic.",
    highlights: ["Gross motor coordination", "Body awareness and proprioception", "Rhythm and timing skills", "Emotional expression through movement"],
    icon: Activity,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
    accentColor: "text-blue-600",
  },
  {
    title: "Therapeutic Yoga",
    description: "Adapted yoga for children with developmental differences — focusing on breath regulation, body awareness, flexibility, and calm. Therapeutic yoga helps children develop self-regulation skills and reduce anxiety in a playful, sensory-friendly environment.",
    highlights: ["Breath and nervous system regulation", "Flexibility and strength", "Calm and self-regulation", "Body-mind connection"],
    icon: Wind,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
    accentColor: "text-green-600",
  },
  {
    title: "Social Skills Groups",
    description: "Small-group sessions designed to build peer interaction, friendship skills, turn-taking, and social understanding. Led by our speech therapist and special educator, these groups use structured activities and naturalistic play to make social learning explicit and fun.",
    highlights: ["Turn-taking and conversation skills", "Reading social cues", "Making and maintaining friendships", "Group participation and cooperation"],
    icon: Users,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
    accentColor: "text-purple-600",
  },
];

const beneficiaries = [
  "Children with autism spectrum disorder",
  "Sensory processing difficulties",
  "Anxiety and emotional regulation challenges",
  "ADHD and attention difficulties",
  "Social communication difficulties",
  "Cerebral palsy and motor differences",
  "Down syndrome",
  "Children who are 'typically developing' but benefit from enriched sensory and social experience",
];

const faqs = [
  {
    question: "What is sensory integration therapy?",
    answer: "Sensory integration therapy is an evidence-based approach developed by occupational therapist Dr. A. Jean Ayres. It is based on the understanding that many children — particularly those with autism, ADHD, and sensory processing disorder — have difficulty organising and responding to sensory information from their bodies and environment. Sensory integration therapy uses carefully graded, play-based sensory experiences (swinging, climbing, tactile exploration) to help the brain process sensory input more efficiently, improving behaviour, attention, and daily function.",
  },
  {
    question: "How does yoga help children with special needs?",
    answer: "Therapeutic yoga offers multiple benefits for children with developmental differences. Yoga postures build strength, flexibility, and body awareness — foundational elements for self-regulation. Breathing exercises activate the parasympathetic nervous system, reducing anxiety and meltdown frequency. The predictable structure of yoga sequences provides comfort for children who need routine. Research supports adapted yoga as a beneficial complementary therapy for autism, ADHD, and anxiety in children.",
  },
  {
    question: "What age groups are therapeutic enrichment programs for?",
    answer: "Our therapeutic enrichment programmes at Poorvam Care in Electronic City, Bangalore serve children from age 2 through early adolescence (up to approximately 14 years). Programmes are grouped by developmental stage rather than chronological age, so a 7-year-old and a 10-year-old with similar developmental profiles may attend the same group. Contact us to discuss the most appropriate programme for your child's age and needs.",
  },
  {
    question: "Is sensory art therapy evidence-based?",
    answer: "Yes. Sensory art therapy draws on two evidence-based disciplines: art therapy and sensory integration therapy. Multiple peer-reviewed studies support the use of art therapy for reducing anxiety, improving emotional regulation, and enhancing self-expression in children with autism and developmental disabilities. Sensory integration, as developed by Dr. Ayres, also has a substantial research base. Our programmes are designed and supervised by qualified occupational therapists and special educators.",
  },
  {
    question: "How is therapeutic enrichment different from regular therapy?",
    answer: "Regular therapy (speech, OT, ABA) is goal-directed and typically conducted in one-on-one or small structured settings with explicit skill targets. Therapeutic enrichment programmes use the natural motivating power of art, music, movement, and peer interaction to achieve therapeutic goals in a more naturalistic, group setting. They complement individual therapy by providing opportunities to practise and generalise skills — like social interaction, sensory regulation, and communication — in a more real-world context. Many children find enrichment sessions particularly enjoyable, which increases engagement and motivation across all their therapy.",
  },
];

export default function TherapeuticEnrichmentPage() {
  return (
    <>
      <SeoHead
        title="Therapeutic Enrichment Programs in Bangalore | Sensory Art, Yoga & More | Poorvam Care"
        description="Therapeutic enrichment in Electronic City, Bangalore — sensory art, movement therapy, yoga & social skills groups for children. Book a free consultation today."
        canonical="https://poorvamcare.in/therapeutic-enrichment"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Therapeutic Enrichment Programs",
          "description": "Therapeutic enrichment programmes including sensory art therapy, movement therapy, therapeutic yoga, and social skills groups for children in Electronic City, Bangalore",
          "url": "https://poorvamcare.in/therapeutic-enrichment",
          "telephone": "+918861764343",
          "medicalSpecialty": "Paediatric Therapy",
          "relevantSpecialty": "Sensory Integration Therapy",
          "provider": {
            "@type": "MedicalBusiness",
            "name": "Poorvam Care",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Electronic City Phase 1 & Phase 2",
              "addressLocality": "Bangalore",
              "addressRegion": "Karnataka",
              "addressCountry": "IN",
            },
          },
        }}
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Child Development", url: "https://poorvamcare.in/child-development" },
          { name: "Therapeutic Enrichment", url: "https://poorvamcare.in/therapeutic-enrichment" },
        ])}
      />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-2 text-sm font-body text-gray-500">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><span>/</span></li>
            <li><Link href="/child-development" className="hover:text-blue-600 transition-colors">Child Development</Link></li>
            <li><span>/</span></li>
            <li className="text-gray-900 font-medium">Therapeutic Enrichment</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-pink-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Therapeutic Enrichment Programmes
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Therapeutic Enrichment in Bangalore:{" "}
              <span className="text-pink-600">Learning Through Play, Art & Movement</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Therapy does not have to happen at a desk. At Poorvam Care in Electronic City, Bangalore, our therapeutic enrichment programmes harness the power of art, movement, yoga, and social play to achieve real therapeutic goals — while children simply experience the joy of engaging, meaningful activity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-pink-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-pink-700 transition-colors shadow-lg shadow-pink-600/25"
              >
                Book a Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-pink-600 hover:text-pink-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Makes Therapeutic Enrichment Different?
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Regular enrichment programmes — art classes, yoga studios, sports groups — are designed for neurotypical children in standard group settings. For many children with autism, sensory processing differences, or developmental delays, these environments are overwhelming, under-supported, or simply inaccessible.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Therapeutic enrichment is different in three key ways. First, every programme at Poorvam Care is designed and facilitated by qualified therapists (occupational therapists, speech therapists, and special educators) who embed specific therapeutic goals into every session. Second, activities are carefully adapted to each child's sensory profile and developmental level — so children are challenged without being overwhelmed. Third, progress is tracked alongside the child's individual therapy goals, creating a seamless link between structured sessions and enrichment activities.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              For children who find traditional therapy settings difficult, enrichment programmes can be a powerful entry point — building trust, engagement, and foundational skills that carry over into individual therapy. For children already in therapy, enrichment groups provide opportunities to practise and generalise skills in a more naturalistic, social context — accelerating progress across all areas.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Therapeutic Enrichment Programmes
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Four distinct programmes, each designed by therapists to achieve measurable therapeutic goals through enjoyable, engaging activities
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  key={program.title}
                  className={`rounded-2xl p-8 border ${program.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 ${program.iconColor} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 font-body leading-relaxed mb-5">
                    {program.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {program.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2">
                        <Star className={`w-3.5 h-3.5 ${program.accentColor} flex-shrink-0`} />
                        <span className="text-gray-700 font-body text-xs">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Who Benefits From Therapeutic Enrichment?
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Our therapeutic enrichment programmes are designed for children aged 2 to 14 years. They are particularly beneficial for children who:
              </p>
              <div className="space-y-3">
                {beneficiaries.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-body">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-100">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                Combining Enrichment With Therapy
              </h3>
              <p className="text-gray-600 font-body leading-relaxed mb-4">
                Therapeutic enrichment programmes work best when combined with individual therapy. A child attending <Link href="/occupational-therapy" className="text-pink-600 hover:underline">occupational therapy</Link> for sensory processing can use sensory art therapy to practise tolerance in a group setting. A child in <Link href="/speech-therapy" className="text-pink-600 hover:underline">speech therapy</Link> can practise conversational skills in social skills groups. The synergy between individual sessions and enrichment groups accelerates outcomes across all developmental areas.
              </p>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                All our enrichment programmes are facilitated by the same qualified therapists who may also deliver your child's individual therapy — ensuring complete continuity of goals and approach.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl font-heading font-bold hover:bg-pink-700 transition-colors"
              >
                Enquire About Programmes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">
            Related Services at Poorvam Care
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Occupational Therapy", href: "/occupational-therapy" },
              { label: "Speech Therapy", href: "/speech-therapy" },
              { label: "ABA Therapy", href: "/aba-therapy" },
              { label: "Special Education", href: "/special-education" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-pink-300 hover:shadow-sm transition-all font-heading font-semibold text-gray-800 hover:text-pink-600"
              >
                {item.label} <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Therapeutic Enrichment FAQs"
        subtitle="Understanding sensory integration and therapeutic enrichment programmes for children in Bangalore"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Let Your Child Thrive Through Play
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation at Poorvam Care's Electronic City centre to find the right therapeutic enrichment programme for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-pink-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-pink-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
