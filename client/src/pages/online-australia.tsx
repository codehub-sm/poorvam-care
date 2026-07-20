import OnlineMarketPage from "@/components/online-market-page";
import { MARKETS } from "@/config/markets";

/**
 * Australia is the most permissive of the international markets: speech
 * pathology there is a self-regulated profession with no AHPRA registration
 * requirement, so there is no legal barrier to an India-based clinician
 * delivering therapy to an Australian child.
 *
 * The NDIS claims below are deliberately narrow. Self-managed participants can
 * purchase from any provider at any price; plan-managed participants can use
 * unregistered providers but are bound by the price limits; agency-managed
 * participants cannot. Do not broaden this copy without checking the current
 * NDIS rules — overstating fundability is both a compliance and a refund risk.
 */
export default function OnlineAustraliaPage() {
  return (
    <OnlineMarketPage
      market={MARKETS.australia}
      seoTitle="Online Therapy for Kids in Australia | Speech, OT & Behaviour | No Waitlist"
      seoDescription="Live online speech therapy, occupational therapy, behavioural support and learning support for Australian children. RCI-registered therapists, sessions in your timezone, no waitlist. Suitable for self-managed and plan-managed NDIS."
      heroBlurb="Public speech pathology waitlists in Australia routinely run 6–18 months, and private clinics are often full too. Our therapists work with your child live over video — usually starting within a week, at a fraction of local private rates."
      problemHeading="Why Australian families are looking offshore"
      problem={[
        "Speech pathologists appear on the 2025 Occupation Shortage List in every Australian state. That shortage shows up as waiting lists — 6 to 9 months is typical in the public system, and in the worst cases families wait close to a year for an assessment and a further stretch before therapy actually begins. Private clinics have absorbed some of that demand, but many now maintain their own waitlists.",
        "Meanwhile the cost of private therapy sits at roughly A$150–250 per hour, which is where most non-NDIS families feel the squeeze. Weekly therapy over a year is a serious financial commitment, and the families who need the most sessions are often the ones who can least sustain it.",
        "Delivering therapy over video removes the capacity constraint entirely. Our clinicians are in Bengaluru, where the same clinical training and registration standards apply, and where the cost base is fundamentally different. That is the whole reason we can charge what we charge — not because the therapy is lighter, but because the economics behind it are.",
        "Online delivery also removes the travel. For families in regional Australia, where the nearest paediatric speech pathologist may be a few hours' drive away, that difference is often what makes weekly therapy possible at all rather than merely affordable.",
      ]}
      reassurances={[
        "Speech pathology is self-regulated in Australia — there is no AHPRA registration requirement for this service",
        "Suitable for self-managed NDIS participants, who may purchase from any provider at any price",
        "Plan-managed participants may also use us; our rate sits well below the NDIS price limit",
        "Agency-managed NDIS plans cannot be used for unregistered providers — check your plan type first",
        "Sessions scheduled for Australian afternoons and evenings, not Indian business hours",
        "Free 15-minute consultation before you commit to anything",
      ]}
      faqs={[
        {
          question: "Is it legal for an India-based therapist to treat my child in Australia?",
          answer:
            "Yes. Unlike medicine or psychology, speech pathology in Australia is a self-regulated profession — it is not registered under AHPRA, and there is no legal requirement for a practitioner to hold Australian registration in order to provide speech pathology services. Speech Pathology Australia membership is voluntary and functions as a quality marker rather than a licence. Our clinicians are registered with the Rehabilitation Council of India, which is the statutory registration body for speech-language pathologists in India.",
        },
        {
          question: "Can I use my NDIS funding for this?",
          answer:
            "It depends on how your plan is managed. Self-managed participants have the widest latitude — you may purchase supports from any provider, including an overseas one, at any price. Plan-managed participants may also use unregistered providers, though purchases must stay within the NDIS price limits; our rate is comfortably below the speech pathology limit. Agency-managed (NDIA-managed) plans can only be used with NDIS-registered providers, which we are not. If you are plan-managed, we recommend confirming the arrangement with your plan manager before your first session, as they may need a Statement by a Supplier form on file.",
        },
        {
          question: "What times are sessions available?",
          answer:
            "We schedule Australian families into afternoon and evening slots in your local time, which correspond to morning and midday in India. In practice that means sessions after school work well. We do not ask families to take sessions at inconvenient hours to suit our timezone — if we cannot offer a slot that genuinely works for your child, we will tell you at the consultation rather than after you have paid.",
        },
        {
          question: "Is online speech therapy actually as effective as in person?",
          answer:
            "For a great many speech and language goals, the research evidence shows outcomes comparable to face-to-face therapy — particularly for language delay, articulation and phonology, fluency, and social communication. Online delivery is a weaker fit for some presentations, notably feeding and swallowing difficulties, where hands-on assessment matters. We will tell you on the free consultation if we think your child would be better served in person, including when that means we are not the right provider for you.",
        },
        {
          question: "What happens in the first session?",
          answer:
            "Before anything is booked you have a free 15-minute consultation with our team to talk through your concerns and decide whether online therapy suits your child. If you go ahead, the first paid session is an assessment: the therapist works directly with your child over video while you observe, then explains what they have found and proposes goals. You receive a written summary and a home activity plan after every session.",
        },
      ]}
    />
  );
}
