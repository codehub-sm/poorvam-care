import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MessageCircle, Brain, Ear, Smile, Wind, Volume2, Baby, ArrowRight } from "lucide-react";

const conditions = [
  {
    title: "Speech Delay",
    description: "Children who are not meeting expected speech milestones receive targeted intervention to build vocabulary, sentence structure, and expressive communication.",
    icon: MessageCircle,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Autism & Social Communication",
    description: "Specialized strategies to develop functional communication, pragmatic language, and social interaction skills for children on the autism spectrum.",
    icon: Brain,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "Articulation Disorders",
    description: "Helping children produce speech sounds correctly so their speech is clear and easy for others to understand across all settings.",
    icon: Volume2,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    title: "Stuttering & Dysfluency",
    description: "Evidence-based fluency therapy that reduces stuttering, builds confidence, and equips children with strategies to communicate freely.",
    icon: Wind,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
  },
  {
    title: "Language Processing",
    description: "Addressing difficulties with understanding and using language, including following directions, answering questions, and narrative skills.",
    icon: Brain,
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600 bg-cyan-100",
  },
  {
    title: "Hearing Impairment",
    description: "Supporting children with hearing loss to develop spoken language, listening skills, and communication strategies alongside audiological care.",
    icon: Ear,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
  },
  {
    title: "Cleft Lip & Palate",
    description: "Specialized speech therapy addressing the resonance, articulation, and feeding challenges associated with cleft lip and palate conditions.",
    icon: Smile,
    color: "bg-yellow-50 border-yellow-100",
    iconColor: "text-yellow-600 bg-yellow-100",
  },
  {
    title: "Voice Disorders",
    description: "Assessment and treatment of voice quality, pitch, and resonance issues to help children develop a healthy, functional voice.",
    icon: Volume2,
    color: "bg-teal-50 border-teal-100",
    iconColor: "text-teal-600 bg-teal-100",
  },
];

const ageGroups = [
  {
    range: "Infants (0–2 years)",
    desc: "Early communication foundations — babbling, joint attention, first words, and pre-linguistic skills. Early intervention during this critical window delivers the strongest outcomes.",
  },
  {
    range: "Toddlers (2–5 years)",
    desc: "Vocabulary explosion, sentence building, speech clarity, and social communication. Play-based therapy keeps young children engaged and motivated.",
  },
  {
    range: "School-Age (6–12 years)",
    desc: "Literacy, narrative skills, classroom participation, and peer communication. We coordinate with teachers and schools to support academic success.",
  },
  {
    range: "Teens (13+ years)",
    desc: "Fluency, voice, social pragmatics, and self-advocacy. Adolescent-focused therapy respects the young person's own goals and builds independence.",
  },
];

const signs = [
  "Not babbling or using gestures by 12 months",
  "No single words by 16 months",
  "Not combining two words by 24 months",
  "Difficulty following simple instructions",
  "Speech that is hard for familiar people to understand after age 3",
  "Frustration when trying to communicate",
  "Avoiding talking or withdrawing from social situations",
  "Noticeable repetition, prolongation, or blocking of sounds while speaking",
];

const faqs = [
  {
    question: "What age should my child start speech therapy?",
    answer: "There is no minimum age for speech therapy. If you have concerns about your child's communication development, early intervention is always better. We see children from 6 months of age. Research consistently shows that intervention before age 3 produces the greatest gains, but therapy is beneficial at any age. If your child is not meeting speech and language milestones, contact us for a free consultation.",
  },
  {
    question: "How long does speech therapy take to show results?",
    answer: "Most families notice meaningful progress within 3 to 6 months of consistent therapy. The timeline depends on the nature and severity of the communication difficulty, the child's age, how frequently sessions are held, and how actively the family practises goals at home. Our therapists provide regular progress reports and adjust the programme as your child advances.",
  },
  {
    question: "What are the signs my child needs speech therapy?",
    answer: "Key signs include: not babbling by 12 months, no single words by 16 months, not combining words by 24 months, speech that is difficult for strangers to understand after age 3, difficulty following simple instructions, frequent frustration when communicating, and stuttering or repetitions when speaking. If you notice any of these signs, a professional evaluation can clarify whether therapy is needed.",
  },
  {
    question: "Is speech therapy available online in Bangalore?",
    answer: "Yes. Poorvam Care offers teletherapy sessions for speech and language therapy at ₹600 per 45-minute session. Online therapy is effective for many communication goals, particularly language development, fluency, and parent coaching. For very young children or those who need hands-on assessment, in-centre sessions at our Electronic City locations are recommended.",
  },
  {
    question: "How much does speech therapy cost in Bangalore?",
    answer: "In-centre speech therapy sessions at Poorvam Care are ₹800 per 45-minute session. Online sessions are available at ₹600 per session. We offer package plans that reduce the per-session cost for families committing to a block of sessions. Contact us for current package pricing and to discuss a plan that fits your family's needs and budget.",
  },
];

export default function SpeechTherapyPage() {
  return (
    <>
      <SeoHead
        title="Speech Therapy in Bangalore | Expert Speech Therapists | Poorvam Care Electronic City"
        description="Expert speech therapy for children in Electronic City, Bangalore. RCI-licensed therapists treat speech delay, autism, stuttering & more. Book free consultation."
        canonical="https://poorvamcare.in/speech-therapy"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Speech Therapy for Children",
          "description": "Expert speech and language therapy for children with speech delay, autism, articulation disorders, stuttering, and more in Electronic City, Bangalore",
          "url": "https://poorvamcare.in/speech-therapy",
          "telephone": "+918861764343",
          "medicalSpecialty": "Speech-Language Pathology",
          "relevantSpecialty": "Pediatric Speech Therapy",
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
          { name: "Speech Therapy", url: "https://poorvamcare.in/speech-therapy" },
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
            <li className="text-gray-900 font-medium">Speech Therapy</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Speech &amp; Language Therapy
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy in Bangalore:{" "}
              <span className="text-blue-600">Helping Children Find Their Voice</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Every child has something to say. When communication becomes a challenge, the right support can make all the difference. At Poorvam Care in Electronic City, Bangalore, our RCI-licensed speech-language pathologists use evidence-based, play-centred approaches to help children communicate with confidence — at home, at school, and with the world.
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

      {/* What is Speech Therapy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              What Is Speech Therapy?
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Speech therapy, formally known as speech-language pathology, is a specialised healthcare service that evaluates and treats communication disorders in children and adults. A speech-language pathologist (SLP) works with individuals who have difficulty with speech sounds, language comprehension and expression, voice, fluency, and social communication.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              For children, early speech and language development is a critical foundation for learning, socialising, and emotional wellbeing. When a child's communication skills lag behind expected milestones, timely, structured therapy can close that gap significantly — often before the child enters formal schooling.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              At Poorvam Care, our speech therapists hold a Master of Audiology and Speech-Language Pathology (MASLP) qualification and are registered with the Rehabilitation Council of India (RCI). Our lead clinician, Apoorva Rai (MASLP, ISHA Certified), brings over 13 years of paediatric experience to every assessment and intervention programme.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Conditions We Treat
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Our speech therapists have expertise across a wide range of communication difficulties in children
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.map((condition) => {
              const Icon = condition.icon;
              return (
                <article
                  key={condition.title}
                  className={`rounded-2xl p-6 border ${condition.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-11 h-11 ${condition.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-2">
                    {condition.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">
                    {condition.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
                Signs Your Child May Need Speech Therapy
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Children develop at their own pace, but certain signs suggest a professional evaluation would be beneficial. Trust your instincts — if something feels off, it is always better to have your child assessed than to wait.
              </p>
              <ul className="space-y-3">
                {signs.map((sign) => (
                  <li key={sign} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </span>
                    <span className="text-gray-700 font-body">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                Not Sure If Your Child Needs Therapy?
              </h3>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Our clinical team offers free initial consultations. In 30 minutes, we can screen your child's communication skills, answer your questions, and give you a clear picture of whether formal assessment or therapy is recommended.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              The Poorvam Approach to Speech Therapy
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Evidence-based, child-centred, and deeply collaborative — here is how we work
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Play-Based Therapy",
                desc: "Children learn best through play. We embed communication goals into activities that children find engaging and motivating, maximising learning within each 45-minute session.",
              },
              {
                title: "Family Involvement",
                desc: "Parents are coached in every session. We provide home practice activities and regular updates so that therapy goals are reinforced throughout the child's day — not just during clinic hours.",
              },
              {
                title: "RCI-Licensed Therapists",
                desc: "All our speech therapists are registered with the Rehabilitation Council of India and hold MASLP or equivalent qualifications. Apoorva Rai is additionally ISHA Certified with 13+ years of experience.",
              },
              {
                title: "Evidence-Based Practice",
                desc: "We use approaches that are supported by clinical research — including PECS, Hanen, PROMPT, and fluency-shaping techniques — selecting the right method for each child's unique profile.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-base font-heading font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Age Groups We Serve
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              From infants to teenagers, our speech therapy programmes are tailored to developmental stage and individual need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ageGroups.map((group) => (
              <div key={group.range} className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Baby className="w-5 h-5 text-blue-600" />
                  <h3 className="font-heading font-bold text-gray-900 text-sm">{group.range}</h3>
                </div>
                <p className="text-gray-600 font-body text-sm leading-relaxed">{group.desc}</p>
              </div>
            ))}
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
              { label: "ABA Therapy", href: "/aba-therapy" },
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
        title="Speech Therapy FAQs"
        subtitle="Answers to the most common questions from families in Bangalore"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Give Your Child the Gift of Communication
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation with our speech therapy team at our Electronic City centre. Let us assess your child and create a personalised plan.
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
