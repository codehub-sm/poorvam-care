import SeoHead from "@/components/seo-head";
import StructuredData, { createFAQSchema, createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { UcubeIllustration } from "@/components/illustrations";
import { Link } from "wouter";
import { Heart, Mic, Palette, Calendar, Music, Sparkles, Check } from "lucide-react";

const programs = [
  {
    title: "Dance & Movement",
    description: "Creative dance classes to enhance coordination, self-expression, and confidence through contemporary and classical dance forms.",
    icon: Heart,
    ageGroup: "Ages 4-18",
    features: ["Contemporary Dance", "Classical Dance Forms", "Movement Therapy", "Performance Skills"],
    color: "from-coral to-coral-dark",
    bg: "bg-coral/10 border-coral/20",
  },
  {
    title: "Yoga & Wellness",
    description: "Mindfulness, yoga, and wellness practices for physical and mental well-being, stress management, and emotional regulation.",
    icon: Sparkles,
    ageGroup: "All Ages",
    features: ["Children's Yoga", "Mindfulness Practices", "Breathing Techniques", "Emotional Regulation"],
    color: "from-sage to-sage-dark",
    bg: "bg-sage/10 border-sage/20",
  },
  {
    title: "Music & Instruments",
    description: "Music education, instrument training, and vocal development for creative expression and cognitive development.",
    icon: Music,
    ageGroup: "Ages 5-18",
    features: ["Piano & Keyboard", "Guitar & Ukulele", "Vocal Training", "Music Theory"],
    color: "from-gold to-gold-dark",
    bg: "bg-gold/10 border-gold/20",
  },
  {
    title: "Art & Craft",
    description: "Creative expression through painting, drawing, sculpture, and hands-on artistic experiences that build fine motor skills.",
    icon: Palette,
    ageGroup: "Ages 4-16",
    features: ["Painting & Drawing", "Craft Making", "Sculpture & 3D Art", "Digital Art Creation"],
    color: "from-gold to-gold-dark",
    bg: "bg-gold/10 border-gold/20",
  },
  {
    title: "Public Speaking",
    description: "Build confidence and communication skills through speech writing, delivery training, and podcast production.",
    icon: Mic,
    ageGroup: "Ages 8-18",
    features: ["Speech Writing & Delivery", "Podcast Production", "Voice Modulation", "Presentation Skills"],
    color: "from-coral-dark to-coral",
    bg: "bg-coral/10 border-coral/20",
  },
  {
    title: "Soft Skills & Life Skills",
    description: "Essential life skills, leadership, teamwork, and personal development for confident, well-rounded individuals.",
    icon: Calendar,
    ageGroup: "Ages 10-18",
    features: ["Leadership Skills", "Teamwork & Collaboration", "Time Management", "Problem Solving"],
    color: "from-sage-dark to-sage",
    bg: "bg-sage/10 border-sage/20",
  },
];

const faqs = [
  {
    question: "What enrichment programs does Ucube offer?",
    answer: "Ucube offers six enrichment programs: Dance & Movement, Yoga & Wellness, Music & Instruments, Art & Craft, Public Speaking & Podcasting, and Soft Skills & Life Skills. Each program is designed to develop creativity, confidence, and essential skills in children.",
  },
  {
    question: "What age groups are Ucube programs suitable for?",
    answer: "Our programs cater to children from ages 4 to 18, with age-appropriate curriculum for each group. Yoga & Wellness is open to all ages. Specific age ranges are listed for each program to ensure the best learning experience.",
  },
  {
    question: "Are Ucube classes beneficial for children with special needs?",
    answer: "Absolutely. Many of our programs complement therapeutic interventions. Dance and yoga improve motor skills, music enhances cognitive development, and art supports sensory processing. Our instructors are trained to accommodate diverse needs.",
  },
  {
    question: "How do I enroll my child in a Ucube program?",
    answer: "You can enroll by contacting us at +91 886 176 4343, filling out our contact form, or visiting our center in Electronic City. We'll help you choose the right program based on your child's interests and age.",
  },
  {
    question: "Can my child try a class before committing?",
    answer: "Yes, we offer trial sessions so your child can experience a class before enrolling. Contact us to schedule a trial session for any of our programs.",
  },
];

const benefits = [
  { title: "Builds Confidence", desc: "Performing and creating in a supportive environment builds lasting self-esteem." },
  { title: "Develops Social Skills", desc: "Group activities teach teamwork, communication, and healthy peer relationships." },
  { title: "Enhances Creativity", desc: "Artistic expression develops critical thinking, problem-solving, and innovation." },
  { title: "Supports Development", desc: "Dance, music, and yoga complement therapy by improving motor and cognitive skills." },
];

export default function UcubePage() {
  return (
    <>
      <SeoHead
        title="Ucube - Best Kids Enrichment Programs in Electronic City, Bangalore | Dance, Music, Art | Poorvam Care"
        description="Top enrichment programs for kids in Electronic City, Bangalore. Dance, yoga, music, art, public speaking & soft skills. Ages 4-18. Fun skill development at Poorvam Care."
        canonical="https://poorvamcare.in/ucube"
        keywords="kids enrichment programs Bangalore, dance classes for children Electronic City, yoga for kids Bangalore, music classes children Electronic City, art classes kids Bangalore, public speaking for children, soft skills training kids Bangalore, Ucube Poorvam Care, after school activities Electronic City, extracurricular programs Bangalore, child skill development Electronic City"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "Ucube by Poorvam Care",
          "description": "Enrichment and skill development programs for children",
          "url": "https://poorvamcare.in/ucube",
          "telephone": "+918861764343",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Electronic City Phase 2, Ananth Nagar",
            "addressLocality": "Bangalore",
            "addressRegion": "Karnataka",
            "addressCountry": "IN",
          },
        }}
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Ucube", url: "https://poorvamcare.in/ucube" },
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
              Ucube Enrichment Programs · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Unlock Your Child's{" "}
              <span className="text-coral">Hidden Talents</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body mb-8 leading-relaxed">
              Every child has unique gifts waiting to be discovered. Our enrichment programs nurture creativity, confidence, and essential life skills through engaging, hands-on experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
              >
                Enroll Now
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
            <UcubeIllustration className="w-full max-w-md h-auto opacity-80" />
          </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Six enrichment programs designed to develop the whole child
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  key={program.title}
                  className={`rounded-2xl p-6 border ${program.bg} hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${program.color} rounded-xl flex items-center justify-center shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-heading font-semibold px-3 py-1 bg-white rounded-full text-brown-mid border border-warm-gray-200">
                      {program.ageGroup}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brown-deep mb-2">
                    {program.title}
                  </h3>
                  <p className="text-brown-mid font-body text-sm mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.features.map((f) => (
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
              Why Enrichment Matters
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Beyond academics — skills that shape confident, well-rounded individuals
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

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Common Questions About Ucube"
        subtitle="Everything you need to know about our enrichment programs"
      />

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Ready to Enrich Your Child's Skills?
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Join Ucube and give your child the skills they need to thrive in all areas of life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-coral px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-gray-50 transition-colors shadow-lg"
          >
            Enroll Today
          </Link>
        </div>
      </section>
    </>
  );
}
