import OnlineServicePage from "@/components/online-service-page";
import { serviceBySlug } from "@/config/online-services";

/**
 * Online speech & language therapy — the discipline with the strongest and
 * best-established telehealth evidence base, and the highest search volume of
 * the four.
 *
 * Content is deliberately distinct from the country pages (/online/australia
 * etc). Those answer "can I get this where I live?"; this one answers "does
 * this work for my child's difficulty?". Near-duplicate pages compete with each
 * other rather than ranking.
 */
export default function OnlineSpeechTherapyPage() {
  const service = serviceBySlug("speech-therapy")!;

  return (
    <OnlineServicePage
      service={service}
      seoTitle="Online Speech Therapy for Children | Late Talkers, Unclear Speech, Stammering | Poorvam Care"
      seoDescription="Live one-to-one online speech and language therapy for children — late talking, unclear speech, language delay, stammering and autism-related communication. RCI-registered therapists. Free consultation."
      heroBlurb="Live one-to-one sessions with a speech-language pathologist, in the language your family speaks at home. For late talkers, children who are hard to understand, stammering, and autism-related communication."
      intro={[
        "Speech and language therapy has the longest track record of any therapy delivered over video, and the research consistently finds outcomes comparable to in-person sessions across most goals — articulation, language delay, fluency and social communication among them.",
        "Part of why it transfers so well is that a great deal of speech therapy is already screen- and material-based: pictures, sounds, games, structured turn-taking. A therapist sharing their screen has more flexibility than one working from a fixed set of flashcards, and can change activity instantly when a child's attention shifts.",
        "The other part is that the therapist gets to see your child in their own home. Communication is contextual — how a child asks for something at their own dinner table tells you more than how they perform in an unfamiliar room with an unfamiliar adult.",
        "One thing we treat as clinical rather than convenient: we match your child to a therapist who works in your home language. A bilingual child assessed only in English will routinely look delayed when they are developing typically across two languages. It is one of the most common reasons bilingual children are either wrongly flagged or wrongly reassured.",
      ]}
      whatWorks={[
        "Late talkers and delayed first words",
        "Unclear speech — articulation and phonological difficulties",
        "Expressive and receptive language delay",
        "Stammering and fluency difficulties",
        "Autism-related communication and social language",
        "Vocabulary, sentence building, and grammar",
        "Bilingual and heritage-language assessment and therapy",
        "Parent coaching to build language into everyday routines",
      ]}
      whatDoesnt={[
        "Feeding and swallowing difficulties, which need hands-on assessment",
        "Oral-motor assessment requiring physical examination of the mouth",
        "Voice disorders needing instrumental assessment such as laryngoscopy",
        "Children who cannot yet engage with a screen for a meaningful stretch",
        "Hearing assessment — that requires audiological testing at our centre",
      ]}
      sessionHeading="What an online speech therapy session looks like"
      session={[
        "The first session is an assessment. The therapist works directly with your child over video while you stay nearby, using play, pictures and structured tasks to sample how your child understands and uses language. For bilingual children this is done across both languages. Afterwards you get a written summary of what they found and the goals they propose.",
        "Regular sessions run 45 minutes. The therapist leads activities through screen sharing — games, sounds, picture tasks, stories — and steadily hands parts of the activity to you, because what happens in the other six days matters more than the 45 minutes.",
        "For younger children a parent stays in the room throughout. Under about four years old, most of the real work is parent-delivered anyway, and the session functions largely as coaching. Older children often work more independently, with you joining at the end for the plan.",
        "Every session ends with a home activity plan in your Poorvam portal alongside the goals and previous notes — so you can see what is being worked on and why, without needing to have taken notes yourself.",
      ]}
      faqs={[
        {
          question: "Does online speech therapy actually work?",
          answer:
            "Yes — this is the best-evidenced of the therapies delivered by telehealth, with research consistently showing outcomes comparable to in-person sessions for articulation, language delay, fluency and social communication. It is not suitable for feeding and swallowing difficulties or anything needing physical examination of the mouth. We will tell you at the consultation which applies to your child.",
        },
        {
          question: "What age can a child start online speech therapy?",
          answer:
            "We assess from around 18 months, though what therapy looks like changes a lot with age. Under three, sessions are mostly parent coaching — the therapist teaches you techniques to use through the day, which is more effective at that age than a toddler sitting at a screen. From around three or four, children usually engage directly with the therapist for increasing portions of the session.",
        },
        {
          question: "My child won't sit still for a video call. Will this work?",
          answer:
            "Often better than parents expect, but it depends. Therapists use short, fast-changing, play-based activities rather than expecting sustained sitting, and a child who cannot manage 45 minutes at a table can frequently manage 45 minutes of games that change every few minutes. For very young or very active children we lean harder on the parent-coaching model, where your child does not need to attend for long at all. If we do not think the format will work, we will say so at the consultation.",
        },
        {
          question: "Which languages can therapy be delivered in?",
          answer:
            "English, Hindi, Tamil, Telugu, Kannada and Malayalam. We match your child to a therapist who works in your home language, and this matters clinically rather than just practically — a child's language ability can only be assessed accurately in the language they actually use. Assessing a Telugu-speaking child in English will systematically understate what they can do.",
        },
        {
          question: "Should I stop speaking our home language to help my child's English?",
          answer:
            "Almost never, and it is one of the most common pieces of well-meaning advice that backfires. Bilingualism does not cause speech or language delay, and dropping the language you are most fluent in usually reduces both the quantity and the richness of language your child hears. Children need strong foundations in a first language to build a second on. If a delay exists it exists in both languages, and that is what we assess for.",
        },
        {
          question: "How many sessions will my child need?",
          answer:
            "It depends on age, the nature of the difficulty, and how much practice happens between sessions — and anyone giving you a number before assessing your child is guessing. As a rough guide, isolated speech-sound difficulties often resolve in a few months of weekly sessions, while broader language delay is usually a longer piece of work measured in terms rather than weeks. We review goals monthly so you can see whether it is working.",
        },
      ]}
    />
  );
}
