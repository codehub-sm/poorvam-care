import SeoHead from "@/components/seo-head";
import StructuredData, {
  createBreadcrumbSchema,
  createOnlineServiceSchema,
} from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import ConsultationSteps from "@/components/consultation-steps";
import DigitalFirst from "@/components/digital-first";
import { Link } from "wouter";
import { Globe, Clock, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";
import { SITE_URL, whatsappLink } from "@/config/site";
import { MARKET_LIST, sessionWindowLabel, type Market } from "@/config/markets";
import { ONLINE_SERVICES } from "@/config/online-services";
import { trackWhatsAppClick } from "@/lib/analytics";

/**
 * Shared template for the per-country teletherapy pages under /online.
 *
 * These pages are deliberately NOT built on the local page template. They carry
 * no Bangalore address, no MedicalBusiness schema, and no geo.* meta — the
 * whole point is that they describe a remote service to an overseas audience
 * without diluting the local entity that ranks for Electronic City queries.
 */

export interface OnlineMarketPageProps {
  market: Market;
  seoTitle: string;
  seoDescription: string;
  /** One-line positioning under the H1. */
  heroBlurb: string;
  /** Why families in this specific market need this — the local pain. */
  problemHeading: string;
  problem: string[];
  /** Market-specific reasons to trust an overseas provider. */
  reassurances: string[];
  faqs: { question: string; answer: string }[];
  /** hreflang alternates across all market pages. */
  includeAlternates?: boolean;
}

export default function OnlineMarketPage({
  market,
  seoTitle,
  seoDescription,
  heroBlurb,
  problemHeading,
  problem,
  reassurances,
  faqs,
  includeAlternates = true,
}: OnlineMarketPageProps) {
  const url = `${SITE_URL}/online/${market.slug}`;

  const alternates = includeAlternates
    ? [
        ...MARKET_LIST.map((m) => ({
          hreflang: `en-${m.country}`,
          href: `${SITE_URL}/online/${m.slug}`,
        })),
        { hreflang: "x-default", href: `${SITE_URL}/online` },
      ]
    : undefined;

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonical={url}
        // Critical: these pages must not carry Electronic City coordinates.
        localGeo={false}
        alternates={alternates}
      />

      <StructuredData
        data={createOnlineServiceSchema({
          name: `Online Child Therapy — ${market.countryName}`,
          serviceType:
            "Online speech, occupational, behavioural and special education therapy for children",
          description: seoDescription,
          url,
          areaServed: [market.countryName],
          // Price deliberately omitted — pricing is discussed on the
          // consultation call rather than published.
        })}
      />
      {/* FAQPage schema is emitted by <FAQSection> below — do not add it here too. */}
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Online Therapy", url: `${SITE_URL}/online` },
          { name: market.countryName, url },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sage/10 via-warm-bg to-coral/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sage-dark font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              Online therapy for families in {market.countryName}
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-brown-deep mb-6 leading-tight">
              Therapy for Your Child —{" "}
              <span className="text-coral">Live Online</span>
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
              {market.ctaChannel === "whatsapp" && (
                <a
                  href={whatsappLink(
                    `Hi Poorvam Care, I'm in ${market.countryName} and I'd like to know about online therapy for my child.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`online-${market.slug}-hero`)}
                  className="border-2 border-sage text-sage-dark px-8 py-4 rounded-xl font-heading font-bold hover:bg-sage/10 transition-colors text-center"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-12 bg-white border-b border-brown-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-warm-bg">
              <ShieldCheck className="w-6 h-6 text-sage-dark flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-brown-deep">
                  RCI-registered clinicians
                </p>
                <p className="text-brown-mid font-body text-sm mt-1">
                  Every therapist is registered with the Rehabilitation Council of India,
                  with 13+ years of clinical experience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-warm-bg">
              <Clock className="w-6 h-6 text-coral flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-brown-deep">
                  Sessions in your timezone
                </p>
                <p className="text-brown-mid font-body text-sm mt-1">
                  {sessionWindowLabel(market)}, {market.countryName} time — after-school
                  slots, not Indian office hours.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-warm-bg">
              <Globe className="w-6 h-6 text-sage-dark flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-brown-deep">
                  English + Indian languages
                </p>
                <p className="text-brown-mid font-body text-sm mt-1">
                  Therapy in English, Hindi, Tamil, Telugu, Kannada, or Malayalam —
                  whichever your family speaks at home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / market context */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-brown-deep mb-6">
                {problemHeading}
              </h2>
              <div className="space-y-5 text-brown-mid font-body leading-relaxed">
                {problem.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="bg-sage/10 rounded-2xl p-8 border border-sage/20">
              <h3 className="text-xl font-heading font-bold text-brown-deep mb-5">
                What you should know before booking
              </h3>
              <ul className="space-y-3">
                {reassurances.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-brown-mid font-body text-sm"
                  >
                    <CheckCircle className="w-5 h-5 text-sage-dark flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/online/enquiry"
                className="mt-6 inline-flex items-center gap-1 text-coral font-heading font-semibold text-sm hover:underline"
              >
                Book a free consultation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Which disciplines are available here. Also the internal-linking path
          from a country page into the service pages, so authority flows both
          ways and crawlers reach the full set from any entry point. */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-brown-deep mb-4">
              Therapies available online in {market.countryName}
            </h2>
            <p className="text-brown-mid font-body max-w-2xl mx-auto">
              Each page is honest about what that therapy does well over video — and
              what really needs a room.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ONLINE_SERVICES.map((s) => (
              <Link
                key={s.slug}
                href={`/online/${s.slug}`}
                className="bg-white rounded-2xl p-7 border border-brown-light/10 hover:border-coral/30 hover:shadow-md transition-all group"
              >
                <h3 className="font-heading font-bold text-brown-deep mb-2 group-hover:text-coral transition-colors">
                  {s.name}
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
        </div>
      </section>

      <DigitalFirst compact />

      <ConsultationSteps
        subheading={`Three steps, no cost, and no obligation to book therapy afterwards.`}
      />

      <FAQSection
        faqs={faqs}
        title={`Online Therapy in ${market.countryName} — Common Questions`}
        subtitle="Straight answers before you book"
      />

      {/* CTA */}
      <section className="py-20 bg-brown-deep">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-warm-bg mb-4">
            Start with a free 15-minute consultation
          </h2>
          <p className="text-lg text-warm-bg/80 font-body mb-8">
            Tell us about your child. We'll tell you honestly whether online therapy is
            the right fit — and if it isn't, we'll say so.
          </p>
          <Link
            href="/online/enquiry"
            className="inline-block bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg"
          >
            Book your consultation
          </Link>
        </div>
      </section>
    </>
  );
}
