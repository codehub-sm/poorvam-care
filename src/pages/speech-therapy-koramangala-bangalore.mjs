import { html, bookButton, callButton, breadcrumb, byline, serviceList, centreCard, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, steps, callout, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-koramangala-bangalore';
const REVIEWED = '2026-10-11';
const P1 = LOCATIONS[0];
const CRUMB = [['All therapies', '/child-development'], ['Speech therapy near Koramangala', PATH]];

const faqs = [
  {
    q: 'Is there a speech therapist near Koramangala?',
    a: `Poorvam Care does not have a centre in Koramangala. Our nearest centre is in ${P1.name}, on Hulimangla Road, and families from across Koramangala's blocks come to us for speech therapy. Our RCI-registered speech-language pathologists assess and treat speech delay, language difficulties, autism-related communication, stammering and unclear speech. Weekly sessions can also be done <a href="/online/speech-therapy">online</a>.`,
  },
  {
    q: 'How far is Poorvam Care from Koramangala?',
    a: `The ${P1.short} centre is south of Koramangala, through Silk Board and down Hosur Road. How long it takes depends on which block you start from and, mostly, on traffic at Silk Board. Families from the 1st and 2nd Blocks usually have a slightly shorter drive than those from the 7th and 8th Blocks. Check Google Maps before you leave, and ask us for a mid-morning or Saturday slot if weekday evenings are hard.`,
  },
  {
    q: 'What is the best route from Koramangala to Electronic City?',
    a: 'There are two common routes. The first goes through Silk Board: take the Intermediate Ring Road or 80 Feet Road to Silk Board Junction, then head south on Hosur Road towards Electronic City and turn off for Hulimangla Road. The second avoids part of the Silk Board queue: take the Inner Ring Road to Agara, then join Hosur Road further south. Families from the 4th and 5th Blocks often find the Agara route quieter in the mornings. Check live traffic before you set out.',
  },
  {
    q: 'Does Poorvam offer teletherapy for Koramangala families?',
    a: `Yes. Our speech-language pathologists run live video sessions of 45 minutes and send home activities after each one. Many Koramangala families with busy work weeks use a mix: a visit to the ${P1.short} centre every couple of weeks, with online sessions in between. We will suggest the right balance for your child after the assessment. <a href="/online">How online therapy works</a>.`,
  },
  {
    q: 'Can my child start with an assessment at the centre and continue online?',
    a: `Yes, and this is how many families from Koramangala begin. The first assessment is in person at ${P1.name}, so the therapist can watch your child play and talk. After that, some or all of the weekly sessions can move online with the same therapist, and you come back to the centre for reviews.`,
  },
  {
    q: 'How long is each speech therapy session?',
    a: 'Sessions at the centre are 45 to 60 minutes, and online sessions run 45 minutes. The last few minutes are spent showing you what was practised and what to do at home before the next session.',
  },
  {
    q: 'What does speech therapy cost?',
    a: 'Fees depend on how many sessions a week your child needs and whether some are online. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts.',
  },
];

const ways = [
  { icon: 'pin', title: 'Every week at the centre', text: `Best when the Silk Board drive fits your week. Most hands-on, and your child gets the room's toys and space.` },
  { icon: 'route', title: 'Centre and online, mixed', text: 'A centre visit every couple of weeks, online sessions in between, same therapist throughout.' },
  { icon: 'video', title: 'Online after the assessment', text: 'Assessment in person, then weekly 45-minute video sessions from home, with reviews at the centre.' },
];

const helps = [
  { icon: 'speech', title: 'Late talking', text: 'Toddlers with few words, or words that are not joining up.', href: '/speech-therapy-for-speech-delay-bangalore' },
  { icon: 'blocks', title: 'Autism and communication', text: 'Requests, shared attention, conversation and play.', href: '/speech-therapy-for-autism-bangalore' },
  { icon: 'chat', title: 'Unclear speech', text: 'Sounds swapped or dropped in school-age children.' },
  { icon: 'route', title: 'Stammering', text: 'Repeated or stuck sounds, and the worry that comes with them.' },
  { icon: 'book', title: 'Understanding language', text: 'Following instructions, answering questions, learning new words.' },
  { icon: 'users', title: 'Social communication', text: 'Taking turns, staying on topic, reading other people.' },
];

const compare = [
  ['First assessment', 'Yes, recommended', 'Possible, if travel is hard'],
  ['Weekly sessions', '45 to 60 minutes', '45 minutes on video'],
  ['Best for', 'Young children, hands-on play', 'Busy weeks, older or settled children'],
  ['Home practice', 'Shown to you at the end', 'Shown on screen, sent to your phone'],
  ['Progress reviews', 'At the centre', 'At the centre or online'],
];

export default {
  path: PATH,
  title: 'Speech Therapy in Koramangala Bangalore | Poorvam Care',
  description: `Speech therapy for Koramangala children aged ${STATS.ages}: assessment at our Electronic City Phase 1 centre via Silk Board, then sessions there or online.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: CRUMB,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for children from Koramangala',
    serviceType: 'Speech-language therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    areaServed: ['Koramangala', 'Koramangala 1st Block', 'Koramangala 5th Block', 'Koramangala 8th Block', 'Silk Board', 'Agara'].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: [
      { '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(P1.page)}#business` } },
      { '@type': 'ServiceChannel', serviceUrl: urlOf('/online/speech-therapy'), name: 'Online speech therapy by video' },
    ],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(CRUMB)}
    <h1>Speech therapy near Koramangala, Bangalore</h1>
    <p class="answer">Poorvam Care has no Koramangala centre. Our nearest is ${P1.name}, south through Silk Board. Koramangala families come in for the assessment, then do weekly speech therapy at the centre, online, or a mix, with the same RCI-registered therapist.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink', 'phase-1')}${callButton()}</div>
    ${stats([
      { label: 'Nearest centre', value: 'EC Phase 1', tone: 'blue' },
      { label: 'Online session', value: '45 min', tone: 'mint' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'violet' },
      { label: 'Years in practice', value: STATS.years, tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Three ways Koramangala families do it', 'Koramangala is close enough that weekly visits work for many families. The right mix depends on your week.')}
    ${cards(ways.map((w) => ({ ...w, tone: 'blue' })), { cols: 3 })}
    ${more('How to get to the Phase 1 centre from Koramangala', `<p>Most families take the Intermediate Ring Road or 80 Feet Road to Silk Board Junction, then go south on Hosur Road towards Electronic City and turn off for Hulimangla Road. The centre is on Hulimangla Road, above RxDx Multi Speciality near the Sai Mandir Temple.</p><p>Families from the 4th and 5th Blocks often prefer the Agara route: the Inner Ring Road to Agara, then Hosur Road further south. It can be quieter in the morning school rush. Either way, check live traffic before you leave. <a href="${P1.page}">More about the Phase 1 centre</a>.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What speech therapy helps with', 'From toddlers who are late to talk to school-age children who are hard to understand.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'blue' })), { cols: 3, compact: true })}
    ${more('Who we see from Koramangala', `<p>Many parents we see from Koramangala work in the area's tech parks and start-ups, with irregular hours or frequent travel. That is why we keep evening and Saturday slots at the centre, and why the parent view on your phone shows the schedule, goals, session notes and home practice, so you are never relying on a word at pickup.</p><p>Every child starts with an assessment and a written plan with clear goals. The team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, an ISHA member, with ${STATS.years} years in practice and ${STATS.families} families seen across Bengaluru.</p>`)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How it works from Koramangala', 'Five steps. Only the first visit has to be at the centre.')}
    ${steps([
      ['Tell us what you\'ve noticed', 'Book online or call. We call back within one working day.'],
      ['Assessment at Phase 1', 'A speech-language pathologist plays with your child and checks understanding, talking and sounds.'],
      ['A written plan', 'Two or three goals, sessions a week, and whether some can be online.'],
      ['Weekly sessions', 'At the centre, by video, or both, with the same therapist.'],
      ['Review', 'We check progress with you against the goals and move them on.'],
    ])}
    <div class="table-wrap"><table>
      <caption class="muted">Centre or online: what changes for a Koramangala family.</caption>
      <thead><tr><th></th><th>At the Phase 1 centre</th><th>Online from home</th></tr></thead>
      <tbody>${compare.map(([a, b, c]) => `<tr><th scope="row">${a}</th><td>${b}</td><td>${c}</td></tr>`).join('')}</tbody>
    </table></div>
    ${callout('Not sure it is speech? Check hearing first', `Frequent ear infections, or not turning to sounds, can point to hearing. Our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children in Electronic City.`, 'info')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Your nearest centre', 'Phase 1 has a lift, which helps with a pram. Same therapists and hours as Phase 2.')}
      <p>Phase 1 is the centre we suggest from Koramangala. Our <a href="/electronic-city-phase-2">Phase 2 centre</a> in Ananth Nagar is further east. Prefer to start from home? Read how <a href="/online/speech-therapy">online speech therapy</a> works, or <a href="/faq">read common questions</a>.</p>`, centreCard(P1))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('More than speech therapy', 'Many children need two kinds of help. All of it is under one roof, from one plan.')}
    ${serviceList()}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${areasBlock('Other areas we serve in south Bengaluru')}
${faqSection(faqs, 'Speech therapy for Koramangala: questions')}
${ctaBand('Book a speech assessment', `Tell us what you have noticed. We call back within one working day to plan the first visit. Or call ${CONTACT.phoneDisplay}.`)}
`,
};
