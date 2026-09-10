import ConsultationCta from "@/components/consultation-cta";
import {
  CalendarDays,
  Target,
  FileText,
  Home,
  MessageCircle,
  Receipt,
} from "lucide-react";

/**
 * The "digital-first / transparent by default" differentiator.
 *
 * Most therapy centres give parents a verbal update at pickup and an invoice at
 * month end. Poorvam runs on Theraflow, so parents get a live view of the
 * schedule, goals, reports, home practice and billing — which is the strongest
 * non-price reason to choose us, and the one competitors cannot quickly copy.
 *
 * IMPORTANT: every capability listed here maps to a feature that actually ships
 * in the Theraflow guardian portal (see theraflow-frontend/src/components/
 * guardian/: ScheduleView, GoalsView, ReportsView, HomePracticeWidget,
 * GuardianBillingView, BookSessionDialog, RescheduleSessionDialog,
 * WeeklyDigestWidget). Do not add a claim here before the feature exists — a
 * promise made on the marketing site that the portal does not keep is a trust
 * problem far more expensive than the extra bullet is worth.
 */

const FEATURES = [
  {
    icon: CalendarDays,
    title: "Your schedule, always visible",
    body: "See every upcoming session, and book or reschedule yourself — no phone tag with reception.",
  },
  {
    icon: Target,
    title: "The actual therapy goals",
    body: "The goals your therapist is working towards, written down and tracked — not a vague 'she's doing well'.",
  },
  {
    icon: FileText,
    title: "Session notes and reports",
    body: "What happened in each session and how your child is progressing, available whenever you want to look.",
  },
  {
    icon: Home,
    title: "Home practice, spelled out",
    body: "The activities to do between sessions, with instructions — because most of the progress happens at home.",
  },
  {
    icon: MessageCircle,
    title: "Your therapist, a message away",
    body: "Ask a question between sessions instead of saving it up for the next appointment.",
  },
  {
    icon: Receipt,
    title: "Billing you can check",
    body: "Sessions attended, what's been paid, what's outstanding. No surprises at month end.",
  },
];

export default function DigitalFirst({
  compact = false,
}: {
  /** Drops the CTA — use on pages that already end in one. */
  compact?: boolean;
}) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-sage-dark font-heading font-semibold text-sm mb-3 uppercase tracking-wider">
            Transparent by default
          </p>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
            You shouldn't have to guess how therapy is going
          </h2>
          <p className="text-brown-mid font-body leading-relaxed">
            Most centres hand you a verbal update at pickup and an invoice at the end
            of the month. We run on our own platform, so you get a live view of your
            child's therapy — the schedule, the goals, the reports, and the home
            practice — from your phone, whenever you want it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-warm-bg rounded-2xl p-7 border border-brown-light/10"
            >
              <f.icon className="w-7 h-7 text-coral mb-4" strokeWidth={1.75} />
              <h3 className="font-heading font-bold text-brown-deep mb-2">
                {f.title}
              </h3>
              <p className="text-brown-mid font-body text-sm leading-relaxed">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        {!compact && (
          <div className="mt-12 text-center">
            <ConsultationCta align="center" />
          </div>
        )}
      </div>
    </section>
  );
}
