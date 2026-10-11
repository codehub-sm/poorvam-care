import { html, bookButton, whatsappButton, breadcrumb, byline, serviceList, centreCard, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, steps, callout, weekPlan, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, LOCATIONS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-whitefield-bangalore';
const REVIEWED = '2026-10-11';
const P1 = LOCATIONS[0];
const CRUMB = [['All therapies', '/child-development'], ['Speech therapy for Whitefield', PATH]];

const faqs = [
  {
    q: 'Is there a speech therapist near Whitefield?',
    a: `Poorvam Care has no centre in Whitefield. Our nearest centre is in ${P1.name}, a long drive down the Outer Ring Road. For Whitefield families we usually suggest <a href="/online/speech-therapy">online speech therapy</a> for the weekly sessions, with the same RCI-registered speech-language pathologists you would see at the centre. You are welcome in person for the assessment, progress reviews or a block of more intensive therapy.`,
  },
  {
    q: 'Is online speech therapy available for Whitefield families?',
    a: 'Yes. Our therapists run live, interactive video sessions of 45 minutes, built around your child\'s goals. After each session you get the home activities on your phone, and the therapist coaches you on how to use them through the week. Regular progress reviews keep the plan moving. Many Whitefield parents choose it because a weekly session fits around school, work and meetings far more easily than the drive.',
  },
  {
    q: 'How far is Poorvam Care from Whitefield?',
    a: `The ${P1.short} centre is about 30 km from Whitefield. The usual route is the Outer Ring Road south through Marathahalli, on past the Sarjapur Road junction, then Hosur Road into Electronic City. It takes about 50 to 60 minutes in normal traffic, and longer at peak hours. That is why we suggest online sessions for the regular weekly therapy and centre visits for assessments and reviews.`,
  },
  {
    q: 'What conditions does Poorvam Care treat?',
    a: 'Our team works with children who have speech sound difficulties, expressive and receptive language delay, autism, ADHD, cerebral palsy, Down syndrome, sensory processing difficulties, stammering, voice difficulties and feeding or swallowing difficulties. The team includes speech-language pathologists, occupational therapists, ABA therapists and special educators. Most of this can be done at our Electronic City centres or online.',
  },
  {
    q: 'Does online speech therapy work for young children?',
    a: 'For many speech and language goals it does, especially when a parent sits alongside and practises during the week. Some children, often the youngest or those who find a screen hard to attend to, do better in the room. The therapist will tell you honestly after the assessment which suits your child, and the plan can change later.',
  },
  {
    q: 'What do we need at home for an online session?',
    a: 'A laptop or tablet with a camera, a steady internet connection, and a quiet corner with a table. Your therapist will tell you which toys or picture cards to keep ready. For younger children, a parent sits with them for the session.',
  },
  {
    q: 'What does speech therapy cost?',
    a: 'Fees depend on how many sessions a week your child needs and how many are online. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts.',
  },
];

const plan = [
  { icon: 'pin', title: 'Assessment at the centre', text: `One visit to ${P1.short} so the therapist can see your child play, talk and move.` },
  { icon: 'video', title: 'Weekly sessions online', text: 'Live 45-minute video sessions from home, with the same therapist every week.' },
  { icon: 'calendar', title: 'Reviews in person', text: 'Come in when progress is reviewed, or for a short intensive block if needed.' },
];

const helps = [
  { icon: 'speech', title: 'Late talking', text: 'Few words for their age, or words not joining up.', href: '/speech-therapy-for-speech-delay-bangalore' },
  { icon: 'blocks', title: 'Autism and communication', text: 'Requests, shared attention, conversation and play.', href: '/speech-therapy-for-autism-bangalore' },
  { icon: 'chat', title: 'Unclear speech', text: 'Speech sound difficulties that make your child hard to understand.' },
  { icon: 'route', title: 'Stammering', text: 'Repeated or stuck sounds, and the worry that comes with them.' },
  { icon: 'book', title: 'Language delay', text: 'Understanding and using words, sentences and questions.' },
  { icon: 'users', title: 'Complex needs', text: 'ADHD, cerebral palsy, Down syndrome and sensory differences.' },
];

export default {
  path: PATH,
  title: 'Speech Therapy in Whitefield Bangalore | Poorvam Care',
  description: 'Speech therapy for Whitefield children: live online sessions from home, with the assessment and reviews at our Electronic City centre, about 30 km away.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: CRUMB,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for children in Whitefield, online and in person',
    serviceType: 'Speech-language therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    areaServed: ['Whitefield', 'ITPL', 'Varthur', 'Whitefield Main Road', 'Mahadevapura'].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: [
      { '@type': 'ServiceChannel', serviceUrl: urlOf('/online/speech-therapy'), name: 'Online speech therapy by video' },
      { '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(P1.page)}#business` } },
    ],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(CRUMB)}
    <h1>Speech therapy for children in Whitefield, Bangalore</h1>
    <p class="answer">Poorvam Care's centres are in Electronic City, about an hour from Whitefield. So most Whitefield families do weekly speech therapy online, live with an RCI-registered therapist, and come to our Phase 1 centre only for the assessment and progress reviews.</p>
    <div class="phero__acts">${bookButton('Book online speech therapy', 'speech', 'btn btn--ink', 'online')}${whatsappButton('Hi Poorvam Care, we live in Whitefield and would like to know about speech therapy for our child.')}</div>
    ${stats([
      { label: 'Online session', value: '45 min', tone: 'blue' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'mint' },
      { label: 'Years in practice', value: STATS.years, tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Is the drive worth it every week?', 'Usually not. An hour each way on the Outer Ring Road is hard to keep up with a young child.')}
    ${cards(plan.map((p) => ({ ...p, tone: 'blue' })), { cols: 3 })}
    ${more('Why we suggest this for Whitefield', `<p>Families in ITPL, Varthur, Whitefield Main Road and Mahadevapura are well connected to the city's tech parks but face a long trip to any specialist. Therapy only works if it happens every week, and a session that fits between school and a work meeting is easier to keep than a two-hour round trip.</p><p>Online sessions are not a lesser version: the same speech-language pathologists run them, with the same goals and home practice. In-person visits stay open for the first assessment, a detailed progress review, or an intensive block of therapy.</p>`)}
  </div>
</section>

<section class="band band--violet">
  <div class="wrap">
    ${head('How online speech therapy works', 'Five steps from first call to regular sessions. You are part of every one.')}
    ${steps([
      ['Book a consultation', 'Book online or WhatsApp us. We call back within one working day.'],
      ['Assessment', 'At the Phase 1 centre if you can, or by video call if not.'],
      ['A written plan', 'Two or three goals, how often, and when we will review.'],
      ['Weekly live sessions', 'Your therapist on video, with home activities sent after every session.'],
      ['Regular reviews', 'Progress against the goals, with the goals updated as your child moves on.'],
    ])}
    ${weekPlan({
      tone: 'blue',
      session: ['Games and picture cards on screen, built around your child\'s goals', 'The therapist models words and sounds, and your child tries', 'Coaching for you on what to practise'],
      home: ['One daily routine to practise in, like naming at bath time', 'Short activities that fit around school and meals', 'Notes and home practice on your phone'],
    })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What our speech therapists help with', 'From toddlers who are late to talk to school-age children with more complex needs.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'blue' })), { cols: 3, compact: true })}
    ${callout('When online is not the right fit', 'Some children, often the youngest, find a screen hard to attend to. If so, we will say so after the assessment and suggest more centre visits.', 'info')}
    ${callout('Check hearing first if you are unsure', `Frequent ear infections, or not turning to sounds, can point to hearing. Our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children of all ages.`, 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Coming in for the assessment', 'Our Phase 1 centre is the one to choose from Whitefield. It has a lift.')}
      <p>The usual route is the Outer Ring Road south through Marathahalli, past the Sarjapur Road junction, then Hosur Road into Electronic City. Allow about 50 to 60 minutes, longer at peak hours.</p>
      <p>The team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}. <a href="/about">About the team</a>, or <a href="/contact">see both centres</a>.</p>`, centreCard(P1))}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('More than speech therapy', 'OT guidance, behaviour therapy and special education can also be done online, from one plan.')}
    ${serviceList()}
    <p class="mt-2">Online versions: <a href="/online/occupational-therapy">occupational therapy</a>, <a href="/online/behavioural-therapy">behaviour therapy</a> and <a href="/online/special-education">special education</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Speech therapy for Whitefield: questions')}
${ctaBand('Speech therapy from Whitefield, without the drive', 'Tell us what you have noticed. We call back within one working day to plan the assessment and online sessions.')}
`,
};
