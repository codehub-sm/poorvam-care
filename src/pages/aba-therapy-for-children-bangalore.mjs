import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS } from '../site.mjs';

const PATH = '/aba-therapy-for-children-bangalore';
const REVIEWED = '2026-10-11';
const LABEL = 'ABA therapy';

const faqs = [
  {
    q: 'What is ABA therapy and how does it help children?',
    a: 'ABA (Applied Behaviour Analysis) is an evidence-based therapy that uses positive reinforcement to teach new skills and make difficult behaviour less likely. For children with autism, ADHD and other developmental conditions, it can help with communication, social skills, self-care and getting ready for school, through structured goals that are measured as you go.',
  },
  {
    q: 'At what age should a child start ABA therapy?',
    a: `Starting early helps, and many children begin between ages 2 and 5. Older children benefit too. At Poorvam Care we work with children aged ${STATS.ages}, and set the pace and style of sessions to suit your child's age and stage.`,
  },
  {
    q: 'How many hours of ABA therapy does my child need per week?',
    a: 'It depends on your child. A programme for a few specific skills needs fewer hours than one that covers many areas at once. After the assessment we recommend a weekly schedule that balances progress with school, rest and family life, and we review it with you as things change.',
  },
  {
    q: 'Does Poorvam Care combine ABA therapy with other therapies?',
    a: 'Yes. ABA works alongside <a href="/speech-therapy-for-autism-bangalore">speech therapy</a>, <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a> and <a href="/special-education-for-children-bangalore">special education</a> from one shared plan, so communication, sensory needs, motor skills and behaviour are worked on together and every therapist uses the same goals.',
  },
  {
    q: 'How much does ABA therapy cost in Bangalore?',
    a: 'At Poorvam Care, fees depend on how many sessions a week your child needs. Session packages are available for regular weekly therapy. We explain the full cost on the first call, once we understand your child\'s needs, so you know it before anything starts.',
  },
  {
    q: 'Will ABA therapy cure my child\'s autism?',
    a: 'No, and no therapy should promise that. Autism is not a disease to be cured. ABA builds skills that make daily life easier for your child and family, such as asking for what they need, coping with change and doing more for themselves.',
  },
  {
    q: 'Is ABA therapy kind to children?',
    a: 'It should be, and that is how we run it. Sessions use play, your child\'s interests and praise or rewards, never punishment. Goals are chosen with you and focus on skills that matter to your child. If your child is distressed, the therapist slows down or changes the activity.',
  },
  {
    q: 'How long is each ABA session?',
    a: 'One-to-one sessions run 45 to 60 minutes. Some children also join small social skills groups to practise with other children. Parent training sessions are part of the plan, so the same strategies are used at home. Families outside Bengaluru can do behaviour therapy and parent training by video: see <a href="/online/behavioural-therapy">online behaviour therapy</a>.',
  },
];

const builds = [
  { icon: 'chat', title: 'Asking for what they need', text: 'Using words, signs or pictures instead of crying or grabbing.' },
  { icon: 'home', title: 'Self-care', text: 'Eating, dressing, toileting and other steps towards independence.' },
  { icon: 'check', title: 'Following instructions', text: 'Listening, waiting and finishing a simple task.' },
  { icon: 'users', title: 'Play and social skills', text: 'Taking turns, sharing attention and playing with other children.' },
  { icon: 'heart', title: 'Coping with change', text: 'Fewer meltdowns when plans change or something is hard.' },
  { icon: 'book', title: 'Ready for school', text: 'Sitting for an activity, working with a teacher, group routines.' },
];

const helpsWith = [
  'Autism spectrum disorder (ASD)', 'ADHD', 'Developmental delay',
  'Oppositional defiant disorder (ODD)', 'Sensory processing difficulties', 'Learning disabilities',
];

export default {
  path: PATH,
  title: 'ABA Therapy for Children in Bangalore | Poorvam Care',
  description: 'Play-based ABA therapy for children with autism and developmental conditions at two Electronic City centres, Bangalore, planned alongside speech and OT.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: [['All therapies', '/child-development'], [LABEL, PATH]],
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'ABA therapy for children in Bangalore',
    alternateName: 'Applied Behaviour Analysis',
    serviceType: 'Applied Behaviour Analysis (ABA) therapy',
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
    <h1>ABA therapy for children in Bangalore</h1>
    <p class="answer">ABA (Applied Behaviour Analysis) uses play and positive reinforcement to teach skills that make daily life easier: asking for help, self-care, following routines and coping with change. At Poorvam Care in Electronic City it runs alongside speech therapy and OT, for children aged ${STATS.ages}.</p>
    <div class="phero__acts">${bookButton('Book an ABA consultation', 'aba', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Ages we work with', value: STATS.ages, tone: 'violet' },
      { label: 'Session length', value: '45–60 min', tone: 'blue' },
      { label: 'Years in practice', value: STATS.years, tone: 'mint' },
      { label: 'Centres in Electronic City', value: String(LOCATIONS.length), tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What is ABA therapy?', 'ABA breaks a skill into small steps, teaches each one, and rewards progress. These are the skills families most often ask for.')}
    ${cards(builds.map((b) => ({ ...b, tone: 'violet' })), { cols: 3 })}
    ${more('How ABA works, in more detail', '<p>Applied Behaviour Analysis is built on how children learn. It teaches new skills step by step and makes behaviour that gets in the way of learning or daily life less likely, mostly by teaching a better way to get the same need met.</p><p>Every programme is individual. It starts from your child\'s strengths and challenges, and the goals might be talking or using pictures to communicate, dressing, following instructions, or playing with other children.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('How we run ABA at Poorvam Care', 'Modern ABA looks like play. Our behaviour therapists mix three approaches, so learning stays structured without feeling like drills.')}
    <div class="table-wrap"><table>
      <caption>The three teaching approaches our behaviour therapists combine. Which one leads depends on your child and the goal.</caption>
      <thead><tr><th>Approach</th><th>What it looks like</th><th>Good for</th></tr></thead>
      <tbody>
        <tr><td>Discrete Trial Training (DTT)</td><td>Short, clear teaching turns at a table, with a reward each time</td><td>New skills like naming, matching and copying</td></tr>
        <tr><td>Natural Environment Teaching (NET)</td><td>Teaching inside play, snack time and everyday routines</td><td>Using skills in real life, not just in the room</td></tr>
        <tr><td>Pivotal Response Training (PRT)</td><td>Following your child's lead and interests during play</td><td>Motivation, starting conversations, play with others</td></tr>
      </tbody>
    </table></div>
    ${callout('What ABA here is not', 'No punishment, no cure claims, and no goal of making your child seem "typical". Goals are skills that matter to your child and family, chosen with you. If your child is upset, the therapist slows down or changes the activity.', 'good')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What an ABA programme includes', 'Each step is written down, measured and shared with you.')}
    ${steps([
      ['Behaviour assessment', 'A functional behaviour assessment finds skill gaps and what drives difficult behaviour.'],
      ['A written plan', 'A behaviour plan with measurable goals you agree with.'],
      ['One-to-one sessions', 'Sessions of 45 to 60 minutes using positive reinforcement.'],
      ['Parent training', 'You learn the same strategies, so home and centre match.'],
      ['Monthly progress report', 'Data on each goal, reviewed with you, and goals moved on.'],
    ])}
    ${weekPlan({
      tone: 'violet',
      session: ['Teaching turns built around your child\'s goals', 'Play and routines to use skills naturally', 'Time with you on one strategy for the week'],
      home: ['One routine to practise, like asking for a snack', 'The same words and rewards the therapist uses', 'Notes and progress on your phone'],
    })}
    ${more('Small groups, and working with other therapies', '<p>Some children also join small social skills groups to practise with other children their age. For children with more than one need, ABA is planned with <a href="/speech-therapy-for-autism-bangalore">speech therapy for autism</a>, <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a> and <a href="/special-education-for-children-bangalore">special education</a>, so every therapist works towards the same goals.</p><p>The therapy rooms use visual schedules and are kept calm and sensory-friendly, which helps many children who need ABA settle and learn.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Which children can ABA help?', 'ABA is used most with autistic children, but it supports a range of developmental and behavioural needs.')}
    ${cards(helpsWith.map((t) => ({ icon: 'child', title: t, tone: 'violet' })), { cols: 3, compact: true })}
    ${callout('A diagnosis comes from a doctor', 'Autism, ADHD and ODD are diagnosed by a developmental paediatrician or child psychiatrist. We will tell you if an assessment suggests one, and therapy can start while you wait. A child who loses words or skills should see a paediatrician soon.', 'warn')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Related therapies', 'Many children need ABA with one or two other therapies. All of it is under one roof, from one plan.')}
    ${serviceList(PATH)}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('ABA therapy at both Electronic City centres', `Phase 1 and Phase 2 keep the same hours. Families come from Bommanahalli, HSR Layout, Hosa Road and Kudlu Gate. Led by ${DIRECTOR.name}.`)}
${faqSection(faqs, 'ABA therapy: questions parents ask')}
${ctaBand('Talk to us about ABA', `Tell us what you have noticed, or call ${CONTACT.phoneDisplay}. We call back within one working day.`)}
`,
};
