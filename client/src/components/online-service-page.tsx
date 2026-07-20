import SeoHead from "@/components/seo-head";
import StructuredData, {
  createBreadcrumbSchema,
  createOnlineServiceSchema,
} from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import ConsultationSteps from "@/components/consultation-steps";
import DigitalFirst from "@/components/digital-first";
import { Link } from "wouter";
import { Check, AlertCircle, ArrowRight, Globe } from "lucide-react";
import { SITE_URL, whatsappLink } from "@/config/site";
import { MARKET_LIST } from "@/config/markets";
import { ONLINE_SERVICES, type OnlineService } from "@/config/online-services";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Shared template for the per-discipline pages under /online.
 *
 * SEO/AEO notes, since these pages exist to be found and quoted:
 *  - Each targets a distinct head term ("online occupational therapy for
 *    children"), so titles, H1s and FAQs must not be near-duplicates of each
 *    other. Thin variations of one page compete with each other rather than
 *    ranking.
 *  - `Service` schema carries a discipline-specific `serviceType`, so the four
 *    pages resolve as four services rather than one repeated entity.
 *  - The FAQ answers open with a direct answer in the first sentence. AI
 *    answer engines quote the opening clause; burying the answer in paragraph
 *    three loses the citation.
 *  - `whatWorks` / `whatDoesnt` gives answer engines something specific and
 *    checkable to cite. Pages that hedge on everything get quoted on nothing.
 */

export interface OnlineServicePageProps {
  service: OnlineService;
  seoTitle: string;
  seoDescription: string;
  /** H1 override; defaults to "Online {name} for Children". */
  heading?: string;
  heroBlurb: string;
  /** Answer-first intro, 2–3 paragraphs. */
  intro: string[];
  /** What genuinely transfers to video for this discipline. */
  whatWorks: string[];
  /** What does not, stated plainly. */
  whatDoesnt: string[];
  /** How a session actually runs for this discipline. */
  sessionHeading: string;
  session: string[];
  faqs: { question: string; answer: string }[];
}

export default function OnlineServicePage({
  service,
  seoTitle,
  seoDescription,
  heading,
  heroBlurb,
  intro,
  whatWorks,
  whatDoesnt,
  sessionHeading,
  session,
  faqs,
}: OnlineServicePageProps) {
  const url = `${SITE_URL}/online/${service.slug}`;
  const others = ONLINE_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonical={url}
        // No Electronic City geo meta — this is a remote service, and stamping
        // Bangalore coordinates would file it as a local Bangalore result.
        localGeo={false}
      />

      <StructuredData
        data={createOnlineServiceSchema({
          name: `Online ${service.name} for Children`,
          description: seoDescription,
          url,
          areaServed: MARKET_LIST.map((m) => m.countryName),
          serviceType: service.serviceType,
        })}
      />
      {/* FAQPage schema comes from <FAQSection> below. */}
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Online Therapy", url: `${SITE_URL}/online` },
          { name: service.shortName, url },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sage/10 via-warm-bg to-coral/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sage-dark font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Online therapy
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-brown-deep mb-6 leading-tight">
              {heading ?? (
                <>
                  Online {service.name} for{" "}
                  <span className="text-coral">Children</span>
                </>
              )}
            </h1>
            <p className="text-lg text-brown-mid font-body mb-8 leading-relaxed">
              {heroBlurb}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/online/enquiry"
                className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25 text-center"
              >
                Book a free 15-min consultation
              </Link>
              <a
                href={whatsappLink(
                  `Hi Poorvam Care, I'd like to know about online ${service.shortName.toLowerCase()} for my child.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`online-${service.slug}-hero`)}
                className="border-2 border-sage text-sage-dark px-8 py-4 rounded-xl font-heading font-bold hover:bg-sage/10 transition-colors text-center"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Answer-first intro */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5 text-brown-mid font-body text-lg leading-relaxed">
            {intro.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Honest scope — what works online, what doesn't */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-3 text-center">
            What {service.shortName.toLowerCase()} online does well — and what it doesn't
          </h2>
          <p className="text-brown-mid font-body text-center max-w-2xl mx-auto mb-12">
            We'd rather tell you the limits up front than have you find them out three
            sessions in.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-sage/30">
              <h3 className="font-heading font-bold text-brown-deep mb-5 flex items-center gap-2">
                <Check className="w-5 h-5 text-sage-dark" />
                Works well online
              </h3>
              <ul className="space-y-3">
                {whatWorks.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-brown-mid font-body text-sm"
                  >
                    <Check className="w-4 h-4 text-sage-dark flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-brown-light/20">
              <h3 className="font-heading font-bold text-brown-deep mb-5 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-brown-light" />
                Better in person
              </h3>
              <ul className="space-y-3">
                {whatDoesnt.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-brown-mid font-body text-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-brown-light flex-shrink-0 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-brown-light font-body leading-relaxed">
                If your child needs any of the above, we'll say so on the consultation
                — and help you find someone local if we're not the right fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How a session runs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
            {sessionHeading}
          </h2>
          <div className="space-y-5 text-brown-mid font-body leading-relaxed">
            {session.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <DigitalFirst compact />

      <ConsultationSteps subheading="No cost, no obligation. Fifteen minutes to work out whether we can actually help your child." />

      <FAQSection
        faqs={faqs}
        title={`Online ${service.shortName} — Common Questions`}
        subtitle="Straight answers before you book"
      />

      {/* Cross-links: other disciplines, then countries. Internal linking is
          how these pages pass authority to each other and how crawlers find
          the full set from any entry point. */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-brown-deep mb-8 text-center">
            Other therapies we offer online
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/online/${s.slug}`}
                className="bg-white rounded-2xl p-7 border border-brown-light/10 hover:border-coral/30 hover:shadow-md transition-all group"
              >
                <h3 className="font-heading font-bold text-brown-deep mb-2 group-hover:text-coral transition-colors">
                  {s.shortName}
                </h3>
                <p className="text-brown-mid font-body text-sm leading-relaxed mb-3">
                  {s.summary}
                </p>
                <span className="text-coral font-heading font-semibold text-sm flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-brown-mid font-body text-sm mb-3 flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              Available to families in:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {MARKET_LIST.map((m) => (
                <Link
                  key={m.id}
                  href={`/online/${m.slug}`}
                  className="rounded-full border border-sage/40 px-5 py-2 text-sm font-heading font-semibold text-sage-dark hover:bg-sage/10 transition-colors"
                >
                  {m.countryName}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
