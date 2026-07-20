import OnlineServicePage from "@/components/online-service-page";
import { serviceBySlug } from "@/config/online-services";

/**
 * Online OT. The honest framing matters most here.
 *
 * Paediatric OT is the discipline where "we do it all online" is least true —
 * hands-on assessment of tone, reflexes and motor patterns cannot be done over
 * video. What does work, and works genuinely well, is parent-coached delivery:
 * the therapist observes the child in their real environment (which is often
 * more informative than a clinic room) and coaches the parent through
 * strategies. That is the claim this page makes, and no more.
 */
export default function OnlineOccupationalTherapyPage() {
  const service = serviceBySlug("occupational-therapy")!;

  return (
    <OnlineServicePage
      service={service}
      seoTitle="Online Occupational Therapy for Children | Sensory & Motor Support | Poorvam Care"
      seoDescription="Live online paediatric occupational therapy — sensory strategies, fine motor and handwriting, self-care routines and regulation, coached through you at home. RCI-registered therapists. Free consultation."
      heroBlurb="Occupational therapy delivered by coaching you, in the room where your child actually struggles. Sensory strategies, handwriting, dressing, mealtimes, and regulation — worked on at home, where the difficulty really happens."
      intro={[
        "Yes, occupational therapy can be delivered online — but it works differently from in-person OT, and it is worth understanding how before you book. Rather than the therapist working hands-on with your child, they observe and coach you through the strategies, using the toys, furniture and routines you already have at home.",
        "For a lot of paediatric OT goals this is not a compromise. A therapist watching your child attempt a real morning routine in a real bedroom learns more than they would from the same child in an unfamiliar clinic room with unfamiliar equipment. Sensory difficulties in particular tend to show up in context — at the dinner table, in the bath, in a noisy room — and context is exactly what a clinic visit strips away.",
        "It also puts the strategies in the hands of the person with your child all week. An OT sees your child for 45 minutes; you have the other 10,000 minutes. Parent-coached OT is designed around that arithmetic rather than against it.",
      ]}
      whatWorks={[
        "Sensory strategies and a sensory diet built around your actual home",
        "Fine motor skills — pencil grip, handwriting, scissors, buttons, laces",
        "Self-care routines: dressing, feeding, toothbrushing, toileting",
        "Emotional regulation and calming strategies in real situations",
        "Play skills, attention, and sitting tolerance for school readiness",
        "Setting up the home or study space to support your child",
        "Coaching parents to embed strategies into everyday routines",
      ]}
      whatDoesnt={[
        "Hands-on assessment of muscle tone, reflexes, or joint mobility",
        "Therapy needing specialist equipment — swings, therapy balls, scooter boards",
        "Physical facilitation, where the therapist guides your child's body directly",
        "Feeding therapy involving oral-motor or swallowing difficulties",
        "Children who cannot yet tolerate a screen for a meaningful stretch",
      ]}
      sessionHeading="What an online OT session actually looks like"
      session={[
        "Sessions run 45 minutes over video, with a parent present throughout — that is not a limitation of the online format, it is the mechanism. You are the one delivering the strategy; the therapist is teaching and adjusting it in real time.",
        "The first session is an assessment. The therapist will ask you to show them specific things — how your child sits at a table, how they hold a pencil, how they respond to a particular texture or sound, what a difficult transition looks like. Often they will ask you to walk the camera around the room. From that you get a written summary of what they observed and the goals they propose.",
        "After that, a typical session is: review how the week's strategies went, try something new together while the therapist watches and corrects, then agree what to practise next. You will be asked to have a few ordinary household items to hand — we send a list beforehand, and it is deliberately things you already own rather than equipment you have to buy.",
        "Every session ends with a written home plan in your Poorvam portal, alongside the goals and previous session notes, so nothing depends on what you managed to remember afterwards.",
      ]}
      faqs={[
        {
          question: "Can occupational therapy really be done online?",
          answer:
            "Yes, for many goals — but through parent coaching rather than the therapist working hands-on with your child. Research on telehealth OT supports this model particularly for sensory strategies, fine motor skills, self-care routines and parent-mediated intervention. It is not suitable for goals that need physical handling or specialist equipment, and we will tell you at the consultation which category your child falls into.",
        },
        {
          question: "What equipment or materials do I need?",
          answer:
            "Ordinary household items, almost always. A device with a camera, a stable connection, and a space where your child can move a little. Before each session we send a short list of what to have ready — paper, crayons, a ball, cushions, kitchen items, whatever the session calls for. We deliberately build activities around what families already own; you should not need to buy therapy equipment to make progress.",
        },
        {
          question: "Do I need to be in the room the whole time?",
          answer:
            "Yes, for younger children, and for most sensory and motor work at any age. This is the core of how online OT works — the therapist coaches you, and you deliver the strategy. Older children working on handwriting, organisation or study skills can often work more independently, with the parent joining for the last few minutes to hear the plan.",
        },
        {
          question: "My child has sensory processing difficulties. Can you help online?",
          answer:
            "This is one of the areas where online OT does especially well. Sensory difficulties are contextual — they show up at mealtimes, at bath time, in noisy rooms, during dressing — and a clinic visit rarely captures that. Seeing your actual home lets the therapist build a sensory plan around your real routines and triggers instead of a generic one. What we cannot do online is the hands-on physical input a clinic gym provides.",
        },
        {
          question: "How is this different from your speech therapy sessions?",
          answer:
            "Online speech therapy usually involves the therapist working directly with your child through the screen, with the parent supporting. Online OT flips that — the therapist mostly coaches you, and you work with your child. Many families use both; if your child sees us for speech and OT, the two therapists share goals and notes in the same record so the plans reinforce rather than contradict each other.",
        },
        {
          question: "Which countries do you offer online OT in?",
          answer:
            "India, Australia, and the UAE. Availability elsewhere depends on local regulations for allied health professions, which vary considerably. Tell us where you are on the enquiry form and we will confirm straight away whether we can help.",
        },
      ]}
    />
  );
}
