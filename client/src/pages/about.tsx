import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema, personSchemaApoorva } from "@/components/structured-data";
import { Link } from "wouter";
import { Shield, Award, Heart, Users } from "lucide-react";
import { STATS } from "@/config/site";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "We approach every family with empathy, understanding that seeking help takes courage. Your concerns are heard and valued.",
  },
  {
    icon: Shield,
    title: "Evidence-Based Care",
    description: "Every intervention we provide is grounded in the latest research and clinical best practices, ensuring the best outcomes.",
  },
  {
    icon: Users,
    title: "Family-Centered",
    description: "Parents are partners in care. We empower families with knowledge, strategies, and support to continue growth at home.",
  },
  {
    icon: Award,
    title: "Excellence in Service",
    description: "Our team maintains the highest professional standards through continuous training and quality assurance.",
  },
];

const leadership = [
  {
    name: "Shivam",
    title: "Managing Director",
    description: "Strategic leader overseeing clinical operations and ensuring excellence in service delivery. Focuses on evidence-based practices and team development.",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/shivam-photo.jpg",
    credentials: ["Enterprenuer"],
    experience: "18+",
  },
  {
    name: "Apoorva Rai",
    title: "Lead Speech-Language Pathologist & Clinical Director",
    description: "Apoorva Rai holds a Master of Audiology and Speech-Language Pathology (MASLP) and brings over 13 years of clinical experience in paediatric speech therapy and audiology. She is licensed by the Rehabilitation Council of India (RCI) and is an active member of the Indian Speech and Hearing Association (ISHA). Apoorva specialises in Autism Spectrum Disorder, cochlear implant therapy, ADHD, articulation disorders, speech delay, and developmental delays. She has worked with hundreds of families across Bangalore and leads Poorvam Care's multi-disciplinary therapy team.",
    image: "https://poorvam-staff.s3.us-east-1.amazonaws.com/apoorva.jpg",
    credentials: [
      "MASLP (Master of Audiology & Speech-Language Pathology)",
      "RCI Licensed (Rehabilitation Council of India)",
      "ISHA Member (Indian Speech & Hearing Association)",
    ],
    experience: "13+",
  },
];

export default function AboutPage() {
  return (
    <>
      <SeoHead
        title={`About Poorvam Care - ${STATS.yearsLabel} Years of Child Therapy in Electronic City, Bangalore`}
        description={`Learn about Poorvam Care's ${STATS.yearsLabel} year journey serving ${STATS.familiesLabel} families in Electronic City, Bangalore. RCI registered, ISHA certified team. Multi-disciplinary early intervention for children aged 2–14.`}
        canonical="https://poorvamcare.in/about"
        ogImage="https://poorvamcare.in/og-image.jpg"
        keywords="about Poorvam Care, child therapy center Electronic City, speech therapy Bangalore, occupational therapy Electronic City, Apoorva Rai MASLP, RCI registered therapist, ISHA certified, early intervention Bangalore, 13 years experience child therapy, best speech therapist Bangalore, RCI licensed therapist near me, trusted child therapy center Bommanahalli Hosa Road"
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "About", url: "https://poorvamcare.in/about" },
      ])} />
      <StructuredData data={personSchemaApoorva} />

      {/* Hero */}
      <section className="relative bg-brown-deep overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #E8725A 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden="true" />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-coral/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-sage/8 rounded-full blur-3xl" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <p className="text-coral font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              About Poorvam Care · Electronic City, Bangalore
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-warm-bg mb-6 leading-tight">
              We Believe Every Person Deserves{" "}
              <span className="text-coral">Quality Care</span>
            </h1>
            <p className="text-lg text-warm-gray-200 font-body leading-relaxed">
              For over {STATS.years} years, Poorvam Care has been a trusted partner for families in Bangalore. What started as a small therapy practice has grown into a multi-disciplinary early intervention centre serving {STATS.familiesLabel} families across two locations in Electronic City.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">Our Story</h2>
              <div className="space-y-4 text-brown-mid font-body leading-relaxed">
                <p>
                  Poorvam Care was born from a simple yet powerful belief: that every child and individual deserves access to quality therapeutic and developmental care, regardless of their challenges.
                </p>
                <p>
                  Starting in Electronic City, Bangalore, we began with a small team of passionate therapists dedicated to helping children with developmental needs. Over the years, we expanded to two locations and added therapeutic enrichment programmes designed specifically for children who learn differently.
                </p>
                <p>
                  Today, we serve over {STATS.families} families with a team of certified professionals spanning speech therapy, occupational therapy, behavioral therapy, special education, and therapeutic enrichment. Our growth has been driven by one thing: the trust of the families we serve.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-warm-bg to-warm-gray-50 rounded-2xl p-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-coral">{STATS.yearsLabel}</div>
                  <div className="text-sm text-brown-mid font-body">Years of Service</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-sage">{STATS.familiesLabel}</div>
                  <div className="text-sm text-brown-mid font-body">Families Served</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-gold">15+</div>
                  <div className="text-sm text-brown-mid font-body">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-coral-dark">2</div>
                  <div className="text-sm text-brown-mid font-body">Centre Locations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Our Values
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              The principles that guide everything we do at Poorvam Care
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-warm-gray-200">
                  <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-brown-deep mb-2">{v.title}</h3>
                  <p className="text-sm text-brown-mid font-body leading-relaxed">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Certifications & Registrations
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-coral/10 rounded-2xl p-8 border border-coral/20 text-center">
              <Shield className="w-12 h-12 text-coral mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-brown-deep mb-2">RCI Registered</h3>
              <p className="text-sm text-brown-mid font-body">
                Our professionals are registered with the Rehabilitation Council of India, ensuring they meet national standards for clinical practice.
              </p>
            </div>
            <div className="bg-sage/10 rounded-2xl p-8 border border-sage/20 text-center">
              <Award className="w-12 h-12 text-sage mx-auto mb-4" />
              <h3 className="text-lg font-heading font-bold text-brown-deep mb-2">ISHA Certified</h3>
              <p className="text-sm text-brown-mid font-body">
                Our speech-language pathologists hold certification from the Indian Speech and Hearing Association, the premier professional body for speech-language pathologists in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Our Leadership
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader) => (
              <div key={leader.name} className="bg-white rounded-2xl p-8 border border-warm-gray-200">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-warm-gray-50 flex-shrink-0">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&size=200&background=E8725A&color=fff`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-brown-deep">{leader.name}</h3>
                    <p className="text-sm text-coral font-body mb-1">{leader.title}</p>
                    <p className="text-xs text-brown-light font-body">{leader.experience} years experience</p>
                  </div>
                </div>
                <p className="text-brown-mid font-body text-sm leading-relaxed mt-4 mb-4">
                  {leader.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {leader.credentials.map((c) => (
                    <span key={c} className="text-xs px-2.5 py-1 bg-coral/10 text-coral-dark rounded-full font-body">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Join the Poorvam Family
          </h2>
          <p className="text-lg text-warm-bg/90 font-body mb-8">
            Discover how our team can support you and your family on your journey.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-coral px-8 py-4 rounded-xl font-heading font-bold hover:bg-warm-gray-50 transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
