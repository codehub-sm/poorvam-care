import SeoHead from "@/components/seo-head";
import StructuredData, {
  createBreadcrumbSchema,
  createLocalBusinessSchema,
} from "@/components/structured-data";
import FAQSection from "@/components/faq-section";
import { Link } from "wouter";
import { MapPin, Clock, Phone, Video, ArrowRight, CheckCircle } from "lucide-react";
import { SITE_URL, PRIMARY_LOCATION, CONTACT, telLink } from "@/config/site";
import { trackCallClick } from "@/lib/analytics";

/**
 * Shared template for the neighbourhood landing pages.
 *
 * The four pages (BTM Layout, Koramangala, Whitefield, Marathahalli) were
 * copy-pasted from one original and were 74–86% identical — every diff hunk
 * between BTM and Koramangala was a string swap, with no structural change.
 *
 * The duplication was not cosmetic. All four had drifted into declaring a
 * canonical URL WITHOUT the `-bangalore` suffix their actual route has, so
 * every one of them self-canonicalised to a 404 and was at risk of being
 * dropped from the index. Deriving the canonical, the schema `url`, and the
 * breadcrumb from a single `slug` prop makes that class of bug impossible.
 */

export interface NeighbourhoodPageProps {
  /** Route path WITHOUT leading slash. Must match the entry in @/config/routes. */
  slug: string;
  /** Display name, e.g. "BTM Layout". */
  neighbourhood: string;

  seoTitle: string;
  seoDescription: string;
  /** Description used in the LocalBusiness schema node. */
  schemaDescription: string;
  /** Neighbourhoods this page targets, for schema areaServed. */
  areaServed: string[];

  heroKicker?: string;
  heroBlurb: string;

  distanceText: string;
  travelTimeText: string;
  teletherapyText: string;

  proseHeading: string;
  prose: string[];
  whyChooseUsHeading?: string;
  whyChooseUs?: string[];

  /** Defaults to the shared centre embed; override for a route-specific map. */
  mapEmbedSrc?: string;
  mapLinkUrl?: string;

  faqs: { question: string; answer: string }[];
  faqTitle: string;
  faqSubtitle?: string;

  ctaHeading?: string;
  ctaBody: string;

  /** Optional full-width banner between hero and the distance cards. */
  teletherapyBanner?: { title: string; body: string };
  /** Optional numbered list in the sidebar, e.g. "How Teletherapy Works". */
  teletherapySteps?: { heading: string; steps: string[] };
  /** Optional numbered route breakdown in the sidebar. */
  routeSteps?: { heading: string; steps: string[] };
}

/**
 * Shared Google Maps embed for the Phase 1 centre.
 *
 * NOTE: this `pb=` payload was identical on all four pages and contains an
 * obviously placeholder coordinate segment (`15558.123456789`), so it likely
 * does not resolve to the real pin. Worth regenerating from Google Maps
 * ("Share → Embed a map") and replacing here — one edit now fixes every page.
 */
const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.123456789!2d77.6608!3d12.8448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6b0a2f7e2b2b%3A0x0!2sPoorvam+Care!5e0!3m2!1sen!2sin!4v1";

/** Identical across all four pages, so it lives here rather than in each. */
const DEFAULT_WHY_CHOOSE_US = [
  "RCI-licensed, ISHA-certified therapists",
  "13+ years of clinical experience",
  "900+ families served across Bangalore",
  "Play-based, child-friendly therapy rooms",
  "Multidisciplinary team under one roof",
  "Parent training and home programme support",
  "Teletherapy available for flexibility",
];

/**
 * Service cards shown on every neighbourhood page.
 *
 * These previously pointed at /speech-therapy, /occupational-therapy and
 * /aba-therapy — none of which are routes, so all twelve links 404'd. They now
 * target the real service pages.
 */
const SERVICES = [
  {
    name: "Speech Therapy",
    href: "/speech-therapy-for-speech-delay-bangalore",
    desc: "Assessment & therapy for speech delays, language disorders, stuttering, and more.",
  },
  {
    name: "Occupational Therapy",
    href: "/occupational-therapy-for-children-bangalore",
    desc: "Sensory integration, fine motor skills, and activities of daily living.",
  },
  {
    name: "ABA Therapy",
    href: "/aba-therapy-for-children-bangalore",
    desc: "Evidence-based behavioural therapy for autism and developmental challenges.",
  },
];

export default function NeighbourhoodPage(props: NeighbourhoodPageProps) {
  const {
    slug,
    neighbourhood,
    seoTitle,
    seoDescription,
    schemaDescription,
    areaServed,
    heroKicker,
    heroBlurb,
    distanceText,
    travelTimeText,
    teletherapyText,
    proseHeading,
    prose,
    whyChooseUsHeading,
    whyChooseUs = DEFAULT_WHY_CHOOSE_US,
    mapEmbedSrc = DEFAULT_MAP_EMBED,
    mapLinkUrl = PRIMARY_LOCATION.mapUrl,
    faqs,
    faqTitle,
    faqSubtitle = "Everything you need to know before booking your first appointment",
    ctaHeading = "Start Your Child's Speech Therapy Journey Today",
    ctaBody,
    teletherapyBanner,
    teletherapySteps,
    routeSteps,
  } = props;

  // Single source for the page's own URL — canonical, schema, and breadcrumb
  // can no longer disagree with each other or with the route table.
  const url = `${SITE_URL}/${slug}`;

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} canonical={url} />

      <StructuredData
        data={createLocalBusinessSchema({
          location: PRIMARY_LOCATION,
          name: "Poorvam Care — Early Intervention & Therapy Centre",
          description: schemaDescription,
          url,
          areaServed,
        })}
      />

      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: `Speech Therapy ${neighbourhood}`, url },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-blue-600 font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
              {heroKicker ?? `Serving Families from ${neighbourhood}`}
            </p>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
              Speech Therapy in <span className="text-blue-600">{neighbourhood}</span>, Bangalore
            </h1>
            <p className="text-lg text-gray-600 font-body mb-8 leading-relaxed">{heroBlurb}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
              >
                Book a Consultation
              </Link>
              <a
                href={telLink}
                onClick={() => trackCallClick(`neighbourhood-hero-${slug}`)}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Call: {CONTACT.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {teletherapyBanner && (
        <section className="py-8 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 flex-shrink-0" />
                <p className="font-heading font-semibold text-lg">{teletherapyBanner.title}</p>
              </div>
              <p className="font-body text-white/90 text-sm md:text-base md:max-w-md text-center md:text-right">
                {teletherapyBanner.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Distance & route summary */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">
                  Distance from {neighbourhood}
                </p>
                <p className="text-gray-600 font-body text-sm mt-1">{distanceText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-green-50 border border-green-100">
              <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Travel Time</p>
                <p className="text-gray-600 font-body text-sm mt-1">{travelTimeText}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-heading font-bold text-gray-900">Teletherapy Available</p>
                <p className="text-gray-600 font-body text-sm mt-1">{teletherapyText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">{proseHeading}</h2>
              <div className="space-y-5 text-gray-600 font-body leading-relaxed">
                {prose.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">
                  {whyChooseUsHeading ?? `Why ${neighbourhood} Families Choose Us`}
                </h3>
                <ul className="space-y-3">
                  {whyChooseUs.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-gray-700 font-body text-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {teletherapySteps && (
                <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">
                    {teletherapySteps.heading}
                  </h3>
                  <ol className="space-y-3">
                    {teletherapySteps.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-gray-700 font-body text-sm"
                      >
                        <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-heading font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {routeSteps && (
                <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-5">
                    {routeSteps.heading}
                  </h3>
                  <ol className="space-y-3">
                    {routeSteps.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-start gap-3 text-gray-700 font-body text-sm"
                      >
                        <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-heading font-bold">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title={`Poorvam Care location — directions from ${neighbourhood}`}
                  src={mapEmbedSrc}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-4 bg-white">
                  <a
                    href={mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-heading font-semibold text-sm hover:underline flex items-center gap-1"
                  >
                    Get directions to Poorvam Care <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Therapy Services for {neighbourhood} Families
            </h2>
            <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
              Comprehensive early intervention and therapy under one roof in Electronic City
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <span className="text-blue-600 font-heading font-semibold text-sm flex items-center gap-1">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title={faqTitle} subtitle={faqSubtitle} />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
            {ctaHeading}
          </h2>
          <p className="text-lg text-white/90 font-body mb-8">{ctaBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-heading font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book a Consultation
            </Link>
            <a
              href={telLink}
              onClick={() => trackCallClick(`neighbourhood-cta-${slug}`)}
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-white/10 transition-colors"
            >
              Call: {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
