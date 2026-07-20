import OnlineServicePage from "@/components/online-service-page";
import { serviceBySlug } from "@/config/online-services";

/**
 * Online behavioural therapy / parent training.
 *
 * Note on terminology: this page leads with "parent training" and
 * "ABA-informed" rather than marketing itself as ABA therapy. Caregiver-mediated
 * behavioural intervention delivered by telehealth has genuinely strong
 * evidence behind it — arguably the strongest of the four disciplines here —
 * whereas intensive direct ABA is an in-person, high-hours model we are not
 * offering online. Claiming the latter would be both inaccurate and a magnet
 * for families whose expectations we could not meet.
 */
export default function OnlineBehaviouralTherapyPage() {
  const service = serviceBySlug("behavioural-therapy")!;

  return (
    <OnlineServicePage
      service={service}
      seoTitle="Online Behavioural Therapy & Parent Training for Children | Poorvam Care"
      seoDescription="Live online behavioural support for meltdowns, transitions, sleep, toileting and daily routines. ABA-informed parent training with RCI-registered therapists. Free 15-minute consultation."
      heroBlurb="Most behaviour changes at home, not in a clinic. We work with you — the person who is there for the tantrum, the bedtime, the school run — to build strategies that hold up in real life."
      intro={[
        "Behavioural difficulties rarely happen on schedule in a therapy room. They happen at 7am when the shoes go on, at bedtime, in the supermarket, when a routine changes without warning. That is precisely why caregiver-mediated behavioural support translates so well to video: the work was always going to happen at home, so we may as well train the person who is there.",
        "Of the therapies we offer online, this one arguably has the strongest evidence base behind remote delivery. Parent-mediated behavioural intervention delivered by telehealth has been studied extensively, particularly for autistic children, and outcomes compare well with clinic-delivered equivalents.",
        "To be clear about what this is not: we are not offering intensive one-to-one ABA at 20–40 hours a week. That is an in-person model. What we offer is ABA-informed behavioural consultation and structured parent training — typically weekly — which is what the large majority of families are actually looking for when they describe the problems they are facing.",
      ]}
      whatWorks={[
        "Meltdowns, tantrums, and de-escalation strategies",
        "Transitions — leaving the house, ending screen time, changing activity",
        "Sleep routines and bedtime resistance",
        "Toilet training and mealtime difficulties",
        "Building communication to reduce frustration-driven behaviour",
        "Following instructions, waiting, and turn-taking",
        "Functional behaviour assessment through parent interview and video",
        "Consistent strategies across parents, grandparents and carers",
      ]}
      whatDoesnt={[
        "Intensive direct ABA programmes of 20–40 hours per week",
        "Behaviour that is severely self-injurious or poses a safety risk",
        "Situations needing a therapist physically present to manage a crisis",
        "In-school observation and classroom-based behaviour support",
        "Families who cannot commit to practising between sessions — this model depends on it",
      ]}
      sessionHeading="How online behavioural support works"
      session={[
        "The first session is an assessment conversation with you, not a session with your child. We want to understand the behaviour in detail: when it happens, what comes immediately before it, what happens afterwards, what you have already tried and what did or did not help. Where it is useful and you are comfortable, short phone videos of the behaviour in context tell us far more than a description can.",
        "From that we build a plan targeting the function of the behaviour rather than its surface. A child who melts down at bedtime and a child who melts down when a routine changes may look identical from the outside and need entirely different strategies. Guessing at that is the most common reason generic advice from the internet fails.",
        "Weekly sessions then follow a rhythm: what happened this week, what worked, what didn't, adjust, and agree the next step. Progress is tracked against defined goals rather than impressions, so you can see whether things are genuinely improving.",
        "We also make sure everyone involved is doing the same thing. Inconsistency between parents, or between home and grandparents, is one of the most common reasons behaviour plans stall — so where it helps, we bring both parents or other carers into the session.",
      ]}
      faqs={[
        {
          question: "Is this ABA therapy?",
          answer:
            "It is ABA-informed, but it is not intensive one-to-one ABA. We provide behavioural consultation and structured parent training drawing on applied behaviour analysis principles — typically one session a week, with you delivering the strategies between sessions. Intensive ABA programmes of 20–40 hours weekly are an in-person model and we do not offer them online. If that is what your child needs, we will say so and help you look for it locally.",
        },
        {
          question: "Does behavioural therapy work over video?",
          answer:
            "For the parent-training model, yes — this has among the strongest telehealth evidence of any therapy we offer, particularly for autistic children. The reason is straightforward: the intervention was always going to be delivered by you at home rather than by a therapist in a clinic, so remote coaching does not remove anything essential. What it cannot do is manage a crisis in the moment or deliver intensive direct instruction.",
        },
        {
          question: "Does my child need to attend the sessions?",
          answer:
            "Often not, or only briefly. Much of this work is done with you. For some goals the therapist will want to observe your child — during a transition, a mealtime, or a play session — either live or through a short video you record. But unlike speech therapy, your child does not need to sit at a screen for 45 minutes, which is a relief for families whose child finds that difficult.",
        },
        {
          question: "My child hasn't been diagnosed. Can we still get help?",
          answer:
            "Yes. You do not need a diagnosis to get behavioural support, and plenty of the families we work with do not have one — some are waiting for an assessment, some have decided not to pursue one. We work with the behaviour in front of us. If during our work something suggests a formal assessment would be useful, we will tell you and explain why, without pressure.",
        },
        {
          question: "How long until we see a change?",
          answer:
            "For well-defined behaviours with a clear pattern — a specific transition, a bedtime routine — families often notice something within 3 to 6 weeks of consistent work. Longstanding or complex patterns take longer, and progress is rarely a straight line; a temporary worsening when a strategy first changes is common and expected. Anyone promising a fixed timeline before assessing your child is guessing.",
        },
        {
          question: "Can both parents join the sessions?",
          answer:
            "Yes, and we encourage it. Inconsistency between caregivers is one of the most common reasons behaviour plans fail — a strategy applied by one parent and not the other usually produces no change at all, or makes things worse. Grandparents and other regular carers are welcome too where it is practical.",
        },
      ]}
    />
  );
}
