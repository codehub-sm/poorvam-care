import { html, bookButton, whatsappButton, breadcrumb, serviceList, centresBlock, ctaBand, icon, orgId, directorId, urlOf } from '../layout.mjs';
import { head, cards, stats, steps, callout, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, LOCATIONS, SISTER, ONLINE, SUMMER_CAMP } from '../site.mjs';

const PATH = '/about';
const CRUMB = [['About', PATH]];

const approach = [
  { icon: 'route', tone: 'blue', title: 'One plan across therapies', text: 'Speech, OT, ABA and special education share one set of goals, so they pull the same way.' },
  { icon: 'users', tone: 'mint', title: 'Parents in the room', text: 'You see what we practise and leave every session knowing what to do at home.' },
  { icon: 'calendar', tone: 'violet', title: 'Therapy on your phone', text: 'Schedule, goals, session notes, home practice, messages and billing, all in one parent view.' },
  { icon: 'search', tone: 'sun', title: 'Assessment first', text: 'A plain answer on what your child needs, which therapy, and how often, before anything starts.' },
];

const values = [
  ['Compassion first', 'Asking for help takes courage. We listen to what you have noticed and take your worries seriously.'],
  ['Evidence-based care', 'What we do in sessions follows current research and accepted clinical practice, not fashion.'],
  ['Family-centred', 'Parents are partners. We give you the knowledge and the strategies to keep progress going at home.'],
  ['High standards', 'The team keeps training and reviews its own work, so the care your child gets stays good.'],
];

export default {
  path: PATH,
  title: `About Poorvam Care: ${STATS.years} Years of Child Therapy in Electronic City`,
  description: `Poorvam Care is an early intervention centre in Electronic City, Bengaluru, led by ${DIRECTOR.name} (${DIRECTOR.credentials}), with ${STATS.years} years and ${STATS.families} families.`,
  current: PATH,
  breadcrumb: CRUMB,
  schema: [{
    '@type': 'AboutPage',
    '@id': `${urlOf(PATH)}#about`,
    url: urlOf(PATH),
    name: 'About Poorvam Care',
    about: { '@id': orgId },
    mainEntity: { '@id': orgId },
    mentions: { '@id': directorId },
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(CRUMB)}
    <h1>About Poorvam Care</h1>
    <p class="answer">Poorvam Care is an early intervention centre in Electronic City, Bengaluru, for children aged ${STATS.ages}. For ${STATS.years} years, an RCI-registered team led by ${DIRECTOR.name} has offered speech therapy, OT, ABA and special education from one shared plan, at two centres and online.</p>
    <div class="phero__acts">${bookButton('Book a consultation', 'assessment', 'btn btn--ink')}${whatsappButton()}</div>
    ${stats([
      { label: 'Years in practice', value: STATS.years, tone: 'blue' },
      { label: 'Families seen', value: STATS.families, tone: 'mint' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'violet' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Our story', 'Poorvam Care began with one belief: every child deserves good therapy, whatever their challenges.')}
      <p>We started in Electronic City with a small team of therapists for children with developmental needs. Families brought their friends, and the centre grew around them.</p>
      ${more('How we grew', `<p>Over the years we opened a second centre, added occupational therapy, behaviour therapy (ABA), special education and parent counselling, and built therapeutic enrichment groups for children who learn differently: sensory art, movement, therapeutic yoga, music and rhythm, and social skills. A summer therapy camp now runs every ${SUMMER_CAMP.months}.</p><p>Today we work with ${STATS.families} families. That growth came from one thing: the trust of the families we serve.</p>`)}`,
    steps([
      ['A small team in Electronic City', 'Speech therapy for children with developmental needs.'],
      ['Six therapies, one team', 'OT, ABA, special education, parent counselling and enrichment added.'],
      ['Two centres', `${LOCATIONS.map((l) => l.short).join(' and ')}, same therapists, same hours.`],
      ['Online sessions', `Live video therapy for families in ${ONLINE.markets.map((m) => m.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}.`],
    ]))}
  </div>
</section>

<section class="band band--violet">
  <div class="wrap">
    ${head('What makes our approach different', 'Your child\'s therapists plan together, and you can see that plan, not just hear about it at pickup.')}
    ${cards(approach, { cols: 4 })}
    ${more('The values behind it', values.map(([t, s]) => `<p><strong>${t}.</strong> ${s}</p>`).join(''))}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap trust">
    <div class="trust__card director" id="${DIRECTOR.id}">
      <div class="director__mono" aria-hidden="true">${DIRECTOR.initials}</div>
      <div>
        <h2>${DIRECTOR.name}, clinical director</h2>
        <p class="role">${DIRECTOR.role}. ${DIRECTOR.years} years in practice.</p>
        <p>${DIRECTOR.bio}</p>
        ${more('Her clinical background', '<p>Apoorva\'s training covers both audiology and speech-language pathology, and her work has been in paediatric speech therapy and audiology. She specialises in autism, therapy after a cochlear implant, ADHD, articulation difficulties, speech delay and wider developmental delay, and leads the multi-disciplinary team across both centres.</p>')}
      </div>
    </div>
    <div class="trust__card trust__card--reviews">
      <h2>Credentials</h2>
      <ul class="ticks">
        <li>Master of Audiology and Speech-Language Pathology (MASLP)</li>
        <li>Registered with the Rehabilitation Council of India (RCI)</li>
        ${DIRECTOR.memberships.map((m) => `<li>Member, ${m}</li>`).join('')}
      </ul>
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Registered and accountable', 'Two things you can check about any therapy centre before you trust it with your child.')}
    ${cards([
      { icon: 'shield', tone: 'blue', title: 'RCI registered', text: 'Our therapists are registered with the Rehabilitation Council of India, the national body for rehabilitation professionals.' },
      { icon: 'users', tone: 'mint', title: 'ISHA membership', text: 'Our director belongs to the Indian Speech and Hearing Association, the professional body for speech and hearing in India.' },
    ], { cols: 2 })}
    ${callout('Hearing tests are at our sister clinic', `Poorvam Care does not test hearing. Hearing tests and hearing aids for children and adults are at <a href="${SISTER.url}" rel="noopener">${SISTER.name}</a>, in the same building as our Phase 1 centre. If hearing might be behind a speech delay, start with a <a href="${SISTER.childHearing}" rel="noopener">child hearing test</a>.`, 'info')}
  </div>
</section>

${centresBlock('Two centres in Electronic City', 'Same therapists, same methods, same hours at both. Pick whichever is closer to home or school.')}

<section class="band">
  <div class="wrap">
    ${head('Six therapies, one team', 'Each therapy has its own page, with what happens in sessions and how to start.')}
    ${serviceList()}
    <p class="mt-2">Further away? Read about <a href="/online">online therapy</a>, or see <a href="/faq">answers to common questions</a>.</p>
  </div>
</section>

${ctaBand('Talk to our team', 'Tell us what you have noticed. We call back within one working day to plan a first assessment.')}
`,
};
