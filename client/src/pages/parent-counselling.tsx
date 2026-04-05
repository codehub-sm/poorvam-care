import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Heart, MessageCircle, Users, Shield, Home, BookOpen, Laptop, ArrowRight } from "lucide-react";

const topics = [
  {
    title: "Understanding Diagnoses",
    description: "Breaking down what your child's diagnosis means, what the research says, and how to find reliable information — replacing confusion with clarity.",
    icon: BookOpen,
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-600 bg-blue-100",
  },
  {
    title: "Home Strategies",
    description: "Practical, evidence-informed techniques for managing meltdowns, building routines, supporting communication, and reinforcing therapy goals in everyday family life.",
    icon: Home,
    color: "bg-green-50 border-green-100",
    iconColor: "text-green-600 bg-green-100",
  },
  {
    title: "Managing Stress & Grief",
    description: "Caregiving for a child with additional needs is emotionally demanding. Counselling provides a safe, non-judgemental space to process grief, fear, guilt, and burnout.",
    icon: Heart,
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600 bg-purple-100",
  },
  {
    title: "School Advocacy",
    description: "How to communicate effectively with schools, request appropriate accommodations, navigate the IEP process, and advocate confidently for your child's educational needs.",
    icon: Shield,
    color: "bg-orange-50 border-orange-100",
    iconColor: "text-orange-600 bg-orange-100",
  },
  {
    title: "Sibling Support",
    description: "Addressing the impact of a child's diagnosis on siblings — their feelings, questions, and needs — and strategies for supporting all children in the family.",
    icon: Users,
    color: "bg-pink-50 border-pink-100",
    iconColor: "text-pink-600 bg-pink-100",
  },
  {
    title: "Communication with Your Child",
    description: "Building connection, trust, and effective communication with your child — regardless of their verbal ability, behaviour, or level of developmental difference.",
    icon: MessageCircle,
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "text-cyan-600 bg-cyan-100",
  },
];

const expectations = [
  { heading: "A judgement-free space", desc: "Our counsellors create a warm, confidential environment where parents can speak freely about fears, frustrations, and feelings they may not share anywhere else." },
  { heading: "Collaborative goal-setting", desc: "We begin by listening. Together, we identify the areas where you most need support and set practical goals for each counselling block." },
  { heading: "Evidence-informed guidance", desc: "Our recommendations are grounded in current research on autism, developmental disabilities, and family systems — not generic advice." },
  { heading: "Connection to your child's therapy team", desc: "Because parent counselling happens within Poorvam Care, we can coordinate with your child's speech, OT, or ABA therapist to ensure a consistent approach at home and in clinic." },
  { heading: "Regular review", desc: "We check in on progress regularly and adapt the focus of sessions as your family's needs evolve over time." },
];

const faqs = [
  {
    question: "What is parent counselling for special needs children?",
    answer: "Parent counselling for special needs children is a professional support service for parents and caregivers of children with disabilities, developmental differences, or complex health needs. It provides a structured, confidential space to process emotions, gain practical strategies, understand your child's condition more deeply, and strengthen your ability to support your child's development. It is not therapy for the child — it is support for the people who care for them.",
  },
  {
    question: "Do both parents need to attend counselling sessions?",
    answer: "No. Counselling can be attended by one parent, both parents together, or other primary caregivers (grandparents, for example). Many families find it valuable for both parents to attend at least some sessions together, particularly when establishing consistent home strategies. However, individual sessions are equally valuable. We are flexible and work with whatever arrangement is practical for your family.",
  },
  {
    question: "Can parent counselling happen online?",
    answer: "Yes. Parent counselling is well-suited to online delivery, and we offer teletherapy sessions at ₹600 per 45-minute session. Online sessions are particularly convenient for working parents, families managing complex logistics, or parents who find it easier to talk from the privacy of their own home. In-centre sessions are also available at our Electronic City, Bangalore locations for families who prefer face-to-face support.",
  },
  {
    question: "How often should parents attend counselling?",
    answer: "The frequency of counselling depends on where you are in your journey. Families at the beginning — recently after a diagnosis, or in a period of crisis — often benefit from weekly sessions. Once things have stabilised, fortnightly or monthly check-ins may be sufficient. Our clinical team will recommend a frequency at the outset and adjust as needed. There is no fixed number of sessions — we support you for as long as it is helpful.",
  },
  {
    question: "What is the cost of parent counselling at Poorvam Care?",
    answer: "In-centre parent counselling sessions at Poorvam Care are ₹800 per 45-minute session. Online sessions are available at ₹600 per session. We offer package plans for families who commit to a block of sessions. Contact us via phone (+91 886 176 4343) or the contact form on our website to enquire about current packages and to book your first session.",
  },
];

export default function ParentCounsellingPage() {
  return (
    <>
      <SeoHead
        title="Parent Counselling for Special Needs Children | Poorvam Care Electronic City Bangalore"
        description="Parent counselling for families of children with autism, speech delay & disabilities in Electronic City, Bangalore. Expert guidance. Book a free session today."
        canonical="https://poorvamcare.in/parent-counselling"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalTherapy",
          "name": "Parent Counselling & Family Support",
          "description": "Professional parent counselling and family support for caregivers of children with autism, developmental delays, and disabilities in Electronic City, Bangalore",
          "url": "https://poorvamcare.in/parent-counselling",
          "telephone": "+918861764343",
          "medicalSpecialty": "Family Counselling",
          "relevantSpecialty": "Parent Counselling for Special Needs",
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
          { name: "Parent Counselling", url: "https://poorvamcare.in/parent-counselling" },
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
            <li className="text-gray-900 font-medium">Parent Counselling</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-purple-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Parent &amp; Family Support
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Parent Counselling in Bangalore:{" "}
              <span className="text-purple-600">You Don't Have to Navigate This Alone</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Raising a child with autism, speech delay, or a developmental disability is one of the most demanding journeys a parent can face. At Poorvam Care in Electronic City, Bangalore, our parent counselling service provides expert guidance, emotional support, and practical strategies — so you can be the best possible support for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/25"
              >
                Book a Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-purple-600 hover:text-purple-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-6">
              Why Parent Counselling Matters
            </h2>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Research consistently shows that parent wellbeing directly impacts child outcomes. When parents are informed, emotionally regulated, and equipped with effective strategies, their children make faster progress in therapy, display fewer behavioural challenges at home, and develop stronger bonds with their caregivers.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed mb-4">
              Yet the needs of parents are often overlooked in the child-focused world of special needs care. Appointments, therapy schedules, school meetings, and the relentless demands of caregiving leave little space for parents to process their own experience. Parent counselling creates that space.
            </p>
            <p className="text-lg text-gray-600 font-body leading-relaxed">
              At Poorvam Care, we see parents as essential members of the therapy team. Our counselling service is not an add-on — it is a core part of how we achieve the best outcomes for children. Led by Clinical Director Apoorva Rai (MASLP, ISHA Certified, 13+ years of experience), our team provides empathetic, evidence-informed guidance that respects your expertise as the person who knows your child best.
            </p>
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              What We Cover in Parent Counselling
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Sessions are flexible and led by your family's needs. Common topics include:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <article
                  key={topic.title}
                  className={`rounded-2xl p-6 border ${topic.color} hover:shadow-md transition-shadow`}
                >
                  <div className={`w-11 h-11 ${topic.iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-gray-900 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 font-body text-sm leading-relaxed">
                    {topic.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to Expect + Online */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                What to Expect in Sessions
              </h2>
              <p className="text-gray-600 font-body leading-relaxed mb-6">
                Parent counselling at Poorvam Care is different from general mental health therapy. Our sessions are focused, practical, and child-centred — while also taking your emotional experience seriously. Here is how we work:
              </p>
              <div className="space-y-4">
                {expectations.map((item) => (
                  <div key={item.heading} className="flex gap-4">
                    <Heart className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-heading font-bold text-gray-900 text-sm mb-1">{item.heading}</h4>
                      <p className="text-gray-600 font-body text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="bg-purple-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <Laptop className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-heading font-bold text-gray-900">Online Counselling Available</h3>
                </div>
                <p className="text-gray-600 font-body leading-relaxed mb-4">
                  We understand that attending in-person sessions adds another commitment to an already demanding schedule. Parent counselling is fully available online via video call at ₹600 per 45-minute session — just as effective as in-person, and far more convenient.
                </p>
                <p className="text-gray-600 font-body leading-relaxed mb-4">
                  Online counselling is available from anywhere in India, making it accessible to families who are not in Bangalore but wish to access Poorvam Care's expertise.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-purple-600 font-heading font-semibold hover:underline"
                >
                  Book an online session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">Our Approach</h3>
                <div className="space-y-3">
                  {[
                    "Empathetic and non-judgemental",
                    "Evidence-informed and practical",
                    "Parent as expert and partner",
                    "Culturally sensitive",
                    "Connected to your child's therapy goals",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0" />
                      <span className="text-gray-700 font-body text-sm">{item}</span>
                    </div>
                  ))}
                </div>
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
              { label: "ABA Therapy", href: "/aba-therapy" },
              { label: "Special Education", href: "/special-education" },
              { label: "Occupational Therapy", href: "/occupational-therapy" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between bg-white rounded-xl px-5 py-4 border border-gray-100 hover:border-purple-300 hover:shadow-sm transition-all font-heading font-semibold text-gray-800 hover:text-purple-600"
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
        title="Parent Counselling FAQs"
        subtitle="Common questions from families seeking support in Bangalore"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Take Care of Yourself — So You Can Take Care of Your Child
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free consultation with our parent counselling team at Poorvam Care. Online and in-centre sessions available at Electronic City, Bangalore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Call: +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
