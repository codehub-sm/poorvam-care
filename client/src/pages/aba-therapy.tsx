import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { BarChart2, Target, TrendingUp, CheckCircle, Users, BookOpen, ArrowRight } from "lucide-react";

const abaComponents = [
  {
    title: "Discrete Trial Training (DTT)",
    description: "Structured, one-on-one teaching using clear instructions, prompts, and reinforcement to build new skills in small, manageable steps. Ideal for foundational learning.",
    icon: Target,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Natural Environment Training (NET)",
    description: "Skills are taught and practised in everyday settings — at the table, during play, and in social interactions — promoting generalisation to real life.",
    icon: Users,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    title: "Positive Reinforcement",
    description: "Desired behaviours are consistently followed by meaningful rewards, strengthening the likelihood that the child will use those skills independently over time.",
    icon: CheckCircle,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "Data-Driven Progress",
    description: "Every session involves data collection. We track each skill and behaviour across sessions, allowing us to objectively measure progress and refine the programme.",
    icon: BarChart2,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
  },
  {
    title: "Skill Building Across Domains",
    description: "ABA targets communication, social skills, self-care, play, and academic readiness — addressing the full range of developmental needs, not just behaviour.",
    icon: TrendingUp,
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600 bg-cyan-100",
  },
  {
    title: "Parent & Caregiver Training",
    description: "Parents are trained in ABA techniques so they can consistently implement strategies at home, extending therapy gains far beyond the clinic walls.",
    icon: BookOpen,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
  },
];

const benefits = [
  { label: "Improves communication and language skills" },
  { label: "Reduces challenging and harmful behaviours" },
  { label: "Builds social and play skills" },
  { label: "Increases independence in daily routines" },
  { label: "Teaches academic readiness skills" },
  { label: "Improves attention and focus" },
  { label: "Reduces anxiety and meltdowns" },
  { label: "Strengthens parent-child interaction" },
];

const faqs = [
  {
    question: "What is ABA therapy and how does it help?",
    answer: "Applied Behavior Analysis (ABA) is a scientifically validated therapy based on the science of learning and behaviour. It uses systematic teaching techniques, positive reinforcement, and data collection to increase helpful skills and reduce behaviours that interfere with learning and independence. ABA therapy helps children develop communication, social, self-care, academic, and daily living skills in a structured, measurable way.",
  },
  {
    question: "Is ABA therapy effective for autism?",
    answer: "Yes. ABA therapy is considered the gold standard treatment for autism spectrum disorder, with over 40 years of peer-reviewed research supporting its effectiveness. Major health bodies including the American Academy of Pediatrics and the Indian medical establishment recognise ABA as the most evidence-based intervention for autism. Intensive ABA therapy, started early, has been shown to produce significant improvements in communication, social skills, and adaptive behaviour.",
  },
  {
    question: "At what age should ABA therapy begin?",
    answer: "ABA therapy is most effective when begun early — ideally between ages 2 and 5. Early intervention during this critical developmental window takes advantage of high brain plasticity. However, ABA therapy is beneficial at any age. Teenagers and adults with autism also make meaningful gains through ABA-informed interventions. At Poorvam Care, we offer ABA therapy for children and young people of all ages in our Electronic City, Bangalore centres.",
  },
  {
    question: "How many hours of ABA therapy does a child need?",
    answer: "Research suggests that intensive ABA therapy (20–40 hours per week) produces the best outcomes for young children with autism. However, the right intensity depends on the child's individual needs, goals, and family circumstances. At Poorvam Care, our clinical team conducts a thorough assessment and recommends a programme that balances therapeutic intensity with the child's wellbeing and your family's capacity. Sessions are 45 minutes and may be daily or several times a week.",
  },
  {
    question: "Is ABA therapy available online in Bangalore?",
    answer: "Certain components of ABA therapy — particularly parent training, consultation, and generalisation coaching — can be delivered online at ₹600 per session. However, direct skill-building with young children typically produces better outcomes in person. Our Electronic City centres offer in-centre ABA sessions at ₹800 per 45-minute session. Contact us to discuss the best combination of in-centre and online support for your family.",
  },
];

export default function ABATherapyPage() {
  return (
    <>
      <SeoHead
        title="ABA Therapy in Bangalore for Autism | Evidence-Based ABA | Poorvam Care Electronic City"
        description="Evidence-based ABA therapy for autism in Electronic City, Bangalore. Improve communication, behaviour & social skills. Book a free consultation today."
        canonical="https://poorvamcare.in/aba-therapy"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Applied Behavior Analysis (ABA) Therapy",
          "description": "Evidence-based ABA therapy for autism and developmental disabilities in Electronic City, Bangalore. Improving communication, behaviour, and social skills.",
          "url": "https://poorvamcare.in/aba-therapy",
          "telephone": "+918861764343",
          "medicalSpecialty": "Behavioral Therapy",
          "relevantSpecialty": "Applied Behavior Analysis",
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
          { name: "ABA Therapy", url: "https://poorvamcare.in/aba-therapy" },
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
            <li className="text-gray-900 font-medium">ABA Therapy</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Applied Behavior Analysis
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              ABA Therapy in Bangalore:{" "}
              <span className="text-blue-600">The Gold Standard for Autism Treatment</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Applied Behavior Analysis (ABA) therapy is the most extensively researched and validated intervention for autism spectrum disorder. At Poorvam Care in Electronic City, Bangalore, our certified therapists deliver personalised, data-driven ABA programmes that help children build communication, social, and daily living skills while reducing challenging behaviours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book a Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is ABA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Is ABA Therapy?
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Applied Behavior Analysis (ABA) is a scientific discipline that applies our understanding of how behaviour works — how it is learned, maintained, and changed — to improve socially meaningful skills. It is not a single technique but a framework of strategies, all grounded in the same core principles: define target behaviours clearly, measure them precisely, design interventions based on data, and evaluate outcomes rigorously.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              In practice, ABA therapy for children with autism involves structured teaching sessions, natural environment learning, and continuous data collection to build skills and reduce barriers to learning. Goals are set collaboratively with families, reviewed regularly, and adjusted as the child progresses.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              The evidence base for ABA in autism is robust. Decades of peer-reviewed research, systematic reviews, and meta-analyses have demonstrated significant improvements in communication, adaptive behaviour, social skills, and IQ scores with intensive, early ABA intervention. It is endorsed by leading medical bodies worldwide and is the therapy of choice at Poorvam Care.
            </p>
          </div>
        </div>
      </section>

      {/* How Poorvam Implements ABA */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              How We Implement ABA at Poorvam Care
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Our ABA programmes combine multiple evidence-based techniques, tailored to each child's learning profile and family goals
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {abaComponents.map((component) => {
              const Icon = component.icon;
              return (
                <article
                  key={component.title}
                  className={`rounded-2xl p-6 border ${component.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-11 h-11 ${component.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-2">
                    {component.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">
                    {component.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who Benefits + Evidence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Who Benefits From ABA Therapy?
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                While ABA therapy is most commonly associated with autism spectrum disorder, its principles and techniques are effective for a broader range of developmental and behavioural challenges. At Poorvam Care, we use ABA-informed approaches with children who have:
              </p>
              <div className="space-y-3 mb-6">
                {[
                  "Autism Spectrum Disorder (any severity level)",
                  "Global Developmental Delay",
                  "ADHD with significant behavioural challenges",
                  "Intellectual Disability",
                  "Behavioural disorders impacting daily function",
                  "Limited or absent verbal communication",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 font-body">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 font-body leading-relaxed">
                ABA therapy is particularly powerful when combined with <Link href="/speech-therapy" className="text-blue-600 hover:underline">speech therapy</Link> and <Link href="/occupational-therapy" className="text-blue-600 hover:underline">occupational therapy</Link> — a multidisciplinary approach we specialise in at Poorvam Care.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                What ABA Can Achieve
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                With consistent, well-designed ABA therapy, children commonly achieve meaningful improvements in the following areas:
              </p>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-gray-800 font-body text-sm">{benefit.label}</span>
                  </div>
                ))}
              </div>
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
              { label: "Speech Therapy", href: "/speech-therapy" },
              { label: "Occupational Therapy", href: "/occupational-therapy" },
              { label: "Special Education", href: "/special-education" },
              { label: "Parent Counselling", href: "/parent-counselling" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-blue-300 hover:shadow-sm transition-all font-heading font-semibold text-gray-800 hover:text-blue-600"
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
        title="ABA Therapy FAQs"
        subtitle="Everything families in Bangalore want to know about ABA therapy"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Your Child's ABA Journey Today
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation with our ABA therapy team at Poorvam Care in Electronic City, Bangalore. We will assess your child and recommend the right programme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
