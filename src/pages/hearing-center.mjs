import { html, whatsappButton, breadcrumb, faqSection, icon, esc, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, signs, more } from '../ui.mjs';
import { CONTACT, HOURS, LOCATIONS, SISTER, DIRECTOR } from '../site.mjs';

const PATH = '/hearing-center';
const TRAIL = [['Hearing center', PATH]];
const HEARING_TEST = `${SISTER.url}/hearing-test.html`;
const WA = 'Hi, I would like to book a hearing test in Electronic City.';

const faqs = [
  {
    q: 'What are the signs of hearing loss in adults?',
    a: `Asking people to repeat themselves, struggling to follow conversation in noisy places, turning up the TV, ringing in the ears (tinnitus), and feeling that others mumble. If any of these sound familiar, book a hearing test with <a href="${HEARING_TEST}" rel="noopener">${SISTER.name}</a>.`,
  },
  {
    q: 'How often should I get a hearing test?',
    a: `The American Speech-Language-Hearing Association suggests adults have a baseline hearing test, then a check every 10 years up to age 50 and every 3 years after that. Test more often if you work in a noisy place or have other risk factors. <a href="${HEARING_TEST}" rel="noopener">Book a hearing test</a>.`,
  },
  {
    q: 'Do you offer pediatric hearing screening in Bangalore?',
    a: `Yes, through our sister clinic ${SISTER.name}, in the same buildings in Electronic City. They test newborns, babies and children of all ages, with tests suited to the child's age such as OAE, ABR and behavioural audiometry. <a href="${SISTER.childHearing}" rel="noopener">Children's hearing tests</a>.`,
  },
  {
    q: 'What hearing aid brands do you work with?',
    a: `${SISTER.name} works with all major hearing aid brands and recommends one based on your hearing test, lifestyle and budget, then fits it and supports you afterwards. See <a href="${SISTER.url}" rel="noopener">poorvamhearing.com</a> for the current range.`,
  },
  {
    q: 'Can hearing loss be reversed?',
    a: 'It depends on the type. Conductive hearing loss, caused by a blockage or a middle-ear problem, can often be treated by an ENT doctor. Sensorineural hearing loss, from the inner ear or hearing nerve, is usually permanent but can be managed well with hearing aids or a cochlear implant.',
  },
  {
    q: 'How much do hearing aids cost in Bangalore?',
    a: `It varies with the technology level and features, and there are options across price ranges. ${SISTER.name} explains the options and their costs at the consultation, after your hearing test.`,
  },
  {
    q: 'Is Poorvam Hearing part of Poorvam Care?',
    a: `Yes. ${SISTER.name} is our sister clinic for hearing tests and hearing aids, in the same two buildings in Electronic City. Poorvam Care is the children's therapy side: speech therapy, OT, ABA and special education.`,
  },
  {
    q: 'My child has a speech delay. Should they have a hearing test first?',
    a: `Yes, if you have any doubt about hearing. Children learn to talk by hearing, so a hearing problem can look like a speech delay. ${SISTER.name} tests the hearing, and our speech therapists at Poorvam Care help with talking. <a href="/speech-therapy-for-speech-delay-bangalore">Read about speech delay</a>.`,
  },
];

const does = [
  { icon: 'ear', title: 'Hearing tests', text: 'Full hearing tests for adults and older adults, with the results explained.', href: HEARING_TEST, tone: 'blue' },
  { icon: 'child', title: 'Children\'s hearing tests', text: 'From newborns to teenagers, using tests suited to the child\'s age.', href: SISTER.childHearing, tone: 'mint' },
  { icon: 'spark', title: 'Hearing aids', text: 'Choosing, fitting and adjusting hearing aids, with support afterwards.', href: SISTER.url, tone: 'violet' },
  { icon: 'speech', title: 'Speech after hearing loss', text: 'Speech therapy at Poorvam Care, including after a cochlear implant.', href: '/speech-therapy-electronic-city', tone: 'sun' },
];

const where = (l) => html`<article class="centre">
      <h3><a href="${l.page}">${esc(l.name)}</a></h3>
      <p class="centre__addr">${icon('pin')}<span>${esc(l.street)}, Bengaluru ${l.postalCode}</span></p>
      <p class="centre__hrs">${icon('clock')}<span>${HOURS.display}. ${HOURS.closedDisplay}.</span></p>
      <p class="centre__access">${icon('home')}<span>${esc(l.access)}</span></p>
      <p class="centre__near">Closest for ${l.nearby.slice(0, 4).join(', ')}.</p>
      <div class="centre__acts">
        <a class="btn btn--line btn--sm" href="${l.mapUrl}" target="_blank" rel="noopener" data-track="directions">${icon('route')}<span>Directions</span></a>
        <a class="btn btn--ink btn--sm" href="${HEARING_TEST}" rel="noopener">Book a hearing test</a>
      </div>
    </article>`;

export default {
  path: PATH,
  title: 'Hearing Center in Electronic City, Bangalore | Poorvam Care',
  description: 'Hearing tests, children\'s hearing tests and hearing aids in Electronic City, Bengaluru, at Poorvam Hearing, our sister clinic in the same two buildings.',
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': 'LocalBusiness',
    '@id': `${urlOf(PATH)}#hearing`,
    name: `${SISTER.name}, Electronic City`,
    description: 'Hearing tests, children\'s hearing tests and hearing aids in Electronic City, Bengaluru.',
    url: SISTER.url,
    // Poorvam Hearing uses the same number as Care (poorvamhearing.com site.mjs).
    telephone: CONTACT.phone,
    sameAs: [SISTER.url],
    parentOrganization: { '@id': orgId },
    address: LOCATIONS.map((l) => ({ '@type': 'PostalAddress', streetAddress: l.street, addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: l.postalCode, addressCountry: 'IN' })),
    location: LOCATIONS.map((l) => ({ '@type': 'Place', name: `${SISTER.name}, ${l.name}`, geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng }, hasMap: l.mapUrl })),
    openingHoursSpecification: HOURS.spec.map((s) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: s.days, opens: s.opens, closes: s.closes })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Hearing centre in Electronic City, Bengaluru</h1>
    <p class="answer">Hearing tests, children's hearing tests and hearing aids are done by ${SISTER.name}, our sister clinic, in the same two buildings as Poorvam Care in Electronic City Phase 1 and Phase 2. Book with them directly at poorvamhearing.com.</p>
    <div class="phero__acts"><a class="btn btn--ink" href="${SISTER.url}" rel="noopener">Go to Poorvam Hearing</a>${whatsappButton(WA, 'btn btn--line')}</div>
    ${stats([
      { label: 'Buildings in Electronic City', value: String(LOCATIONS.length), tone: 'blue' },
      { label: 'Open', value: 'Mon–Sat', tone: 'mint' },
      { label: 'Hours', value: '9 am – 7 pm', tone: 'violet' },
      { label: 'Ages tested', value: 'Newborn to adult', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What the hearing clinic does', `Everything to do with hearing is at ${SISTER.name}. Tap a card to go straight there.`)}
    ${cards(does, { cols: 4 })}
    <div class="phero__acts mt-2"><a class="btn btn--ink" href="${HEARING_TEST}" rel="noopener">Book a hearing test</a><a class="btn btn--line" href="${SISTER.childHearing}" rel="noopener">Children's hearing tests</a></div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Signs it is time for a hearing test', 'One of these is enough to book. A test is quick and tells you where you stand.')}
    ${signs([
      'A baby who does not startle at loud sounds or turn to voices',
      'A child whose talking is late or has stalled',
      'Frequent ear infections or a blocked feeling in the ears',
      'Asking people to repeat themselves, or turning up the TV',
      'Ringing in the ears (tinnitus)',
      'Struggling to follow conversation in noisy places',
    ])}
    ${callout('Speech delay? Check hearing first', `Children learn to talk by hearing, so a hearing problem can look like a speech delay. <a href="${SISTER.childHearing}" rel="noopener">${SISTER.name} tests children</a>, and our team helps with <a href="/speech-therapy-for-speech-delay-bangalore">speech delay</a>.`, 'info')}
    ${callout('See a doctor urgently for sudden hearing loss', 'Hearing that drops suddenly in one or both ears, or comes with pain, discharge or dizziness, needs an ENT doctor straight away.', 'warn')}
  </div>
</section>

<section class="band band--paper" id="where">
  <div class="wrap">
    ${head('Where to find the hearing clinic', 'The same two buildings as Poorvam Care, with the same hours.')}
    <div class="centres">${LOCATIONS.map(where)}</div>
    ${more('Poorvam Care and Poorvam Hearing', `<p>Poorvam Care & Hearing Solutions is one practice with two brands. ${SISTER.name} handles hearing tests and hearing aids for all ages. Poorvam Care, this site, is the children's therapy side: <a href="/child-development">speech therapy, occupational therapy, ABA, special education and more</a>. Our clinical director, ${DIRECTOR.name}, holds a Master of Audiology and Speech-Language Pathology, is RCI registered and is a member of the Indian Speech and Hearing Association.</p>
      <p>Call or WhatsApp ${CONTACT.phoneDisplay} if you are not sure which you need, and we will point you to the right place.</p>`)}
  </div>
</section>

${faqSection(faqs, 'Hearing care in Electronic City: questions')}

<section class="cta-band">
  <div class="wrap">
    <h2>Book a hearing test in Electronic City</h2>
    <p>Hearing tests and hearing aids are booked directly with ${SISTER.name}.</p>
    <div class="cta-band__acts"><a class="btn btn--ink" href="${HEARING_TEST}" rel="noopener">Book a hearing test</a><a class="btn btn--line btn--on-ink" href="${SISTER.url}" rel="noopener">Visit poorvamhearing.com</a></div>
  </div>
</section>
`,
};
