import { html, bookingForm, callButton, whatsappButton, icon } from '../layout.mjs';
import { cards } from '../ui.mjs';
import { CONTACT, HOURS, LOCATIONS, ONLINE, STATS } from '../site.mjs';

/**
 * The booking endpoints. Both hold the same three-step form inline; /online/enquiry
 * opens with "Online" already chosen. Noindex: a bare form must not compete
 * with the pages that explain each therapy, and neither ever ranked.
 */
function bookPage({ path, title, description, h1, lede, centre, crumb, photo }) {
  return {
    path,
    photo,
    title,
    description,
    noindex: true,
    breadcrumb: [[crumb, path]],
    local: centre !== 'online',
    body: html`
<section class="phero">
  <div class="wrap">
    <h1>${h1}</h1>
    <p class="lede">${lede}</p>
  </div>
</section>

<section class="band band--tight">
  <div class="wrap book-grid">
    <div class="book-grid__head">
      <h2>Tell us about your child</h2>
      <p class="lede">Three short steps. Nothing is booked or charged until we have spoken.</p>
    </div>
    <div class="book-grid__form panel">${bookingForm('bk-page', { centre })}</div>
    <div class="book-grid__facts">
      <h2 class="mt-2">What happens next</h2>
      <ol class="steps">
        <li><strong>You send the form</strong><span>It takes under a minute.</span></li>
        <li><strong>We call you</strong><span>A member of the clinical team calls or WhatsApps within one working day.</span></li>
        <li><strong>A plan and a time</strong><span>We explain how we would help, the cost, and book the first visit.</span></li>
      </ol>
      ${cards([
        { icon: 'shield', title: 'RCI-registered therapists', text: `Registered with the Rehabilitation Council of India. ${STATS.years} years in practice.`, tone: 'blue' },
        { icon: 'chat', title: 'In your family\'s language', text: `${ONLINE.languages.join(', ')}.`, tone: 'green' },
        { icon: 'clock', title: 'Hours', text: `${HOURS.display}. ${HOURS.closedDisplay}.`, tone: 'sky' },
        { icon: 'pin', title: 'Two centres and online', text: `${LOCATIONS.map((l) => l.name).join(' and ')}, or video from ${ONLINE.markets.map((m) => m.name).join(', ')}.`, tone: 'teal' },
      ], { cols: 2, compact: true })}
      <p class="mt-2">Cost depends on what your child needs, so we go through it properly on the call rather than quoting a figure that may not apply. You will have a clear plan and price before anything starts.</p>
      <div class="phero__acts">${callButton()}${whatsappButton(undefined, 'btn btn--wa')}</div>
      <p class="muted"><small>Email: <a href="mailto:${CONTACT.email}">${CONTACT.email}</a></small></p>
    </div>
  </div>
</section>
`,
  };
}

export default [
  bookPage({
    path: '/book',
    title: 'Book a Consultation | Poorvam Care',
    description: 'Book a consultation with an RCI-registered child therapist at our Electronic City, Bengaluru centres or online. We call you back within one working day.',
    h1: 'Book a consultation',
    lede: 'Tell us what you are seeing. We will explain how we would approach it, and tell you honestly whether we can help your child, including when the answer is no.',
    centre: LOCATIONS[0].id,
    crumb: 'Book a consultation',
    photo: 'book',
  }),
  bookPage({
    path: '/online/enquiry',
    title: 'Book an Online Consultation | Poorvam Online Therapy',
    description: 'Request an online consultation with an RCI-registered therapist to talk through whether video therapy suits your child. Families in India, Australia and the UAE.',
    h1: 'Book your online consultation',
    lede: 'A call with an RCI-registered therapist about what you are seeing, how we would approach it online, and whether online therapy is right for your child.',
    centre: 'online',
    crumb: 'Online consultation',
    photo: 'online',
  }),
];
