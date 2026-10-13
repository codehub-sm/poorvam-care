import { html, bookButton, callButton, breadcrumb, byline, serviceList, centreCard, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, steps, weekPlan, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, ONLINE } from '../site.mjs';

const PATH = '/speech-therapy-btm-layout-bangalore';
const REVIEWED = '2026-10-11';
const L = LOCATIONS[0];
const SERVED = ['BTM Layout', 'BTM Layout Stage 1', 'BTM Layout Stage 2', 'Madiwala'];

const faqs = [
  {
    q: 'Is there a speech therapist near BTM Layout?',
    a: `Poorvam Care's <a href="${L.page}">Electronic City Phase 1 centre</a> is about 7 km from BTM Layout Stage 1 and Stage 2, around 15 to 20 minutes by car via Silk Board Junction in normal traffic. Our RCI-registered speech-language pathologists, led by ${DIRECTOR.name} with ${STATS.years} years in practice, work with speech delay, language difficulties, autism and stammering.`,
  },
  {
    q: 'How do I reach Poorvam Care from BTM Layout?',
    a: `From BTM Layout Stage 1 or Stage 2, take 6th Main Road towards Silk Board Junction. From Silk Board, join Hosur Road heading south towards Electronic City and take the Hulimangla Road exit into Phase 1. From the 27th Cross side, the Jayadeva flyover is a quicker way onto Hosur Road. The drive is about 15 to 20 minutes in normal traffic. <a href="${L.mapUrl}" target="_blank" rel="noopener">Get directions in Google Maps</a>.`,
  },
  {
    q: 'Does Poorvam Care offer home visits to BTM Layout?',
    a: `No, we do not offer therapy at home. We do offer <a href="${ONLINE.markets[0].page}">online speech therapy</a>: live video sessions of 45 minutes with the same therapists, plus home activities so practice carries on between centre visits. Many BTM Layout families mix centre sessions with online ones on the days they would rather not travel. Ask us whether that would suit your child.`,
  },
  {
    q: 'What conditions are treated at Poorvam Care?',
    a: 'Speech sound difficulties, late talking and language delay (understanding and using words), autism, ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stammering and other fluency difficulties, voice difficulties, and feeding and swallowing difficulties in children. Speech therapists, occupational therapists, ABA therapists and special educators work together on one plan for each child.',
  },
  {
    q: 'Which centre is closer to BTM Layout, Phase 1 or Phase 2?',
    a: `Phase 1, on Hulimangla Road. It is the first centre you reach coming down Hosur Road from Silk Board, and it has a lift. The <a href="${LOCATIONS[1].page}">Phase 2 centre</a> in Ananth Nagar is further on and up a flight of stairs.`,
  },
  {
    q: 'How long is each speech therapy session?',
    a: 'Sessions are 45 to 60 minutes at the centre, and 45 minutes online, with time at the end to show you what to practise at home. How many sessions a week depends on the assessment; some children come weekly, others less often with online sessions in between.',
  },
  {
    q: 'What does speech therapy cost?',
    a: 'Fees depend on how many sessions a week your child needs and whether some are online. We explain the full cost on the first call, once we understand your child\'s needs, so nothing is a surprise later.',
  },
];

const helps = [
  { icon: 'speech', title: 'Late talking', text: 'Few words for their age, or words that are not joining up.', href: '/speech-therapy-for-speech-delay-bangalore' },
  { icon: 'blocks', title: 'Autism and communication', text: 'Making requests, sharing attention, conversation and play.', href: '/speech-therapy-for-autism-bangalore' },
  { icon: 'chat', title: 'Unclear speech', text: 'Sounds swapped or dropped, so others struggle to understand.' },
  { icon: 'route', title: 'Stammering', text: 'Repeated or stuck sounds, and the worry that comes with them.' },
  { icon: 'book', title: 'Understanding language', text: 'Following instructions, answering questions, learning new words.' },
  { icon: 'users', title: 'Social communication', text: 'Taking turns, staying on topic, reading other people.' },
];

const online = [
  { icon: 'search', title: 'Assessment at the centre', text: 'Meet the speech-language pathologist in person first, at Phase 1.', tone: 'blue' },
  { icon: 'video', title: 'Online on busy weeks', text: 'Live video sessions of 45 minutes from home in BTM Layout.', tone: 'blue' },
  { icon: 'home', title: 'No home visits', text: 'We don\'t send therapists to homes. Online sessions fill that gap.', tone: 'blue' },
];

export default {
  path: PATH,
  title: 'Speech Therapy in BTM Layout Bangalore | Poorvam Care',
  description: 'Speech therapy for children from BTM Layout, Bangalore. Our Electronic City Phase 1 centre is about 7 km away via Silk Board, with online sessions too.',
  reviewed: REVIEWED,
  breadcrumb: [['Speech therapy', '/speech-therapy-electronic-city'], ['Near BTM Layout', PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for children near BTM Layout',
    serviceType: 'Speech-language therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed: SERVED.map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: [{ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(L.page)}#business` } }],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Speech therapy', '/speech-therapy-electronic-city'], ['Near BTM Layout', PATH]])}
    <h1>Speech therapy near BTM Layout, Bangalore</h1>
    <p class="answer">The nearest Poorvam Care centre to BTM Layout is in Electronic City Phase 1, about 7 km away via Silk Board and Hosur Road. RCI-registered speech-language pathologists help children aged ${STATS.ages} with late talking, unclear speech, stammering and autism. Online sessions are available too.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink', L.id)}${callButton()}</div>
    ${stats([
      { label: 'Nearest centre', value: 'Phase 1', tone: 'blue' },
      { label: 'Distance, roughly', value: '7 km', tone: 'green' },
      { label: 'Session length', value: '45–60 min', tone: 'sky' },
      { label: 'Years in practice', value: STATS.years, tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What speech therapy helps with', 'Most children we see have one or two of these. The assessment tells you which to work on first.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'blue' })), { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Getting to Poorvam Care from BTM Layout', 'Silk Board, then south on Hosur Road to the Hulimangla Road exit in Electronic City Phase 1.')}
      <ul class="ticks">
        <li>About 7 km from BTM Layout Stage 1 and Stage 2</li>
        <li>Around 15 to 20 minutes by car in normal traffic</li>
        <li>Above RxDx Multi Speciality, near the Sai Mandir Temple</li>
        <li>Lift to the centre, open ${HOURS.display}</li>
      </ul>
      ${more('Step-by-step route', '<p>Take 6th Main Road to Silk Board Junction, join Hosur Road heading south towards Electronic City, and take the Hulimangla Road exit into Phase 1. From the northern side of BTM, around 27th Cross, the Jayadeva flyover is a quicker way onto Hosur Road. Families also come to us from Madiwala and the AECS Layout side.</p>')}`, centreCard(L))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How speech therapy works at Poorvam Care', 'Every plan starts from an assessment, and parents are coached in every programme.')}
    ${steps([
      ['Tell us what you\'ve noticed', `Book online, call or WhatsApp ${CONTACT.phoneDisplay}. We call back within one working day.`],
      ['Assessment', 'A speech-language pathologist plays with your child and checks understanding, talking and sounds.'],
      ['A written plan', 'Goals built on your child\'s strengths, and how often to come.'],
      ['Sessions and review', 'Weekly or lighter schedules, with online sessions in between if that suits you.'],
    ])}
    ${weekPlan({
      tone: 'blue',
      session: ['Play-based therapy for younger children', 'Structured language and literacy work for older children', 'Time with you on what to practise'],
      home: ['One routine to use every day, like naming at bath time', 'Short practice that fits around school and meals', 'Notes and home activities on your phone'],
    })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Online sessions from BTM Layout', 'The drive is short, but not every week. Online sessions keep therapy going on the days you can\'t travel.')}
    ${cards(online, { cols: 3 })}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('More than speech therapy', 'Many children need two kinds of help. All of it is under one roof, from one plan.')}
    ${serviceList('/speech-therapy-electronic-city')}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${areasBlock('Serving families across south Bengaluru')}
${faqSection(faqs, 'Speech therapy near BTM Layout: questions')}
${ctaBand('Book a speech assessment', 'Tell us what you have noticed. We call back within one working day to plan the first visit at Phase 1.')}
`,
};
