import SeoHead from "@/components/seo-head";
import StructuredData, { createFAQSchema, createBreadcrumbSchema } from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { Baby, User, Users, Check } from "lucide-react";

const services = [
  {
    title: "Pediatric Hearing",
    description: "Specialized hearing services for infants, toddlers, and children including early screening and intervention.",
    icon: Baby,
    color: "from-coral to-coral-dark",
    bg: "bg-coral/10 border-coral/20",
    features: ["Newborn Hearing Screening", "Pediatric Audiometry", "Hearing Aid Fitting", "Cochlear Implant Support"],
  },
  {
    title: "Adult Hearing",
    description: "Comprehensive hearing evaluations and treatment options for working adults and professionals.",
    icon: User,
    color: "from-sage to-sage-dark",
    bg: "bg-sage/10 border-sage/20",
    features: ["Diagnostic Audiometry", "Occupational Hearing Tests", "Hearing Protection", "Tinnitus Management"],
  },
  {
    title: "Senior Hearing",
    description: "Specialized care for age-related hearing changes and communication needs of older adults.",
    icon: Users,
    color: "from-brown-mid to-brown-deep",
    bg: "bg-gold/10 border-gold/20",
    features: ["Age-Related Assessment", "Hearing Aid Adjustment", "Assistive Listening Devices", "Family Communication Training"],
  },
];

const team = [
  { name: "Apoorva", title: "Clinical Director & Audiologist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg", exp: "13+" },
  { name: "Niranjana", title: "Sr. Speech Pathologist & Audiologist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/niranjana.jpg", exp: "8+" },
  { name: "Asha", title: "Speech Pathologist & Audiologist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/asha.png", exp: "3+" },
  { name: "Simran", title: "Speech Pathologist & Audiologist", image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/simran.jpg", exp: "2+" },
];

const faqs = [
  {
    question: "What are the signs of hearing loss in adults?",
    answer: "Common signs include asking people to repeat themselves, difficulty following conversations in noisy environments, turning up TV volume, ringing in ears (tinnitus), and feeling that others mumble. If you experience any of these, get a hearing assessment.",
  },
  {
    question: "How often should I get a hearing test?",
    answer: "Adults should get baseline hearing tests at age 21 and then every 10 years until age 50, then every 3 years. If you work in a noisy environment or have risk factors, more frequent testing is recommended.",
  },
  {
    question: "Do you offer pediatric hearing screening in Bangalore?",
    answer: "Yes, we offer comprehensive pediatric hearing screening at our Electronic City center. We can screen newborns, infants, and children of all ages using age-appropriate audiological tests including OAE, ABR, and behavioral audiometry.",
  },
  {
    question: "What hearing aid brands do you work with?",
    answer: "We work with all major hearing aid brands and help you choose the best option based on your hearing profile, lifestyle, and budget. Our audiologists provide unbiased recommendations, fitting, and ongoing support.",
  },
  {
    question: "Can hearing loss be reversed?",
    answer: "It depends on the type. Conductive hearing loss (caused by blockages or middle ear issues) can often be treated medically. Sensorineural hearing loss (nerve damage) is typically permanent but can be effectively managed with hearing aids or cochlear implants.",
  },
  {
    question: "How much do hearing aids cost in Bangalore?",
    answer: "Hearing aid costs vary widely based on technology level and features. We offer solutions across all price ranges and can discuss options during a free consultation. We also help with insurance claims where applicable.",
  },
];

export default function HearingCenterPage() {
  return (
    <>
      <SeoHead
        title="Best Hearing Center in Electronic City, Bangalore | Hearing Tests & Aids | Poorvam Care"
        description="Expert hearing center in Electronic City, Bangalore. Pediatric hearing screening, audiometry, hearing aids, cochlear implant support. ISHA certified audiologists. Book a free hearing test."
        canonical="https://poorvamcare.in/hearing-center"
        keywords="hearing center Electronic City Bangalore, hearing test near me, best audiologist Bangalore, pediatric hearing screening Electronic City, hearing aids Bangalore, cochlear implant support, tinnitus treatment Bangalore, ISHA certified audiologist, newborn hearing test Electronic City, hearing loss treatment Bangalore, Poorvam hearing center, audiometry test near Electronic City"
      />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Poorvam Care - Hearing Center",
          "description": "Comprehensive audiological services for all ages",
          "url": "https://poorvamcare.in/hearing-center",
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
        { name: "Hearing Center", url: "https://poorvamcare.in/hearing-center" },
      ])} />

      {/* Hero with background image */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/gallery/GC-190919156887728817.jpg"
            alt="Hearing assessment at Poorvam Care Electronic City Bangalore"
            className="w-full h-full object-cover opacity-30"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brown-deep via-brown-deep/90 to-brown-deep/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Hearing Center · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              Hear the World{" "}
              <span className="text-coral">Clearly Again</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body mb-8 leading-relaxed">
              Whether it's your child's first hearing test or finding the right hearing aid for a loved one, our ISHA-certified audiologists provide compassionate, expert care for every age and every need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
              >
                Book Hearing Test
              </Link>
              <a
                href="tel:+918861764343"
                className="border-2 border-warm-bg/30 text-warm-bg px-8 py-4 rounded-xl font-heading font-bold hover:border-coral hover:text-coral transition-colors"
              >
                Call: +91 886 176 4343
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services by Age */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Hearing Care for Every Age
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Comprehensive audiological services with state-of-the-art equipment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`rounded-2xl p-8 border ${service.bg}`}
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-5 shadow-md`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-brown-deep mb-2">
                    {service.title}
                  </h3>
                  <p className="text-brown-mid font-body text-sm mb-5 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((f) => (
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

      {/* Team */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Our Hearing Specialists
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              ISHA certified audiologists dedicated to your hearing health
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 bg-warm-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=E8725A&color=fff`;
                    }}
                  />
                </div>
                <h3 className="font-heading font-semibold text-brown-deep text-sm">{member.name}</h3>
                <p className="text-xs text-brown-light font-body">{member.title}</p>
                <p className="text-xs text-coral font-body">{member.exp} years</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Common Questions About Hearing Care"
        subtitle="Answers to help you understand your hearing health options"
      />

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Schedule Your Hearing Assessment Today
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Early detection can make all the difference. Our certified audiologists are here to help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-coral px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-bg transition-colors shadow-lg"
          >
            Book Hearing Test
          </Link>
        </div>
      </section>
    </>
  );
}
