import OnlineMarketPage from "@/components/online-market-page";
import { MARKETS } from "@/config/markets";

/**
 * ⚠️ REGULATORY WARNING — READ BEFORE PUBLISHING THIS PAGE.
 *
 * The UAE position is materially weaker than Australia's. DHA's Standards for
 * Telehealth Services require the individual practitioner to hold a DHA
 * professional licence, and require the service to run through a DHA-licensed
 * facility with telehealth authorisation. Being physically outside the UAE does
 * not exempt a provider. In other words this is prohibited on paper.
 *
 * What makes it viable in practice is weak enforcement against consumer-facing
 * offshore providers — Indian competitors currently rank first organically for
 * "speech therapist in Dubai" with no UAE presence at all. That is a risk being
 * chosen, not a loophole. It needs UAE counsel before launch.
 *
 * Consequently this page deliberately makes NO claim about licensure or
 * regulatory standing, and no claim about insurance reimbursement (the Dubai
 * basic package excludes allied health, and enhanced plans require a
 * DHA-licensed provider, which we are not). Do not add either without counsel.
 */
export default function OnlineUaePage() {
  return (
    <OnlineMarketPage
      market={MARKETS.uae}
      seoTitle="Online Speech Therapy for Children in UAE & Dubai | Poorvam Care"
      seoDescription="Live online speech therapy for children in the UAE. RCI-registered therapists, sessions in Gulf Standard Time, therapy in English, Hindi, Tamil, Telugu and Malayalam. Book a free 15-minute consultation."
      heroBlurb="Paediatric therapy in the UAE typically runs AED 250–600 a session, and most clinics quote only by phone. We deliver the same weekly therapy live over video, in your family's language, at a published price."
      problemHeading="Why UAE families choose online therapy"
      problem={[
        "Paediatric speech therapy in Dubai and Abu Dhabi is expensive and largely cash-funded. The mandatory basic health insurance package excludes allied health services, so unless a family holds an enhanced corporate plan, therapy is paid out of pocket. Over a year of weekly sessions, that adds up quickly.",
        "Pricing is also opaque. Most clinics do not publish rates at all — you call, you are invited in for an assessment, and the cost of the actual programme emerges later. We publish our price on this page because we think families deciding whether they can afford a year of therapy deserve to know that up front.",
        "There is a language dimension too. The UAE has a very large Indian expatriate population, and many children are growing up between English and a home language — Hindi, Malayalam, Tamil, Telugu, or Kannada. Assessing a bilingual child's language development accurately requires a clinician who understands both languages, or the child's home language gets mistaken for a delay.",
        "Our therapists work in those languages as a matter of course, because that is the population they trained on. For a family raising a bilingual child in Dubai or Sharjah, that is often the difference between a useful assessment and a misleading one.",
      ]}
      reassurances={[
        "Therapy delivered in English, Hindi, Malayalam, Tamil, Telugu or Kannada",
        "Published per-session price — no assessment-first pricing reveal",
        "Sessions in Gulf Standard Time, including evenings after school",
        "Clinicians registered with the Rehabilitation Council of India",
        "This is a private-pay service; it is not billable to UAE health insurance",
        "free 15-minute consultation before you commit",
      ]}
      faqs={[
        {
          question: "Can I claim this on my UAE health insurance?",
          answer:
            "No. This is a private-pay service and it is not billable to UAE health insurance. The mandatory basic package in Dubai excludes allied health services such as speech therapy in any case, and enhanced plans that do cover therapy require the provider to be DHA-licensed and usually require a physician referral. We would rather state this plainly than have families discover it after starting therapy.",
        },
        {
          question: "What languages do your therapists work in?",
          answer:
            "English, Hindi, Malayalam, Tamil, Telugu, and Kannada. This matters more than it might sound for bilingual children. A child growing up between English and a home language often shows patterns that look like a delay when assessed only in English, but are entirely typical for a bilingual learner. Assessing across both languages is the only way to tell the difference reliably, and it is a common reason bilingual children are either over-diagnosed or missed altogether.",
        },
        {
          question: "What times are sessions available?",
          answer:
            "India is only 90 minutes ahead of Gulf Standard Time, which makes the UAE the easiest of our markets to schedule. After-school and early-evening slots are straightforward, and we can usually offer a consistent weekly time rather than moving your child around week to week.",
        },
        {
          question: "How does an online session actually work?",
          answer:
            "You will need a laptop or tablet with a camera and a reasonably stable internet connection, and a quiet room. Sessions run 45 minutes over secure video. For younger children a parent stays in the room throughout — partly to help keep the child engaged, and partly because a large share of the progress comes from what you do between sessions. Every session ends with a home activity plan and a written summary.",
        },
        {
          question: "Is online therapy suitable for my child?",
          answer:
            "For most speech and language goals — language delay, articulation, fluency, social communication — the evidence supports online delivery as comparable to in-person therapy. It is a poorer fit for feeding and swallowing difficulties, which really do need hands-on assessment. The introductory call exists so we can tell you which category your child falls into, including when the honest answer is that you should see someone locally in person.",
        },
      ]}
    />
  );
}
