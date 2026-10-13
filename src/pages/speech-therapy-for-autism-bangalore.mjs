import { html, bookButton, callButton, breadcrumb, byline, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, signs, more, split, milestoneLadder, weekPlan } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, SISTER } from '../site.mjs';

const PATH = '/speech-therapy-for-autism-bangalore';
const REVIEWED = '2026-10-11';
const TRAIL = [['All therapies', '/child-development'], ['Speech therapy for autism', PATH]];

const faqs = [
  {
    q: 'At what age should I start speech therapy for my child with autism?',
    a: 'As soon as you have a concern. You do not need to wait for a diagnosis. Support that starts before age 3 tends to help most, because communication habits are still forming, but therapy helps at any age. We see toddlers from around 18 months as well as school-age children.',
  },
  {
    q: 'How many speech therapy sessions per week does a child with autism need?',
    a: 'Most autistic children we see start with two or three speech therapy sessions a week. The right number depends on your child\'s age, how they communicate now and their goals. The therapist recommends a frequency after the assessment and reviews it with you as your child progresses.',
  },
  {
    q: 'Do you combine ABA therapy with speech therapy for autism?',
    a: 'Yes. ABA (applied behaviour analysis) and speech therapy can run side by side from one plan, so behaviour and communication goals pull the same way. Occupational therapy and special education join the same plan when your child needs them. <a href="/aba-therapy-for-children-bangalore">More about ABA at Poorvam Care</a>.',
  },
  {
    q: 'What signs indicate my child with autism needs speech therapy?',
    a: 'Not babbling by 12 months, no single words by 16 months, losing words or skills they had, difficulty understanding simple instructions, limited eye contact, repeating phrases instead of using their own words (echolalia), and difficulty with back-and-forth conversation or making friends. A child who loses words should also see a paediatrician.',
  },
  {
    q: 'Can speech therapy cure autism?',
    a: 'No, and nothing needs curing. Autism is a different way of developing, not a disease. Speech therapy helps an autistic child communicate in the way that works for them, whether that is spoken words, signs or pictures, so they can ask for what they need and take part at home and school.',
  },
  {
    q: 'Does my child need an autism diagnosis before starting speech therapy?',
    a: 'No. We assess communication and start therapy based on what your child needs now. A formal autism diagnosis is made by a developmental paediatrician or child psychiatrist, and we will suggest one if it would help your child get school or other support. Therapy can start while you wait for that appointment.',
  },
  {
    q: 'My child does not speak at all. Can speech therapy still help?',
    a: 'Yes. Many autistic children start without spoken words. Therapy builds communication first: pointing, gestures, signs, picture cards or a communication device (AAC). These do not stop speech developing. Many children use them as a bridge while spoken words grow.',
  },
  {
    q: 'What does speech therapy for autism cost at Poorvam Care?',
    a: `Fees depend on how many sessions a week your child needs and whether some sessions are online. We explain the full cost on the first call, once we understand your child's needs. Call or WhatsApp ${CONTACT.phoneDisplay} to talk it through.`,
  },
];

const affects = [
  { icon: 'speech', title: 'Few or no spoken words', text: 'Some autistic children speak little or not at all, and need another way to communicate first.' },
  { icon: 'route', title: 'Repeating phrases', text: 'Echoing words or lines from videos (echolalia) instead of using their own.' },
  { icon: 'book', title: 'Understanding language', text: 'Following instructions, answering questions, and words with more than one meaning.' },
  { icon: 'hand', title: 'Asking for things', text: 'Pulling an adult\'s hand, or getting upset, instead of requesting.' },
  { icon: 'users', title: 'Back-and-forth', text: 'Taking turns, sharing attention on a toy, and keeping a conversation going.' },
  { icon: 'heart', title: 'Reading other people', text: 'Facial expressions, tone of voice, and what someone means but does not say.' },
];

const team = [
  { icon: 'blocks', title: 'ABA', text: 'Builds requesting, routines and independence, and cuts meltdowns, with the same goals as speech.', href: '/aba-therapy-for-children-bangalore', tone: 'sky' },
  { icon: 'hand', title: 'Occupational therapy', text: 'Sensory needs, fine motor skills and daily routines like eating and dressing.', href: '/occupational-therapy-for-children-bangalore', tone: 'green' },
  { icon: 'book', title: 'Special education', text: 'Reading, writing and early learning taught the way your child learns.', href: '/special-education-for-children-bangalore', tone: 'teal' },
  { icon: 'spark', title: 'Social skills groups', text: 'Small groups to practise play and conversation with other children.', href: '/therapeutic-enrichment', tone: 'aqua' },
];

export default {
  path: PATH,
  photo: 'autism',
  title: 'Speech Therapy for Autism in Bangalore | Poorvam Care',
  description: `Speech therapy for autistic children aged ${STATS.ages} in Electronic City, Bengaluru: words, requesting, conversation and AAC, alongside ABA and OT.`,
  reviewed: REVIEWED,
  current: '/speech-therapy-for-autism-bangalore',
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Speech therapy for autistic children in Bengaluru',
    serviceType: 'Speech-language therapy for autism',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1, suggestedMaxAge: 14 },
    relevantSpecialty: 'SpeechPathology',
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Speech therapy for autism in Bengaluru</h1>
    <p class="answer">Speech therapy helps autistic children communicate: asking for what they need, understanding others, and taking turns in conversation. Poorvam Care's RCI-registered therapists start with an assessment, then work through play, with ABA and OT from the same plan, in Electronic City.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Ages we work with', value: STATS.ages, tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'sky' },
      { label: 'Years in practice', value: STATS.years, tone: 'green' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How autism can affect communication', 'Every autistic child is different. Most have one or more of these, and the assessment shows which.')}
    ${cards(affects.map((c) => ({ ...c, tone: 'blue' })), { cols: 3 })}
    ${more('What autism is, in plain words', `<p>Autism (autism spectrum disorder, or ASD) is a difference in how the brain develops. It affects communication, social interaction and behaviour, and it is lifelong. It is not a disease and not caused by parenting.</p>
      <p>Some autistic children are non-speaking or use only a few words. Others talk a lot but find conversation, abstract language or social cues hard. Speech therapy works on whichever of these matters most for your child, so they can communicate and do more for themselves.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('Signs to talk to a therapist', 'Two or more of these? An assessment gives you a plain answer, with or without a diagnosis.')}
      ${signs([
        'Not babbling by 12 months',
        'No single words by 16 months',
        'Rarely responds to their name',
        'Repeats phrases instead of using their own words',
        'Does not point to show you things',
        'Loses words or skills they had',
      ])}`, milestoneLadder({ highlight: '18 months' }))}
    ${callout('See a paediatrician soon if your child loses words', 'A child who stops using words they had, or loses other skills, should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
    ${callout('For a diagnosis, see a developmental paediatrician', `We assess communication and plan therapy. A formal autism diagnosis comes from a developmental paediatrician. If hearing could be part of the picture, our sister clinic <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a> tests children's hearing in Electronic City.`, 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How speech therapy for autism works', 'Four steps, and you are part of every one.')}
    ${steps([
      ['Assessment', 'We play with your child and find their communication strengths and challenges.'],
      ['A written plan', 'Clear goals, how many sessions a week, and when we review.'],
      ['Play-based sessions', '45 to 60 minutes, built around what your child already loves.'],
      ['Review and move on', 'We check progress against the goals with you and set the next ones.'],
    ])}
    ${weekPlan({
      tone: 'blue',
      session: ['Games that make asking worthwhile, like bubbles or a favourite toy', 'Words, signs or picture cards, whichever your child can use now', 'Time with you on what to practise this week'],
      home: ['One routine a day to practise requesting, like snack time', 'Waiting a moment so your child has a reason to communicate', 'Session notes and home activities on your phone'],
    })}
    ${more('What parents can expect, in more detail', `<p>The first visit is a full assessment of how your child communicates now. From it we write an individual plan with measurable goals, and we review those goals with you regularly.</p>
      <p>Sessions mix play with short structured activities, so language builds naturally. Children who benefit from behavioural support have ABA sessions that share the same goals. Older children practise interaction with peers in small <a href="/therapeutic-enrichment">social skills groups</a>.</p>
      <p>Parent training is part of therapy, so you can keep progress going at home. Goals, session notes and progress updates are on your phone in the parent view. Families further from Electronic City can do part of the weekly therapy as <a href="/online">online sessions</a>.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Speech therapy alongside ABA and OT', 'Many autistic children need more than one kind of help. Every therapist works from your child\'s one plan.')}
    ${cards(team, { cols: 4 })}
    <p class="mt-2">Led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}, whose work over ${DIRECTOR.years} years centres on autism and speech delay. Late talker but not sure it is autism? Read about <a href="/speech-therapy-for-speech-delay-bangalore">speech delay</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${centresBlock('Autism speech therapy at both Electronic City centres', 'Same therapists and hours at Phase 1 and Phase 2. Phase 1 has a lift; Phase 2 is up a flight of stairs.')}
${areasBlock('Serving autistic children across south Bengaluru')}
${faqSection(faqs, 'Speech therapy for autism: questions')}
${ctaBand('Book a speech assessment for your child', 'Tell us what you have noticed. We call back within one working day to plan the first visit.')}
`,
};
