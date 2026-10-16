import { html, bookButton, callButton, breadcrumb, byline, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, more, split, milestoneLadder, weekPlan } from '../ui.mjs';
import { DIRECTOR, CONTACT, LOCATIONS, SISTER, EARLY, HOME_VISITS } from '../site.mjs';

const PATH = EARLY.page;
const REVIEWED = '2026-10-16';
const TRAIL = [['All therapies', '/child-development'], ['Early intervention', PATH]];

const faqs = [
  {
    q: 'What is early intervention?',
    a: `Early intervention is therapy and support for babies and toddlers who are behind on talking, moving, playing or understanding, started before school age. At Poorvam Care in Electronic City it means a developmental assessment, then speech therapy, occupational therapy or behaviour therapy for toddlers from ${EARLY.from}, with parents coached to carry the work into every day.`,
  },
  {
    q: 'At what age can my toddler start early intervention?',
    a: `We start therapy from ${EARLY.from}. If your baby is younger and you are worried, start with your paediatrician and a hearing test, and book with us when your child reaches ${EARLY.from}. Help that starts before age 3 tends to make the biggest difference, because the gap is smaller and habits are not yet set.`,
  },
  {
    q: 'Does early intervention mean my child has autism?',
    a: 'No. Many toddlers who come to us are simply late to talk, late to walk or slow to play with others, and have no diagnosis. The assessment tells you what is behind and how much. If the signs point to autism or another condition, we explain why and refer you to a developmental paediatrician for a formal diagnosis. Therapy can start while you wait.',
  },
  {
    q: 'What happens in an early intervention session?',
    a: 'It looks like play. The therapist uses toys, songs, snacks and books your child enjoys to work on one or two goals, such as using a word to ask for something, or stacking blocks. You stay in the room, and the therapist shows you how to do the same things at home during meals, bath time and play.',
  },
  {
    q: 'How many sessions a week does a toddler need?',
    a: 'Many toddlers start with two or three sessions a week. Sessions are 45 to 60 minutes, and the youngest children sometimes start with shorter ones. The exact number depends on what the assessment finds. We set written goals at the start and review them with you regularly, and sessions taper as your child catches up.',
  },
  {
    q: 'Can early intervention be done at home?',
    a: `Yes, for families living near our Electronic City centres. Speech therapists, occupational therapists and ABA therapists can come to your home, where toddlers are often more relaxed. <a href="${HOME_VISITS.page}">Therapy at home</a>.`,
  },
  {
    q: 'Should we wait and see if our toddler catches up?',
    a: 'Some toddlers do catch up on their own, but nobody can tell in advance which ones will. An assessment does not commit you to therapy. It tells you whether your child is on track and gives you things to do at home either way. Waiting costs months that are easier to use early.',
  },
  {
    q: 'How much does early intervention cost?',
    a: `Fees depend on which therapies your toddler needs, how many sessions a week, and whether sessions are at a centre or at home. We explain them on the first call, once we understand your child's needs. Call or WhatsApp ${CONTACT.phoneDisplay}.`,
  },
];

const signs = [
  { icon: 'speech', title: 'No words by 18 months', text: 'Not using single words besides "mama" or "dada", or not pointing to show you things.', tone: 'blue' },
  { icon: 'chat', title: 'Not joining words at 2', text: 'Not saying two words together, like "more milk", or not copying words you say.', tone: 'blue' },
  { icon: 'users', title: 'Little shared attention', text: 'Rarely looks where you point, responds to their name or brings things to show you.', tone: 'sky' },
  { icon: 'hand', title: 'Movement that is behind', text: 'Not walking steadily by 18 months, or finds a spoon, crayon or stairs hard at 2.', tone: 'green' },
  { icon: 'spark', title: 'Big reactions', text: 'Very upset by noise, textures, food or small changes, more than other toddlers.', tone: 'green' },
  { icon: 'shield', title: 'Losing skills', text: 'Stops using words or skills they had. See a paediatrician as well as a therapist.', tone: 'deep' },
];

const help = [
  { icon: 'speech', title: 'Speech therapy', text: 'First words, gestures, understanding and joining words.', href: '/speech-therapy-for-speech-delay-bangalore', tone: 'blue' },
  { icon: 'hand', title: 'Occupational therapy', text: 'Movement, hand skills, sensory reactions, eating and sleep routines.', href: '/occupational-therapy-for-children-bangalore', tone: 'green' },
  { icon: 'blocks', title: 'Behaviour therapy (ABA)', text: 'Play, shared attention, copying and early communication.', href: '/aba-therapy-for-children-bangalore', tone: 'sky' },
  { icon: 'heart', title: 'Parent coaching', text: 'What to do at home, after every session and after a diagnosis.', href: '/parent-counselling', tone: 'deep' },
];

export default {
  path: PATH,
  photo: 'assessment',
  title: 'Early Intervention for Toddlers in Bangalore | Poorvam Care',
  description: `Early intervention for toddlers from ${EARLY.from} in Electronic City, Bengaluru: assessment, play-based speech, OT and ABA, and parent coaching.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Early intervention for toddlers in Bengaluru',
    serviceType: 'Early intervention therapy for toddlers',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1.5, suggestedMaxAge: 3 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Early intervention for toddlers in Bengaluru</h1>
    <p class="answer">Early intervention is help for toddlers who are behind on talking, moving or playing, started before age 3, when it makes the biggest difference. Poorvam Care in Electronic City sees toddlers from ${EARLY.from}: one assessment, then play-based speech, occupational and behaviour therapy, with you coached to keep it going at home.</p>
    <div class="phero__acts">${bookButton('Book a toddler assessment', 'assessment', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Toddlers from', value: EARLY.from, tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'green' },
      { label: 'Where', value: 'Centre or home', tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Signs worth an assessment before age 3', 'One of these is a reason to ask. You do not need to wait for two.')}
    ${cards(signs, { cols: 3 })}
    ${more('Why before 3 matters', '<p>A toddler\'s brain builds connections for language, movement and social skills faster in the first three years than at any later time. Support in these years works with that growth, and the gap a child has to close is still small.</p><p>That does not mean it is too late at 4 or 6. Therapy helps at every age. It means that if you are unsure, an assessment now costs little, and waiting costs months.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Is your toddler on track?', 'Find your child\'s age. If they are not doing what is listed yet, it is worth asking.')}
      <p>Toddlers develop at different speeds. Boys, twins, children born early and children learning two languages can be a little later, but they should still move forward each month.</p>
      <p>Not turning to sounds, or many ear infections? A hearing test comes first. Our sister clinic, <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name}</a>, tests toddlers in Electronic City.</p>`, milestoneLadder({ highlight: '18 months' }))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How early intervention works', 'One assessment, one plan, and the same small team from the first week.')}
    ${steps([
      ['Tell us what you have noticed', 'Book online or call. We call back within one working day.'],
      ['Assessment through play', 'A therapist plays with your toddler while you share what you see at home.'],
      ['One plan, written goals', 'Two or three goals to start, across speech, movement and play.'],
      ['Sessions plus coaching', 'Play-based sessions at a centre or at home, and things to do every day.'],
    ])}
    ${weekPlan({
      tone: 'blue',
      session: ['Short play-based activities around your toddler\'s favourite toys', 'One or two goals at a time, practised many times', 'The therapist showing you what to do, then watching you try'],
      home: ['Using meals, bath and dressing to practise', 'Waiting a moment so your toddler has a reason to ask', 'Session notes and home activities on your phone'],
    })}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Which therapy, for which worry', 'Most toddlers need one or two of these. The assessment tells you which.')}
    ${cards(help, { cols: 4 })}
    ${callout('A diagnosis comes from a doctor', 'If your toddler may have autism or another condition, we refer you to a developmental paediatrician for a formal diagnosis. Therapy does not need to wait for that appointment.', 'good')}
    ${callout('See a paediatrician soon if your toddler loses skills', 'A child who stops using words, babbling or other skills they had should be seen by a paediatrician or developmental paediatrician as well as a therapist.', 'warn')}
    <p class="mt-2">Early intervention is led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}, with ${DIRECTOR.years} years working with late talkers and young autistic children. Unsure where to start? See the <a href="/child-development">developmental assessment</a>.</p>
    <div class="wrap--narrow">${byline('16 October 2026')}</div>
  </div>
</section>

${centresBlock('Early intervention at both Electronic City centres', 'Same therapists and hours at both. Pick the one closer to home, or ask about home visits.')}
${areasBlock('Early intervention across south Bengaluru')}
${faqSection(faqs, 'Early intervention: questions parents ask')}
${ctaBand('Worried about your toddler?', 'Book a toddler assessment. We call back within one working day to plan the first visit.', 'assessment')}
`,
};
