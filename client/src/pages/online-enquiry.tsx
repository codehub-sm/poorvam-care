import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";
import OnlineEnquiryForm from "@/components/online-enquiry-form";
import { SITE_URL } from "@/config/site";
import { ShieldCheck, Clock, MessageSquare } from "lucide-react";

/**
 * Enquiry page for the online offering.
 *
 * `noindex` is deliberate: this is a conversion endpoint, not a landing page.
 * Indexing it would split ranking signals with /online and put a bare form into
 * search results where a page explaining the service should be.
 */
export default function OnlineEnquiryPage() {
  const url = `${SITE_URL}/online/enquiry`;

  return (
    <>
      <SeoHead
        title="Book an Introductory Call | Poorvam Online Therapy"
        description="Tell us about your child and we'll arrange a free 15-minute consultation to discuss whether online therapy is the right fit."
        canonical={url}
        localGeo={false}
        robots="noindex, follow"
      />
      <StructuredData
        data={createBreadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Online Therapy", url: `${SITE_URL}/online` },
          { name: "Enquiry", url },
        ])}
      />

      <section className="py-16 md:py-24 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-brown-deep mb-4">
                Book a free 15-min consultation
              </h1>
              <p className="text-brown-mid font-body leading-relaxed mb-8">
                No cost, no commitment. We'll talk through what you're seeing, explain
                how we'd approach it, and tell you honestly whether online therapy is
                right for your child — including when the answer is no.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: Clock,
                    title: "We reply within one working day",
                    body: "You'll hear from a member of the clinical team, not an automated sequence.",
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
                ].map((item) => (
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
              <OnlineEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
