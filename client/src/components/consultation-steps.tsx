import { CalendarCheck, Mail, Video } from "lucide-react";

/**
 * The three-step "book a free consultation" explainer.
 *
 * Replaces the published per-session pricing that previously anchored these
 * pages. Pricing is now discussed on the consultation call instead — so this
 * block has to carry the job the price tag used to do: making the next step
 * feel small, concrete, and low-risk for a parent who has never heard of us.
 *
 * The middle step deliberately promises the invite "in your local time". For an
 * overseas parent, timezone confusion is a real booking objection, and saying
 * so up front removes it.
 */

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Schedule a time that works for you",
    body: "Pick a slot in your own timezone — evenings and after-school times included.",
  },
  {
    icon: Mail,
    title: "We email you a link",
    body: "Your confirmation arrives with the session time shown in your local time, so there's nothing to convert.",
  },
  {
    icon: Video,
    title: "Meet your specialist",
    body: "A 15-minute call with a therapist — no cost, no obligation. We'll tell you honestly whether we can help.",
  },
];

export default function ConsultationSteps({
  heading = "Book your free online consultation",
  subheading,
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-16 md:py-20 bg-sage/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-3 text-brown-mid font-body max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <li key={step.title} className="relative text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-brown-light/10 flex items-center justify-center shadow-sm">
                    <step.icon className="w-9 h-9 text-sage-dark" strokeWidth={1.5} />
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-brown-deep text-warm-bg text-sm font-heading font-bold flex items-center justify-center"
                  >
                    {i + 1}
                  </span>
                </div>
              </div>
              <h3 className="font-heading font-bold text-brown-deep mb-2">
                {step.title}
              </h3>
              <p className="text-brown-mid font-body text-sm leading-relaxed max-w-xs mx-auto">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
