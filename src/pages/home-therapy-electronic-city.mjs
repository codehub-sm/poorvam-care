import { html, bookButton, callButton, whatsappButton, breadcrumb, byline, centresBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, more, split, signs } from '../ui.mjs';
import { DIRECTOR, CONTACT, SERVICES, ONLINE, EARLY, HOME_VISITS } from '../site.mjs';

const PATH = HOME_VISITS.page;
const REVIEWED = '2026-10-16';
const TRAIL = [['All therapies', '/child-development'], ['Therapy at home', PATH]];
const AT_HOME = HOME_VISITS.services.map((id) => SERVICES.find((s) => s.id === id));
const homeList = AT_HOME.map((s) => s.label.replace(/^[A-Z](?=[a-z])/, (c) => c.toLowerCase())).join(', ').replace(/, ([^,]*)$/, ' and $1');

const faqs = [
  {
    q: 'Do you offer speech therapy at home in Electronic City?',
    a: `Yes. For families living near our two Electronic City centres, Poorvam Care's ${homeList} therapists come to your home. Sessions follow the same plan and goals as sessions at a centre, with the same RCI-registered team.`,
  },
  {
    q: 'Which areas do your therapists visit?',
    a: `Homes near our two centres: ${HOME_VISITS.areas.join(', ')}. If you live a little further out, tell us where and we will tell you honestly whether we can visit. From further away, many families mix centre visits with <a href="${ONLINE.page}">online sessions</a>.`,
  },
  {
    q: 'Which therapies can be done at home?',
    a: `${AT_HOME.map((s) => s.label).join(', ')}. Special education and therapeutic enrichment groups stay at the centres, where the materials and the other children are.`,
  },
  {
    q: 'Is therapy at home as good as therapy at a centre?',
    a: 'For many goals it is as good or better, because your child practises in the place they actually live: their own toys, meals, bathroom and stairs. A centre is better for goals that need equipment, other children, or a setting away from home distractions. The therapist will tell you if part of the plan works better at a centre.',
  },
  {
    q: 'What do I need to arrange for a home session?',
    a: 'A quiet corner with a little floor space, the TV off, and your child fed and rested. Someone who looks after your child day to day should be in the session, because most of the value is in learning what to keep doing between visits.',
  },
  {
    q: 'How much does home therapy cost?',
    a: `Fees depend on the therapy, and how many sessions a week. We explain them on the first call, before anything starts. Call or WhatsApp ${CONTACT.phoneDisplay}.`,
  },
  {
    q: 'Do I need an assessment first?',
    a: 'Yes. Every child is assessed before therapy starts, so the plan is built on what your child can do now. We agree where it happens on the first call.',
  },
];

const suits = [
  'Toddlers who are shy or unsettled in a new place',
  'Feeding, sleep, toileting and dressing goals',
  'Families with a baby or a sibling to look after',
  'Children who find travel or waiting rooms hard',
  'A parent who wants to learn the routine at home',
  'Children who settle best somewhere familiar',
];

export default {
  path: PATH,
  title: 'Speech Therapy & OT at Home in Electronic City | Poorvam Care',
  description: `Speech therapy, occupational therapy and ABA at home for children living near Electronic City, Bengaluru, from Poorvam Care's RCI-registered team.`,
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Home-based therapy for children in Electronic City',
    serviceType: 'Home visit speech therapy, occupational therapy and ABA',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 1.5, suggestedMaxAge: 14 },
    areaServed: HOME_VISITS.areas.map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Therapies at home',
      itemListElement: AT_HOME.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'MedicalTherapy', name: `${s.label} at home`, url: urlOf(s.page) } })),
    },
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Speech therapy and OT at home in Electronic City</h1>
    <p class="answer">If you live near Electronic City, Poorvam Care's therapists can come to your home for ${homeList}. Your child gets the same RCI-registered team, plan and goals as at our two centres, in the place where most of their day happens.</p>
    <div class="phero__acts">${bookButton('Ask about a home visit', 'assessment', 'btn btn--ink')}${whatsappButton('Hi Poorvam Care, I would like to ask about therapy at home for my child.', 'btn btn--line')}</div>
    ${stats([
      { label: 'Therapies at home', value: String(AT_HOME.length), tone: 'blue' },
      { label: 'Children from', value: EARLY.from, tone: 'green' },
      { label: 'Area', value: 'Near both centres', tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Therapies that come to you', 'The same therapists who work at our centres. Pick one to read what it covers.')}
    ${cards(AT_HOME.map((s) => ({ icon: s.icon, title: `${s.label} at home`, text: s.blurb, href: s.page, tone: s.tone })), { cols: 3 })}
    ${callout('At the centres only', 'Special education and therapeutic enrichment groups stay at the centres, where the learning materials and the other children are.', 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Who home therapy suits', 'Home is where most of a child\'s day happens, so it is often the best place to practise.')}
      ${signs(suits)}`, callout('When a centre is better', 'Goals that need equipment, other children to play with, or a setting without home distractions often go better at a centre. Many families mix the two, and your therapist will suggest the split.', 'good'))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How it works', 'From first call to a weekly routine.')}
    ${steps([
      ['Tell us where you live', 'Book online, call or WhatsApp. We confirm we can visit within one working day.'],
      ['Assessment', 'A therapist sees your child and listens to you. We agree where on the first call.'],
      ['One plan, written goals', 'Agreed with you, the same as for a child seen at a centre.'],
      ['Weekly visits', 'At a time agreed with you, with notes and home activities on your phone.'],
    ])}
    ${more('Areas we visit', `<p>Homes near our two centres: ${HOME_VISITS.areas.join(', ')}.</p><p>If your area is not listed, ask anyway. From further away, many families come to a centre for the assessment and do part of the weekly therapy <a href="${ONLINE.page}">online</a>.</p>`)}
    <p class="mt-2">Home therapy is planned and reviewed by the same clinical team, led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}.</p>
    <div class="wrap--narrow">${byline('16 October 2026')}</div>
  </div>
</section>

${centresBlock('Or come to one of our centres', 'Phase 1 on Hulimangla Road has a lift. Phase 2 in Ananth Nagar is up a flight of stairs. Same team, same hours.')}
${faqSection(faqs, 'Therapy at home: questions parents ask')}
${ctaBand('Want a therapist to come to you?', 'Tell us where you live. We call back within one working day to confirm and plan the first visit.', 'assessment')}
`,
};
