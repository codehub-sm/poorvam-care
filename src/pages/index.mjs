import { html, urlOf, orgId, bookButton, whatsappButton, serviceList, centresBlock, areasBlock, ctaBand, faqSection, icon } from '../layout.mjs';
import { story } from '../story.mjs';
import { head, cards, milestoneLadder, more } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, SERVICES, SISTER, SUMMER_CAMP, whatsappLink } from '../site.mjs';

const faqs = [
  {
    q: 'What services does Poorvam Care offer?',
    a: `Poorvam Care is an early intervention centre in Electronic City, Bengaluru, for children aged ${STATS.ages}. We offer speech therapy, occupational therapy, ABA and behaviour therapy, special education, parent counselling and therapeutic enrichment groups (sensory art, movement, therapeutic yoga, music and rhythm, social skills), at two centres and online.`,
  },
  {
    q: 'How do I know if my child needs therapy?',
    a: 'If your child is behind on talking, hard to understand, struggles with play, movement or routines, or has a diagnosis such as autism or ADHD, an assessment will tell you. Our therapist observes your child, listens to what you have noticed, and tells you plainly whether therapy is needed, which kind, and how often.',
  },
  {
    q: 'What makes Poorvam different from other therapy centers?',
    a: `Speech therapy, OT, ABA and special education work from one shared plan under one roof, so your child's therapists agree on the goals. The team is RCI registered and led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, with ${STATS.years} years in practice. Parents see the goals, session notes and home practice on their phone.`,
  },
  {
    q: 'What is the difference between speech therapy and occupational therapy?',
    a: 'Speech therapy works on communication: understanding words, talking, clear sounds, stammering and social conversation. Occupational therapy works on the body and daily life: sensory needs, fine motor skills like holding a pencil, balance, attention and routines such as dressing. Many children at Poorvam Care have both.',
  },
  {
    q: 'What is therapeutic enrichment?',
    a: 'Therapeutic enrichment is small-group sessions (sensory art, movement, therapeutic yoga, music and rhythm, and social skills groups) designed for children with developmental differences. Our therapy team runs them, and each child works on their own therapy goals inside the group. <a href="/therapeutic-enrichment">More about enrichment</a>.',
  },
  {
    q: 'How many sessions does my child need?',
    a: 'It depends on what the assessment finds, your child\'s age and how much practice happens at home. After the assessment the therapist recommends how many sessions a week and when progress will be reviewed. Plans are reviewed with you regularly and sessions taper as your child needs less support.',
  },
  {
    q: 'Where are your centres located?',
    a: `We have two centres in Electronic City, Bengaluru. Phase 1 is on ${LOCATIONS[0].street}. Phase 2 is in ${LOCATIONS[1].street}. Both keep the same hours and offer the same therapies.`,
  },
  {
    q: 'How do I book an appointment at Poorvam Care?',
    a: `Book online at <a href="/book">poorvamcare.in/book</a>, call or WhatsApp ${CONTACT.phoneDisplay}, or email ${CONTACT.email}. The team calls you back within one working day to understand your child's needs and plan the first assessment.`,
  },
  {
    q: 'Does Poorvam Care have a summer therapy camp for children?',
    a: `Yes. Poorvam Care runs a summer therapy camp every year in ${SUMMER_CAMP.months}: sensory art, therapeutic yoga, movement, music and rhythm, and social skills groups, designed for children with autism, ADHD, speech delay and other developmental differences and led by our therapists. Call or WhatsApp ${CONTACT.phoneDisplay} for this year's dates.`,
  },
  {
    q: 'What is the cost of speech therapy at Poorvam Care?',
    a: 'Fees depend on the therapy, how many sessions a week your child needs and whether sessions are at a centre or online. We explain them on the first call, after we understand your child\'s needs, so you know the full cost before anything starts. There are no hidden charges.',
  },
  {
    q: 'Do you offer online therapy or teletherapy?',
    a: 'Yes. Speech therapy, occupational therapy guidance, behaviour therapy and parent training, and special education are available as live video sessions for families in India, Australia and the UAE. Many local families also mix online sessions with visits to a centre. <a href="/online">How online therapy works</a>.',
  },
];

const quick = [
  { href: '/book?service=assessment', book: 'assessment', ico: 'search', c: 'var(--coral)', t: 'var(--t-coral)', h: 'Book an assessment', s: 'Not sure what your child needs? Start here.' },
  { href: '/speech-therapy-for-speech-delay-bangalore', ico: 'speech', c: 'var(--blue)', t: 'var(--t-blue)', h: 'Late to talk', s: 'What to expect by each age, and when to act' },
  { href: '/speech-therapy-for-autism-bangalore', ico: 'blocks', c: 'var(--violet)', t: 'var(--t-violet)', h: 'Autism support', s: 'Speech, OT and ABA from one plan' },
  { href: '/online', ico: 'video', c: 'var(--mint)', t: 'var(--t-mint)', h: 'Online therapy', s: 'Live video sessions, India, Australia, UAE' },
];

const signs = [
  ['speech', 'Few or no words by 18 months'],
  ['chat', 'Not joining two words by age 2'],
  ['ear', 'Hard for strangers to understand at 3'],
  ['users', 'Rarely responds to their name or shares attention'],
  ['hand', 'Struggles with a spoon, crayon or buttons'],
  ['spark', 'Big reactions to noise, textures or change'],
];

const app = [
  ['calendar', 'Your schedule, always visible', 'See every session and reschedule yourself, without phone tag.'],
  ['check', 'The actual therapy goals', 'Written down and tracked, not a vague "she\'s doing well".'],
  ['book', 'Session notes and reports', 'What happened in each session and how your child is progressing.'],
  ['home', 'Home practice, spelled out', 'The activities to do between sessions, with instructions.'],
];

export default {
  path: '/',
  title: 'Early Intervention Centre in Electronic City | Poorvam Care',
  description: `Speech therapy, occupational therapy, ABA and special education for children aged ${STATS.ages} at two centres in Electronic City, Bengaluru. RCI-registered team.`,
  reviewed: '2026-10-11',
  current: '/',
  faqs,
  schema: SERVICES.map((s) => ({ '@type': ['Service', 'MedicalTherapy'], '@id': `${urlOf(s.page)}#service-summary`, name: s.label, description: s.blurb, url: urlOf(s.page), provider: { '@id': orgId }, areaServed: { '@type': 'Place', name: 'Electronic City, Bengaluru' } })),
  body: html`
<section class="hero">
  <div class="wrap">
    <div>
      <h1>Help your child find their words.<span class="h1-sub">Speech therapy, OT and early intervention in Electronic City, Bengaluru</span></h1>
      <p class="hero__sub">One team for speech, occupational therapy, ABA and special education, working from one plan for your child. Two centres in Electronic City, and online.</p>
      <div class="hero__acts">
        ${bookButton('Book a consultation', 'assessment', 'btn btn--ink')}
        ${whatsappButton(undefined, 'btn btn--line')}
      </div>
      <ul class="hero__proof">
        <li>${icon('check')}RCI-registered therapists</li>
        <li>${icon('check')}${STATS.years} years in practice</li>
        <li>${icon('check')}${STATS.families} families</li>
        <li>${icon('check')}Ages ${STATS.ages}</li>
        <li>${icon('check')}${LOCATIONS.length} centres and online</li>
      </ul>
    </div>
    <div class="orbit" aria-label="Our therapies">
      <span class="orbit__ring" aria-hidden="true"></span><span class="orbit__ring" aria-hidden="true"></span><span class="orbit__ring" aria-hidden="true"></span>
      <div class="orbit__core" aria-hidden="true"><div><b>One plan</b><small>six therapies</small></div></div>
      ${SERVICES.map((s) => `<a class="orbit__chip tone-${s.tone}" href="${s.page}"><span>${icon(s.icon)}</span>${s.short}</a>`)}
      <span class="orbit__word" aria-hidden="true" style="top:27%;left:22%">ma</span>
      <span class="orbit__word" aria-hidden="true" style="top:24%;right:22%">ball</span>
      <span class="orbit__word" aria-hidden="true" style="bottom:27%;right:22%">more</span>
    </div>
  </div>
</section>

<section class="quick" aria-label="Quick actions">
  <div class="wrap quick__grid">${quick.map((q) => `<a href="${q.href}" style="--c:${q.c};--t:${q.t}"${q.book ? ` data-book="${q.book}"` : ''}><span class="q-ico">${icon(q.ico)}</span><strong>${q.h}</strong><span>${q.s}</span></a>`)}</div>
</section>

${story()}

<section class="band">
  <div class="wrap">
    ${head('Signs it is worth asking a therapist', 'You know your child best. Two or more of these? An assessment gives you a plain answer.')}
    ${cards(signs.map(([ic, t], i) => ({ icon: ic, title: t, tone: ['blue', 'blue', 'blue', 'violet', 'mint', 'pink'][i] })), { cols: 3, compact: true })}
    <div class="phero__acts mt-2">${bookButton('Book an assessment', 'assessment', 'btn btn--ink')}<a class="btn btn--line" href="/child-development">How an assessment works</a></div>
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    <div class="split">
      <div>
        ${head('Talking milestones, age by age', 'What most children say by each age. If your child is a step or two behind, it is worth asking early.')}
        <p>Children develop at different speeds, and boys, twins and children learning two languages can be a little later. What matters is steady progress. A child who has stalled, or lost words they had, should be seen soon.</p>
        <p>Unsure whether it is hearing or speech? A hearing test comes first. Our sister clinic, <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a>, tests babies and children in Electronic City.</p>
        <p><a href="/speech-therapy-for-speech-delay-bangalore">Read about speech delay</a></p>
      </div>
      ${milestoneLadder()}
    </div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Six therapies, one team', 'Your child\'s therapists plan together, so speech, movement, behaviour and learning goals pull the same way.')}
    ${serviceList()}
  </div>
</section>

<section class="band band--violet">
  <div class="wrap">
    ${head('See how therapy is going, on your phone', 'You should not have to guess. Families get a live view of their child\'s therapy, not just a word at pickup.')}
    ${cards(app.map(([ic, t, s], i) => ({ icon: ic, title: t, text: s, tone: ['blue', 'mint', 'violet', 'sun'][i] })), { cols: 4 })}
    ${more('What else is in the parent view', '<p>You can message your therapist between sessions instead of saving a question for the next appointment, and see sessions attended, what has been paid and what is outstanding, so there are no surprises at the end of the month.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap trust">
    <div class="trust__card director" id="director">
      <div class="director__mono" aria-hidden="true">${DIRECTOR.initials}</div>
      <div>
        <h2>Led by ${DIRECTOR.name}</h2>
        <p class="role">${DIRECTOR.role}. ${DIRECTOR.credentials}. ${DIRECTOR.years} years in practice.</p>
        <p>${DIRECTOR.bio}</p>
        <p><a href="/about">About the centre and team</a></p>
      </div>
    </div>
    <div class="trust__card trust__card--reviews">
      <h2>Talk to us first</h2>
      <p>Not ready to book? Send us a message about what you have noticed and ask anything before you decide.</p>
      <div class="reviews__acts">
        <a class="btn btn--wa btn--sm" href="${whatsappLink('Hi Poorvam Care, I have a question about my child.')}" target="_blank" rel="noopener" data-track="whatsapp">${icon('whatsapp')}<span>WhatsApp a therapist</span></a>
        <a class="btn btn--line btn--sm" href="/faq">Read common questions</a>
      </div>
    </div>
  </div>
</section>

${centresBlock()}
${areasBlock()}
${faqSection(faqs)}
${ctaBand()}
`,
};
