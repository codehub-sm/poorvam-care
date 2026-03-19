import SeoHead from "@/components/seo-head";
import StructuredData, { createFAQSchema, createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Puzzle, TrendingUp, Activity, Heart, Hand, Zap, ArrowRight } from "lucide-react";

const conditions = [
  {
    title: "Autism Spectrum Disorder",
    description: "Comprehensive support focusing on communication, social skills, and behavioral interventions using ABA, speech therapy, and sensory integration.",
    icon: Puzzle,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
    approaches: ["Applied Behavior Analysis (ABA)", "Speech & Language Therapy", "Occupational Therapy", "Social Skills Training"],
  },
  {
    title: "Developmental Delays",
    description: "Supporting children who experience delays in motor skills, speech, cognition, and self-help skills through targeted interventions.",
    icon: TrendingUp,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
    approaches: ["Gross & Fine Motor Development", "Language & Communication", "Cognitive Development", "Play Skills"],
  },
  {
    title: "Cerebral Palsy",
    description: "Specialized care focusing on mobility, communication, and independence through multidisciplinary therapy approaches.",
    icon: Activity,
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600 bg-cyan-100",
    approaches: ["Physical Therapy", "Occupational Therapy", "Speech Therapy", "Assistive Technology"],
  },
  {
    title: "Down Syndrome",
    description: "Comprehensive support promoting independence, communication, and social integration through individualized programs.",
    icon: Heart,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
    approaches: ["Speech & Language Development", "Motor Skills Enhancement", "Social Integration", "Life Skills Training"],
  },
  {
    title: "Sensory Processing",
    description: "Helping children who struggle with processing sensory information through specialized sensory integration therapy.",
    icon: Hand,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
    approaches: ["Sensory Integration Therapy", "Sensory Diet Development", "Environmental Modifications", "Self-Regulation Strategies"],
  },
  {
    title: "ADHD Support",
    description: "Comprehensive strategies to improve focus, organization, executive function, and social skills in children with ADHD.",
    icon: Zap,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
    approaches: ["Behavioral Interventions", "Executive Function Training", "Social Skills Groups", "School Support Planning"],
  },
];

const faqs = [
  {
    question: "What is the best therapy for autism in Bangalore?",
    answer: "The best therapy depends on each child's unique needs. At Poorvam Care in Electronic City, we offer evidence-based approaches including ABA therapy, speech therapy, occupational therapy, and social skills training. Our team creates individualized programs combining multiple therapies for the best outcomes.",
  },
  {
    question: "How do I know if my child needs speech therapy?",
    answer: "Signs include: not babbling by 12 months, not using single words by 16 months, difficulty following simple instructions, unclear speech after age 3, or stuttering. If you have concerns, a professional evaluation can determine if therapy would help. We offer free initial consultations.",
  },
  {
    question: "At what age should early intervention begin?",
    answer: "The earlier the better. Research shows early intervention before age 3 yields the most significant results. However, therapy can be beneficial at any age. Our programs serve children from infancy through age 18.",
  },
  {
    question: "What is ABA therapy and how does it work?",
    answer: "Applied Behavior Analysis (ABA) is an evidence-based therapy that uses positive reinforcement to teach new skills and reduce challenging behaviors. It breaks complex skills into small, teachable steps and is considered the gold standard for autism therapy.",
  },
  {
    question: "How long does occupational therapy take to show results?",
    answer: "Most families notice improvements within 3-6 months of consistent therapy. However, the timeline varies depending on the child's condition, age at start, and frequency of sessions. We provide regular progress reports to track milestones.",
  },
  {
    question: "Do you provide home-based therapy programs?",
    answer: "Yes, we provide parent training and home program guidance so families can reinforce therapy goals at home. We also offer teletherapy sessions for certain services. Our center-based sessions are at our Electronic City locations in Bangalore.",
  },
  {
    question: "What qualifications do your therapists have?",
    answer: "Our team includes RCI-registered professionals, certified speech-language pathologists (CCC-SLP), SIPT-certified occupational therapists, BCBA-certified behavior analysts, and special educators with M.Ed degrees. All therapists undergo continuous professional development.",
  },
  {
    question: "How much does child therapy cost in Bangalore?",
    answer: "Therapy costs vary based on the type and frequency of sessions needed. We offer competitive rates and flexible packages. Contact us for a free consultation where we'll discuss your child's needs and recommend an appropriate plan with transparent pricing.",
  },
];

const team = [
  { name: "Apoorva", title: "Clinical Director & Speech Therapist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg", exp: "13+" },
  { name: "Mariapan", title: "Sr. Occupational Therapist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/mariapan.png", exp: "15+" },
  { name: "Niranjana", title: "Sr. Speech & Language Pathologist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg", exp: "8+" },
  { name: "Ananya", title: "Clinic Manager & Behavioural Therapist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/ananya.jpeg", exp: "3+" },
  { name: "Pooja", title: "Sr. Special Education Teacher", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/Pooja.jpg", exp: "6+" },
  { name: "Aftab", title: "Physiotherapist / Play Therapist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/aftab.png", exp: "2+" },
];

export default function ChildDevelopmentPage() {
  return (
    <>
      <SeoHead
        title="Child Development Center - Therapy for Autism, Speech Delays & More | Poorvam Care Bangalore"
        description="Expert child development therapy in Electronic City, Bangalore. ABA therapy, speech therapy, occupational therapy for autism, developmental delays, ADHD & more. RCI registered therapists."
        canonical="https://poorvamcare.in/child-development"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Poorvam Care - Child Development Center",
          "description": "Expert child development therapy for autism, developmental delays, cerebral palsy, and more",
          "url": "https://poorvamcare.in/child-development",
          "telephone": "+918861764343",
          "medicalSpecialty": "Pediatric Therapy",
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
        { name: "Child Development", url: "https://poorvamcare.in/child-development" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Child Development Center
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Helping Your Child Reach Their{" "}
              <span className="text-blue-600">Full Potential</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              We understand the concerns you have for your child. Our team of experienced therapists provides compassionate, evidence-based care tailored to your child's unique needs — helping them grow, communicate, and thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book Free Assessment
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

      {/* Conditions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Conditions We Specialize In
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Our expert team provides comprehensive care for a wide range of developmental and communication needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditions.map((condition) => {
              const Icon = condition.icon;
              return (
                <article
                  key={condition.title}
                  className={`rounded-2xl p-6 border ${condition.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 ${condition.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                    {condition.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm mb-4 leading-relaxed">
                    {condition.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {condition.approaches.map((a) => (
                      <span
                        key={a}
                        className="text-xs font-body px-2.5 py-1 rounded-full bg-white text-gray-600 border border-gray-200"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Evidence-Based Approach
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              We combine the latest research with compassionate, family-centered care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Comprehensive Assessment",
                desc: "Every child receives a thorough multidisciplinary evaluation to understand their unique strengths and challenges before we create a treatment plan.",
              },
              {
                title: "Individualized Programs",
                desc: "No two children are alike. We create personalized therapy plans with specific, measurable goals tailored to each child's developmental profile.",
              },
              {
                title: "Family-Centered Care",
                desc: "Parents are partners in therapy. We provide regular training, home programs, and progress updates so you can support your child's growth every day.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Meet Our Therapy Team
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Experienced, certified professionals who genuinely care about your child
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=3B82F6&color=fff`;
                    }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-gray-900 text-sm">
                  {member.name}
                </h3>
                <p className="text-xs text-gray-500 font-body">{member.title}</p>
                <p className="text-xs text-blue-600 font-body">{member.exp} years</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Common Questions About Child Therapy"
        subtitle="Answers to help you make informed decisions about your child's care"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Your Child's Journey Starts Here
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation today and let our experts assess how we can help your child thrive.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Book Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
