import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, soundAgeChart, weekPlan, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, AREAS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-electronic-city';
const REVIEWED = '2026-10-11';
const near = (id) => AREAS.filter((a) => a.centre === id).map((a) => a.name);

const faqs = [
  {
    q: 'Where is the best speech therapy center in Electronic City?',
    a: `Look for an RCI-registered speech-language pathologist, a proper assessment before therapy starts, written goals, and home practice you understand. Poorvam Care offers all four at two centres: Phase 1 on Hulimangla Road and Phase 2 in Ananth Nagar, led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, with ${STATS.years} years in practice.`,
  },
  {
    q: 'What speech therapy services are available in Electronic City?',
    a: 'At both Poorvam Care centres in Electronic City: speech therapy for late talking and speech delay, unclear speech (articulation), stammering, language understanding and use, social communication, and speech therapy for autistic children. Occupational therapy, ABA, special education and therapeutic enrichment are available under the same roof.',
  },
  {
    q: 'How far is Poorvam Care from major areas near Electronic City?',
    a: `The Phase 1 centre on Hulimangla Road is the closer one for ${near('phase-1').slice(1, 8).join(', ')} and HSR Layout. The Phase 2 centre in Ananth Nagar is closer for ${near('phase-2').slice(1).join(', ')}. Families further away often mix centre visits with <a href="/online">online sessions</a>.`,
  },
  {
    q: 'Do you offer a consultation for speech therapy in Electronic City?',
    a: `Yes. Book online, call or WhatsApp ${CONTACT.phoneDisplay}. The team calls you back within one working day to hear what you have noticed, then books an assessment at whichever centre suits you. The speech-language pathologist observes and plays with your child, and recommends a plan.`,
  },
  {
    q: 'What are the fees for speech therapy in Electronic City, Bangalore?',
    a: 'Fees depend on how many sessions a week your child needs and whether some are online. We explain the full cost on the first call, once we understand your child\'s needs, so nothing is a surprise later. Packages are available for regular weekly therapy.',
  },
  {
    q: 'How long is each speech therapy session?',
    a: 'Sessions are 45 to 60 minutes, with time at the end to show you what was practised and what to do at home. Younger children sometimes start with shorter sessions. Your therapist will say what suits your child after the assessment.',
  },
  {
    q: 'At what age should a child start speech therapy?',
    a: 'There is no minimum age. If a child is not using single words by 18 months or joining two words by age 2, an assessment is worth doing now rather than waiting. Earlier support is easier for the child, because the gap is smaller and habits are not yet set.',
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

export default {
  path: PATH,
  photo: 'speech',
  title: 'Speech Therapy in Electronic City, Bangalore | Poorvam Care',
  description: 'Speech therapy for children at two centres in Electronic City Phase 1 and Phase 2, Bengaluru: late talking, unclear speech, stammering and autism.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], ['Speech therapy in Electronic City', PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for children in Electronic City',
    serviceType: 'Speech-language therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bommanahalli', 'HSR Layout'])].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['All therapies', '/child-development'], ['Speech therapy in Electronic City', PATH]])}
    <h1>Speech therapy in Electronic City, Bengaluru</h1>
    <p class="answer">Poorvam Care's RCI-registered speech-language pathologists help children aged ${STATS.ages} who are late to talk, hard to understand, stammer or are autistic. Therapy starts with an assessment, then weekly sessions with home practice, at our Phase 1 and Phase 2 centres or online.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'blue' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'green' },
      { label: 'Years in practice', value: STATS.years, tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What speech therapy helps with', 'Most children we see have one or two of these. The assessment tells you which, and what to work on first.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'blue' })), { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Which sounds should your child say by now?', 'Find the sound your child mixes up. If they are past the age most children have it, ask us.')}
      <p>"Tat" for "cat" at two and a half is normal. At five it is worth a look. Children learning two languages can be a little later on some sounds, but they get there in the same order.</p>
      <p>If strangers still struggle to understand your child after age 3, an assessment is worth booking, whatever the chart says.</p>`, soundAgeChart())}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How speech therapy works at Poorvam Care', 'Five steps, and you are in every one of them.')}
    ${steps([
      ['Tell us what you\'ve noticed', 'Book online or call. We call back within one working day.'],
      ['Assessment', 'A speech-language pathologist plays with your child and checks understanding, talking and sounds.'],
      ['A written plan', 'Two or three goals, how many sessions a week, and when we will review.'],
      ['Weekly sessions', 'Play-based therapy, with the last minutes spent showing you what to practise.'],
      ['Review', 'We check progress against the goals with you and move them on.'],
    ])}
    ${weekPlan({
      tone: 'blue',
      session: ['Play and games built around your child\'s goals', 'Modelling words and sounds, then helping your child try', 'Five minutes with you on what to practise'],
      home: ['One routine to use every day, like naming at bath time', 'Short practice that fits around school and meals', 'Notes and home activities on your phone'],
    })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When to see a doctor as well', 'Some signs need a medical check alongside therapy. We will tell you if we see them.')}
    ${callout('Get a hearing test first if you are unsure', `Frequent ear infections, not turning to sounds or speech that stalls can all point to hearing. Our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children of all ages in Electronic City.`, 'info')}
    ${callout('See a paediatrician soon if your child loses words', 'A child who stops using words they had, stops babbling, or loses other skills should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
    ${more('Other reasons we refer to a doctor', '<p>We refer to an ENT for suspected tongue-tie that affects feeding or speech, to a paediatric neurologist for seizures or regression, and to a developmental paediatrician when a formal diagnosis of autism or ADHD is needed. Therapy can start while you wait for those appointments.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('More than speech therapy', 'Many children need two kinds of help. All of it is under one roof, from one plan.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Speech therapy at both Electronic City centres', 'Same speech-language pathologists, same hours. Pick the one closer to home or school.')}
${areasBlock('Serving families across south Bengaluru')}
${faqSection(faqs, 'Speech therapy in Electronic City: questions')}
${ctaBand('Book a speech assessment', 'Tell us what you have noticed. We call back within one working day to plan the first visit.')}
`,
};
