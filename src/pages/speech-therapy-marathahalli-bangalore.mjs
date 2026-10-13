import { html, bookButton, callButton, breadcrumb, byline, serviceList, centreCard, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, steps, callout, weekPlan, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-marathahalli-bangalore';
const REVIEWED = '2026-10-11';
const P1 = LOCATIONS[0];
const CRUMB = [['All therapies', '/child-development'], ['Speech therapy for Marathahalli', PATH]];

const faqs = [
  {
    q: 'Is there a speech therapist near Marathahalli?',
    a: `Poorvam Care has no centre in Marathahalli. Our nearest is in ${P1.name}, about 20 km from Marathahalli Bridge, roughly 35 to 45 minutes by car via the Outer Ring Road outside peak hours. Families from Marathahalli, Bellandur and the Sarjapur Road corridor come to us, and many do part of the weekly therapy <a href="/online/speech-therapy">online</a> to skip the drive. Our RCI-registered team has ${STATS.years} years in practice.`,
  },
  {
    q: 'How do I reach Poorvam Care from Marathahalli?',
    a: 'From Marathahalli Bridge there are two routes. The first is the Outer Ring Road: head towards Bellandur, carry on past the Sarjapur Road junction to Silk Board, then go south on Hosur Road into Electronic City and turn off for Hulimangla Road. The second goes via HAL Old Airport Road to Sarjapur Road, then south to Electronic City. The Outer Ring Road is usually quicker in the morning and evening peaks. Allow about 35 to 45 minutes, and more in heavy traffic.',
  },
  {
    q: 'Does Poorvam Care offer online therapy for Marathahalli families?',
    a: `Yes. Our therapists run live 45-minute video sessions, send home activities after each one and coach you on how to use them. Many Marathahalli families use a mix: weekly sessions online, with a visit to the ${P1.short} centre about once a month for a progress review. Call or WhatsApp ${CONTACT.phoneDisplay} to talk through what would work for your child. <a href="/online">How online therapy works</a>.`,
  },
  {
    q: 'What is the cost of speech therapy at Poorvam Care?',
    a: `Fees depend on the type of therapy, how many sessions a week your child needs, and how many are online. We explain them on the first call, once we understand your child's needs, so you know the full cost and the recommended plan before anything starts, with no obligation to book. Call ${CONTACT.phoneDisplay} or <a href="/book">send a request</a>.`,
  },
  {
    q: 'What does speech therapy help with?',
    a: 'Early language delay, unclear speech (articulation and phonological difficulties), autism-related communication, stammering and other fluency difficulties, and social communication. We also see children with cerebral palsy, Down syndrome, ADHD and sensory processing difficulties. The first assessment shows your child\'s strengths and what to work on first, and the plan has clear goals.',
  },
  {
    q: 'Can we come for evening sessions?',
    a: `Both centres are open ${HOURS.display}, including an after-school slot from 4 to 7 pm. ${HOURS.closedDisplay}. Evening slots go quickly, so ask for one on the first call. Online sessions can also fit around the school day.`,
  },
];

const month = [
  ['Week 1, at the centre', 'Session and progress check at Phase 1, with you in the room.'],
  ['Week 2, online', 'A 45-minute video session from home, same therapist.'],
  ['Week 3, online', 'New activities added to your home practice on your phone.'],
  ['Week 4, online', 'Quick look at what is working before the next visit.'],
];

const helps = [
  { icon: 'speech', title: 'Early language delay', text: 'Few words for their age, or words not joining up.', href: '/speech-therapy-for-speech-delay-bangalore' },
  { icon: 'blocks', title: 'Autism and communication', text: 'Requests, shared attention, conversation and play.', href: '/speech-therapy-for-autism-bangalore' },
  { icon: 'chat', title: 'Unclear speech', text: 'Articulation and phonological difficulties, sounds swapped or dropped.' },
  { icon: 'route', title: 'Stammering', text: 'Fluency difficulties, and the worry that comes with them.' },
  { icon: 'users', title: 'Social communication', text: 'Taking turns, staying on topic, reading other people.' },
  { icon: 'heart', title: 'Complex needs', text: 'Cerebral palsy, Down syndrome, ADHD and sensory differences.' },
];

export default {
  path: PATH,
  title: 'Speech Therapy in Marathahalli Bangalore | Poorvam Care',
  description: 'Speech therapy for children from Marathahalli, Bellandur and Sarjapur Road: weekly online sessions plus centre visits in Electronic City, about 20 km away.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: CRUMB,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for children from Marathahalli, in person and online',
    serviceType: 'Speech-language therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    areaServed: ['Marathahalli', 'Bellandur', 'Sarjapur Road', 'Varthur', 'HAL Old Airport Road'].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: [
      { '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(P1.page)}#business` } },
      { '@type': 'ServiceChannel', serviceUrl: urlOf('/online/speech-therapy'), name: 'Online speech therapy by video' },
    ],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(CRUMB)}
    <h1>Speech therapy for children in Marathahalli, Bangalore</h1>
    <p class="answer">Poorvam Care's nearest centre to Marathahalli is ${P1.name}, about 20 km down the Outer Ring Road. Most families from Marathahalli, Bellandur and Sarjapur Road mix the two: weekly speech therapy online, and a centre visit for the assessment and regular reviews.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink', 'phase-1')}${callButton()}</div>
    ${stats([
      { label: 'Nearest centre', value: 'EC Phase 1', tone: 'blue' },
      { label: 'Online session', value: '45 min', tone: 'green' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'sky' },
      { label: 'Families seen', value: STATS.families, tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What a month of therapy can look like', 'One common pattern for families on the ORR corridor. Your therapist adjusts it to your child.')}
    ${steps(month)}
    ${more('Why a mix works for the ORR corridor', `<p>The Marathahalli, Bellandur and Sarjapur Road corridor is home to many families working in the surrounding tech parks. Peak-hour traffic can make a 20 km trip take much longer than expected, and therapy only helps if it happens every week.</p><p>Online sessions keep that rhythm without the drive. The centre visits matter too: the therapist sees your child in the room, checks progress against the goals and changes the plan. Some families come in every week instead. Both work.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What our speech therapists work on', 'The assessment shows your child\'s strengths and what to work on first.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'blue' })), { cols: 3, compact: true })}
    ${callout('Not sure it is speech? Check hearing first', `Frequent ear infections, or not turning to sounds, can point to hearing. Our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children of all ages.`, 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Route from Marathahalli', 'About 35 to 45 minutes outside peak hours. Check live traffic before you leave.')}
      ${steps([
        ['Start at Marathahalli Bridge', 'Take the Outer Ring Road towards Bellandur.'],
        ['Past Sarjapur Road junction', 'Stay on the Outer Ring Road to Silk Board.'],
        ['Hosur Road', 'Head south into Electronic City.'],
        ['Hulimangla Road', 'Turn off for Phase 1, above RxDx Multi Speciality near the Sai Mandir Temple.'],
      ])}
      <p class="muted">From the HAL side, Sarjapur Road south is an alternative.</p>`, centreCard(P1))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What happens in an online session', 'The same goals and the same therapist as at the centre, with you alongside.')}
    ${weekPlan({
      tone: 'blue',
      session: ['45 minutes of games and picture cards on screen', 'The therapist models words and sounds, and your child tries', 'Coaching for you on what to practise'],
      home: ['One daily routine to practise in, like naming at mealtimes', 'Short activities that fit around school', 'Notes and home practice on your phone'],
    })}
    <p class="mt-2"><a href="/online/speech-therapy">How online speech therapy works</a></p>
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('More than speech therapy', 'Many children need two kinds of help. All of it is under one roof, from one plan.')}
    ${serviceList()}
    <p class="mt-2">The team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}. <a href="/about">About the team</a>, or <a href="/contact">see both centres</a>, including <a href="/electronic-city-phase-2">Phase 2</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Speech therapy for Marathahalli: questions')}
${ctaBand('Start speech therapy from Marathahalli', 'Tell us what you have noticed. We call back within one working day to plan the first visit and the online sessions.')}
`,
};
