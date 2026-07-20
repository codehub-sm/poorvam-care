import OnlineServicePage from "@/components/online-service-page";
import { serviceBySlug } from "@/config/online-services";

/**
 * Online special education / remedial learning support.
 *
 * The one discipline here that is genuinely native to the format — one-to-one
 * remedial teaching over video loses almost nothing, and screen-shared reading
 * and writing materials are often better than paper for a struggling reader.
 *
 * Care taken NOT to claim we diagnose dyslexia, ADHD or any learning disorder.
 * Formal diagnosis needs psychometric assessment that is not deliverable this
 * way, and implying otherwise would mislead exactly the families least able to
 * tell the difference.
 */
export default function OnlineSpecialEducationPage() {
  const service = serviceBySlug("special-education")!;

  return (
    <OnlineServicePage
      service={service}
      seoTitle="Online Special Education & Remedial Teaching for Children | Poorvam Care"
      seoDescription="One-to-one online remedial teaching for reading, writing and maths difficulties, including dyslexia and ADHD support. Individualised plans from RCI-registered special educators. Free consultation."
      heroBlurb="One-to-one remedial teaching for children who are falling behind in reading, writing or maths — taught at the pace they actually need, not the pace the classroom moves at."
      intro={[
        "Of everything we deliver online, remedial teaching is the one that loses least in translation. One-to-one instruction over video is close to identical to one-to-one instruction across a table — and for a child who struggles with reading, a screen-shared text you can enlarge, recolour, highlight and reveal line by line is often easier to work with than a printed page.",
        "Most children we see here are not failing because of effort. They are in a classroom of thirty moving at a pace built for the middle of the group, and a specific difficulty — decoding, working memory, number sense, written expression — means the gap widens every term. Remedial teaching works by finding precisely where the foundation broke and rebuilding from there, however far back that is.",
        "That is uncomfortable to hear when a child is in Year 5 and the gap traces to Year 2 phonics. But starting from the actual gap, rather than where the syllabus says they should be, is the only thing that reliably closes it.",
      ]}
      whatWorks={[
        "Reading — phonics, decoding, fluency and comprehension",
        "Writing — spelling, sentence construction, and written expression",
        "Maths — number sense, operations, word problems and maths anxiety",
        "Dyslexia-informed structured literacy instruction",
        "Study skills, organisation and executive function for ADHD",
        "Exam preparation and access-arrangement strategies",
        "Rebuilding academic confidence after repeated failure",
        "Working alongside your child's school targets and IEP",
      ]}
      whatDoesnt={[
        "Formal diagnosis of dyslexia, ADHD or any specific learning disorder",
        "Psychometric or IQ assessment, which requires in-person standardised testing",
        "Classroom observation or in-school advocacy",
        "Children who cannot yet sustain attention to a screen for around 30 minutes",
        "Replacing school — this supplements classroom teaching, it does not substitute for it",
      ]}
      sessionHeading="How online remedial teaching works"
      session={[
        "We start with an informal academic assessment — not a diagnostic test, but a careful look at what your child can and cannot currently do. The educator works through graded reading, writing or number tasks to find the point where it stops being secure. That point, rather than their year level, becomes the starting line.",
        "You then get a written plan with specific, checkable targets: not \"improve reading\" but \"blend consonant clusters in single-syllable words with 80% accuracy\". Vague goals are unmeasurable, and unmeasurable goals are how children spend a year in tutoring without anyone noticing it is not working.",
        "Sessions are 45 minutes, one-to-one, using shared digital materials the educator controls — so text can be enlarged, spaced, or revealed gradually depending on what your child needs. Multisensory techniques still apply: children write, say things aloud, and use physical objects at their end while the educator guides.",
        "Progress is reviewed monthly against the written targets, and adjusted. If something is not working after a fair trial, we change the approach rather than repeating it more loudly — and we will tell you if we think a formal assessment or a different kind of support would serve your child better than continuing with us.",
      ]}
      faqs={[
        {
          question: "Can you diagnose dyslexia or ADHD?",
          answer:
            "No. Formal diagnosis requires standardised psychometric assessment carried out in person by a qualified psychologist, and anyone offering to diagnose these conditions over video should be treated with caution. What we can do is teach a child using dyslexia-informed structured literacy methods, work to targets from an existing diagnosis or IEP, and tell you honestly if what we observe suggests a formal assessment would be worth pursuing.",
        },
        {
          question: "Is online remedial teaching as effective as in person?",
          answer:
            "For one-to-one remedial instruction, it is very close — this is the most format-neutral of the therapies we offer. The active ingredients are individualised pacing, immediate feedback and consistent practice, none of which depend on sharing a room. Screen-shared materials add some genuine advantages for struggling readers: adjustable text size, spacing, colour overlays, and controlled reveal of text.",
        },
        {
          question: "How is this different from a normal tutor?",
          answer:
            "A tutor generally helps with the current curriculum — this week's homework, next month's test. A special educator works on the underlying skill that is causing the difficulty, which often means going back several years to rebuild a foundation. Tutoring assumes the learning mechanism is intact and just needs more practice; remedial teaching assumes it isn't, and rebuilds it.",
        },
        {
          question: "My child already has an IEP from school. Can you work with it?",
          answer:
            "Yes, and please share it. Working to the same targets as school means your child gets consistent instruction rather than two well-meaning approaches pulling in different directions. We can also provide written progress summaries you can take back to the school's review meetings.",
        },
        {
          question: "How often should sessions be?",
          answer:
            "Twice a week produces noticeably faster progress than once for most literacy and numeracy goals — the skills being built need frequent repetition, and a single weekly session leaves too long a gap. That said, consistency matters more than intensity. One session a week sustained for a year beats three a week abandoned after two months.",
        },
        {
          question: "What ages do you work with?",
          answer:
            "Broadly ages 5 to 16. Early literacy work with 5–7 year olds is highly effective online in short focused sessions. Older children working on study skills, written expression and exam strategies also do well, and often prefer the format — for a teenager who has found school difficult, working from home carries noticeably less stigma than being taken out of class.",
        },
      ]}
    />
  );
}
