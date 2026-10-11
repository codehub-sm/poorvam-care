import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, more, split, milestoneLadder, weekPlan } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-for-speech-delay-bangalore';
const REVIEWED = '2026-10-11';
const TRAIL = [['All therapies', '/child-development'], ['Speech delay', PATH]];

const faqs = [
  {
    q: 'My toddler is not talking yet. Is that normal?',
    a: 'Children develop at different speeds, but most say first words between 12 and 18 months and join two words by age 2. If your child is not babbling by 12 months or not using any words by 18 months, an assessment is worth doing now. Help that starts early is easier for the child, because the gap is smaller.',
  },
  {
    q: 'What causes speech delay in children?',
    a: `Hearing problems, difficulty with the mouth movements for speech, developmental conditions such as autism or ADHD, too little back-and-forth talk, and premature birth can all play a part. Often there is no single clear cause. A speech-language pathologist looks for the likely reasons and plans therapy around them. Hearing is checked first, at our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a>.`,
  },
  {
    q: 'How long does speech therapy take for speech delay?',
    a: 'It depends on how big the delay is, your child\'s age, how often sessions happen and how much practice happens at home. Many children start with two or three sessions a week. We set goals at the start, review progress with you regularly, and reduce sessions as your child needs less support.',
  },
  {
    q: 'Do you offer speech therapy for toddlers under 2 years old?',
    a: 'Yes. We see toddlers from around 12 to 18 months. For very young children, therapy is play-based and leans heavily on parent coaching, so you learn ways to build talking into meals, bath time and play every day between sessions.',
  },
  {
    q: 'Should we wait and see if our child grows out of it?',
    a: 'Some late talkers do catch up on their own, but nobody can tell in advance which ones will. An assessment does not commit you to therapy. It tells you whether your child is on track, and gives you things to do at home either way. Waiting costs time that is easier to use early.',
  },
  {
    q: 'Does speaking two languages at home cause speech delay?',
    a: 'No. Children learning two or more languages reach their first words and word combinations at about the same ages as other children, according to the American Speech-Language-Hearing Association. Keep using the languages you are most comfortable in. Count words in all languages together when you check milestones.',
  },
  {
    q: 'How long is each session, and what does it cost?',
    a: `Sessions are 45 to 60 minutes, and younger children sometimes start with shorter ones. Fees depend on how many sessions a week your child needs and whether some are online, and we explain them on the first call. Call or WhatsApp ${CONTACT.phoneDisplay}.`,
  },
];

const flags = [
  { icon: 'chat', title: 'No babbling by 12 months', text: 'Not making "ba", "da" or "ma" sounds, or gesturing like waving.' },
  { icon: 'speech', title: 'No words by 18 months', text: 'Not using any single words besides "mama" or "dada".' },
  { icon: 'blocks', title: 'Not joining words at 2', text: 'Not putting two words together, like "more milk" or "daddy go".' },
  { icon: 'ear', title: 'Hard to understand at 3', text: 'Strangers still struggle to understand most of what your child says.' },
  { icon: 'book', title: 'Not following instructions', text: 'Struggles with simple requests like "get your shoes" without a gesture.' },
  { icon: 'shield', title: 'Losing words', text: 'Stops using words they had. See a paediatrician as well as a therapist.' },
];

export default {
  path: PATH,
  photo: 'delay',
  title: 'Speech Therapy for Speech Delay in Bangalore | Poorvam Care',
  description: 'Speech therapy for late talkers and speech delay in Electronic City, Bengaluru. Play-based sessions with parent coaching, from 18 months, RCI-registered team.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for speech delay and late talkers in Bengaluru',
    serviceType: 'Speech-language therapy for speech and language delay',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    relevantSpecialty: 'SpeechPathology',
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Speech therapy for speech delay in Bengaluru</h1>
    <p class="answer">A speech delay means a child is talking later than most children their age. Poorvam Care's speech-language pathologists in Electronic City assess your child, then run play-based sessions and coach you, so words, word combinations and sentences grow at home too.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Ages we work with', value: STATS.ages, tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'mint' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Signs of speech delay to act on', 'One of these is a reason to ask. You do not need to wait for two.')}
    ${cards(flags.map((f) => ({ ...f, tone: 'blue' })), { cols: 3 })}
    ${more('What causes speech delay', `<p>Speech delay happens when a child's speech and language develop more slowly than expected for their age. Common reasons are hearing problems, difficulty with the mouth movements for speech, developmental conditions such as <a href="/speech-therapy-for-autism-bangalore">autism</a> or ADHD, and too little back-and-forth talk. Often there is no single clear cause.</p>
      <p>The assessment looks for the likely reasons, because they change the plan. A child who also rarely responds to their name or shares attention may need an autism assessment as well as speech therapy.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Is your child talking on time?', 'Find your child\'s age. If they are not doing what is listed yet, it is worth asking.')}
      <p>Two years is the age most parents notice: most children are joining two words by then. A child who has only a handful of words at two is a late talker, and an assessment is worth booking now rather than waiting.</p>
      <p>Boys, twins and children learning two languages can be a little later, but they should still move forward each month. What matters most is steady progress.</p>`, milestoneLadder({ highlight: '2 years' }))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What therapy looks like at each age', 'The younger your child, the more of the work happens through you.')}
    <div class="table-wrap"><table>
      <caption class="muted">How sessions are usually shaped. Your therapist adjusts this after the assessment.</caption>
      <thead><tr><th>Age</th><th>Focus</th><th>Your part</th></tr></thead>
      <tbody>
        <tr><td>Under 2</td><td>Sounds, gestures, first words through play</td><td>Most of it: coaching you to use daily routines</td></tr>
        <tr><td>2 to 3</td><td>More words, then joining two words</td><td>Practising one routine a day at home</td></tr>
        <tr><td>3 to 5</td><td>Sentences, clearer sounds, following instructions</td><td>Short daily practice and reading together</td></tr>
        <tr><td>School age</td><td>Explaining, storytelling, classroom language</td><td>Home practice, and tips for the teacher</td></tr>
      </tbody>
    </table></div>
    ${weekPlan({
      tone: 'blue',
      session: ['Play built around your child\'s interests and goals', 'Modelling words, then adding one word to what your child says', 'Time with you on what to practise this week'],
      home: ['Naming things during meals, bath and dressing', 'Pausing so your child has a reason to talk', 'Session notes and home activities on your phone'],
    })}
    ${more('What parents can expect, in more detail', `<p>Therapy starts with a speech and language assessment and a plain explanation of where your child is now compared with expected milestones. We then write an individual plan with specific, measurable goals.</p>
      <p>Sessions are play-based and built around your child's interests and daily routines, to grow vocabulary, sentence building and confidence. You learn simple techniques that work: focused stimulation (repeating one target word many times in play) and expansion (adding a word to what your child says, so "car" becomes "red car").</p>
      <p>We track progress against the goals and share it in the parent view. If we think hearing or a wider developmental question is involved, we refer you for a hearing test or a developmental assessment.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When it might not be just speech', 'Some signs need a check alongside therapy. We will tell you if we see them.')}
    ${callout('Rule out hearing first', `Frequent ear infections, not turning to sounds or speech that stalls can all point to hearing. Our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children's hearing in Electronic City.`, 'info')}
    ${callout('See a paediatrician soon if your child loses words', 'A child who stops using words they had, stops babbling, or loses other skills should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
    ${more('Other reasons we refer to a doctor', '<p>We refer to an ENT for suspected tongue-tie that affects feeding or speech, to a paediatric neurologist for seizures, and to a developmental paediatrician when a formal diagnosis of autism or ADHD may be needed. Therapy can start while you wait for those appointments.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Other help under one roof', 'Speech delay often comes with other needs. One team plans all of it together.')}
    ${serviceList('/speech-therapy-electronic-city')}
    <p class="mt-2">Our speech therapy is led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}, with ${DIRECTOR.years} years helping late talkers. See all our <a href="/speech-therapy-electronic-city">speech therapy in Electronic City</a>, or do follow-up sessions <a href="/online">online</a> when travel is hard.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Speech delay therapy in Electronic City Phase 1 and Phase 2', 'Same speech-language pathologists and hours at both. Pick the one closer to home or school.')}
${areasBlock('Speech delay help across south Bengaluru')}
${faqSection(faqs, 'Speech delay: questions parents ask')}
${ctaBand('Worried about your child\'s talking?', 'Book a speech assessment. We call back within one working day to plan the first visit.')}
`,
};
