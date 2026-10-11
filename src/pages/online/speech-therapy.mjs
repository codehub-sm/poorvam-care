import { html, bookButton, whatsappButton, breadcrumb, byline, faqSection, ctaBand, orgId, urlOf } from '../../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../../ui.mjs';
import { STATS, ONLINE, SERVICES, SISTER } from '../../site.mjs';

/*
 * The four /online/<therapy> pages answer "does online therapy work for my
 * child's difficulty?". The parts they share (the schema node, the country
 * block, the parent view and the cross-links) are exported from here once, so
 * the four pages cannot drift apart on facts.
 */

const LANG_CODES = { English: 'en', Hindi: 'hi', Kannada: 'kn', Tamil: 'ta', Telugu: 'te', Malayalam: 'ml' };

/** The online pages, in the order the old site listed them. `id` is the booking id; tone comes from SERVICES. */
export const ONLINE_THERAPIES = [
  { path: '/online/speech-therapy', id: 'speech', title: 'Speech therapy online', text: 'Late talking, unclear speech, language delay, stammering and autism-related communication.' },
  { path: '/online/occupational-therapy', id: 'ot', title: 'Occupational therapy online', text: 'Sensory strategies, fine motor skills, handwriting, self-care and regulation, coached through you.' },
  { path: '/online/behavioural-therapy', id: 'aba', title: 'Behaviour therapy online', text: 'ABA-informed parent training for meltdowns, transitions, sleep, toileting and daily routines.' },
  { path: '/online/special-education', id: 'special-ed', title: 'Special education online', text: 'One-to-one remedial teaching for reading, writing and maths, including dyslexia and ADHD.' },
].map((t) => ({ ...t, ...(({ tone, icon }) => ({ tone, icon }))(SERVICES.find((s) => s.id === t.id)) }));

/** Service + MedicalTherapy node, with the ServiceChannel, Country and price-less Offer the old pages carried. */
export function onlineSchema({ path, name, serviceType, description }) {
  const url = urlOf(path);
  return {
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${url}#service`,
    name,
    description,
    serviceType,
    url,
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    availableChannel: {
      '@type': 'ServiceChannel',
      name: 'Live video session',
      serviceUrl: url,
      availableLanguage: ONLINE.languages.map((l) => ({ '@type': 'Language', name: l, alternateName: LANG_CODES[l] })),
    },
    areaServed: ONLINE.markets.map((m) => ({ '@type': 'Country', name: m.name })),
    offers: {
      '@type': 'Offer',
      url,
      availability: 'https://schema.org/InStock',
      description: '45-minute live online session. Fees are explained on the first call.',
    },
  };
}

/** What a family sees on their phone. Same facts as the home page. */
export const PARENT_VIEW = [
  { icon: 'calendar', title: 'Your schedule, always visible', text: 'See every upcoming session, and book or reschedule without phone tag.' },
  { icon: 'check', title: 'The actual therapy goals', text: 'Written down and tracked, not a vague "she is doing well".' },
  { icon: 'book', title: 'Session notes and reports', text: 'What happened in each session and how your child is progressing.' },
  { icon: 'home', title: 'Home practice, spelled out', text: 'The activities for between sessions, with instructions, because most progress happens at home.' },
  { icon: 'chat', title: 'Your therapist, a message away', text: 'Ask a question between sessions instead of saving it for the next one.' },
  { icon: 'shield', title: 'Billing you can check', text: 'Sessions attended, what has been paid and what is outstanding. No month-end surprises.' },
];

export function parentViewSection(tone) {
  return html`<section class="band band--violet">
  <div class="wrap">
    ${head('See how therapy is going, on your phone', 'Online families get the same live view of their child\'s therapy as families at our centres.')}
    ${cards(PARENT_VIEW.map((c) => ({ ...c, tone })), { cols: 3 })}
  </div>
</section>`;
}

/** Where online therapy is open. The US and Canada are closed because licensure follows where the child lives. */
export function marketsSection(h2, lede, tone) {
  return html`<section class="band">
  <div class="wrap">
    ${head(h2, lede)}
    ${cards(ONLINE.markets.map((m) => ({ icon: 'globe', title: m.name, text: 'Time zones, languages and booking for families living there.', href: m.page, tone })), { cols: 3, compact: true })}
    ${callout('Not available in the United States or Canada', `A therapist must be licensed where the child lives, not where the therapist sits. We cannot offer sessions to families in the ${ONLINE.blocked.join(' or ')}, so the booking form will tell you before you send anything.`, 'info')}
  </div>
</section>`;
}

/** The other online therapies as cards, plus the hub, the matching in-centre page and the "not sure" card. */
export function otherOnline(exclude, centre) {
  const items = ONLINE_THERAPIES.filter((t) => t.path !== exclude).map((t) => ({ icon: t.icon, tone: t.tone, title: t.title, text: t.text, href: t.path }));
  items.push(
    { icon: 'video', tone: 'blue', title: 'How online therapy works', text: 'Devices, time zones, languages and what a first online session involves.', href: ONLINE.page },
    { icon: 'pin', tone: 'mint', title: centre.title, text: centre.text, href: centre.href },
    { icon: 'search', tone: 'sun', title: 'Not sure which therapy?', text: 'A developmental assessment tells you which therapy, how often and for how long.', href: '/child-development' },
  );
  return cards(items, { cols: 3 });
}

/* ---------- this page ---------- */

const PATH = '/online/speech-therapy';
const TONE = 'blue';
const DESCRIPTION = 'Live one-to-one online speech therapy for children: late talking, unclear speech, language delay, stammering and autism. 45-minute sessions in six languages.';

const faqs = [
  {
    q: 'Does online speech therapy actually work?',
    a: 'Yes. Speech therapy is the best-researched of the therapies delivered over video, and studies consistently find results comparable to in-person sessions for unclear speech, language delay, stammering and social communication. It is not suitable for feeding and swallowing difficulties, or anything that needs a physical check of the mouth. We tell you at the consultation which applies to your child.',
  },
  {
    q: 'What age can a child start online speech therapy?',
    a: 'We assess from around 18 months, though therapy looks very different by age. Under three, sessions are mostly parent coaching: the therapist teaches you techniques to use through the day, which works better at that age than a toddler sitting at a screen. From about three or four, children take part directly for more and more of the session.',
  },
  {
    q: 'My child won\'t sit still for a video call. Will this work?',
    a: 'Often better than parents expect, but it depends on the child. Therapists use short, fast-changing, play-based activities rather than expecting sitting still. A child who cannot manage 45 minutes at a table can often manage 45 minutes of games that change every few minutes. For very young or very active children we lean on parent coaching, so your child does not need to stay on screen for long. If we do not think the format will work, we say so at the consultation.',
  },
  {
    q: 'Which languages can therapy be delivered in?',
    a: `${ONLINE.languages.join(', ').replace(/, ([^,]*)$/, ' and $1')}. We match your child with a therapist who works in your home language. This matters clinically, not just practically: a child's language can only be assessed accurately in the language they actually use. Assessing a Telugu-speaking child in English will understate what they can do.`,
  },
  {
    q: 'Should I stop speaking our home language to help my child\'s English?',
    a: 'Almost never. It is common, well-meant advice that backfires. Speaking two languages does not cause speech or language delay, and dropping the language you speak best usually cuts both how much language your child hears and how rich it is. Children build a second language on a strong first one. If a delay exists, it shows in both languages, and that is what we assess.',
  },
  {
    q: 'How many sessions will my child need?',
    a: 'It depends on age, the kind of difficulty, and how much practice happens between sessions. Anyone giving you a number before assessing your child is guessing. As a rough guide, difficulty with a few speech sounds often settles in a few months of weekly sessions, while a broader language delay usually takes longer. We review goals with you every month so you can see whether it is working.',
  },
  {
    q: 'What do we need for an online speech therapy session?',
    a: 'A laptop or tablet with a camera, a stable internet connection, and a quiet corner where your child can see the screen. A phone works in a pinch but a bigger screen is easier for picture games. The therapist shares the activities on screen, so you do not need to buy materials. For younger children, you sit beside them.',
  },
  {
    q: 'How much does online speech therapy cost?',
    a: 'Fees depend on how many sessions a week your child needs. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts. Packages are available for regular weekly therapy.',
  },
];

const works = [
  { icon: 'speech', title: 'Late talking', text: 'Delayed first words and words not joining up, with parent coaching for under-threes.', href: '/speech-therapy-for-speech-delay-bangalore' },
  { icon: 'chat', title: 'Unclear speech', text: 'Articulation and sound-pattern difficulties that make your child hard to understand.' },
  { icon: 'book', title: 'Language delay', text: 'Understanding and using words, vocabulary, sentence building and grammar.' },
  { icon: 'route', title: 'Stammering', text: 'Fluency work, and the confidence to keep talking when words get stuck.' },
  { icon: 'blocks', title: 'Autism and communication', text: 'Requesting, shared attention, turn-taking and social language.', href: '/speech-therapy-for-autism-bangalore' },
  { icon: 'globe', title: 'Two-language families', text: 'Assessment and therapy in your home language as well as English.' },
];

const language = [
  { icon: 'globe', title: 'Matched to your language', text: 'We pair your child with a therapist who works in the language your family uses at home.' },
  { icon: 'search', title: 'Assessed fairly', text: 'A bilingual child assessed only in English can look delayed when they are developing well in both.' },
  { icon: 'heart', title: 'Keep your home language', text: 'Two languages do not cause speech delay. Dropping the one you speak best usually makes things harder.' },
];

export default {
  path: PATH,
  title: 'Online Speech Therapy for Children | Poorvam Care',
  description: DESCRIPTION,
  reviewed: '2026-10-11',
  current: ONLINE.page,
  local: false,
  breadcrumb: [['Online therapy', ONLINE.page], ['Speech therapy online', PATH]],
  faqs,
  schema: [onlineSchema({ path: PATH, name: 'Online speech and language therapy for children', serviceType: 'Online speech and language therapy', description: DESCRIPTION })],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Online therapy', ONLINE.page], ['Speech therapy online', PATH]])}
    <h1>Online speech therapy for children</h1>
    <p class="answer">Yes, speech therapy works well over video. Live one-to-one sessions with an RCI-registered speech-language pathologist help late talkers, unclear speech, stammering and autism-related communication, in your home language. Feeding, swallowing and hearing need an in-person check instead.</p>
    <div class="phero__acts">${bookButton('Book an online consultation', 'speech', 'btn btn--ink', 'online')}${whatsappButton(`Hi Poorvam Care, I would like to know about online speech therapy for my child.`, 'btn btn--line')}</div>
    ${stats([
      { label: 'Each online session', value: '45 min', tone: 'blue' },
      { label: 'Languages', value: String(ONLINE.languages.length), tone: 'mint' },
      { label: 'Open to families in', value: ONLINE.markets.map((m) => m.name).join(', '), tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What online speech therapy helps with', 'Speech therapy has the longest track record of any therapy delivered over video. These goals transfer well.')}
    ${cards(works.map((w) => ({ ...w, tone: TONE })), { cols: 3 })}
    ${more('Why speech therapy works so well on a screen', `<p>Research consistently finds outcomes comparable to in-person sessions across most speech goals: articulation, language delay, fluency and social communication among them.</p>
      <p>Part of the reason is that much of speech therapy already uses pictures, sounds, games and structured turn-taking. A therapist sharing a screen can switch activity the moment your child's attention shifts, which a fixed set of flashcards cannot.</p>
      <p>The other part is that the therapist sees your child at home. How a child asks for something at their own dinner table says more than how they perform with a stranger in an unfamiliar room.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What works online, and what needs an in-person visit', 'We would rather tell you the limits now than have you find them three sessions in.')}
    <div class="table-wrap"><table>
      <thead><tr><th>Your child's need</th><th>Online</th><th>In person</th></tr></thead>
      <tbody>
        <tr><td>Late talking and first words</td><td>Works well, mostly parent coaching under age 3</td><td>Not needed</td></tr>
        <tr><td>Unclear speech or stammering</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Language delay and grammar</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Autism-related communication</td><td>Works well for most children</td><td>If your child cannot yet engage with a screen</td></tr>
        <tr><td>Feeding and swallowing</td><td>Not suitable</td><td>Needs a hands-on assessment</td></tr>
        <tr><td>Oral-motor or voice difficulties</td><td>Not suitable</td><td>Needs a physical check, or an ENT for voice</td></tr>
        <tr><td>Hearing</td><td>Not suitable</td><td>Needs a hearing test by an audiologist</td></tr>
      </tbody>
      <caption>How we decide at the consultation. We tell you plainly if online is not the right fit.</caption>
    </table></div>
    ${callout('If your child needs to be seen in person', 'In Bengaluru, the same team sees children at our <a href="/speech-therapy-electronic-city">speech therapy centres in Electronic City</a>. Anywhere else, we will say so on the consultation and help you look for someone local.', 'info')}
    ${callout('Check hearing first if you are unsure', `Frequent ear infections, not turning to sounds, or speech that stalls can point to hearing. Ask an audiologist near you for a hearing test. In Bengaluru, our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children of all ages.`, 'warn')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What an online speech therapy session looks like', 'Every session runs 45 minutes on a video call, and you are part of it.')}
    ${steps([
      ['Tell us about your child', 'Your child\'s age, what you are noticing and where you live. It takes two minutes.'],
      ['We get in touch', `We call or WhatsApp within one working day to find a time in your time zone.`],
      ['Consultation', 'A short video call with a therapist who tells you honestly whether we can help.'],
      ['Assessment and plan', 'Play, pictures and tasks over video, in both languages if needed. Then written goals.'],
      ['Weekly sessions', 'Games and sound work on a shared screen, with parts handed over to you.'],
    ])}
    ${weekPlan({
      tone: TONE,
      session: ['Games, sounds, pictures and stories on a shared screen', 'The therapist models, your child tries, and you learn the moves', 'A few minutes at the end on what to practise'],
      home: ['One everyday routine to talk through, like bath time or meals', 'Short practice that fits around school and meals', 'Home activities, goals and notes on your phone'],
    })}
    ${more('More about how sessions run', `<p>The first session is an assessment. The therapist works with your child over video while you stay close, using play, pictures and structured tasks to see how your child understands and uses language. For bilingual children this is done in both languages. Afterwards you get a written summary and the goals they propose.</p>
      <p>Regular sessions run 45 minutes. The therapist leads through screen sharing and steadily hands parts of each activity to you, because the other six days of the week matter more than the 45 minutes.</p>
      <p>For children under about four, a parent stays in the room throughout and the session works largely as coaching. Older children often work more on their own, with you joining at the end for the plan.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapy in the language your family speaks', `Sessions run in ${ONLINE.languages.join(', ').replace(/, ([^,]*)$/, ' or $1')}. Matching your home language is a clinical choice.`)}
    ${cards(language.map((l) => ({ ...l, tone: TONE })), { cols: 3 })}
  </div>
</section>

${parentViewSection(TONE)}

${marketsSection('Who can book online speech therapy', 'Sessions are open to families living in India, Australia and the UAE. The team is based in Bengaluru.', TONE)}

<section class="band band--paper">
  <div class="wrap">
    ${head('Other therapies we offer online', 'Many children need more than one kind of help. Online therapists share one plan and one record.')}
    ${otherOnline(PATH, { title: 'Speech therapy at our centres', text: 'In Bengaluru? See the same team in person in Electronic City.', href: '/speech-therapy-electronic-city' })}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online speech therapy: questions')}
${ctaBand('Book an online consultation', `Tell us about your child. We call or WhatsApp within one working day to find a time that suits your time zone. Ages ${STATS.ages}.`)}
`,
};
