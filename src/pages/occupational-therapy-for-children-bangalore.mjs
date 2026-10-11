import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, signs, weekPlan, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, ONLINE } from '../site.mjs';

const PATH = '/occupational-therapy-for-children-bangalore';
const REVIEWED = '2026-10-11';
const LABEL = 'Occupational therapy';

const faqs = [
  {
    q: 'What is occupational therapy for children?',
    a: 'Occupational therapy (OT) helps children build the skills they need for everyday life: writing, dressing, eating, playing and learning. It works on fine motor skills, sensory processing, coordination and self-care, through play-based activities your child enjoys, so practice does not feel like work.',
  },
  {
    q: 'How do I know if my child needs occupational therapy?',
    a: 'Signs include trouble holding a pencil or writing, struggling with buttons or zips, being very bothered by textures or sounds, poor balance or coordination, finding it hard to sit still, difficulty with eating or dressing, or constantly seeking movement and touch. Two or more of these is a good reason for an <a href="/book?service=ot">OT assessment</a>.',
  },
  {
    q: 'What is sensory integration therapy?',
    a: 'Sensory integration therapy helps children who find it hard to process touch, sound, movement or what they see. Our occupational therapists use planned movement, touch and heavy-work activities to help a child settle their responses. Over time this shows up as better focus, calmer behaviour and easier daily routines.',
  },
  {
    q: 'How often should my child attend occupational therapy?',
    a: 'Most children come one to three times a week, depending on what the assessment finds. You also get a home activity plan so skills are practised between sessions. The therapist reviews progress with you regularly and changes how often your child comes as they improve.',
  },
  {
    q: 'How long is each occupational therapy session?',
    a: 'Sessions are 45 to 60 minutes. The last few minutes are spent with you, showing what your child worked on and what to practise at home. Younger children sometimes start with shorter sessions.',
  },
  {
    q: 'Does my child need a diagnosis before starting OT?',
    a: 'No. Many children start OT because a parent or teacher noticed something, without any diagnosis. If the assessment suggests autism, ADHD or another condition, we will tell you and explain when to see a developmental paediatrician. Therapy can start while you wait for that appointment.',
  },
  {
    q: 'What does occupational therapy cost at Poorvam Care?',
    a: 'Fees depend on how many sessions a week your child needs and whether some are online. We explain the full cost on the first call, once we understand your child\'s needs, so you know it before anything starts.',
  },
  {
    q: 'Can occupational therapy be done online?',
    a: `Partly. Hands-on sensory work is best at a centre, but OT guidance and parent coaching by video work well for routines, handwriting and home programmes. We offer them to families in ${ONLINE.markets.map((m) => (m.id === 'uae' ? 'the UAE' : m.name)).join(', ').replace(/, ([^,]*)$/, ' and $1')}. <a href="/online/occupational-therapy">How online OT works</a>.`,
  },
];

const helps = [
  { icon: 'hand', title: 'Fine motor skills', text: 'Pencil grip, cutting with scissors, buttons, zips and building with small pieces.' },
  { icon: 'route', title: 'Balance and coordination', text: 'Climbing, jumping, catching a ball, and moving without bumping into things.' },
  { icon: 'spark', title: 'Sensory processing', text: 'Big reactions to noise, touch or food, or always seeking movement.' },
  { icon: 'home', title: 'Self-care', text: 'Eating with a spoon, dressing, brushing teeth and toilet routines.' },
  { icon: 'book', title: 'School readiness', text: 'Handwriting, sitting at a desk, and following a classroom routine.' },
  { icon: 'child', title: 'Attention and calm', text: 'Settling to a task and coping when plans change.' },
];

const checks = [
  'Avoids crayons and drawing, or finds pencil grip very hard',
  'Cannot manage buttons, zips or a spoon like other children their age',
  'Covers ears at everyday sounds, or hates certain clothes and textures',
  'Always on the move, crashing, spinning or climbing',
  'Trips, falls or tires much faster than friends',
  'Melts down at haircuts, nail cutting or bath time',
];

export default {
  path: PATH,
  title: 'Occupational Therapy for Children in Electronic City, Bangalore',
  description: `Occupational therapy for children aged ${STATS.ages} at our Electronic City Phase 1 and Phase 2 centres, Bangalore: sensory integration, fine motor skills and self-care.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], [LABEL, PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Occupational therapy for children in Electronic City, Bangalore',
    serviceType: 'Paediatric occupational therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bommanahalli', 'HSR Layout'])].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['All therapies', '/child-development'], [LABEL, PATH]])}
    <h1>Occupational therapy for children in Electronic City, Bangalore</h1>
    <p class="answer">Occupational therapy helps children aged ${STATS.ages} with the skills of daily life: holding a pencil, dressing, eating, balance, and coping with noise, touch and movement. Poorvam Care's therapists start with an assessment, then run weekly play-based sessions at our Phase 1 and Phase 2 centres.</p>
    <div class="phero__acts">${bookButton('Book an OT assessment', 'ot', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'mint' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'violet' },
      { label: 'Families seen', value: STATS.families, tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What occupational therapy helps with', 'OT is about the everyday jobs of childhood: playing, eating, dressing, learning and staying calm enough to do them.')}
    ${cards(helps.map((h) => ({ ...h, tone: 'mint' })), { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('When does a child need occupational therapy?', 'Check the list against your child. Two or more is a good reason to ask.')}
      <p>Children with autism, ADHD, developmental delay, cerebral palsy, Down syndrome or sensory processing differences often benefit from OT. So do children with no diagnosis who simply find daily tasks harder than their friends do.</p>
      <p>Starting early gives a child the best chance of catching up and doing more for themselves.</p>
      ${more('What occupational therapy covers', '<p>Fine motor tasks like writing and buttoning clothes. Gross motor skills like climbing and balance. Sensory processing, where a child is over- or under-sensitive to touch, sound or movement. Self-care such as feeding and dressing. School skills such as handwriting, scissor use and sitting through a lesson.</p>')}`,
      `<div>${signs(checks)}</div>`)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How occupational therapy works at Poorvam Care', 'An assessment first, then a plan with goals you can see, and practice that fits family life.')}
    ${steps([
      ['Tell us what you\'ve noticed', 'Book online or call. We call back within one working day.'],
      ['OT assessment', 'The therapist checks motor skills, sensory profile and daily living skills through play.'],
      ['A written plan', 'Measurable goals, how many sessions a week, and when we review.'],
      ['Weekly sessions', 'Sensory integration, fine motor and coordination work, built as games.'],
      ['Review', 'We check progress against the goals with you and adjust the plan.'],
    ])}
    ${weekPlan({
      tone: 'mint',
      session: ['Movement and sensory activities matched to your child', 'Fine motor play: drawing, cutting, threading, building', 'Time with you on what to practise this week'],
      home: ['A short home activity plan for each week', 'Small changes to routines like dressing and meals', 'Notes and home activities on your phone'],
    })}
    ${more('Everything an OT plan at Poorvam Care can include', `<ul class="ticks">
      <li>A detailed first assessment of motor skills, sensory processing and daily living skills</li>
      <li>An individual plan with measurable goals, reviewed regularly</li>
      <li>Sensory integration therapy</li>
      <li>Fine motor work through age-appropriate activities</li>
      <li>Gross motor and coordination work to build strength and balance</li>
      <li>School readiness: handwriting, scissor use and classroom behaviour</li>
      <li>Parent coaching with home activities</li>
      <li>Talking to your child's school, if that helps</li>
    </ul><p>OT at Poorvam Care works within one team. When a child needs it, the occupational therapist plans with the <a href="/speech-therapy-electronic-city">speech therapist</a>, <a href="/aba-therapy-for-children-bangalore">behaviour therapist</a> and <a href="/special-education-for-children-bangalore">special educator</a>, so goals pull the same way. The clinical team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When to see a doctor as well', 'OT builds skills. Some signs also need a medical check, and we will tell you if we see them.')}
    ${callout('See a paediatrician soon if your child loses skills', 'A child who stops doing things they could do, such as walking, using their hands or talking, should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
    ${more('Other reasons we refer to a doctor', '<p>We refer to a paediatric neurologist for seizures, very stiff or floppy muscles, or skills that are going backwards. We refer to a developmental paediatrician when a formal diagnosis of autism or ADHD is needed, and to a psychiatrist if medication for ADHD is being considered. OT can start while you wait for those appointments.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('More than occupational therapy', 'Many children need two kinds of help. All of it is under one roof, from one plan.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Occupational therapy at both Electronic City centres', 'Same occupational therapists, same hours. Pick the one closer to home or school.')}
${areasBlock('OT for families across south Bangalore')}
${faqSection(faqs, 'Occupational therapy for children: questions')}
${ctaBand('Book an OT assessment', `Tell us what you have noticed, or call ${CONTACT.phoneDisplay}. We call back within one working day to plan the first visit.`)}
`,
};
