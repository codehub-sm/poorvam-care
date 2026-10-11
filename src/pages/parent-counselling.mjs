import { html, bookButton, whatsappButton, breadcrumb, byline, serviceList, centresBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, more } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, ONLINE } from '../site.mjs';

const PATH = '/parent-counselling';
const REVIEWED = '2026-10-11';
const LABEL = 'Parent counselling';
const markets = ONLINE.markets.map((m) => (m.id === 'uae' ? 'the UAE' : m.name)).join(', ').replace(/, ([^,]*)$/, ' and $1');

const faqs = [
  {
    q: 'What is parent counselling for special needs children?',
    a: 'It is professional support for parents and caregivers of children with disabilities, developmental differences or complex health needs. It gives you a structured, confidential space to talk through how you feel, understand your child\'s condition, and learn practical strategies to support your child. It is not therapy for the child. It is support for the people who care for them.',
  },
  {
    q: 'Do both parents need to attend counselling sessions?',
    a: 'No. One parent, both parents together, or another main caregiver such as a grandparent can attend. Many families find it helps for both parents to come to some sessions, especially when agreeing on home strategies, but sessions with one parent are just as useful. We work with whatever is practical for your family.',
  },
  {
    q: 'Can parent counselling happen online?',
    a: `Yes. Parent counselling works well by video, and we offer it as live 45-minute sessions for families in ${markets}. It suits working parents, busy households and parents who find it easier to talk from home. In-centre sessions are available at both our Electronic City centres in Bengaluru if you prefer to meet in person. <a href="/online">How online sessions work</a>.`,
  },
  {
    q: 'How often should parents attend counselling?',
    a: 'It depends on where you are. Soon after a diagnosis, or during a hard patch, weekly sessions often help most. Once things settle, fortnightly or monthly check-ins may be enough. We suggest a frequency at the start and change it as you need. There is no fixed number of sessions.',
  },
  {
    q: 'What is the cost of parent counselling at Poorvam Care?',
    a: `Fees depend on how often your family needs sessions and whether you meet in the centre or online. We work it out with you on the first call rather than quoting a figure that may not fit, and you get a clear plan and cost before you commit. Call ${CONTACT.phoneDisplay} or <a href="/book?service=parent">book online</a>.`,
  },
  {
    q: 'Do we need a diagnosis to start parent counselling?',
    a: 'No. Some parents come right after a diagnosis of autism or a developmental delay. Others come while they are still waiting for answers, or when a phase like meltdowns, school trouble or a new sibling feels hard to manage.',
  },
  {
    q: 'Who leads parent counselling at Poorvam Care?',
    a: `Our clinical team, led by ${DIRECTOR.name}, ${DIRECTOR.credentials} and a member of the ${DIRECTOR.memberships[0]}, with ${DIRECTOR.years} years in practice. Because counselling happens inside Poorvam Care, it can be linked to your child's speech, OT or ABA therapy.`,
  },
];

const topics = [
  { icon: 'search', title: 'Understanding a diagnosis', text: 'What it means, what the research says, and where to find reliable information.' },
  { icon: 'home', title: 'Strategies for home', text: 'Meltdowns, routines, communication, and using therapy goals in everyday family life.' },
  { icon: 'heart', title: 'Stress and grief', text: 'A safe space for fear, guilt, grief and burnout, without judgement.' },
  { icon: 'book', title: 'Working with school', text: 'Talking to teachers, asking for support in class, and the IEP process.' },
  { icon: 'users', title: 'Brothers and sisters', text: 'Their feelings and questions, and how to support every child at home.' },
  { icon: 'chat', title: 'Connecting with your child', text: 'Building trust and communication, whatever your child\'s words or behaviour.' },
];

export default {
  path: PATH,
  title: 'Parent Counselling for Special Needs Children | Poorvam Care',
  description: 'Parent counselling in Electronic City, Bangalore, for families of children with autism, speech delay or disabilities. In person, or as 45-minute video sessions.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], [LABEL, PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Parent counselling for families of special needs children',
    serviceType: 'Parent counselling and guidance',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', audienceType: 'Parents and caregivers of children with developmental differences' },
    areaServed: [
      ...[...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City'])].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
      ...ONLINE.markets.map((m) => ({ '@type': 'Country', name: m.name })),
    ],
    availableChannel: [
      ...LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
      { '@type': 'ServiceChannel', name: 'Live video sessions', serviceUrl: urlOf('/online') },
    ],
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['All therapies', '/child-development'], [LABEL, PATH]])}
    <h1>Parent counselling in Bangalore: you are not alone</h1>
    <p class="answer">Parent counselling supports parents of children with autism, speech delay or a developmental disability. At Poorvam Care in Electronic City you get a confidential space, clear information about your child's needs, and practical strategies for home, in person or by video.</p>
    <div class="phero__acts">${bookButton('Book parent counselling', 'parent', 'btn btn--ink')}${whatsappButton('Hi Poorvam Care, I would like to ask about parent counselling.', 'btn btn--line')}</div>
    ${stats([
      { label: 'Ways to meet', value: 'In person or online', tone: 'coral' },
      { label: 'Online session length', value: '45 min', tone: 'blue' },
      { label: 'Years in practice', value: STATS.years, tone: 'mint' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'violet' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What we cover in parent counselling', 'Sessions follow what your family needs most. These are the topics parents bring most often.')}
    ${cards(topics.map((t) => ({ ...t, tone: 'coral' })), { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What to expect in sessions', 'Focused and practical, centred on your child, and taking how you feel seriously.')}
    ${steps([
      ['We listen first', 'A warm, confidential space to say what you may not say anywhere else.'],
      ['Goals together', 'We agree the areas you most need help with, and practical goals.'],
      ['Evidence-informed guidance', 'Advice grounded in research on autism, development and families, not generic tips.'],
      ['Linked to therapy', 'We coordinate with your child\'s speech, OT or ABA therapist.'],
      ['Regular review', 'We check in on progress and change focus as your family\'s needs change.'],
    ])}
    ${more('Why parent counselling matters', `<p>Parents who feel informed and supported find it easier to use therapy strategies at home every day, and home is where children spend most of their time. Yet appointments, therapy schedules and school meetings leave little room for parents to make sense of their own experience. Counselling makes that room.</p><p>At Poorvam Care we see parents as part of the therapy team, and you are the person who knows your child best. Our approach is warm and non-judgemental, practical, culturally sensitive, and tied to your child's therapy goals. This is different from general mental health therapy: it stays focused on your child and family.</p>`)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('In the centre or online', 'Choose whichever is easier this month. You can switch.')}
    ${cards([
      { icon: 'pin', title: 'At an Electronic City centre', text: 'Face to face at Phase 1 or Phase 2, booked around your child\'s therapy if you like.', tone: 'coral' },
      { icon: 'video', title: 'Online, by live video', text: `45-minute sessions from home, for families in ${markets}.`, tone: 'coral', href: '/online' },
    ], { cols: 2 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When you need more than counselling', 'Parent counselling is support and guidance. Some moments need a doctor too.')}
    ${callout('If you are not coping, please talk to a doctor', 'If you feel hopeless, cannot sleep or eat, or have thoughts of harming yourself, see your doctor or a psychiatrist soon. In India you can call Tele-MANAS, the government\'s national mental health helpline, on 14416, any time.', 'warn')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Therapy for your child', 'Counselling works alongside your child\'s therapy, from the same team and the same plan.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Parent counselling at both Electronic City centres', 'Same team and hours at Phase 1 and Phase 2. Sessions are also available online.')}
${faqSection(faqs, 'Parent counselling: questions parents ask')}
${ctaBand('Take care of yourself, so you can care for your child', `Tell us what is going on, or call ${CONTACT.phoneDisplay}. We call back within one working day.`)}
`,
};
