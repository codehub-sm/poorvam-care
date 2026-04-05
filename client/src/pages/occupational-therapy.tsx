import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Hand, Zap, Eye, User, Edit3, Users, Brain, Activity, ArrowRight } from "lucide-react";

const focusAreas = [
  {
    title: "Sensory Processing",
    description: "Helping children regulate how their brain interprets sensory input — touch, sound, movement, and more — so they can function comfortably in daily environments.",
    icon: Brain,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "Fine Motor Skills",
    description: "Developing hand strength, dexterity, and coordination for activities like holding a pencil, doing up buttons, cutting with scissors, and using cutlery.",
    icon: Hand,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Visual-Motor Integration",
    description: "Training the eyes and hands to work together effectively — essential for reading, writing, catching a ball, and copying from the board.",
    icon: Eye,
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600 bg-cyan-100",
  },
  {
    title: "Self-Care & Daily Living",
    description: "Building independence in dressing, grooming, eating, and toileting — the everyday tasks that form the foundation of a child's confidence and autonomy.",
    icon: User,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    title: "Handwriting",
    description: "Addressing letter formation, pencil grip, spacing, and fluency so children can keep up with classroom demands and express themselves on paper.",
    icon: Edit3,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
  },
  {
    title: "Social Skills",
    description: "Developing turn-taking, reading social cues, managing emotions during group activities, and forming friendships through structured and naturalistic play.",
    icon: Users,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
  },
  {
    title: "Attention & Focus",
    description: "Strategies and sensory-based activities to improve sustained attention, task completion, and the ability to filter distractions in home and school settings.",
    icon: Zap,
    color: "bg-yellow-50 border-yellow-100",
    iconColor: "text-yellow-600 bg-yellow-100",
  },
  {
    title: "Behavioural Regulation",
    description: "Teaching children to identify emotions, manage sensory overload, and use self-regulation strategies to cope with challenging transitions and environments.",
    icon: Activity,
    color: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-600 bg-teal-100",
  },
];

const conditions = [
  "Autism Spectrum Disorder",
  "Sensory Processing Disorder",
  "Developmental Delays",
  "ADHD",
  "Cerebral Palsy",
  "Down Syndrome",
  "Dyspraxia / Developmental Coordination Disorder",
  "Learning Disabilities",
];

const faqs = [
  {
    question: "What does an occupational therapist do for children?",
    answer: "A paediatric occupational therapist (OT) helps children develop the skills they need to participate in everyday activities — at home, at school, and in the community. This includes fine motor skills (writing, using tools), sensory processing (tolerating different textures, managing noise), self-care (dressing, eating), visual-motor integration, attention, and behavioural regulation. OTs assess where a child is struggling and design targeted interventions to build those specific skills.",
  },
  {
    question: "How is OT different from physical therapy?",
    answer: "Physical therapy (PT) primarily focuses on gross motor skills, strength, balance, and mobility — helping children with movement and physical function. Occupational therapy focuses on the fine motor, sensory, cognitive, and self-care skills needed to participate in daily life activities (or 'occupations'). In practice, OT and PT often complement each other; many children at Poorvam Care benefit from both services delivered collaboratively by our multidisciplinary team.",
  },
  {
    question: "What age should a child start occupational therapy?",
    answer: "There is no lower age limit for OT. We work with infants as young as a few months old, particularly for feeding difficulties and early sensory concerns. In general, the earlier an intervention begins, the greater the benefit — particularly for sensory processing and developmental delays. However, OT is effective at any age. If you have concerns about your child's development, contact us for a free consultation at our Electronic City centre.",
  },
  {
    question: "How long is an OT session at Poorvam Care?",
    answer: "Each occupational therapy session at Poorvam Care is 45 minutes long. Sessions are available at our Electronic City Phase 1 and Phase 2 centres. The frequency of sessions (typically 2–3 per week) is determined during the initial assessment and adjusted based on your child's progress. Sessions cost ₹900 each, and we offer package plans for families committing to regular therapy.",
  },
  {
    question: "What is sensory integration therapy?",
    answer: "Sensory integration therapy is a specialised OT approach developed by Dr. A. Jean Ayres. It uses structured, play-based activities — such as swinging, climbing, and tactile exploration — to help the brain better organise and respond to sensory information from the body and environment. It is particularly beneficial for children with autism, sensory processing disorder, and ADHD who experience sensory over- or under-sensitivity. At Poorvam Care, our OT team uses sensory integration principles as a core part of therapy for eligible children.",
  },
];

export default function OccupationalTherapyPage() {
  return (
    <>
      <SeoHead
        title="Occupational Therapy in Bangalore | Paediatric OT Services | Poorvam Care Electronic City"
        description="Paediatric occupational therapy in Electronic City, Bangalore. Sensory processing, fine motor skills & daily living for children with autism. Book free consult."
        canonical="https://poorvamcare.in/occupational-therapy"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Occupational Therapy for Children",
          "description": "Paediatric occupational therapy in Electronic City, Bangalore covering sensory processing, fine motor skills, self-care, and daily living activities",
          "url": "https://poorvamcare.in/occupational-therapy",
          "telephone": "+918861764343",
          "medicalSpecialty": "Occupational Therapy",
          "relevantSpecialty": "Paediatric Occupational Therapy",
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
          { name: "Occupational Therapy", url: "https://poorvamcare.in/occupational-therapy" },
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
            <li className="text-gray-900 font-medium">Occupational Therapy</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-green-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Paediatric Occupational Therapy
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Occupational Therapy in Bangalore:{" "}
              <span className="text-green-600">Building Independence, One Skill at a Time</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Independence is not given — it is built through meaningful, purposeful activity. Our paediatric occupational therapists at Poorvam Care in Electronic City, Bangalore work with children to develop the sensory, motor, cognitive, and self-care skills that allow them to participate fully in everyday life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
              >
                Book a Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-green-600 hover:text-green-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What is OT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Is Paediatric Occupational Therapy?
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Occupational therapy (OT) helps children develop the skills required to perform the activities — or "occupations" — that are important to them and their families. For children, occupations include playing, learning, interacting with peers, attending school, and carrying out self-care tasks like dressing and eating.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              When a child struggles with these activities due to developmental, sensory, motor, or cognitive challenges, a paediatric OT assesses the underlying difficulties and designs an individualised intervention programme. OT is not just about fixing deficits — it is about building on each child's strengths and helping them participate as fully and independently as possible.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              At Poorvam Care, our senior occupational therapist Mariapan brings 15 years of paediatric experience to every case. Our OT sessions are 45 minutes, priced at ₹900 per session, and held at our Electronic City Phase 1 and Phase 2 centres in Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Areas of Focus */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Areas of Focus
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Our paediatric OT team addresses a broad range of developmental and functional areas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <article
                  key={area.title}
                  className={`rounded-2xl p-6 border ${area.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-11 h-11 ${area.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">
                    {area.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Conditions We Support
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Our occupational therapists have experience working with a wide range of diagnoses and developmental challenges. We take a strengths-based approach, focusing on what each child can do and building from there.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {conditions.map((condition) => (
                  <div key={condition} className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3 border border-green-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-gray-800 font-body text-sm font-medium">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-bold text-gray-900">Our OT Approach</h3>
              {[
                { title: "Sensory Integration", desc: "We use structured sensory-based activities, including movement, tactile exploration, and proprioceptive input, to help children regulate their nervous system and improve daily function." },
                { title: "Play-Based Therapy", desc: "Play is the primary vehicle for learning in childhood. Our OTs embed therapy goals into activities children love, maximising engagement and skill transfer to real-life settings." },
                { title: "Individualised Plans", desc: "Every child receives a personalised Occupational Therapy Programme based on a thorough assessment of their sensory, motor, cognitive, and functional needs." },
                { title: "Parent Training", desc: "Families are coached in practical strategies they can use at home. We provide 'sensory diets' — schedules of sensory activities — to support regulation throughout the day." },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-sm transition-shadow">
                  <h4 className="font-heading font-bold text-gray-900 mb-2 text-sm">{item.title}</h4>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
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
              { label: "ABA Therapy", href: "/aba-therapy" },
              { label: "Therapeutic Enrichment", href: "/therapeutic-enrichment" },
              { label: "Special Education", href: "/special-education" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-green-300 hover:shadow-sm transition-all font-heading font-semibold text-gray-800 hover:text-green-600"
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
        title="Occupational Therapy FAQs"
        subtitle="Common questions from families seeking paediatric OT in Bangalore"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Help Your Child Build the Skills They Need
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Our paediatric OT team in Electronic City, Bangalore is ready to assess your child and create a personalised intervention plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-green-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
