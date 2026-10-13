import { html, bookButton, callButton, breadcrumb, serviceList, centreCard, areasBlock, ctaBand, faqSection, icon, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, ONLINE } from '../site.mjs';

const PATH = '/child-therapy-hsr-layout-bangalore';
const L = LOCATIONS[0];
const SERVED = ['HSR Layout', 'Koramangala', 'BTM Layout', 'Bommanahalli', 'Kudlu Gate', 'Hosa Road', 'Singasandra', 'Hongasandra'];

const faqs = [
  {
    q: 'Is there a good child therapy center near HSR Layout, Bangalore?',
    a: `Poorvam Care's Electronic City Phase 1 centre is about 15 minutes by car from HSR Layout. It offers speech therapy, occupational therapy, ABA, special education and therapeutic enrichment under one roof, with an RCI-registered team led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, with ${STATS.years} years in practice.`,
  },
  {
    q: 'How far is Poorvam Care from HSR Layout?',
    a: `The <a href="${L.page}">Phase 1 centre on Hulimangla Road</a> is roughly 6 to 8 km from HSR Layout, about a 15-minute drive via Bommanahalli and Hosur Road when traffic is light. Many of our families travel from HSR Layout, <a href="/speech-therapy-koramangala-bangalore">Koramangala</a> and <a href="/speech-therapy-btm-layout-bangalore">BTM Layout</a>.`,
  },
  {
    q: 'What therapies do you offer for children near HSR Layout?',
    a: `<a href="/speech-therapy-electronic-city">Speech therapy</a> (including for <a href="/speech-therapy-for-autism-bangalore">autism</a>, <a href="/speech-therapy-for-speech-delay-bangalore">speech delay</a> and unclear speech), <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a> (sensory needs, fine motor skills, self-care), <a href="/aba-therapy-for-children-bangalore">ABA</a>, <a href="/special-education-for-children-bangalore">special education</a> with an individual education plan, parent counselling and <a href="/therapeutic-enrichment">therapeutic enrichment</a> groups. All are available at both Electronic City centres.`,
  },
  {
    q: 'Do you offer online therapy for families in HSR Layout?',
    a: `Yes. Online speech therapy and parent counselling work well for families who would rather not travel every week. Occupational therapy and ABA usually work best in person, because they need hands-on work with your child, so many families mix centre visits with online sessions. Online sessions are live video, 45 minutes long. <a href="${ONLINE.markets[0].page}">Online therapy in India</a>.`,
  },
  {
    q: 'Why do parents from HSR Layout choose Poorvam Care?',
    a: 'Speech therapy, OT, ABA and special education work together from one plan, under one roof, so your child\'s therapists agree on the goals. Each child has written goals that are reviewed with you, parents are trained to carry the work on at home, and you can follow sessions, notes and home practice on your phone.',
  },
  {
    q: 'Which centre is closer to HSR Layout, Phase 1 or Phase 2?',
    a: `Phase 1, on Hulimangla Road. It is the first one you reach coming down Hosur Road, and it has a lift. The <a href="${LOCATIONS[1].page}">Phase 2 centre</a> in Ananth Nagar is further along and up a flight of stairs.`,
  },
  {
    q: 'How do I book a first visit from HSR Layout?',
    a: `Book online, call or WhatsApp ${CONTACT.phoneDisplay}. We call back within one working day to hear what you have noticed and book an assessment at Phase 1 at a time that suits you. The centre is open ${HOURS.display}.`,
  },
];

const why = [
  { icon: 'users', title: 'One team, one plan', text: 'Speech, OT, ABA and special education agree on the goals for your child.', tone: 'blue' },
  { icon: 'shield', title: 'RCI-registered therapists', text: `Led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, ${STATS.years} years in practice.`, tone: 'sky' },
  { icon: 'check', title: 'Written, measurable goals', text: 'You know what your child is working on and when it will be reviewed.', tone: 'green' },
  { icon: 'home', title: 'Parent training', text: 'Short practice you can do at home, so progress carries on between visits.', tone: 'teal' },
  { icon: 'calendar', title: 'Progress on your phone', text: 'Schedule, goals, session notes and home practice in one place.', tone: 'blue' },
  { icon: 'heart', title: `${STATS.families} families`, text: 'Families across south Bengaluru, many from HSR, Koramangala and BTM.', tone: 'aqua' },
];

const online = [
  { icon: 'search', title: 'Assessment at the centre', text: 'Meet the therapist in person first, so the plan is built on seeing your child.', tone: 'blue' },
  { icon: 'video', title: 'Some sessions online', text: 'Speech therapy and parent sessions work well over live video, 45 minutes each.', tone: 'green' },
  { icon: 'hand', title: 'OT and ABA in person', text: 'These need hands-on work, so plan centre visits for them.', tone: 'sky' },
];

export default {
  path: PATH,
  title: 'Child Therapy Near HSR Layout, Bangalore | Poorvam Care',
  description: 'Speech therapy, OT, ABA and special education for children near HSR Layout. Our Electronic City Phase 1 centre is about 15 minutes away via Hosur Road.',
  breadcrumb: [['Centres', '/contact'], ['Child therapy near HSR Layout', PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Child therapy for families near HSR Layout',
    serviceType: 'Paediatric speech, occupational and behaviour therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed: SERVED.map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: [{ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(L.page)}#business` } }],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Centres', '/contact'], ['Child therapy near HSR Layout', PATH]])}
    <h1>Child therapy near HSR Layout, Bangalore</h1>
    <p class="answer">The nearest Poorvam Care centre to HSR Layout is in Electronic City Phase 1, on Hulimangla Road, about 15 minutes by car via Hosur Road. Speech therapy, OT, ABA and special education for children aged ${STATS.ages}, with online sessions for weeks you can't travel.</p>
    <div class="phero__acts">${bookButton('Book at Phase 1', 'assessment', 'btn btn--ink', L.id)}${callButton()}</div>
    ${stats([
      { label: 'Nearest centre', value: 'Phase 1', tone: 'blue' },
      { label: 'Distance, roughly', value: '6–8 km', tone: 'green' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'sky' },
      { label: 'Years in practice', value: STATS.years, tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Why HSR Layout families come to Poorvam Care', 'Standalone clinics usually offer one therapy. Here, the whole team works on one plan for your child.')}
    ${cards(why, { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapies for children near HSR Layout', `For children aged ${STATS.ages} with autism, speech delay, ADHD, developmental delay and learning differences.`)}
    ${serviceList()}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Getting to Poorvam Care from HSR Layout', 'Head south via Bommanahalli and Hosur Road to Hulimangla Road in Electronic City Phase 1.')}
      <ul class="ticks">
        <li>Roughly 6 to 8 km from HSR Layout</li>
        <li>About 15 minutes by car when traffic is light</li>
        <li>Above RxDx Multi Speciality, near the Sai Mandir Temple</li>
        <li>Lift to the centre, open ${HOURS.display}</li>
      </ul>
      ${more('Landmarks near the centre', '<p>The Phase 1 centre is on Hulimangla Road, near Westside and Sai Baba Temple Road. From the Electronic City flyover, take the exit towards Hulimangla Road; the centre is about two minutes from the main junction. Use the Directions button for live directions from your street.</p>')}`, centreCard(L))}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When online sessions make more sense', 'Weekly therapy is a long commitment. Many HSR families split it between the centre and home.')}
    ${cards(online, { cols: 3 })}
    ${callout('Not sure what your child needs?', 'Start with an assessment at Phase 1. The therapist will tell you which therapy, how often, and which sessions can happen online.', 'info')}
  </div>
</section>

${areasBlock('Which centre is closer to you?')}
${faqSection(faqs, 'Child therapy near HSR Layout: questions')}
${ctaBand('Book a first visit from HSR Layout', 'Tell us what you have noticed. We call back within one working day to plan an assessment at the Phase 1 centre.')}
`,
};
