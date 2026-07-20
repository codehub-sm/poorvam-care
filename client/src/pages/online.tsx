import SeoHead from "@/components/seo-head";
import StructuredData, {
  createBreadcrumbSchema,
  createOnlineServiceSchema,
} from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import ConsultationSteps from "@/components/consultation-steps";
import DigitalFirst from "@/components/digital-first";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/config/site";
import { MARKET_LIST, sessionWindowLabel } from "@/config/markets";
import { ONLINE_SERVICES } from "@/config/online-services";

const faqs = [
  {
    question: "Where are your therapists based?",
    answer:
      "In Bengaluru, India. We say so up front rather than burying it — it is also why our fees sit well below local private rates in Australia and the UAE, because the clinical standards are the same but the cost base is not. Every therapist is registered with the Rehabilitation Council of India, the statutory registration body for the profession in India, and our team has 13+ years of clinical experience.",
  },
  {
    question: "Which countries do you serve?",
    answer:
      "We work with families across India, Australia, and the UAE, across all four of our online services. Availability in other countries depends on local regulations for allied health professions, which vary a great deal — tell us where you are on the enquiry form and we'll confirm straight away whether we can help.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Fees depend on your country, the type of therapy, and how often your child needs sessions — so we go through it properly on the free consultation rather than quoting a number that may not apply to you. You will have a clear figure before you are asked to commit to anything, and there are no packages you have to buy into up front.",
  },
  {
    question: "Is online therapy actually effective?",
    answer:
      "It depends on the therapy. Speech and language therapy and caregiver-led behavioural work have strong telehealth evidence, with outcomes comparable to in-person sessions. Remedial teaching is close to format-neutral. Occupational therapy works well when delivered as parent coaching, but not for goals needing hands-on assessment or clinic equipment. Each of our service pages sets out plainly what that discipline does well online and what it doesn't — and the free consultation exists partly so we can tell you when the honest answer is that online is not right for your child.",
  },
  {
    question: "What languages do you work in?",
    answer:
      "English, Hindi, Tamil, Telugu, Kannada, and Malayalam. For bilingual children this is a clinical matter rather than a convenience: a child assessed only in English can look delayed when they are developing entirely typically across two languages, which is a common route to both over-diagnosis and missed diagnosis.",
  },
];

/**
 * Hub page for the online/teletherapy offering.
 *
 * Everything under /online is deliberately separated from the local Bangalore
 * entity: no MedicalBusiness schema, no postal address, no geo.* meta. The
 * local pages rank for Electronic City queries and we do not want to blur that
 * signal with pages aimed at Sydney and Dubai.
 */
export default function OnlinePage() {
  const url = `${SITE_URL}/online`;

  return (
    <>
      <SeoHead
        title="Online Therapy for Children | Speech, OT, Behaviour & Learning | Poorvam Care"
        description="Live online speech therapy, occupational therapy, behavioural support and special education for children. RCI-registered clinicians. Available in India, Australia and the UAE, in English, Hindi, Tamil, Telugu, Kannada and Malayalam."
        canonical={url}
        localGeo={false}
        alternates={[
          ...MARKET_LIST.map((m) => ({
            hreflang: `en-${m.country}`,
            href: `${SITE_URL}/online/${m.slug}`,
          })),
          { hreflang: "x-default", href: url },
        ]}
      />
      <StructuredData
        data={createOnlineServiceSchema({
          name: "Online Child Therapy — Speech, Occupational, Behavioural & Special Education",
          description:
            "Live online speech therapy, occupational therapy, behavioural support and special education for children, delivered by RCI-registered clinicians.",
          url,
          areaServed: MARKET_LIST.map((m) => m.countryName),
          // Price deliberately omitted — discussed on the consultation call.
        })}
      />
      {/* FAQPage schema comes from <FAQSection> below. */}
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Online Therapy", url },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sage/10 via-warm-bg to-coral/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sage-dark font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Poorvam Online
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-brown-deep mb-6 leading-tight">
              Therapy for your child,{" "}
              <span className="text-coral">wherever you are</span>
            </h1>
            <p className="text-lg text-brown-mid font-body mb-8 leading-relaxed">
              Speech therapy, occupational therapy, behavioural support and learning
              support — live one-to-one with RCI-registered clinicians in Bengaluru, in
              English, Hindi, Tamil, Telugu, Kannada or Malayalam. No waitlist, and a
              free consultation before you commit to anything.
            </p>
            <Link
              href="/online/enquiry"
              className="inline-block bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
            >
              Book a free 15-min consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Market picker */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              Where are you based?
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Session times and what you need to know differ by country.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MARKET_LIST.map((m) => (
              <Link
                key={m.id}
                href={`/online/${m.slug}`}
                className="bg-warm-bg rounded-2xl p-8 border border-brown-light/10 hover:border-coral/30 hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-heading font-bold text-brown-deep mb-2 group-hover:text-coral transition-colors">
                  {m.countryName}
                </h3>
                <p className="text-brown-mid font-body text-sm mb-4">
                  Sessions {sessionWindowLabel(m)}, {m.countryName} time
                </p>
                <span className="text-coral font-heading font-semibold text-sm flex items-center gap-1">
                  See details <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid — the four disciplines available online. */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
              What we offer online
            </h2>
            <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
              Not every therapy transfers to video the same way. Each page below is
              honest about what works remotely and what really needs a room.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ONLINE_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/online/${s.slug}`}
                className="bg-white rounded-2xl p-8 border border-brown-light/10 hover:border-coral/30 hover:shadow-md transition-all group"
              >
                <h3 className="text-xl font-heading font-bold text-brown-deep mb-2 group-hover:text-coral transition-colors">
                  {s.name}
                </h3>
                <p className="text-brown-mid font-body text-sm leading-relaxed mb-4">
                  {s.summary}
                </p>
                <span className="text-coral font-heading font-semibold text-sm flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ConsultationSteps subheading="No cost, no obligation. Fifteen minutes to work out whether we can actually help your child." />

      <DigitalFirst />

      <FAQSection
        faqs={faqs}
        title="Online Therapy — Common Questions"
        subtitle="Straight answers before you book"
      />
    </>
  );
}
