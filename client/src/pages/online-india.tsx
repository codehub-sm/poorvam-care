import OnlineMarketPage from "@/components/online-market-page";
import { MARKETS } from "@/config/markets";

/**
 * The domestic market — and the only one with zero regulatory friction, since
 * RCI registration is the correct and sufficient credential to practise here.
 *
 * Positioning targets Tier 2/3 cities and smaller towns, where paediatric
 * therapy supply is genuinely concentrated in metros. Note this is not an empty
 * market: Stamurai, Wellness Hub, Lissun and 1SpecialPlace already operate in
 * it, and Stamurai in particular prices aggressively (~₹6,000/month for 8
 * sessions). Volume has to substitute for margin here in a way it does not
 * in AUD or AED.
 */
export default function OnlineIndiaPage() {
  return (
    <OnlineMarketPage
      market={MARKETS.india}
      seoTitle="Online Therapy for Children in India | Speech, OT, Behaviour & Learning"
      seoDescription="Live online speech therapy, occupational therapy, behavioural support and remedial teaching for children anywhere in India. RCI-registered therapists. Sessions in Hindi, Tamil, Telugu, Kannada, Malayalam and English."
      heroBlurb="Paediatric speech therapy is concentrated in a handful of metros. If you are not in one, weekly therapy can mean a long journey each way. Our therapists work with your child live over video, in your language, wherever you are."
      problemHeading="Good therapy shouldn't depend on your postcode"
      problem={[
        "Paediatric speech and language therapy in India is heavily concentrated in the major metros. Families in Tier 2 and Tier 3 cities frequently travel to Bengaluru, Chennai, Hyderabad, or Mumbai for an assessment — and then face the harder question of how to sustain weekly therapy from a few hundred kilometres away.",
        "What usually happens next is that therapy becomes monthly instead of weekly, or stops altogether. For a young child in an early intervention window, that gap matters more than most families are told. Consistency over months is what drives progress; intensity in a single visit does not compensate for it.",
        "Online delivery changes the arithmetic. A weekly 45-minute session from home costs a fraction of a monthly trip, and it is far easier to keep going for the twelve or eighteen months that meaningful progress usually takes.",
        "Our therapists are registered with the Rehabilitation Council of India and work in Hindi, Tamil, Telugu, Kannada, Malayalam, and English. Therapy happens in whichever language your family actually speaks at home — which, for a child learning to communicate, is not a detail.",
      ]}
      reassurances={[
        "RCI-registered clinicians — the statutory credential for this profession in India",
        "Therapy in Hindi, Tamil, Telugu, Kannada, Malayalam or English",
        "Works on a phone, tablet, or laptop with a stable connection",
        "Home activity plan and written summary after every session",
        "No packages to buy into and no minimum commitment",
        "Free 15-minute consultation before you commit",
      ]}
      faqs={[
        {
          question: "How much does online therapy cost?",
          answer:
            "Fees depend on the type of therapy and how often your child needs sessions, so we go through it properly on the free 15-minute consultation rather than quoting a figure that may not apply to you. What we can tell you up front: there is no package you have to buy into, no minimum number of sessions, and you will have a clear number before you are asked to commit to anything. If you are in Bengaluru and would prefer to come in person, in-centre pricing is published on our service packages page.",
        },
        {
          question: "Which languages do you offer therapy in?",
          answer:
            "Hindi, Tamil, Telugu, Kannada, Malayalam, and English. We match your child to a therapist who works in your home language. This matters clinically rather than just conveniently — a child's language skills can only be assessed accurately in the language they actually use, and assessing a Telugu-speaking child in English will systematically understate what they can do.",
        },
        {
          question: "Do I need a computer, or will a phone work?",
          answer:
            "A tablet or laptop is better because the screen is bigger and the child can see the therapist's mouth and materials clearly, but a phone works if that is what you have — many of our families use one. What matters more is a reasonably stable connection and a quiet room where your child is not being distracted for the 45 minutes.",
        },
        {
          question: "How long before we see progress?",
          answer:
            "It depends heavily on the child's age, the nature of the difficulty, and how consistently home practice happens between sessions. Broadly, most families notice early changes within 6–8 weeks of weekly therapy, with more substantial progress over 6–12 months. Be sceptical of anyone who promises a specific timeline before assessing your child — including us.",
        },
        {
          question: "Is online therapy as good as coming to the centre?",
          answer:
            "For most speech and language goals the evidence puts online delivery on par with in-person therapy. It is less suitable for feeding and swallowing difficulties, which need hands-on assessment, and some children under three engage better in a room with a therapist. If we think your child would do better in person, we will say so on the free consultation — and if you are not near Bengaluru, we would rather refer you locally than take a booking we do not think will help.",
        },
      ]}
    />
  );
}
