import { html, bookButton, callButton, whatsappButton, breadcrumb, byline, serviceList, centresBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, more } from '../ui.mjs';
import { STATS, CONTACT, LOCATIONS, SUMMER_CAMP } from '../site.mjs';

const PATH = '/therapeutic-enrichment';
const REVIEWED = '2026-10-11';
const LABEL = 'Therapeutic enrichment';

const faqs = [
  {
    q: 'How is Therapeutic Enrichment different from regular activity classes?',
    a: 'These are not general activity classes. Each group is designed for children with developmental differences, run by our therapy team, and planned around each child\'s own goals. Every activity links back to your child\'s development plan, so the time is used on purpose.',
  },
  {
    q: 'Which children benefit from Therapeutic Enrichment?',
    a: `Children aged ${STATS.ages} with autism, ADHD, developmental delay, sensory processing differences or learning differences. Each session is adapted to every child's needs and abilities, so children at different levels can take part.`,
  },
  {
    q: 'Do I need a referral or assessment first?',
    a: `You do not need a doctor's referral. We do ask for a first consultation, so our team understands your child and suggests the right programme and group. Call or WhatsApp ${CONTACT.phoneDisplay}, or <a href="/book?service=enrichment">book online</a>.`,
  },
  {
    q: 'Can Therapeutic Enrichment replace therapy?',
    a: 'No. Enrichment adds to core therapy like <a href="/speech-therapy-electronic-city">speech therapy</a>, <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a> and <a href="/aba-therapy-for-children-bangalore">ABA</a>. It gives children more practice of their therapy goals through structured, enjoyable group activities, but it does not replace one-to-one sessions.',
  },
  {
    q: 'How are groups structured?',
    a: 'Groups are small, usually 3 to 5 children, and matched by age and developmental level. A trained therapist leads each group and adapts the activities so every child can join in and work on their goals.',
  },
  {
    q: 'Does Poorvam Care have a summer therapy camp for children?',
    a: `Yes. Poorvam Care runs a summer therapy camp every year in ${SUMMER_CAMP.months}. It brings together sensory art, therapeutic yoga, movement, music and rhythm, and social skills groups, designed for children with autism, ADHD, speech delay and other developmental differences, and led by our therapists. Call or WhatsApp ${CONTACT.phoneDisplay} for this year's dates.`,
  },
  {
    q: 'What does therapeutic enrichment cost?',
    a: 'Fees depend on the programme and how often your child attends. We explain the full cost on the first call, once we understand your child\'s needs and which group suits them, so you know it before anything starts.',
  },
];

const programmes = [
  { icon: 'spark', title: 'Sensory art', text: 'Art with sensory-safe materials for fine motor skills, sensory processing and expressing feelings.' },
  { icon: 'route', title: 'Movement therapy', text: 'Structured movement for coordination, body awareness and planning how to move.' },
  { icon: 'sprout', title: 'Therapeutic yoga', text: 'Adapted poses and breathing for calm, self-regulation and body awareness.' },
  { icon: 'ear', title: 'Music and rhythm', text: 'Rhythm games for listening, communication and joining in with others.' },
  { icon: 'users', title: 'Social skills groups', text: 'Turn-taking, joint attention, conversation and playing with peers.' },
  { icon: 'calendar', title: `Summer camp, ${SUMMER_CAMP.months}`, text: 'All five programmes together, every summer, led by our therapists.', href: '#summer-camp' },
];

const programmeDetail = `<ul class="ticks">
  <li><strong>Sensory art:</strong> sensory-safe art materials, fine motor skill building, expressing emotions through art, linked to therapy goals.</li>
  <li><strong>Movement therapy:</strong> gross motor development, body awareness and coordination, motor planning, and sensory integration through movement.</li>
  <li><strong>Therapeutic yoga:</strong> poses adapted for every ability, self-regulation techniques, breathing and calming strategies, in a sensory-friendly room. Built for children with autism, ADHD and sensory needs.</li>
  <li><strong>Music and rhythm:</strong> rhythm and auditory processing, communication through music, social engagement and support for thinking skills.</li>
  <li><strong>Social skills groups:</strong> turn-taking and sharing, joint attention, conversation and pragmatic skills, and practice with peers in a safe, therapist-led setting.</li>
</ul>`;

export default {
  path: PATH,
  photo: 'enrichment',
  title: 'Therapeutic Enrichment Programme for Children | Poorvam Care',
  description: `Therapist-led small groups in Electronic City, Bangalore: sensory art, movement, yoga, music and social skills, plus a summer therapy camp every ${SUMMER_CAMP.months}.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], [LABEL, PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Therapeutic enrichment programme for children',
    serviceType: 'Therapeutic group programmes for children with developmental differences',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City'])].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Enrichment programmes',
      itemListElement: ['Sensory art', 'Movement therapy', 'Therapeutic yoga', 'Music and rhythm', 'Social skills groups', 'Summer therapy camp'].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
    },
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['All therapies', '/child-development'], [LABEL, PATH]])}
    <h1>Therapeutic enrichment for children who learn differently</h1>
    <p class="answer">Therapeutic enrichment is small-group sensory art, movement, yoga, music and social skills sessions for children with developmental differences. Our therapists run every group in Electronic City, and each activity builds on your child's therapy goals. A summer therapy camp runs every ${SUMMER_CAMP.months}.</p>
    <div class="phero__acts">${bookButton('Book a consultation', 'enrichment', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Children per group', value: '3–5', tone: 'pink' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'blue' },
      { label: 'Programmes', value: '5', tone: 'mint' },
      { label: 'Summer therapy camp', value: SUMMER_CAMP.months, tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Our five programmes', 'Each one extends therapy goals through activities children want to do.')}
    ${cards(programmes.map((p) => ({ ...p, tone: 'pink' })), { cols: 3 })}
    ${more('What each programme works on', programmeDetail)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Why therapeutic enrichment, not an activity class?', 'The activities look familiar. Who runs them, and why, is what is different.')}
    <div class="table-wrap"><table>
      <caption>How Poorvam Care's enrichment groups differ from a general activity class.</caption>
      <thead><tr><th>Question</th><th>Activity class</th><th>Therapeutic enrichment</th></tr></thead>
      <tbody>
        <tr><td>Who leads it?</td><td>A general instructor</td><td>A trained member of our therapy team</td></tr>
        <tr><td>What is the aim?</td><td>Learning the activity</td><td>Your child's own development goals</td></tr>
        <tr><td>How big is the group?</td><td>Often large and mixed</td><td>3 to 5 children, matched by age and level</td></tr>
        <tr><td>What is the room like?</td><td>Busy and loud</td><td>Sensory-safe materials and a calmer setting</td></tr>
      </tbody>
    </table></div>
    ${callout('It adds to therapy, it does not replace it', 'Enrichment gives children more practice of their speech, OT or ABA goals with other children, and a sense of belonging. One-to-one therapy still does the core work.', 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head(`Summer therapy camp, every ${SUMMER_CAMP.months}`, 'All our enrichment programmes in one summer, so the school holidays keep therapy goals moving.', { id: 'summer-camp' })}
    ${cards([
      { icon: 'calendar', title: `Every ${SUMMER_CAMP.months}`, text: 'During the school holidays. Ask us for this year\'s dates.' },
      { icon: 'spark', title: 'All five programmes', text: 'Sensory art, therapeutic yoga, movement, music and rhythm, and social skills groups.' },
      { icon: 'child', title: 'Who it is for', text: 'Children with autism, ADHD, speech delay and other developmental differences.' },
      { icon: 'users', title: 'Led by our therapists', text: 'The same therapy team that runs our groups all year.' },
    ].map((c) => ({ ...c, tone: 'pink' })), { cols: 4 })}
    <div class="phero__acts mt-2">${whatsappButton(`Hi Poorvam Care, I would like this year's summer therapy camp dates.`, 'btn btn--wa', 'Ask for camp dates')}${bookButton('Book a consultation', 'enrichment', 'btn btn--line')}</div>
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('How to join a group', 'A short first conversation, so your child lands in the right group.')}
    ${steps([
      ['Tell us about your child', `Book online or call ${CONTACT.phoneDisplay}. We call back within one working day.`],
      ['First consultation', 'Our team meets your child and suggests the right programme.'],
      ['Matched to a group', 'A small group of children of a similar age and level.'],
      ['Goals linked to therapy', 'Activities build on the goals in your child\'s development plan.'],
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Core therapies', 'Enrichment works best alongside one-to-one therapy. All of it is under one roof, from one plan.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Enrichment groups in Electronic City', 'Our centres in Hulimangla (Phase 1) and Ananth Nagar (Phase 2) keep the same hours. Ask which groups run where.')}
${faqSection(faqs, 'Therapeutic enrichment: questions parents ask')}
${ctaBand('Find the right group for your child', 'Tell us about your child. We call back within one working day to suggest a programme.')}
`,
};
