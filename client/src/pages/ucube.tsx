import SeoHead from "@/components/seo-head";
import StructuredData, { createFAQSchema, createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Heart, Mic, Palette, Calendar, Music, Sparkles, Check } from "lucide-react";

const programs = [
  {
    title: "Dance & Movement",
    description: "Creative dance classes to enhance coordination, self-expression, and confidence through contemporary and classical dance forms.",
    icon: Heart,
    ageGroup: "Ages 4-18",
    features: ["Contemporary Dance", "Classical Dance Forms", "Movement Therapy", "Performance Skills"],
    color: "from-emerald-500 to-emerald-600",
    bg: "bg-emerald-50 border-emerald-100",
  },
  {
    title: "Yoga & Wellness",
    description: "Mindfulness, yoga, and wellness practices for physical and mental well-being, stress management, and emotional regulation.",
    icon: Sparkles,
    ageGroup: "All Ages",
    features: ["Children's Yoga", "Mindfulness Practices", "Breathing Techniques", "Emotional Regulation"],
    color: "from-teal-500 to-teal-600",
    bg: "bg-teal-50 border-teal-100",
  },
  {
    title: "Music & Instruments",
    description: "Music education, instrument training, and vocal development for creative expression and cognitive development.",
    icon: Music,
    ageGroup: "Ages 5-18",
    features: ["Piano & Keyboard", "Guitar & Ukulele", "Vocal Training", "Music Theory"],
    color: "from-purple-500 to-purple-600",
    bg: "bg-purple-50 border-purple-100",
  },
  {
    title: "Art & Craft",
    description: "Creative expression through painting, drawing, sculpture, and hands-on artistic experiences that build fine motor skills.",
    icon: Palette,
    ageGroup: "Ages 4-16",
    features: ["Painting & Drawing", "Craft Making", "Sculpture & 3D Art", "Digital Art Creation"],
    color: "from-pink-500 to-pink-600",
    bg: "bg-pink-50 border-pink-100",
  },
  {
    title: "Public Speaking",
    description: "Build confidence and communication skills through speech writing, delivery training, and podcast production.",
    icon: Mic,
    ageGroup: "Ages 8-18",
    features: ["Speech Writing & Delivery", "Podcast Production", "Voice Modulation", "Presentation Skills"],
    color: "from-blue-500 to-blue-600",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    title: "Soft Skills & Life Skills",
    description: "Essential life skills, leadership, teamwork, and personal development for confident, well-rounded individuals.",
    icon: Calendar,
    ageGroup: "Ages 10-18",
    features: ["Leadership Skills", "Teamwork & Collaboration", "Time Management", "Problem Solving"],
    color: "from-orange-500 to-orange-600",
    bg: "bg-orange-50 border-orange-100",
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
        title="Ucube - Dance, Yoga, Music, Art & Enrichment Programs for Kids | Poorvam Care Bangalore"
        description="Unlock your child's hidden talents with Ucube enrichment programs in Bangalore. Dance, yoga, music, art, public speaking & soft skills for ages 4-18."
        canonical="https://poorvamcare.in/ucube"
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
      <section className="bg-gradient-to-br from-emerald-50 via-white to-green-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-emerald-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Ucube Enrichment Programs
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Unlock Your Child's{" "}
              <span className="text-emerald-600">Hidden Talents</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Every child has unique gifts waiting to be discovered. Our enrichment programs nurture creativity, confidence, and essential life skills through engaging, hands-on experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
              >
                Enroll Now
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-emerald-600 hover:text-emerald-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Programs
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
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
                    <span className="text-xs font-heading font-semibold px-3 py-1 bg-white rounded-full text-gray-600 border border-gray-200">
                      {program.ageGroup}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm mb-4 leading-relaxed">
                    {program.description}
                  </p>
                  <ul className="space-y-2">
                    {program.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700 font-body">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
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
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Enrichment Matters
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Beyond academics — skills that shape confident, well-rounded individuals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-gray-100">
                <h3 className="text-base font-heading font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 font-body leading-relaxed">{b.desc}</p>
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
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Ready to Enrich Your Child's Skills?
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Join Ucube and give your child the skills they need to thrive in all areas of life.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Enroll Today
          </Link>
        </div>
      </section>
    </>
  );
}
