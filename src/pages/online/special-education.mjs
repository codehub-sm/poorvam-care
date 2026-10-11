import { html, bookButton, whatsappButton, breadcrumb, byline, faqSection, ctaBand } from '../../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../../ui.mjs';
import { ONLINE } from '../../site.mjs';
import { onlineSchema, parentViewSection, marketsSection, otherOnline } from './speech-therapy.mjs';

const PATH = '/online/special-education';
const TONE = 'sun';
const DESCRIPTION = 'One-to-one online remedial teaching for reading, writing and maths difficulties, including dyslexia and ADHD. Written plans from RCI-registered special educators.';

const faqs = [
  {
    q: 'Can you diagnose dyslexia or ADHD?',
    a: 'No. A formal diagnosis needs standardised assessment carried out in person by a qualified psychologist, and anyone offering to diagnose these conditions over video should be treated with caution. A developmental paediatrician or child psychiatrist is also involved for ADHD. What we can do is teach your child with dyslexia-informed structured literacy methods, work to the targets in an existing diagnosis or IEP, and tell you honestly if what we see suggests a formal assessment is worth pursuing.',
  },
  {
    q: 'Is online remedial teaching as effective as in person?',
    a: 'For one-to-one remedial teaching, it is very close. This is the therapy we offer that changes least on a screen. What makes it work is pacing set for your child, immediate feedback and steady practice, and none of that needs a shared room. Screen-shared materials even help struggling readers: text can be enlarged, spaced out, given a colour overlay or revealed a line at a time.',
  },
  {
    q: 'How is this different from a normal tutor?',
    a: 'A tutor usually helps with the current syllabus: this week\'s homework, next month\'s test. A special educator works on the underlying skill causing the difficulty, which often means going back several years to rebuild a foundation. Tutoring assumes the way your child learns is working and just needs more practice. Remedial teaching assumes something is getting in the way, finds it, and rebuilds from there.',
  },
  {
    q: 'My child already has an IEP from school. Can you work with it?',
    a: 'Yes, and please share it. Working to the same targets as school gives your child consistent teaching instead of two well-meaning approaches pulling in different directions. We can also give you written progress summaries to take to the school\'s review meetings.',
  },
  {
    q: 'How often should sessions be?',
    a: 'For most reading, writing and maths goals, twice a week brings noticeably faster progress than once. The skills being built need frequent repetition, and a single weekly session leaves a long gap. Even so, keeping going matters more than intensity: one session a week kept up for a year does more than three a week dropped after two months.',
  },
  {
    q: 'What ages do you work with?',
    a: 'Broadly from age 5 to 14. Early reading work with 5 to 7 year olds goes well online in short, focused sessions. Older children working on study skills, written expression and exam strategies also do well, and often prefer it: for a child who has found school hard, learning from home carries less stigma than being taken out of class.',
  },
  {
    q: 'Does online special education replace school?',
    a: 'No. It adds to classroom teaching, it does not stand in for it. Your child keeps going to school, and sessions fill the specific gaps that are holding them back there, ideally working to the same targets as the school.',
  },
  {
    q: 'How much does online special education cost?',
    a: 'Fees depend on how many sessions a week your child needs. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts.',
  },
];

const works = [
  { icon: 'book', title: 'Reading', text: 'Phonics, decoding, fluency and understanding what was read.' },
  { icon: 'hand', title: 'Writing', text: 'Spelling, building sentences, and getting ideas down on paper.' },
  { icon: 'blocks', title: 'Maths', text: 'Number sense, operations, word problems and maths anxiety.' },
  { icon: 'search', title: 'Dyslexia-informed teaching', text: 'Structured literacy, taught step by step at your child\'s pace.' },
  { icon: 'route', title: 'Study skills and ADHD', text: 'Organisation, planning and attention strategies for schoolwork and exams.' },
  { icon: 'heart', title: 'Confidence after struggle', text: 'Rebuilding belief in themselves after a run of bad marks.' },
];

const screen = [
  { icon: 'search', title: 'Bigger text', text: 'Enlarged as much as your child needs.' },
  { icon: 'book', title: 'More space', text: 'Wider spacing between letters, words and lines.' },
  { icon: 'spark', title: 'Colour overlays', text: 'A tint behind the text if it helps your child.' },
  { icon: 'route', title: 'One line at a time', text: 'Text revealed gradually, so the page does not overwhelm.' },
];

export default {
  path: PATH,
  title: 'Online Special Education & Remedial Teaching for Children',
  description: DESCRIPTION,
  reviewed: '2026-10-11',
  current: ONLINE.page,
  local: false,
  breadcrumb: [['Online therapy', ONLINE.page], ['Special education online', PATH]],
  faqs,
  schema: [onlineSchema({ path: PATH, name: 'Online special education and remedial teaching for children', serviceType: 'Online special education and remedial teaching', description: DESCRIPTION })],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Online therapy', ONLINE.page], ['Special education online', PATH]])}
    <h1>Online special education and learning support</h1>
    <p class="answer">Remedial teaching works almost as well online as across a table. A special educator teaches your child one to one over video, rebuilding reading, writing or maths from where it broke down, at your child's pace. Diagnosing dyslexia or ADHD still needs an in-person assessment.</p>
    <div class="phero__acts">${bookButton('Book an online consultation', 'special-ed', 'btn btn--ink', 'online')}${whatsappButton('Hi Poorvam Care, I would like to know about online special education for my child.', 'btn btn--line')}</div>
    ${stats([
      { label: 'Each online session', value: '45 min', tone: 'sun' },
      { label: 'Ages, broadly', value: '5–14', tone: 'blue' },
      { label: 'Open to families in', value: ONLINE.markets.map((m) => m.name).join(', '), tone: 'mint' },
      { label: 'Teaching', value: 'One to one', tone: 'violet' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What online special education helps with', 'Most children we see are not short of effort. A specific difficulty means the gap widens every term.')}
    ${cards(works.map((w) => ({ ...w, tone: TONE })), { cols: 3 })}
    ${more('Why the gap keeps growing, and how teaching closes it', `<p>A child in a full classroom moves at a pace built for the middle of the group. If one skill is shaky, such as decoding, working memory, number sense or written expression, everything built on it wobbles too.</p>
      <p>Remedial teaching finds exactly where the foundation broke and rebuilds from there, however far back that is. That is hard to hear when a child is in Class 5 and the gap goes back to Class 2 phonics. But starting from the real gap, not where the syllabus says they should be, is what reliably closes it.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What works online, and what needs an in-person visit', 'Of everything we offer online, remedial teaching loses least. These are the limits.')}
    <div class="table-wrap"><table>
      <thead><tr><th>What your child needs</th><th>Online</th><th>In person</th></tr></thead>
      <tbody>
        <tr><td>Reading, spelling and writing</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Maths and number sense</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Study skills, exams, ADHD strategies</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Working to a school IEP</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Diagnosis of dyslexia, ADHD or a learning disorder</td><td>Not possible</td><td>Assessment by a qualified psychologist</td></tr>
        <tr><td>IQ or psychometric testing</td><td>Not possible</td><td>Standardised testing in person</td></tr>
        <tr><td>Classroom observation or school advocacy</td><td>Not suitable</td><td>Needs a school visit</td></tr>
        <tr><td>Can't yet attend to a screen for about 30 minutes</td><td>Not yet</td><td>Usually better in person for now</td></tr>
      </tbody>
      <caption>How we decide at the consultation. We tell you plainly if online is not the right fit.</caption>
    </table></div>
    ${callout('This adds to school, it does not replace it', 'Your child keeps going to class. Sessions fill the specific gaps holding them back, ideally working to the same targets as the school.', 'info')}
    ${callout('If your child needs to be seen in person', 'In Bengaluru, the same team teaches children at our <a href="/special-education-for-children-bangalore">special education centres</a>. Anywhere else, we will say so on the consultation and help you look for someone local.', 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How online remedial teaching works', 'One-to-one 45-minute sessions, with targets you can check and a review every month.')}
    ${steps([
      ['Tell us about your child', 'Your child\'s age, class, what is hard and where you live.'],
      ['We get in touch', 'We call or WhatsApp within one working day to find a time.'],
      ['Learning assessment', 'Graded reading, writing or number tasks to find where skills stop being secure.'],
      ['A written plan', 'Specific targets you can check, not "improve reading".'],
      ['Sessions and monthly review', 'Teaching to the targets, checked each month and adjusted.'],
    ])}
    ${weekPlan({
      tone: TONE,
      session: ['Shared materials the educator controls on screen', 'Multisensory work: writing, saying aloud, objects at your end', 'A quick check against this week\'s target'],
      home: ['Short practice, little and often', 'Goals, notes and progress on your phone', 'Written summaries to share at school reviews'],
    })}
    ${more('More about the assessment and the targets', `<p>We start with an informal learning assessment. It is not a diagnostic test, but a careful look at what your child can and cannot do yet. The educator works through graded tasks to find the point where things stop being secure. That point, not your child's class, becomes the starting line.</p>
      <p>The plan has specific targets, such as "blends consonant clusters in one-syllable words with 80% accuracy". Vague goals cannot be measured, and that is how children spend a year in tuition without anyone noticing it is not working.</p>
      <p>Progress is reviewed monthly. If something is not working after a fair try, we change the approach rather than repeating it louder, and we tell you if a formal assessment or a different kind of support would serve your child better.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Why a screen can help a struggling reader', 'A shared screen can be easier to read than a printed page. The educator adjusts it for your child.')}
    ${cards(screen.map((s) => ({ ...s, tone: TONE })), { cols: 4, compact: true })}
  </div>
</section>

${parentViewSection(TONE)}

${marketsSection('Who can book online special education', 'Sessions are open to families living in India, Australia and the UAE. The team is based in Bengaluru.', TONE)}

<section class="band band--paper">
  <div class="wrap">
    ${head('Other therapies we offer online', 'Some children need speech or OT alongside learning support. Online therapists share one plan and one record.')}
    ${otherOnline(PATH, { title: 'Special education at our centres', text: 'In Bengaluru? The same educators teach in person in Electronic City.', href: '/special-education-for-children-bangalore' })}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online special education: questions')}
${ctaBand('Book an online consultation', 'Tell us about your child. We call or WhatsApp within one working day to find a time that suits your time zone.')}
`,
};
