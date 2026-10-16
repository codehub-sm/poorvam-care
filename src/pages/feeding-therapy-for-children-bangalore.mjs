import { html, bookButton, callButton, breadcrumb, byline, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, more, split, weekPlan, signs } from '../ui.mjs';
import { DIRECTOR, CONTACT, LOCATIONS, EARLY, HOME_VISITS } from '../site.mjs';

const PATH = '/feeding-therapy-for-children-bangalore';
const REVIEWED = '2026-10-16';
const TRAIL = [['All therapies', '/child-development'], ['Feeding therapy', PATH]];

const faqs = [
  {
    q: 'What is feeding therapy for children?',
    a: `Feeding therapy helps children who find eating hard: very few accepted foods, gagging, trouble chewing, or meals that are a daily battle. At Poorvam Care in Electronic City a speech-language pathologist works on chewing and mouth skills and an occupational therapist on sensory reactions to food, from one plan, for children from ${EARLY.from}.`,
  },
  {
    q: 'Is my child a picky eater or do they need feeding therapy?',
    a: 'Most toddlers go through a picky phase but still eat a fair range of foods and grow well. Ask for an assessment if your child eats fewer than about 20 foods, drops foods they used to eat, gags or vomits at new textures, cannot move on from purées, or if mealtimes regularly end in tears for everyone.',
  },
  {
    q: 'Who does feeding therapy, a speech therapist or an occupational therapist?',
    a: 'Both, depending on what is behind it. A speech-language pathologist works on the mouth: chewing, moving food around, biting and drinking from a cup. An occupational therapist works on sensory reactions to taste, smell and texture, sitting at the table, and using a spoon. At Poorvam Care they plan together, so your child has one set of goals.',
  },
  {
    q: 'When should I see a doctor instead?',
    a: 'See your paediatrician first if your child is losing weight or not growing, coughs or chokes often while eating or drinking, has noisy or wet breathing at meals, gets repeated chest infections, or vomits often. These can point to a swallowing or medical problem that needs a doctor before or alongside therapy.',
  },
  {
    q: 'Does feeding therapy help autistic children who eat very few foods?',
    a: 'Yes. Many autistic children eat a small, fixed range of foods because of sensory sensitivity or a strong need for sameness. Therapy goes slowly, starting with being near a new food, then touching, smelling and tasting it, without pressure. <a href="/speech-therapy-for-autism-bangalore">Autism support at Poorvam Care</a>.',
  },
  {
    q: 'Should I force my child to eat new foods?',
    a: 'No. Pressure, bribes and battles tend to make children more anxious about food and narrow the range further. A calmer approach works better: offer a small amount of a new food next to a food your child already likes, eat it yourself, and let them explore it without having to eat it. Your therapist gives you a plan for your child.',
  },
  {
    q: 'Can feeding therapy be done at home?',
    a: `Yes, for families living near our Electronic City centres: the therapist can come at mealtime, which shows the real problem better than a clinic room. <a href="${HOME_VISITS.page}">Therapy at home</a>. Fees are explained on the first call: ${CONTACT.phoneDisplay}.`,
  },
];

const when = [
  'Eats fewer than about 20 foods',
  'Gags or vomits at new textures',
  'Still on purées past about 12 months',
  'Holds food in the mouth or spits it out',
  'Meals take more than 30 minutes, most days',
  'Drops foods they used to eat',
];

const who = [
  { icon: 'speech', title: 'Speech-language pathologist', text: 'Chewing, biting, moving food in the mouth, drinking from a cup or straw.', tone: 'blue' },
  { icon: 'hand', title: 'Occupational therapist', text: 'Reactions to taste, smell and texture, sitting at the table, using a spoon.', tone: 'green' },
  { icon: 'heart', title: 'You', text: 'A calm, steady mealtime plan you can keep up every day at home.', tone: 'deep' },
];

export default {
  path: PATH,
  title: 'Feeding Therapy for Children in Bangalore | Poorvam Care',
  description: 'Feeding therapy for picky eating, gagging and chewing problems in Electronic City, Bengaluru, run jointly by speech and occupational therapists.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Feeding therapy for children in Bengaluru',
    serviceType: 'Paediatric feeding therapy',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1.5, suggestedMaxAge: 14 },
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Feeding therapy for children in Bengaluru</h1>
    <p class="answer">Feeding therapy helps children for whom eating is hard: a very short list of foods, gagging, trouble chewing, or every meal a battle. At Poorvam Care in Electronic City, a speech-language pathologist and an occupational therapist work together from one plan, and coach you to make mealtimes calmer at home.</p>
    <div class="phero__acts">${bookButton('Book a feeding assessment', 'assessment', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Children from', value: EARLY.from, tone: 'blue' },
      { label: 'Therapists on the plan', value: 'Speech + OT', tone: 'green' },
      { label: 'Where', value: 'Centre or home', tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Picky eater, or more than that?', 'Most toddlers go through a picky phase. These signs suggest it is worth asking.')}
      ${signs(when)}`, callout('See your paediatrician first if', 'Your child is losing weight or not growing, often coughs or chokes on food or drink, breathes noisily at meals, gets repeated chest infections or vomits often. These can be medical, and need a doctor before or alongside therapy.', 'warn'))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Two therapists, one plan', 'Eating is a mouth skill and a sensory one. Your child\'s therapists work on both together.')}
    ${cards(who, { cols: 3 })}
    ${more('Why a child stops accepting foods', '<p>Some children find certain textures, smells or tastes genuinely overwhelming, so a new food feels threatening rather than just unfamiliar. Others have not yet got the mouth skills to chew a harder food, so they stick to soft ones that are easy to manage. Many have a bit of both, and some had reflux, illness or a choking scare early on that made eating feel unsafe.</p><p>The assessment looks at which of these is behind it, because it changes the plan. It includes watching your child eat a few foods you bring from home.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What sessions look like', 'Small steps, no pressure. Being near a new food counts as progress.')}
    ${weekPlan({
      tone: 'green',
      session: ['Play with food: touching, smelling, licking, before any eating', 'Chewing and biting practice with foods your child already likes', 'Showing you how to set up meals at home'],
      home: ['A small amount of a new food next to a favourite', 'Family meals at the table, with no pressure to eat', 'Notes and a mealtime plan on your phone'],
    })}
    ${callout('Bring food from home', 'For the assessment, bring two or three foods your child eats and one they refuse, plus a cup or bottle they use. Short phone videos of a typical meal help too.', 'info')}
    <p class="mt-2">Feeding therapy is planned jointly by our <a href="/speech-therapy-electronic-city">speech therapy</a> and <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a> teams, led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}.</p>
    <div class="wrap--narrow">${byline('16 October 2026')}</div>
  </div>
</section>

${centresBlock('Feeding therapy at both Electronic City centres', 'Same therapists and hours at both. Pick the one closer to home, or ask about a mealtime home visit.')}
${areasBlock('Feeding therapy across south Bengaluru')}
${faqSection(faqs, 'Feeding therapy: questions parents ask')}
${ctaBand('Are mealtimes a daily battle?', 'Book a feeding assessment. We call back within one working day to plan the first visit.', 'assessment')}
`,
};
