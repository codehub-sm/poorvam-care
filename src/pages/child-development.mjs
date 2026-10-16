import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, signs, more, split, milestoneLadder } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, SERVICES, SISTER } from '../site.mjs';

const PATH = '/child-development';
const REVIEWED = '2026-10-11';
const TRAIL = [['All therapies', PATH]];

const faqs = [
  {
    q: 'What is the best therapy for autism in Bangalore?',
    a: 'The best therapy is the one that fits your child. Most autistic children do best with a mix: speech therapy for communication, ABA for skills and behaviour, occupational therapy for sensory needs and daily routines, and social skills groups. At Poorvam Care in Electronic City, one team builds that mix into a single plan. <a href="/speech-therapy-for-autism-bangalore">Speech therapy for autism</a>.',
  },
  {
    q: 'How do I know if my child needs speech therapy?',
    a: 'Signs include not babbling by 12 months, no single words by 16 months, difficulty following simple instructions, speech strangers cannot understand after age 3, or stammering. If you are unsure, a developmental assessment tells you whether therapy would help and which kind. <a href="/speech-therapy-for-speech-delay-bangalore">Read about speech delay</a>.',
  },
  {
    q: 'At what age should early intervention begin?',
    a: `As soon as you notice a concern. Help that starts before age 3 tends to make the biggest difference, because the gap is smaller and habits are not yet set, but therapy helps at any age. Our therapies are for children aged ${STATS.ages}. <a href="/early-intervention-for-toddlers-bangalore">Early intervention for toddlers</a>.`,
  },
  {
    q: 'What is ABA therapy and how does it work?',
    a: 'Applied behaviour analysis (ABA) is an evidence-based therapy that teaches new skills by breaking them into small, teachable steps and rewarding each success. It is used to build communication, play and independence, and to reduce behaviour that gets in the way. <a href="/aba-therapy-for-children-bangalore">ABA at Poorvam Care</a>.',
  },
  {
    q: 'How long does occupational therapy take to show results?',
    a: 'It depends on your child\'s needs, their age when therapy starts, and how often sessions happen. The therapist sets goals at the start and reviews progress with you regularly, so you can see what is changing. Session notes and progress are on your phone in the parent view. <a href="/occupational-therapy-for-children-bangalore">Occupational therapy for children</a>.',
  },
  {
    q: 'Do you provide home-based therapy programs?',
    a: 'Yes. For families living near our Electronic City centres, speech therapists, occupational therapists and ABA therapists can come to your home. <a href="/home-therapy-electronic-city">Therapy at home</a>. Every child also gets a home programme and parent training, and speech therapy, behaviour therapy, special education and OT guidance are available as <a href="/online">live online sessions</a>.',
  },
  {
    q: 'What qualifications do your therapists have?',
    a: `Our therapists are registered with the Rehabilitation Council of India (RCI), the national body for therapy professionals. The team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, a member of the Indian Speech and Hearing Association with ${DIRECTOR.years} years in practice. <a href="/about">About the team</a>.`,
  },
  {
    q: 'How much does child therapy cost in Bangalore?',
    a: `Fees depend on the therapy, how many sessions a week your child needs and whether some sessions are online. We explain them on the first call, once we understand your child's needs, so you know the full cost before anything starts. Call or WhatsApp ${CONTACT.phoneDisplay}.`,
  },
  {
    q: 'What happens at a developmental assessment?',
    a: 'A therapist plays with your child and watches how they talk, understand, move, play and handle the room, while you share what you have noticed at home. Afterwards you get a plain answer: whether your child needs therapy, which kind, how often, and what to start doing at home.',
  },
  {
    q: 'Which therapy does my child need?',
    a: 'If talking is the worry, start with speech therapy. If it is movement, sensory reactions or handwriting, occupational therapy. Meltdowns and routines point to ABA, and learning at school to special education. If you are not sure, or it is a bit of everything, book a developmental assessment and we will tell you.',
  },
];

const concerns = [
  { icon: 'speech', title: 'Late to talk', text: 'Few words for their age, or words that are not joining up.', href: '/speech-therapy-for-speech-delay-bangalore', tone: 'blue' },
  { icon: 'chat', title: 'Unclear speech', text: 'Hard to understand, or sounds said the wrong way.', href: '/speech-therapy-electronic-city', tone: 'blue' },
  { icon: 'speech', title: 'Stammering', text: 'Sounds or words that repeat, stretch or get stuck.', href: '/stammering-therapy-for-children-bangalore', tone: 'blue' },
  { icon: 'calendar', title: 'Toddler under 3', text: 'Behind on words, walking or play. Early help from 18 months.', href: '/early-intervention-for-toddlers-bangalore', tone: 'green' },
  { icon: 'blocks', title: 'Autism, or you suspect it', text: 'Communication, play and routines, from one team and one plan.', href: '/speech-therapy-for-autism-bangalore', tone: 'sky' },
  { icon: 'spark', title: 'Meltdowns, attention or ADHD', text: 'Behaviour that gets in the way, focus, and following routines.', href: '/aba-therapy-for-children-bangalore', tone: 'sky' },
  { icon: 'hand', title: 'Sensory needs or clumsiness', text: 'Big reactions to noise or textures, pencil grip, balance, dressing.', href: '/occupational-therapy-for-children-bangalore', tone: 'green' },
  { icon: 'book', title: 'Struggling at school', text: 'Reading, writing or maths that is not clicking.', href: '/special-education-for-children-bangalore', tone: 'teal' },
  { icon: 'users', title: 'Play and making friends', text: 'Small groups for social skills, play and school readiness.', href: '/therapeutic-enrichment', tone: 'aqua' },
  { icon: 'home', title: 'Picky eating or gagging', text: 'Very few foods, trouble chewing, or every meal a battle.', href: '/feeding-therapy-for-children-bangalore', tone: 'green' },
  { icon: 'heart', title: 'Just had a diagnosis', text: 'Guidance on what it means and a plan you can use at home.', href: '/parent-counselling', tone: 'deep' },
  { icon: 'ear', title: 'Worried about hearing', text: `Not turning to sounds, or many ear infections. ${SISTER.name} tests children.`, href: SISTER.childHearing, tone: 'blue' },
];

const leave = [
  { icon: 'check', title: 'A plain answer', text: 'Whether your child needs therapy now, or whether to watch and recheck.' },
  { icon: 'route', title: 'Which therapy, how often', text: 'The therapies that fit, sessions a week, and when we review.' },
  { icon: 'calendar', title: 'The first goals', text: 'Two or three goals to start with, written down.' },
  { icon: 'home', title: 'Things to do at home', text: 'Simple activities you can start this week, whatever you decide.' },
];

export default {
  path: PATH,
  photo: 'assessment',
  title: 'Child Development Center in Electronic City, Bangalore',
  description: `Child development centre in Electronic City, Bengaluru: a developmental assessment, then speech, OT, ABA and special education for ages ${STATS.ages}.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Developmental assessment and early intervention for children',
    serviceType: 'Developmental assessment',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1.5, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Therapies for children',
      itemListElement: SERVICES.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'MedicalTherapy', name: s.label, url: urlOf(s.page) } })),
    },
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Child development centre in Electronic City</h1>
    <p class="answer">Poorvam Care is a child development centre in Electronic City, Bengaluru, for children aged ${STATS.ages}. If you are not sure what your child needs, start with a developmental assessment. You leave knowing whether therapy will help, which kind, and how often.</p>
    <div class="phero__acts">${bookButton('Book a developmental assessment', 'assessment', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Therapies under one roof', value: String(SERVICES.length), tone: 'blue' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'green' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'sky' },
      { label: 'Years in practice', value: STATS.years, tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What are you worried about?', 'Pick the closest match. Each one takes you to the therapy that usually helps first.')}
    ${cards(concerns, { cols: 3 })}
    ${more('Conditions we work with', `<p><strong>Autism.</strong> Communication, social skills and behaviour, through speech therapy, ABA, occupational therapy for sensory needs, and social skills groups.</p>
      <p><strong>Developmental delays.</strong> Children behind on movement, speech, thinking skills, play or self-care, with goals for each area.</p>
      <p><strong>Cerebral palsy.</strong> Communication, hand skills and independence through speech therapy, occupational therapy and communication aids where speech is hard. We do not offer physiotherapy, and work alongside your child's physiotherapist.</p>
      <p><strong>Down syndrome.</strong> Speech and language, motor skills, social confidence and life skills, from one plan.</p>
      <p><strong>Sensory processing differences.</strong> Sensory integration in occupational therapy, a daily sensory plan for home, changes to the child's surroundings, and self-regulation strategies.</p>
      <p><strong>ADHD.</strong> Focus, organisation, planning and social skills, through behavioural strategies, social skills groups and support for school. Medication questions go to a child psychiatrist or paediatrician.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What happens at a developmental assessment', 'One unhurried visit at a centre. You stay with your child the whole time.')}
    ${steps([
      ['Tell us what you\'ve noticed', 'Book online or call. We call back within one working day.'],
      ['We play and watch', 'A therapist sees how your child talks, understands, moves and plays.'],
      ['We listen to you', 'Home, school, sleep, eating: what you see that we cannot.'],
      ['A plain answer', 'Whether therapy will help, which kind, how often, and what to start at home.'],
    ])}
    ${callout('Bring what you already have', 'Any reports from a doctor, school or earlier therapist, and short phone videos of the things that worry you. They help us see your child\'s ordinary day.', 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What you leave with', 'Not a label. A clear next step, written down, whatever we find.')}
    ${cards(leave.map((c) => ({ ...c, tone: 'blue' })), { cols: 4 })}
    ${callout('A diagnosis comes from a doctor', 'If your child may need a formal diagnosis, such as autism or ADHD, we refer you to a developmental paediatrician. Therapy can start while you wait for that appointment.', 'good')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Who the assessment is for', `Any child aged ${STATS.ages} whose development worries you, with or without a diagnosis.`)}
      ${signs([
        'Behind on talking or hard to understand',
        'Struggles with play, friends or sharing attention',
        'Clumsy, or finds a spoon, crayon or buttons hard',
        'Big reactions to noise, textures or change',
        'Falling behind at school',
        'Has a diagnosis and you want a plan',
      ])}`, milestoneLadder())}
    ${callout('See a paediatrician soon if your child loses skills', 'A child who stops using words they had, or loses other skills, should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('All six therapies, one team', 'Your child\'s therapists plan together, so speech, movement, behaviour and learning goals pull the same way.')}
    ${serviceList()}
    ${more('How we work with every child', `<p><strong>Assessment first.</strong> Every child is assessed before therapy starts, across all the areas that matter, so the plan is built on what your child can do now.</p>
      <p><strong>One plan, written goals.</strong> No two children are alike. Each child gets an individual plan with specific, measurable goals that every therapist on the team works towards.</p>
      <p><strong>Parents as partners.</strong> You get parent training, a home programme and progress updates in the parent view on your phone, so therapy carries on between sessions. Led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}.</p>`)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Assessments at both Electronic City centres', 'Phase 1 on Hulimangla Road has a lift. Phase 2 in Ananth Nagar is up a flight of stairs. Same team, same hours.')}
${areasBlock('Close to home across south Bengaluru')}
${faqSection(faqs, 'Child development and therapy: questions')}
${ctaBand('Not sure where to start?', 'Book a developmental assessment. We call back within one working day to plan the first visit.', 'assessment')}
`,
};
