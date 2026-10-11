/**
 * Page shell and shared blocks. Every page renders through `renderPage`, so
 * the nav, footer, booking sheet, contact bar and schema are written once.
 *
 * URLs are root-absolute and extensionless (`/about`, `/online/india`): that is
 * what the site has ranked under since 2025, and nested paths make relative
 * links unsafe.
 */

import {
  PHOTOS, PHOTO_NOTE, SITE_URL, BRAND, GBP_NAME, CONTACT, HOURS, LOCATIONS, SERVICES, ASSESSMENT, NAV, DIRECTOR, AREAS, FAR_AREAS,
  GOOGLE_RATING, REVIEWER, LEAD_SINKS, GA4_ID, SOCIAL, SISTER, ONLINE, STATS, telLink, whatsappLink, mapEmbedUrl, reviewsUrl,
} from './site.mjs';

export const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Tagged template that joins arrays, so `${list.map(...)}` needs no `.join('')`. */
export function html(strings, ...values) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) {
      const v = values[i];
      out += Array.isArray(v) ? v.join('') : (v ?? '');
    }
  });
  return out;
}

/** The public URL of a page path. */
export const urlOf = (path) => `${SITE_URL}${path === '/' ? '/' : path}`;

/* ---------- icons (stroke, 24px grid) ---------- */
const ICONS = {
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  whatsapp: '<path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  home: '<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
  ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6"/><path d="M10 9.5a2 2 0 0 1 4 0c0 1-1 1.5-1.5 2.5"/>',
  speech: '<path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M8 10.5h.01M12 10.5h.01M16 10.5h.01"/>',
  hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10V4.5a1.5 1.5 0 0 1 3 0V11"/><path d="M14 10.5V6a1.5 1.5 0 0 1 3 0v7"/><path d="M8 13l-1.6-1.8a1.6 1.6 0 0 0-2.4 2.1L7.5 18A6 6 0 0 0 12 21h1a5 5 0 0 0 5-5v-3"/>',
  blocks: '<rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><rect x="8" y="3" width="8" height="8" rx="1.5"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/><path d="M8 7h8M8 11h6"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
  heart: '<path d="M12 20s-7.5-4.6-9.3-9.2C1.4 7.4 3.6 4 7 4c2 0 3.6 1.2 5 3 1.4-1.8 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8C19.5 15.4 12 20 12 20z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10.5l6-3.5v10l-6-3.5z"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2a5 5 0 0 1 6 4.8"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 4-3 7-8 7z"/><path d="M12 14c0-3.3-2.5-6-7-6 0 3.3 2.5 6 7 6z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.3 8-8 9-4.7-1-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  child: '<circle cx="12" cy="9" r="5"/><path d="M10 9h.01M14 9h.01M10.5 11.2a2 2 0 0 0 3 0"/><path d="M7 21a5 5 0 0 1 10 0"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/>',
};
export const icon = (name, cls = 'i') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] ?? ICONS.check}</svg>`;

/* ---------- small blocks ---------- */

/** A Book link. Without JS it is a plain link to /book; with JS it opens the booking sheet pre-set. */
export function bookButton(label = 'Book a consultation', service = '', cls = 'btn btn--ink', centre = '') {
  const q = new URLSearchParams();
  if (service) q.set('service', service);
  if (centre) q.set('centre', centre);
  const qs = q.toString();
  return `<a class="${cls}" href="/book${qs ? `?${qs}` : ''}" data-book="${service}"${centre ? ` data-centre="${centre}"` : ''}>${esc(label)}</a>`;
}

export function callButton(cls = 'btn btn--line') {
  return `<a class="${cls}" href="${telLink}" data-track="call">${icon('phone')}<span>Call ${CONTACT.phoneDisplay}</span></a>`;
}

export function whatsappButton(message = `Hi ${BRAND}, I would like to know about therapy for my child.`, cls = 'btn btn--wa', label = 'WhatsApp us') {
  return `<a class="${cls}" href="${whatsappLink(message)}" target="_blank" rel="noopener" data-track="whatsapp">${icon('whatsapp')}<span>${esc(label)}</span></a>`;
}

export function breadcrumb(trail) {
  if (!trail?.length) return '';
  const items = [['Home', '/'], ...trail];
  return html`<nav class="crumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) => i === items.length - 1
    ? `<li aria-current="page">${esc(label)}</li>`
    : `<li><a href="${href}">${esc(label)}</a></li>`)}</ol></nav>`;
}

export function byline(updated) {
  return `<p class="byline">Clinically reviewed by <a href="/about#${REVIEWER.id}">${REVIEWER.name}</a>, ${REVIEWER.credentials}. Updated ${esc(updated)}.</p>`;
}

export function faqSection(faqs, heading = 'Questions parents ask us') {
  if (!faqs?.length) return '';
  return html`<section class="band" id="faq">
  <div class="wrap wrap--narrow">
    <h2>${esc(heading)}</h2>
    <div class="faq">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="faq__a"><p>${f.a}</p></div></details>`)}</div>
  </div>
</section>`;
}

/** One centre's card: address, hours, access, and the three things a parent taps. */
export function centreCard(l, { map = false } = {}) {
  const embed = map && mapEmbedUrl(l);
  const reviews = reviewsUrl(l);
  return html`<article class="centre">
      ${embed ? `<iframe class="map" src="${embed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Map of ${esc(BRAND)} ${esc(l.name)}"></iframe>` : ''}
      <h3><a href="${l.page}">${esc(l.name)}</a></h3>
      <p class="centre__addr">${icon('pin')}<span>${esc(l.street)}, Bengaluru ${l.postalCode}</span></p>
      <p class="centre__hrs">${icon('clock')}<span>${HOURS.display}. ${HOURS.closedDisplay}.</span></p>
      ${l.access ? `<p class="centre__access">${icon('home')}<span>${esc(l.access)}</span></p>` : ''}
      <p class="centre__near">Closest for ${l.nearby.slice(0, 4).join(', ')}.</p>
      <div class="centre__acts">
        <a class="btn btn--line btn--sm" href="${l.mapUrl}" target="_blank" rel="noopener" data-track="directions">${icon('route')}<span>Directions</span></a>
        ${reviews && GOOGLE_RATING ? `<a class="btn btn--line btn--sm" href="${reviews}" target="_blank" rel="noopener" data-track="reviews">${icon('star')}<span>Google reviews</span></a>` : ''}
        ${bookButton(`Book at ${l.short}`, '', 'btn btn--ink btn--sm', l.id)}
      </div>
    </article>`;
}

export function centresBlock(heading = 'Two centres in Electronic City', lede = 'Same therapists, same methods, same hours at both. Pick whichever is closer to home or school.') {
  return html`<section class="band band--paper" id="centres">
  <div class="wrap">
    <h2>${esc(heading)}</h2>
    <p class="lede">${esc(lede)}</p>
    <div class="centres">${LOCATIONS.map((l) => centreCard(l))}</div>
  </div>
</section>`;
}

export function areasBlock(heading = 'Therapy near you in south Bengaluru') {
  const chip = (a) => (a.page ? `<li><a href="${a.page}">${esc(a.name)}</a></li>` : `<li>${esc(a.name)}</li>`);
  return html`<section class="band band--mint" id="areas">
  <div class="wrap">
    <div class="section-head">
      <h2>${esc(heading)}</h2>
      <p class="lede">Families come to us from across south Bengaluru. Here's which centre is closer, and when online sessions make more sense.</p>
    </div>
    <div class="areas">${LOCATIONS.map((l) => html`<div class="areas__col">
      <h3><a href="${l.page}">${esc(l.name)} centre</a></h3>
      <ul>${AREAS.filter((a) => a.centre === l.id).map(chip)}</ul>
    </div>`)}
      <div class="areas__col areas__col--home">
        <h3>Further away?</h3>
        <p>From ${FAR_AREAS.map((a) => `<a href="${a.page}">${esc(a.name)}</a>`).join(' or ')}, many families start with an assessment at a centre, then do part of the weekly therapy online.</p>
        <a class="btn btn--line btn--on-ink btn--sm" href="${ONLINE.page}">${icon('video')}<span>How online therapy works</span></a>
      </div>
    </div>
  </div>
</section>`;
}

export function ctaBand(heading = 'Talk to a therapist this week', sub = 'Tell us what you have noticed. We call back within one working day to plan a first assessment.', service = '') {
  return html`<section class="cta-band">
  <div class="wrap">
    <h2>${esc(heading)}</h2>
    <p>${esc(sub)}</p>
    <div class="cta-band__acts">${bookButton('Book a consultation', service)}${callButton('btn btn--line btn--on-ink')}</div>
  </div>
</section>`;
}

/** Every therapy as a card, in the colour it owns. A last card catches the parent who isn't sure. */
export function serviceList(exclude = '') {
  const items = SERVICES.filter((s) => s.page !== exclude).map((s) => ({ href: s.page, icon: s.icon, tone: s.tone, title: s.label, text: s.blurb }));
  if (items.length % 3 !== 0 || items.length < 6) items.push({ href: ASSESSMENT.page, icon: 'search', tone: 'blue', title: 'Not sure where to start?', text: 'A developmental assessment tells you which therapy, how often and for how long.' });
  const cols = items.length % 4 === 0 ? 4 : 3;
  return html`<ul class="cards cards--${cols} svc-cards">${items.map((it) => `<li class="tone-${it.tone}"><a href="${it.href}"><span class="cards__ico">${icon(it.icon)}</span><strong>${esc(it.title)}</strong><span>${esc(it.text)}</span></a></li>`)}</ul>`;
}

/* ---------- schema ---------- */

export const orgId = `${SITE_URL}/#organization`;
export const locId = (l) => `${SITE_URL}${l.page}#business`;
export const directorId = `${SITE_URL}/about#${DIRECTOR.id}`;

export function clinicSchema(l) {
  const reviews = reviewsUrl(l);
  return {
    '@type': ['MedicalClinic', 'LocalBusiness'],
    '@id': locId(l),
    name: `${BRAND} – ${l.name}`,
    alternateName: `${GBP_NAME} ${l.short}`,
    url: `${SITE_URL}${l.page}`,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: `${SITE_URL}/assets/img/og.png`,
    priceRange: '₹₹',
    medicalSpecialty: ['SpeechPathology', 'Pediatric'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: l.street,
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: l.postalCode,
      addressCountry: 'IN',
    },
    geo: { '@type': 'GeoCoordinates', latitude: l.lat, longitude: l.lng },
    hasMap: l.mapUrl,
    ...(reviews ? { sameAs: [reviews] } : {}),
    openingHoursSpecification: HOURS.spec.map((s) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: s.days, opens: s.opens, closes: s.closes })),
    areaServed: l.nearby.map((n) => ({ '@type': 'Place', name: `${n}, Bengaluru` })),
    parentOrganization: { '@id': orgId },
    availableService: SERVICES.map((s) => ({ '@type': 'MedicalTherapy', name: s.label, url: `${SITE_URL}${s.page}` })),
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': directorId,
    name: DIRECTOR.name,
    jobTitle: DIRECTOR.role,
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Master of Audiology and Speech-Language Pathology (MASLP)' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'license', name: 'Rehabilitation Council of India (RCI) registration' },
    ],
    memberOf: DIRECTOR.memberships.map((m) => ({ '@type': 'Organization', name: m })),
    worksFor: { '@id': orgId },
  };
}

export function baseSchema() {
  return [
    {
      '@type': ['MedicalBusiness', 'EducationalOrganization'],
      '@id': orgId,
      name: BRAND,
      alternateName: [GBP_NAME, 'Poorvam Child Development Centre', 'Poorvam Early Intervention Centre'],
      description: `Early intervention centre for children aged ${STATS.ages}: speech therapy, occupational therapy, ABA, special education, therapeutic enrichment and parent counselling at two centres in Electronic City, Bengaluru, and online.`,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/assets/img/logo.jpg`,
      image: `${SITE_URL}/assets/img/og.png`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      priceRange: '₹₹',
      address: { '@type': 'PostalAddress', streetAddress: LOCATIONS[0].street, addressLocality: 'Bengaluru', addressRegion: 'Karnataka', postalCode: LOCATIONS[0].postalCode, addressCountry: 'IN' },
      sameAs: SOCIAL,
      department: LOCATIONS.map((l) => ({ '@id': locId(l) })),
      founder: { '@id': directorId },
      employee: { '@id': directorId },
    },
    ...LOCATIONS.map(clinicSchema),
    personSchema(),
  ];
}

/* ---------- shell ---------- */

const year = new Date().getFullYear();

function nav(current) {
  return html`<header class="top">
  <div class="wrap top__in">
    <a class="logo" href="/" aria-label="${BRAND} home">
      <img src="/assets/img/logo.jpg" alt="" width="36" height="36">
      <span>${BRAND}</span>
    </a>
    <nav class="top__nav" aria-label="Main">${NAV.map((n) => `<a href="${n.href}"${n.href === current ? ' aria-current="page"' : ''}>${n.label}</a>`)}</nav>
    <div class="top__acts">
      <a class="top__call" href="${telLink}" data-track="call">${icon('phone')}<span>${CONTACT.phoneDisplay}</span></a>
      ${bookButton('Book', '', 'btn btn--ink btn--sm')}
      <button class="top__menu" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu">${icon('menu')}</button>
    </div>
  </div>
  <div class="drawer" id="drawer" hidden>
    <nav aria-label="Mobile">${NAV.map((n) => `<a href="${n.href}">${n.label}</a>`)}<a href="/faq">Questions</a><a href="/blog">Guides for parents</a></nav>
  </div>
</header>`;
}

function footer() {
  return html`<footer class="foot">
  <div class="wrap foot__grid">
    <div>
      <p class="foot__brand">${BRAND}</p>
      <p>Speech therapy, occupational therapy, ABA and special education for children aged ${STATS.ages}, at two centres in Electronic City, Bengaluru, and online.</p>
      <p><a href="${telLink}" data-track="call">${CONTACT.phoneDisplay}</a><br><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
      <p>Hearing tests and hearing aids: <a href="${SISTER.url}" rel="noopener">${SISTER.name}</a></p>
    </div>
    ${LOCATIONS.map((l) => html`<div>
      <p class="foot__h"><a href="${l.page}">${l.name}</a></p>
      <p>${esc(l.street)}, Bengaluru ${l.postalCode}</p>
      <p>${HOURS.display}</p>
      <p><a href="${l.mapUrl}" target="_blank" rel="noopener" data-track="directions">Open in Google Maps</a></p>
    </div>`)}
    <div>
      <p class="foot__h">Online therapy</p>
      <ul><li><a href="${ONLINE.page}">How online therapy works</a></li>${ONLINE.markets.map((m) => `<li><a href="${m.page}">Online in ${m.name}</a></li>`).join('')}<li><a href="/online/speech-therapy">Online speech therapy</a></li><li><a href="/online/occupational-therapy">Online OT</a></li><li><a href="/online/behavioural-therapy">Online behaviour therapy</a></li><li><a href="/online/special-education">Online special education</a></li></ul>
    </div>
    <div>
      <p class="foot__h">Therapies</p>
      <ul>${SERVICES.map((s) => `<li><a href="${s.page}">${s.label}</a></li>`)}<li><a href="/speech-therapy-for-autism-bangalore">Speech therapy for autism</a></li><li><a href="/speech-therapy-for-speech-delay-bangalore">Speech delay</a></li><li><a href="/online">Online therapy</a></li><li><a href="/blog">Guides for parents</a></li><li><a href="/faq">Questions</a></li></ul>
    </div>
  </div>
  <div class="wrap foot__base">
    <span>© ${year} ${BRAND}</span>
    <span>Information on this site is general and does not replace an assessment by a qualified therapist. ${PHOTO_NOTE}</span>
    <span>Centre management powered by <a href="https://theraflow.in" target="_blank" rel="noopener">TheraFlow</a></span>
  </div>
</footer>`;
}

function contactBar() {
  return html`<div class="dock" role="region" aria-label="Quick contact">
  <a href="${telLink}" data-track="call">${icon('phone')}<span>Call</span></a>
  <a href="${whatsappLink(`Hi ${BRAND}, I would like to know about therapy for my child.`)}" target="_blank" rel="noopener" data-track="whatsapp">${icon('whatsapp')}<span>WhatsApp</span></a>
  <a class="dock__book" href="/book" data-book="">${icon('calendar')}<span>Book</span></a>
</div>`;
}

const AGES = ['Under 2', '2–3', '4–6', '7–10', '11+'];

/** The booking form. Lives in every page's sheet, and inline on /book, /contact and /online/enquiry. */
export function bookingForm(id = 'bk', { centre = LOCATIONS[0].id } = {}) {
  const radio = (name, value, label, checked, small = '') => `<label class="chip"><input type="radio" name="${name}" value="${esc(value)}"${checked ? ' checked' : ''}><span>${esc(label)}${small ? `<small>${esc(small)}</small>` : ''}</span></label>`;
  return html`<form class="booking" id="${id}" novalidate data-booking>
  <ol class="booking__steps" aria-hidden="true"><li class="is-on">Need</li><li>Where</li><li>You</li></ol>
  <fieldset class="booking__step is-on" data-step="1">
    <legend>What would you like help with?</legend>
    <div class="chips">${radio('service', ASSESSMENT.id, ASSESSMENT.label, true)}${SERVICES.map((s) => radio('service', s.id, s.label, false))}</div>
    <p class="booking__label">Child's age</p>
    <div class="chips">${AGES.map((a, i) => radio('age', a, a, i === 1))}</div>
    <button class="btn btn--ink" type="button" data-next>Continue</button>
  </fieldset>
  <fieldset class="booking__step" data-step="2">
    <legend>Where and when?</legend>
    <div class="chips">${LOCATIONS.map((l) => radio('centre', l.id, l.name, l.id === centre))}${radio('centre', 'online', 'Online (video)', centre === 'online')}</div>
    <div data-when>
      <p class="booking__label">Day</p>
      <div class="chips chips--days" data-days></div>
      <p class="booking__label">Time</p>
      <div class="chips" data-bands>${HOURS.bands.map((b, i) => radio('slot', `${b.label} (${b.hint})`, b.label, i === 0, b.hint))}</div>
    </div>
    <div data-online hidden>
      <label class="field"><span>Which country do you live in?</span>
        <select name="country"><option value="">Choose a country</option>${ONLINE.markets.map((m) => `<option>${m.name}</option>`)}${ONLINE.blocked.map((c) => `<option>${c}</option>`)}<option>Other</option></select>
      </label>
      <p class="booking__gate" data-gate hidden role="alert"></p>
    </div>
    <div class="booking__nav"><button class="btn btn--line" type="button" data-back>Back</button><button class="btn btn--ink" type="button" data-next>Continue</button></div>
  </fieldset>
  <fieldset class="booking__step" data-step="3">
    <legend>Who should we call to confirm?</legend>
    <label class="field"><span>Your name</span><input name="name" autocomplete="name" required></label>
    <label class="field"><span>Mobile number</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="98xxxxxxxx"></label>
    <label class="field"><span>What have you noticed? <em>optional</em></span><textarea name="note" rows="2" placeholder="e.g. 3 years old, says only a few words"></textarea></label>
    <label class="consent"><input type="checkbox" name="consent" required checked><span>You may call or WhatsApp me about this request.</span></label>
    <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <p class="booking__err" role="alert" hidden></p>
    <div class="booking__nav"><button class="btn btn--line" type="button" data-back>Back</button><button class="btn btn--ink" type="submit">Send request</button></div>
  </fieldset>
  <div class="booking__done" data-done hidden>
    ${icon('check', 'i i--big')}
    <h3>Request sent</h3>
    <p>We will call <strong data-done-phone></strong> within one working day to plan the first visit.</p>
    <p>Want it sooner? Send the same details on WhatsApp.</p>
    <a class="btn btn--wa" data-done-wa href="#" target="_blank" rel="noopener" data-track="whatsapp">${icon('whatsapp')}<span>Send on WhatsApp</span></a>
  </div>
</form>`;
}

function bookingDialog() {
  return html`<dialog class="sheet" id="book-sheet" aria-labelledby="book-sheet-t">
  <div class="sheet__head">
    <h2 id="book-sheet-t">Book a consultation</h2>
    <button type="button" class="sheet__x" data-close aria-label="Close">${icon('close')}</button>
  </div>
  ${bookingForm('bk-sheet')}
  <p class="sheet__alt">Prefer to talk? <a href="${telLink}" data-track="call">${CONTACT.phoneDisplay}</a></p>
</dialog>`;
}

/** Facts the browser script needs, rendered from the same config the pages use. */
function clientConfig() {
  const cfg = {
    brand: BRAND,
    phoneDisplay: CONTACT.phoneDisplay,
    whatsapp: CONTACT.whatsapp,
    hoursDays: HOURS.days,
    saturdayBands: HOURS.saturdayBands.map((id) => HOURS.bands.find((b) => b.id === id)).map((b) => `${b.label} (${b.hint})`),
    services: Object.fromEntries([[ASSESSMENT.id, ASSESSMENT.short], ...SERVICES.map((s) => [s.id, s.label])]),
    centres: Object.fromEntries([...LOCATIONS.map((l) => [l.id, l.name]), ['online', 'Online']]),
    theraflowLocations: Object.fromEntries(LOCATIONS.map((l) => [l.id, l.theraflowLocationId])),
    markets: ONLINE.markets.map((m) => m.name),
    blocked: ONLINE.blocked,
    sinks: LEAD_SINKS,
  };
  return `<script>window.PC=${JSON.stringify(cfg).replace(/</g, '\\u003c')}</script>`;
}

function analytics() {
  const base = '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}</script>';
  if (!GA4_ID) return base;
  return `${base}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script><script>gtag('js',new Date());gtag('config','${GA4_ID}');</script>`;
}

/**
 * Render one page.
 * page: { path, title, description, body, current?, faqs?, schema?, breadcrumb?, reviewed?, ogImage?, noindex?, scripts?, local? }
 * `local: false` drops the geo.* meta on pages about online therapy, which is
 * not a Bengaluru-only service.
 */
/** A hero photograph from PHOTOS, as WebP at two widths with a JPEG fallback. */
export function photo(key, { eager = true, cls = 'hphoto' } = {}) {
  const alt = PHOTOS[key];
  if (!alt) throw new Error(`no photo "${key}" in PHOTOS`);
  const p = `/assets/img/photos/${key}`;
  return `<figure class="${cls}"><picture><source type="image/webp" srcset="${p}-720.webp 720w, ${p}-1200.webp 1200w" sizes="(max-width: 860px) 100vw, 40vw"><img src="${p}-1200.jpg" alt="${esc(alt)}" width="1200" height="800"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture></figure>`;
}

/** A page with `photo: '<key>'` gets its standard .phero hero split, words left and the photo right. */
function withHeroPhoto(body, key) {
  const re = /<section class="phero">\s*<div class="wrap">([\s\S]*?)<\/div>\s*<\/section>/;
  if (!re.test(body)) throw new Error(`photo "${key}" set but the page has no standard .phero hero`);
  return body.replace(re, (_, inner) => `<section class="phero phero--photo">\n  <div class="wrap">\n    <div class="phero__main">${inner}</div>\n    ${photo(key)}\n  </div>\n</section>`);
}

export function renderPage(page) {
  if (page.photo) page = { ...page, body: withHeroPhoto(page.body, page.photo) };
  const url = urlOf(page.path);
  const is404 = page.path === '/404';
  const graph = [...baseSchema(), ...(page.schema ?? [])];
  graph.push({ '@type': 'WebPage', '@id': `${url}#page`, url, name: page.title, description: page.description, isPartOf: { '@id': `${SITE_URL}/#site` }, ...(page.reviewed ? { reviewedBy: { '@id': directorId }, lastReviewed: page.reviewed } : {}) });
  graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: BRAND, publisher: { '@id': orgId }, inLanguage: 'en-IN' });
  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') } })),
    });
  }
  if (page.breadcrumb?.length) {
    const items = [['Home', '/'], ...page.breadcrumb];
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: items.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: urlOf(href) })),
    });
  }
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  const og = page.ogImage ?? `${SITE_URL}/assets/img/og.png`;
  const local = page.local !== false;
  // The hub and the three country pages are one hreflang cluster, as on the React site.
  const cluster = [ONLINE.page, ...ONLINE.markets.map((m) => m.page)];
  const hreflang = cluster.includes(page.path)
    ? [...ONLINE.markets.map((m) => `<link rel="alternate" hreflang="${m.hreflang}" href="${urlOf(m.page)}">`), `<link rel="alternate" hreflang="x-default" href="${urlOf(ONLINE.page)}">`].join('\n')
    : '';

  return html`<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${is404 ? '' : `<link rel="canonical" href="${url}">`}
${hreflang}
${page.noindex || is404 ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="theme-color" content="#3446f0">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
${local ? '<meta name="geo.region" content="IN-KA">\n<meta name="geo.placename" content="Electronic City, Bengaluru">' : ''}
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/assets/img/favicon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="/assets/css/site.css">
${analytics()}
<script type="application/ld+json">${ld}</script>
</head>
<body class="${page.bodyClass ?? ''}">
<a class="skip" href="#main">Skip to content</a>
${nav(page.current ?? page.path)}
<main id="main">
${page.body}
</main>
${footer()}
${contactBar()}
${bookingDialog()}
${clientConfig()}
<script src="/assets/js/site.js" defer></script>
${(page.scripts ?? []).map((s) => `<script src="${s}" defer></script>`)}
</body>
</html>
`;
}
