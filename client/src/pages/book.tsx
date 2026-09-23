import { useState } from "react";
import { useSearch } from "wouter";
import { Building2, Video, ArrowLeft, ShieldCheck, Clock, MessageSquare } from "lucide-react";
import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import EnquiryForm, { type EnquiryMode } from "@/components/enquiry-form";
import { SITE_URL } from "@/config/site";
import { CONSULTATION_FEE_COPY } from "@/config/payments";
import { trackEvent } from "@/lib/analytics";

/**
 * The single booking endpoint behind every "Book a consultation" CTA.
 *
 * Before this page the two funnels were not comparable: an online parent could
 * reserve a slot in three steps, while a Bengaluru parent — the family closest
 * to actually paying — got a general contact form and a callback queue. Both
 * now start here and differ only in how they finish: ₹100 reserves an online
 * slot, WhatsApp confirms an in-centre one.
 *
 * `noindex` for the same reason /online/enquiry is: this is a conversion
 * endpoint, not a landing page. The pages that explain the service should be
 * what ranks, and a bare form competing with them would split the signals.
 *
 * `?mode=online` / `?mode=centre` skips the chooser, so a CTA that already
 * knows which funnel it belongs to (an online-therapy page, a centre page)
 * does not make the parent answer a question they have already answered.
 */

const MODES: {
  id: EnquiryMode;
  icon: typeof Building2;
  title: string;
  blurb: string;
  ending: string;
}[] = [
  {
    id: "centre",
    icon: Building2,
    title: "At our centre",
    blurb: "Electronic City Phase 1 or Phase 2, Bengaluru.",
    ending: "We confirm your slot on WhatsApp — no payment to book.",
  },
  {
    id: "online",
    icon: Video,
    title: "Online, over video",
    blurb: "Anywhere in India, Australia or the UAE.",
    ending: `${CONSULTATION_FEE_COPY.cta} reserves a priority slot, adjusted against your first session.`,
  },
];

const ASSURANCES = [
  {
    icon: Clock,
    title: "A real time, not a callback queue",
    body: "You'll hear from a member of the clinical team within one working day.",
  },
  {
    icon: ShieldCheck,
    title: "RCI-registered clinicians",
    body: "Every therapist is registered with the Rehabilitation Council of India, with 13+ years of experience.",
  },
  {
    icon: MessageSquare,
    title: "In your family's language",
    body: "English, Hindi, Tamil, Telugu, Kannada or Malayalam.",
  },
];

function initialMode(search: string): EnquiryMode | null {
  const value = new URLSearchParams(search).get("mode");
  return value === "online" || value === "centre" ? value : null;
}

export default function BookPage() {
  const search = useSearch();
  const [mode, setMode] = useState<EnquiryMode | null>(() => initialMode(search));
  const url = `${SITE_URL}/book`;

  const choose = (next: EnquiryMode) => {
    trackEvent("booking_mode_selected", { mode: next });
    setMode(next);
  };

  return (
    <>
      <SeoHead
        title="Book a Consultation | Poorvam Care"
        description="Book a consultation with an RCI-registered therapist — at our Electronic City, Bengaluru centres or online over video. Tell us about your child and we'll confirm a time."
        canonical={url}
        robots="noindex, follow"
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Book a consultation", url },
        ])}
      />

      <section className="py-16 md:py-24 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-brown-deep mb-4">
                Book a consultation
              </h1>
              <p className="text-brown-mid font-body leading-relaxed mb-4">
                A short call with our clinical team. We'll talk through what you're
                seeing, explain how we'd approach it, and tell you honestly whether we
                can help your child — including when the answer is no.
              </p>
              <p className="text-brown-mid font-body leading-relaxed mb-8">
                What therapy will cost depends on what your child actually needs, so we
                go through it properly on that call rather than quoting a figure that
                may not apply to you. You'll have a clear plan and price before you
                commit to anything.
              </p>

              <div className="space-y-5">
                {ASSURANCES.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <item.icon className="w-5 h-5 text-sage-dark flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-heading font-bold text-brown-deep text-sm">
                        {item.title}
                      </p>
                      <p className="text-brown-mid font-body text-sm mt-0.5">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brown-light/10 shadow-sm">
              {mode === null ? (
                <div>
                  <h2 className="text-xl font-heading font-bold text-brown-deep">
                    How would you like to be seen?
                  </h2>
                  <p className="mt-1 text-sm text-brown-mid font-body">
                    Both start with the same consultation.
                  </p>

                  <div className="mt-6 space-y-4">
                    {MODES.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => choose(option.id)}
                        className="w-full rounded-xl border-2 border-brown-light/30 p-5 text-left transition-colors hover:border-coral hover:bg-coral/5"
                      >
                        <div className="flex items-start gap-4">
                          <option.icon className="w-6 h-6 text-coral flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-heading font-bold text-brown-deep">
                              {option.title}
                            </p>
                            <p className="text-sm text-brown-mid font-body mt-0.5">
                              {option.blurb}
                            </p>
                            <p className="text-xs text-brown-light font-body mt-2">
                              {option.ending}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setMode(null)}
                    className="mb-5 inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-brown-mid hover:text-coral"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {mode === "centre" ? "At our centre" : "Online, over video"} — change
                  </button>
                  <EnquiryForm mode={mode} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
