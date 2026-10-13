import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, signs, weekPlan, more, split } from '../ui.mjs';
import { STATS, CONTACT, LOCATIONS, SISTER } from '../site.mjs';

const PATH = '/special-education-for-children-bangalore';
const REVIEWED = '2026-10-11';
const LABEL = 'Special education';

const faqs = [
  {
    q: 'What is special education and who is it for?',
    a: 'Special education is teaching planned around how a child learns. It is for children who learn differently because of autism, ADHD, a learning disability, an intellectual disability or a developmental delay. At Poorvam Care our special educators write an individualised education plan (IEP) that matches your child\'s learning style and pace.',
  },
  {
    q: 'How is special education different from regular tutoring?',
    a: 'Tutoring goes over school content. Special education works on what makes learning hard in the first place. Our special educators use visual aids, multisensory teaching and a calm, structured setting to build foundation skills: attention, memory, problem-solving, and early reading, writing and maths.',
  },
  {
    q: 'Can special education be combined with speech and occupational therapy?',
    a: 'Yes, and we recommend it when a child has more than one need. At Poorvam Care the special educator plans with the <a href="/speech-therapy-for-speech-delay-bangalore">speech therapist</a>, <a href="/occupational-therapy-for-children-bangalore">occupational therapist</a> and <a href="/aba-therapy-for-children-bangalore">ABA therapist</a>, so every goal lines up across your child\'s week.',
  },
  {
    q: 'At what age should my child start special education?',
    a: 'Early is better. Children as young as 2 or 3 can start pre-academic work that builds attention, following instructions and basic concepts like colours, sizes and numbers. For school-age children, special education closes gaps in reading, writing and maths alongside their regular school.',
  },
  {
    q: 'How do I know if my child needs special education?',
    a: 'Signs include trouble following classroom instructions, falling behind classmates, a short attention span, difficulty with reading or writing, finding abstract ideas hard, and behaviour problems at school. An <a href="/book?service=special-ed">assessment at Poorvam Care</a> tells you plainly whether special education would help.',
  },
  {
    q: 'Do you work with my child\'s school?',
    a: 'Yes, if you would like us to. The special educator can share goals and strategies with your child\'s teachers, so what happens in class and in our sessions matches. Many children attend a mainstream school and come to us alongside it.',
  },
  {
    q: 'How long are special education sessions, and what do they cost?',
    a: 'Sessions are 45 to 60 minutes. Fees depend on how many sessions a week your child needs and whether some are online. We explain the full cost on the first call, once we understand your child\'s needs, so you know it before anything starts.',
  },
];

const covers = [
  { icon: 'child', title: 'Pre-academic skills', text: 'Attention, sitting for an activity, following instructions and taking turns.' },
  { icon: 'book', title: 'Reading readiness and phonics', text: 'Letters, sounds and blending, taught in small, clear steps.' },
  { icon: 'hand', title: 'Writing', text: 'From tracing and letter forms to writing words and sentences.' },
  { icon: 'blocks', title: 'Numbers and maths', text: 'Counting, number sense and basic maths, with objects first.' },
  { icon: 'users', title: 'Classroom readiness', text: 'Social skills and routines that help a child cope in class.' },
  { icon: 'spark', title: 'Multisensory teaching', text: 'Seeing, hearing and doing together, to match how your child learns.' },
];

const who = [
  'Autism (ASD) or ADHD', 'Dyslexia, dyscalculia or dysgraphia', 'Intellectual disability or Down syndrome',
  'Cerebral palsy', 'Global developmental delay', 'Speech and language disorders',
];

const checks = [
  'Struggles to follow instructions in class',
  'Falling behind classmates in reading, writing or maths',
  'Short attention span, even for things they like',
  'Finds abstract ideas like time or money hard',
  'Teachers report behaviour problems at school',
];

export default {
  path: PATH,
  photo: 'special-ed',
  title: 'Special Education for Children in Bangalore | Poorvam Care',
  description: `Special education for children aged ${STATS.ages} with autism, ADHD and learning disabilities in Electronic City, Bangalore: IEP goals, phonics, writing and maths.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], [LABEL, PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Special education for children in Bangalore',
    serviceType: 'Special education',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bommanahalli', 'HSR Layout', 'Kudlu Gate', 'Singasandra'])].map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['All therapies', '/child-development'], [LABEL, PATH]])}
    <h1>Special education for children in Bangalore</h1>
    <p class="answer">Special education teaches children who learn differently in the way they learn best. Poorvam Care's special educators assess your child, write an individualised education plan, and teach attention, reading, writing and maths step by step, at our two centres in Electronic City.</p>
    <div class="phero__acts">${bookButton('Book a learning assessment', 'special-ed', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Ages we work with', value: STATS.ages, tone: 'teal' },
      { label: 'IEP goals reviewed', value: 'Every quarter', tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'green' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'sky' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What special education covers', 'We build the foundation skills a child needs to learn anywhere, not just this week\'s homework.')}
    ${cards(covers.map((c) => ({ ...c, tone: 'teal' })), { cols: 3 })}
    ${more('Why some children need a different approach', '<p>Special education is not about limits. Children with autism, ADHD, learning disabilities, intellectual disabilities and developmental delays often struggle in a regular classroom, not because they lack intelligence, but because they need to be taught differently.</p><p>Our programme rests on three things: an individual assessment, structured teaching, and working closely with the rest of your child\'s therapy team.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Special education or tutoring?', 'Both help with school. They solve different problems.')}
    <div class="table-wrap"><table>
      <caption>How special education at Poorvam Care differs from tuition.</caption>
      <thead><tr><th>Question</th><th>Tutoring</th><th>Special education</th></tr></thead>
      <tbody>
        <tr><td>What is the focus?</td><td>This term's school content</td><td>The skills underneath: attention, memory, early reading and number sense</td></tr>
        <tr><td>How is it taught?</td><td>Explaining and repeating the lesson</td><td>Visual, hands-on, multisensory steps matched to your child</td></tr>
        <tr><td>How is progress tracked?</td><td>Marks and test scores</td><td>Measurable IEP goals, reviewed every quarter</td></tr>
        <tr><td>Who is involved?</td><td>A tutor</td><td>A special educator, working with speech, OT and ABA therapists</td></tr>
      </tbody>
    </table></div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How special education works at Poorvam Care', 'Assessment, a written plan, then steady teaching with you and the school kept in the loop.')}
    ${steps([
      ['Educational assessment', 'We find your child\'s learning strengths, challenges and gaps.'],
      ['An IEP', 'Measurable goals, written with you and the therapy team, reviewed every quarter.'],
      ['Weekly sessions', 'Structured, multisensory teaching in a calm, sensory-friendly room.'],
      ['School and home', 'We share strategies with teachers, and train you to support learning at home.'],
    ])}
    ${weekPlan({
      tone: 'teal',
      session: ['Short, clear tasks built around IEP goals', 'Hands-on materials before pencil and paper', 'Time with you on what to practise'],
      home: ['Ten minutes of practice that fits your evening', 'Reading or number games in daily routines', 'Notes and home activities on your phone'],
    })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Which children benefit from special education?', 'Children with these needs often learn better with a special educator.')}
      ${cards(who.map((t) => ({ icon: 'child', title: t, tone: 'teal' })), { cols: 2, compact: true })}`,
      `<div><p><strong>Signs worth an assessment</strong></p>${signs(checks)}</div>`)}
    ${callout('Check hearing and vision first', `A child who cannot hear or see the board clearly can look like a child who cannot learn. Ask your paediatrician about an eye test, and our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children's hearing. A formal diagnosis of a learning disability comes from a clinical psychologist or developmental paediatrician.`, 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Related therapies', 'Our special educators plan with the rest of the team, so your child\'s goals line up across the week.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Special education at both Electronic City centres', 'Same special educators and hours at Phase 1 and Phase 2. Families come from Bommanahalli, HSR Layout, Hosa Road and Chandapura.')}
${faqSection(faqs, 'Special education: questions parents ask')}
${ctaBand('Help your child learn their way', `Every child can learn. Tell us what you have noticed, or call ${CONTACT.phoneDisplay}. We call back within one working day.`)}
`,
};
