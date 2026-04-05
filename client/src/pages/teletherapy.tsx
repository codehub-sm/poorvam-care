import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import {
  Video,
  Wifi,
  CalendarCheck,
  Star,
  Globe,
  CheckCircle,
  Users,
  IndianRupee,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Book Your Session",
    desc: "Call us or fill in the online form to choose your preferred date, time, and therapist. We confirm within 24 hours.",
  },
  {
    step: "02",
    title: "Receive Confirmation",
    desc: "You receive a WhatsApp or email confirmation with the session link, therapist details, and a short pre-session questionnaire.",
  },
  {
    step: "03",
    title: "Join the Video Call",
    desc: "At the scheduled time, click the secure link to join. No software installation needed — works on any modern browser.",
  },
  {
    step: "04",
    title: "Attend Your Session",
    desc: "Your therapist conducts a structured 45-minute session using evidence-based techniques, visual materials, and interactive activities.",
  },
  {
    step: "05",
    title: "Home Practice Plan",
    desc: "After each session you receive a personalised home practice plan so your child can reinforce what was covered during the session.",
  },
];

const servicesOnline = [
  { name: "Speech Therapy", desc: "Articulation, language development, fluency, and AAC support." },
  { name: "Parent Counselling", desc: "Guidance on communication strategies, behaviour management, and home routines." },
  { name: "ABA Consultation", desc: "Behaviour analysis review, goal-setting, and programme consultation for parents and caregivers." },
  { name: "Behavioural Guidance", desc: "Strategies for managing challenging behaviours and building adaptive skills at home." },
];

const benefits = [
  { icon: Globe, title: "Pan-India Access", desc: "Families anywhere in India can access the same RCI-licensed therapists available at our Bangalore centres." },
  { icon: CalendarCheck, title: "No Commute", desc: "Save 45–90 minutes of travel time per session — time your child can spend resting or playing." },
  { icon: Star, title: "Same Qualified Therapists", desc: "Every teletherapy session is conducted by the exact same certified professionals who see in-person clients." },
  { icon: Wifi, title: "Technology-Friendly", desc: "Sessions run on a simple video link — no app downloads, no complex setup. Works on phones, tablets, and laptops." },
  { icon: Users, title: "Ideal for Follow-ups", desc: "Continue progress seamlessly between in-person blocks or during travel, illness, or school holidays." },
  { icon: IndianRupee, title: "Affordable Pricing", desc: "At ₹600 per 45-minute session, teletherapy is our most accessible therapy option." },
];

const idealFor = [
  "Families residing outside Bangalore or in cities with limited specialist therapy access",
  "Parents with demanding work schedules who cannot commute to a clinic during the day",
  "Children attending school who require therapy during non-school hours",
  "Follow-up sessions between intensive in-person therapy blocks",
  "Families on short-term relocation or travelling for extended periods",
  "Initial parent consultations and second-opinion evaluations",
  "Ongoing parent training and home-programme coaching",
];

const techRequirements = [
  { item: "Device", detail: "Smartphone, tablet, or laptop with a front-facing camera" },
  { item: "Internet", detail: "Stable broadband or 4G/5G connection (minimum 5 Mbps recommended)" },
  { item: "Environment", detail: "A quiet, well-lit room with minimal background distractions" },
  { item: "Software", detail: "A modern web browser (Chrome, Safari, Firefox) — no downloads required" },
  { item: "Optional", detail: "Headphones improve audio clarity, especially for speech articulation work" },
];

const faqs = [
  {
    question: "What is teletherapy and how does it work?",
    answer:
      "Teletherapy (also called online therapy or telehealth) delivers professional speech therapy, parent counselling, and behavioural guidance through a secure video call. At Poorvam Care, you book a session online or by phone, receive a video link, and attend a structured 45-minute session with one of our RCI-licensed therapists from anywhere in India. After the session, you receive a home practice plan to reinforce progress between appointments.",
  },
  {
    question: "Is online speech therapy as effective as in-person therapy?",
    answer:
      "Yes, for many children and therapy goals, teletherapy is as effective as in-person sessions. Multiple clinical studies and real-world outcomes support the effectiveness of online speech and language therapy, particularly for children who are already familiar with screens and video calls. Our therapists are trained in digital delivery methods and use interactive visual materials to keep sessions engaging. For very young children (under 18 months) or for goals requiring hands-on equipment, we may recommend in-person sessions.",
  },
  {
    question: "What technology do I need for teletherapy?",
    answer:
      "You need a smartphone, tablet, or laptop with a working camera and microphone, a stable internet connection (4G, 5G, or broadband), a quiet and well-lit room, and a modern web browser such as Chrome or Safari. No app downloads are required. We recommend headphones for clearer audio, especially during articulation work.",
  },
  {
    question: "Which services are available via teletherapy?",
    answer:
      "We currently offer Speech Therapy, Parent Counselling, ABA Consultation, and Behavioural Guidance via teletherapy. Services that require hands-on assessment or specialised equipment — such as occupational therapy sensory integration or audiological testing — are available only at our in-person centres in Electronic City, Bangalore.",
  },
  {
    question: "How much does online speech therapy cost at Poorvam Care?",
    answer:
      "Teletherapy sessions at Poorvam Care are priced at ₹600 per 45-minute session. This is our most affordable therapy option and includes the session itself plus a written home practice plan shared after each appointment. There is no hidden fee. For packages or multiple sessions, please contact us at +91 886 176 4343 or email info@poorvamcare.in.",
  },
  {
    question: "Can teletherapy work for young children under 3?",
    answer:
      "Yes, teletherapy can be highly effective for children under 3, particularly when the parent is an active participant in the session. For very young children, our therapists coach the parent in real time — demonstrating techniques, guiding play-based activities, and providing feedback — while the child engages with materials at home. Parent-mediated teletherapy has strong evidence behind it, especially for early language stimulation and communication development.",
  },
];

const teletherapyServiceSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTherapy",
  "name": "Teletherapy — Online Speech Therapy",
  "description":
    "RCI-licensed online speech therapy, parent counselling, ABA consultation, and behavioural guidance available pan-India via secure video call. ₹600 per 45-minute session.",
  "url": "https://poorvamcare.in/teletherapy",
  "provider": {
    "@type": "MedicalBusiness",
    "name": "Poorvam Care",
    "url": "https://poorvamcare.in",
    "telephone": "+918861764343",
    "email": "info@poorvamcare.in",
  },
  "areaServed": "IN",
  "offers": {
    "@type": "Offer",
    "price": "600",
    "priceCurrency": "INR",
    "description": "45-minute online therapy session",
  },
};

export default function TeletherapyPage() {
  return (
    <>
      <SeoHead
        title="Online Speech Therapy & Teletherapy in India | Poorvam Care Electronic City Bangalore"
        description="Book online speech therapy & teletherapy with RCI-licensed therapists at Poorvam Care. Available pan-India. ₹600/session. Book your free consult today."
        canonical="https://poorvamcare.in/teletherapy"
      />
      <StructuredData data={teletherapyServiceSchema} />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: "https://poorvamcare.in/" },
          { name: "Teletherapy", url: "https://poorvamcare.in/teletherapy" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-indigo-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Online Therapy · Available Pan-India
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Teletherapy at Poorvam Care:{" "}
              <span className="text-indigo-600">Expert Speech Therapy Online, Anywhere in India</span>
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">
              Geography should never stand between a child and expert care. Our teletherapy programme
              brings Poorvam Care's RCI-licensed speech therapists directly to your home via a simple
              video call — whether you are in Bangalore, Mumbai, Chennai, or a small town anywhere in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
              >
                Book Free Consultation
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-indigo-600 hover:text-indigo-600 transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why teletherapy */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              Why Teletherapy Is a Game-Changer for Indian Families
            </h2>
            <div className="prose prose-lg font-body text-gray-600 space-y-4 leading-relaxed">
              <p>
                India has fewer than 10,000 RCI-registered speech-language pathologists serving a
                population of over 1.4 billion people. For the vast majority of families — especially
                those in Tier-2 and Tier-3 cities, semi-urban areas, and NRI communities — accessing
                a qualified, experienced paediatric speech therapist has historically meant long
                commutes, months-long waiting lists, or simply going without care.
              </p>
              <p>
                Teletherapy changes that equation entirely. With nothing more than a smartphone or
                laptop and a stable internet connection, your child can receive the same evidence-based
                speech and language therapy that in-person clients at Poorvam Care's Electronic City
                centres enjoy — delivered by the exact same RCI-licensed professionals, at a fraction
                of the time and cost typically associated with clinic visits.
              </p>
              <p>
                For families who do live in Bangalore, teletherapy offers a powerful complement to
                in-person therapy. It bridges the gap between clinic sessions, supports maintenance
                during school exam periods, and allows parents to participate more actively in their
                child's therapy through real-time coaching and guided home activities. The result is
                faster progress, greater generalisation of skills to everyday life, and stronger
                parent confidence in supporting their child's development at home.
              </p>
              <p>
                At Poorvam Care, we have been delivering teletherapy sessions since before it became
                mainstream in India — refining our digital delivery approach, developing interactive
                visual materials optimised for screen-based sessions, and training our therapists
                in the specific techniques that make online therapy effective, engaging, and
                measurable. We are proud to offer this service to families across India at ₹600 per
                45-minute session.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              How Teletherapy Works at Poorvam Care
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              A simple, structured process designed around your family's convenience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-heading font-bold text-sm flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold text-gray-900 mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-600 font-body text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services available online */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Services Available Online
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Four expert therapy and guidance services delivered via secure video call
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {servicesOnline.map((s) => (
              <div
                key={s.name}
                className="flex gap-4 items-start bg-indigo-50 border border-indigo-100 rounded-2xl p-6"
              >
                <Video className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-gray-900 mb-1">{s.name}</h3>
                  <p className="font-body text-gray-600 text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology requirements */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
              What You Need to Get Started
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 overflow-hidden shadow-sm">
              {techRequirements.map((req) => (
                <div key={req.item} className="flex items-start gap-4 p-5">
                  <Wifi className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-heading font-semibold text-gray-900">{req.item}: </span>
                    <span className="font-body text-gray-600">{req.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Benefits of Teletherapy
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Why thousands of Indian families are choosing online therapy for their children
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 mb-2">{b.title}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who is it ideal for */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
              Who Is Teletherapy Ideal For?
            </h2>
            <ul className="space-y-3">
              {idealFor.map((item) => (
                <li key={item} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm">
                  <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="font-body text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
              Teletherapy Pricing
            </h2>
            <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-600/30">
              <p className="font-heading font-semibold text-indigo-200 text-sm uppercase tracking-wider mb-2">
                Per Session
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-heading font-extrabold">₹600</span>
              </div>
              <p className="text-indigo-200 font-body text-sm mb-6">45 minutes · Includes home practice plan</p>
              <ul className="space-y-2 text-left mb-8">
                {["RCI-licensed therapist", "Secure video platform", "Written home programme", "Progress tracking", "Parent coaching included"].map((f) => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm">
                    <CheckCircle className="w-4 h-4 text-indigo-300 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block bg-white text-indigo-600 font-heading font-bold py-3 rounded-xl hover:bg-indigo-50 transition-colors"
              >
                Book a Session
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500 font-body">
              Questions? Call <a href="tel:+918861764343" className="text-indigo-600 font-semibold">+91 886 176 4343</a> or email{" "}
              <a href="mailto:info@poorvamcare.in" className="text-indigo-600 font-semibold">info@poorvamcare.in</a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Frequently Asked Questions About Teletherapy"
        subtitle="Everything you need to know before booking your first online session"
      />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            Start Online Therapy Today — Anywhere in India
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">
            Book a free initial consultation and find out how our teletherapy programme can support
            your child's communication and development from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
            >
              Call +91 886 176 4343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
