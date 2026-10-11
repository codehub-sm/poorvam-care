import { html, bookingForm, callButton, whatsappButton, breadcrumb, centreCard, faqSection, icon } from '../layout.mjs';
import { head, cards } from '../ui.mjs';
import { CONTACT, HOURS, LOCATIONS, ONLINE, telLink, whatsappLink } from '../site.mjs';

const faqs = [
  {
    q: 'What is the phone number for Poorvam Care?',
    a: `Call or WhatsApp ${CONTACT.phoneDisplay}. The same number reaches both Electronic City centres. You can also email ${CONTACT.email}.`,
  },
  {
    q: 'What are Poorvam Care\'s opening hours?',
    a: `Both centres are open ${HOURS.display}, and closed on Sunday. Online sessions are booked within the same hours, Indian time.`,
  },
  {
    q: 'Which Poorvam Care centre is closer to me?',
    a: `The Phase 1 centre on Hulimangla Road is closer for ${LOCATIONS[0].nearby.slice(0, 5).join(', ')}, Bommanahalli and HSR Layout. The Phase 2 centre in Ananth Nagar is closer for ${LOCATIONS[1].nearby.slice(1).join(', ')}.`,
  },
  {
    q: 'Is there a lift at the centres?',
    a: `${LOCATIONS[0].name}: ${LOCATIONS[0].access} ${LOCATIONS[1].name}: ${LOCATIONS[1].access} If stairs are hard for your family, choose Phase 1 when you book.`,
  },
  {
    q: 'How quickly will you get back to me?',
    a: 'A member of the clinical team calls or WhatsApps you within one working day of a booking request, to understand your child\'s needs and fix a time.',
  },
];

export default {
  path: '/contact',
  title: 'Contact Poorvam Care | Electronic City, Bangalore',
  description: `Contact Poorvam Care in Electronic City, Bangalore: call or WhatsApp ${CONTACT.phoneDisplay}, visit our Phase 1 or Phase 2 centre, or book a consultation online.`,
  breadcrumb: [['Contact', '/contact']],
  current: '/contact',
  faqs,
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Contact', '/contact']])}
    <h1>Contact Poorvam Care</h1>
    <p class="answer">Call or WhatsApp ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or send the form below. Both Electronic City centres are open ${HOURS.display}. We call back within one working day.</p>
    <div class="phero__acts">${callButton()}${whatsappButton(undefined, 'btn btn--wa')}</div>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap">
    ${cards([
      { icon: 'phone', title: 'Call us', text: `<a href="${telLink}" data-track="call">${CONTACT.phoneDisplay}</a>`, tone: 'blue' },
      { icon: 'whatsapp', title: 'WhatsApp', text: `<a href="${whatsappLink('Hi Poorvam Care, I would like to know about therapy for my child.')}" target="_blank" rel="noopener" data-track="whatsapp">Message ${CONTACT.phoneDisplay}</a>`, tone: 'mint' },
      { icon: 'book', title: 'Email', text: `<a href="mailto:${CONTACT.email}">${CONTACT.email}</a>`, tone: 'violet' },
      { icon: 'clock', title: 'Hours', text: `${HOURS.display}. ${HOURS.closedDisplay}.`, tone: 'sun' },
    ], { cols: 4, compact: true })}
  </div>
</section>

<section class="band band--paper" id="centres">
  <div class="wrap">
    ${head('Our two centres in Electronic City', 'Same therapists, same hours. Phase 1 has a lift; Phase 2 is up a flight of stairs.')}
    <div class="centres">${LOCATIONS.map((l) => centreCard(l))}</div>
  </div>
</section>

<section class="band" id="book">
  <div class="wrap book-grid">
    <div class="book-grid__head">
      <h2>Send us a request</h2>
      <p class="lede">Tell us what you are seeing. We call or WhatsApp you within one working day to plan the first visit, at a centre or online from ${ONLINE.markets.map((m) => m.name).join(', ')}.</p>
    </div>
    <div class="book-grid__form panel">${bookingForm('bk-contact')}</div>
  </div>
</section>

${faqSection(faqs, 'Contact questions')}
`,
};
