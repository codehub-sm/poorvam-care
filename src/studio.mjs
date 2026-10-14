/**
 * Poorvam Studio: an hourly-rent hall at the Hulimangala (Phase 1) branch.
 *
 * A different business from the therapy centre, so it lives apart: its own
 * facts here (not in site.mjs), its own shell, stylesheet and script, its own
 * schema @id, and it is kept out of llms.txt. Nothing in this module is
 * imported by a therapy page; the clinic footer carries one link to /studio.
 */

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { esc, html } from './layout.mjs';
import { SITE_URL, CONTACT, LOCATIONS, GA4_ID } from './site.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * WhatsApp number for studio bookings, digits with country code. The owner
 * chose the Poorvam number for now (2026-10-12); give the studio its own line
 * by changing only this value. Set to null to hide the number and fall back
 * to a copyable message.
 */
export const STUDIO_WA = CONTACT.whatsapp;
const phoneDisplay = STUDIO_WA ? `+${STUDIO_WA.slice(0, 2)} ${STUDIO_WA.slice(2, 7)} ${STUDIO_WA.slice(7)}` : null;

/** The hall is at the Phase 1 building. Address and pin as on its Google listing, so the domain never shows two addresses for one building. */
const P1 = LOCATIONS[0];

export const STUDIO = {
  name: 'Poorvam Studio',
  sqft: 1500,
  capacity: 40,
  open: '06:00',
  close: '22:00',
  hoursDisplay: '6 AM – 10 PM, all week',
  deposit: 2000,
  /** Rupees per hour. Weekday rate is set by the booking's start time. */
  rates: { weekdayDay: 500, weekdayEvening: 800, weekend: 1000, eveningFrom: 17 },
  birthday: { hours: 3, weekday: 3999, weekend: 5499 },
  /** Workshop and shoot blocks. On weekdays a block must end by dayEnd, so it never takes an evening slot. */
  blocks: { half: { hours: 4, weekday: 1800, weekend: 3600 }, full: { hours: 8, weekday: 3500, weekend: 7000 }, dayEnd: 17 },
  /** Brand and commercial shoots: one hourly rate on any day, event minimum. */
  commercial: 1000,
  /** Instructor monthly slots: the same 1 hour, Monday to Friday, 3 or 5 days a week. */
  monthly: { morning: { 3: 5000, 5: 8000 }, evening: { 3: 8000, 5: 12500 } },
};

const inr = (n) => `₹${n.toLocaleString('en-IN')}`;
const B = STUDIO.blocks;
const M = STUDIO.monthly;

/** Files expected in assets/img/studio/. Only the ones present are used; with none, the floor plan shows instead. */
const PHOTO_SET = [
  ['hall-wide', 'The empty hall from the entrance: a long open floor with a full-length mirror wall on the right'],
  ['mirror-wall', 'The mirror wall running the length of the hall, with the open floor in front of it'],
  ['entrance', 'The separate street-level entrance to Poorvam Studio'],
  ['party-setup', 'The hall set for a children\'s birthday, with tables, chairs and balloons along one wall'],
  ['yoga-setup', 'Yoga mats laid out in rows across the hall facing the mirror wall'],
];
const photos = PHOTO_SET.filter(([key]) => existsSync(path.join(root, `assets/img/studio/${key}.webp`)));
const ogImage = existsSync(path.join(root, 'assets/img/studio/og.jpg')) ? `${SITE_URL}/assets/img/studio/og.jpg` : `${SITE_URL}/assets/img/og.png`;

const uses = [
  { t: 'Dance practice', d: 'Crews and solo dancers rehearsing to the mirror.', m: ['1–3 hrs', 'Up to 25 people'] },
  { t: 'Yoga and fitness batches', d: 'Instructors running a regular class at a fixed time.', m: ['Monthly slot', 'Up to 30 mats'] },
  { t: 'Kids\' birthdays', d: 'Games, cake and a clear floor, without a restaurant\'s rush.', m: ['3 hrs', 'Up to 40 guests'] },
  { t: 'Workshops and shoots', d: 'Talks, small workshops, creative sessions, photo and video shoots.', m: ['Half or full day', 'Up to 40 people'] },
];

const faqs = [
  { q: 'How much does it cost to rent the hall per hour?', a: `${inr(STUDIO.rates.weekdayDay)} an hour on weekdays before 5 PM, ${inr(STUDIO.rates.weekdayEvening)} an hour on weekday evenings (5–10 PM), and ${inr(STUDIO.rates.weekend)} an hour on Saturdays, Sundays and public holidays. Practice bookings have a 1-hour minimum; events have a 3-hour minimum. 18% GST is extra where applicable.` },
  { q: 'Can I host a kids\' birthday party?', a: `Yes. The birthday package is 3 hours for up to 40 guests: ${inr(STUDIO.birthday.weekday)} on weekdays or ${inr(STUDIO.birthday.weekend)} on weekends, with 30 minutes of free decorating time and your own cake and decor. Chairs and tables can be added for an extra charge. A ${inr(STUDIO.deposit)} refundable deposit applies.` },
  { q: 'Is there parking?', a: 'Ask us when you book. Tell us how many cars to expect and we will tell you what is available for your date and time.' },
  { q: 'Can yoga or dance teachers book a fixed monthly slot?', a: `Yes. The same 1-hour slot, Monday to Friday. Mornings (6–9 AM): ${inr(M.morning[3])} a month for 3 days a week, or ${inr(M.morning[5])} for all 5. Evenings (5–10 PM): ${inr(M.evening[3])} a month for 3 days a week, or ${inr(M.evening[5])} for all 5. Weekends are not part of monthly slots.` },
  { q: 'How much is the hall for a workshop or photo shoot?', a: `A half day (4 hours) is ${inr(B.half.weekday)} on weekdays or ${inr(B.half.weekend)} on weekends. A full day (8 hours, 9 AM–5 PM) is ${inr(B.full.weekday)} on weekdays or ${inr(B.full.weekend)} on weekends. Weekday blocks end by 5 PM; after that the evening rate applies. Brand and commercial shoots are ${inr(STUDIO.commercial)} an hour on any day, 3-hour minimum. Bring your own lights and tell us the total load when you book. A ${inr(STUDIO.deposit)} refundable deposit applies.` },
  { q: 'Is the hall separate from the therapy centre?', a: 'Yes. Poorvam Studio has its own entrance, separate from the Poorvam Care therapy centre in the same building.' },
  { q: 'What\'s the cancellation policy?', a: `Cancel free up to 48 hours before your booking. After that, 50% of the booking amount is kept. The ${inr(STUDIO.deposit)} deposit for parties and events is refunded after the hall is checked.` },
];

const icon = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${d}"/></svg>`;
const I = {
  wa: 'M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4zM9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.3-2.3l.8-1-1-2z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  prev: 'M15 6l-6 6 6 6',
  next: 'M9 6l6 6-6 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  x: 'M6 6l12 12M18 6L6 18',
  copy: 'M9 9h10v10H9zM5 15V5h10',
};

/** The hall drawn to scale (about 50 × 30 ft): what renders until real photos exist. */
function floorPlan() {
  return `<figure class="st-plan"><svg viewBox="0 0 520 340" role="img" aria-labelledby="st-plan-t">
  <title id="st-plan-t">Floor plan of Poorvam Studio: an open rectangular floor about 50 by 30 feet, a mirror wall along one long side, a separate entrance at the front, centralised AC in the middle of the ceiling, and power points along the walls.</title>
  <rect class="pl-floor" x="30" y="30" width="460" height="270" rx="6"/>
  <g class="pl-grid">${Array.from({ length: 9 }, (_, i) => `<line x1="${30 + (i + 1) * 46}" y1="30" x2="${30 + (i + 1) * 46}" y2="300"/>`).join('')}${Array.from({ length: 5 }, (_, i) => `<line x1="30" y1="${30 + (i + 1) * 45}" x2="490" y2="${30 + (i + 1) * 45}"/>`).join('')}</g>
  <rect class="pl-mirror" x="30" y="30" width="460" height="10"/>
  <text class="pl-label" x="260" y="60" text-anchor="middle">MIRROR WALL</text>
  <path class="pl-door" d="M430 300 v-40 a40 40 0 0 1 40 40"/>
  <text class="pl-label" x="450" y="322" text-anchor="middle">ENTRANCE</text>
  <g class="pl-ac-c"><rect x="226" y="96" width="68" height="44" rx="6"/><path d="M234 108h52M234 118h52M234 128h52"/></g>
  <text class="pl-small" x="260" y="88" text-anchor="middle">CENTRAL AC</text>
  ${[[30, 150], [30, 240], [490, 150], [490, 240], [200, 300], [300, 300]].map(([x, y]) => `<circle class="pl-plug" cx="${x}" cy="${y}" r="5"/>`).join('')}
  <text class="pl-big" x="260" y="200" text-anchor="middle">1,500 sq ft</text>
  <text class="pl-small" x="260" y="225" text-anchor="middle">open floor · about 50 × 30 ft</text>
  <text class="pl-small" x="22" y="322">● power points</text>
</svg><figcaption>Floor plan, drawn to scale. Photos of the hall are coming soon.</figcaption></figure>`;
}

function carousel() {
  if (!photos.length) return floorPlan();
  const slides = photos.map(([key, alt], i) => `<li class="st-slide" id="st-photo-${i + 1}"><picture><img src="/assets/img/studio/${key}.webp" alt="${esc(alt)}" width="1200" height="900"${i === 0 ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async"></picture></li>`).join('');
  return `<div class="st-carousel" data-carousel aria-roledescription="carousel" aria-label="Photos of the hall">
  <ul class="st-track" data-track tabindex="0">${slides}</ul>
  ${photos.length > 1 ? `<div class="st-carousel__nav"><button type="button" class="st-iconbtn" data-prev aria-label="Previous photo">${icon(I.prev)}</button><span class="st-mono" data-count aria-live="polite">1 / ${photos.length}</span><button type="button" class="st-iconbtn" data-next aria-label="Next photo">${icon(I.next)}</button></div>` : ''}
</div>`;
}

function ratesTable() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const R = STUDIO.rates;
  const row = (label, sub, cell) => `<tr><th scope="row">${label}<small>${sub}</small></th>${days.map((d, i) => cell(i)).join('')}</tr>`;
  const c = (n, cls) => `<td class="${cls}">${inr(n)}<small>/hr</small></td>`;
  return `<div class="st-tablewrap" tabindex="0" role="region" aria-label="Hourly rates by day and time"><table class="st-rates">
  <thead><tr><th scope="col"><span class="st-sr">Time</span></th>${days.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
  <tbody>
    ${row('6 AM – 5 PM', 'off-peak', (i) => (i < 5 ? c(R.weekdayDay, 'is-off') : c(R.weekend, 'is-peak')))}
    ${row('5 PM – 10 PM', 'evening', (i) => (i < 5 ? c(R.weekdayEvening, 'is-eve') : c(R.weekend, 'is-peak')))}
    ${row('Public holidays', 'all day', () => c(R.weekend, 'is-peak'))}
  </tbody>
</table></div>`;
}

const packages = [
  { name: 'Birthday', hl: true, price: `${inr(STUDIO.birthday.weekday)}`, unit: 'weekdays', alt: `${inr(STUDIO.birthday.weekend)} weekends`, meta: '3 hours', gets: ['Up to 40 guests', '30 minutes of free decorating time', 'Bring your own cake and decor', 'Chairs and tables at extra charge'], purpose: 'Birthday party' },
  { name: 'Workshop or shoot', price: inr(B.half.weekday), unit: 'half day', alt: `${inr(B.full.weekday)} full day, weekdays`, meta: '4 hrs or 9 AM–5 PM', gets: [`Weekends: ${inr(B.half.weekend)} half day, ${inr(B.full.weekend)} full day`, 'Talks, classes and creative sessions', `Brand shoots ${inr(STUDIO.commercial)}/hr, 3-hr minimum`, 'Bring your own lights'], purpose: 'Workshop / creative shoot' },
  { name: 'Instructor mornings', price: inr(M.morning[3]), unit: 'per month', alt: `${inr(M.morning[5])} for 5 days a week`, meta: 'Mon–Fri, 6–9 AM', gets: ['The same 1 hour, 3 or 5 days a week', 'Your batch, your music', 'Ideal for yoga and fitness'], purpose: 'Yoga batch' },
  { name: 'Instructor evenings', price: inr(M.evening[3]), unit: 'per month', alt: `${inr(M.evening[5])} for 5 days a week`, meta: 'Mon–Fri, 5–10 PM', gets: ['The same 1 hour, 3 or 5 days a week', 'After-work and after-school batches', 'Ideal for dance and fitness'], purpose: 'Dance practice' },
];

const gets = ['Open floor, nothing to move', 'Full-length mirror wall', 'Centralised AC, included in the rate', 'Chairs and tables on request, charged extra', 'CCTV and a separate entrance', 'Power points along the walls'];
const rules = ['No outdoor footwear on the floor', 'No cooking, smoking or alcohol', 'Music down by 9:30 PM; hall clear by 10 PM', 'No confetti, glitter or tape on the walls', 'The deposit covers any extra cleaning', 'Free cancellation up to 48 hrs before; 50% kept after that'];

function schema(page) {
  const url = `${SITE_URL}${page.path}`;
  const venue = {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${url}#venue`,
    name: STUDIO.name,
    url,
    description: page.description,
    image: ogImage,
    ...(STUDIO_WA ? { telephone: `+${STUDIO_WA}` } : {}),
    address: { '@type': 'PostalAddress', streetAddress: P1.street, addressLocality: 'Bengaluru', addressRegion: 'KA', postalCode: P1.postalCode, addressCountry: 'IN' },
    geo: { '@type': 'GeoCoordinates', latitude: P1.lat, longitude: P1.lng },
    openingHours: 'Mo-Su 06:00-22:00',
    priceRange: '₹500–₹1,000 per hour',
    maximumAttendeeCapacity: STUDIO.capacity,
    floorSize: { '@type': 'QuantitativeValue', value: STUDIO.sqft, unitCode: 'FTK' },
    amenityFeature: ['Air conditioning', 'Mirror wall', 'CCTV', 'Separate entrance'].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
  return ld(venue) + ld(faq);
}

/** Facts studio.js needs, from the same constants the page renders. */
function clientConfig() {
  return `<script>window.PS=${JSON.stringify({ wa: STUDIO_WA, rates: STUDIO.rates, birthday: STUDIO.birthday, blocks: STUDIO.blocks, commercial: STUDIO.commercial, deposit: STUDIO.deposit, close: 22, open: 6 }).replace(/</g, '\\u003c')}</script>`;
}

function analytics() {
  const base = '<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}</script>';
  return GA4_ID ? `${base}<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script><script>gtag('js',new Date());gtag('config','${GA4_ID}');</script>` : base;
}

const body = html`
<section class="st-hero" aria-labelledby="st-h1">
  <div class="st-wrap st-hero__grid">
    <div>
      <p class="st-eyebrow">Hall for rent · Hulimangala, Electronic City Ph 1</p>
      <h1 id="st-h1">1,500 sq ft of mirrored floor, by the hour.</h1>
      <p class="st-lede">An air-conditioned hall with a full mirror wall and its own entrance, open 6 AM to 10 PM every day. Book it for dance practice, a yoga batch, a kid's birthday or a workshop.</p>
      <div class="st-ctas">
        <a class="st-btn st-btn--primary" href="#book" data-cta="hero_book">Request a booking ${icon(I.arrow)}</a>
        <a class="st-btn st-btn--ghost" href="#rates" data-cta="hero_rates">See hourly rates</a>
      </div>
      <dl class="st-facts">
        <div><dt>Floor</dt><dd>1,500 sq ft</dd></div>
        <div><dt>Capacity</dt><dd>40 guests max</dd></div>
        <div><dt>Open</dt><dd>6 AM–10 PM all week</dd></div>
        <div><dt>Rate</dt><dd>from ${inr(STUDIO.rates.weekdayDay)}/hr</dd></div>
      </dl>
    </div>
    <div class="st-hero__media">${carousel()}</div>
  </div>
</section>

<section class="st-band" aria-labelledby="st-uses">
  <div class="st-wrap">
    <h2 id="st-uses">One room, four ways to use it</h2>
    <ul class="st-uses">${uses.map((u, i) => `<li class="st-card"><span class="st-num st-mono">0${i + 1}</span><h3>${u.t}</h3><p>${u.d}</p><p class="st-meta st-mono">${u.m.join(' · ')}</p></li>`)}</ul>
  </div>
</section>

<section class="st-band st-band--alt" id="rates" aria-labelledby="st-rates-h">
  <div class="st-wrap">
    <h2 id="st-rates-h">Hourly rates</h2>
    <p class="st-sub">Weekdays before 5 PM are the best value. The rate is set by the start of your booking.</p>
    ${ratesTable()}
    <ul class="st-notes">
      <li>1-hour minimum for practice, 3-hour minimum for events.</li>
      <li>${inr(STUDIO.deposit)} refundable deposit for parties and events.</li>
      <li>18% GST extra where applicable.</li>
    </ul>
  </div>
</section>

<section class="st-band" aria-labelledby="st-pkg">
  <div class="st-wrap">
    <h2 id="st-pkg">Packages</h2>
    <ul class="st-packages">${packages.map((p) => html`<li class="st-card st-pkg${p.hl ? ' is-hl' : ''}">
      ${p.hl ? '<span class="st-badge st-mono">Fixed price</span>' : ''}
      <h3>${p.name}</h3>
      <p class="st-meta st-mono">${p.meta}</p>
      <p class="st-price">${p.price}<small> ${p.unit}</small></p>
      ${p.alt ? `<p class="st-price-alt">${p.alt}</p>` : ''}
      <ul class="st-ticks">${p.gets.map((g) => `<li>${icon(I.check)}${g}</li>`)}</ul>
      <a class="st-btn ${p.hl ? 'st-btn--primary' : 'st-btn--ghost'}" href="#book" data-cta="package" data-purpose="${p.purpose}">Request this</a>
    </li>`)}</ul>
  </div>
</section>

<section class="st-band st-band--alt" aria-label="What you get and house rules">
  <div class="st-wrap st-two">
    <div>
      <h2>What you get</h2>
      <ul class="st-ticks st-ticks--big">${gets.map((g) => `<li>${icon(I.check)}${g}</li>`)}</ul>
    </div>
    <div>
      <h2>House rules</h2>
      <ul class="st-rules">${rules.map((g) => `<li>${icon(I.x)}${g}</li>`)}</ul>
    </div>
  </div>
</section>

<section class="st-band" id="book" aria-labelledby="st-book-h">
  <div class="st-wrap st-book">
    <div>
      <h2 id="st-book-h">Request a booking</h2>
      <p class="st-sub">Pick a time and we confirm availability on WhatsApp. Nothing is booked or charged until we reply.</p>
      ${STUDIO_WA ? `<p class="st-mono st-phone">WhatsApp ${phoneDisplay}</p>` : ''}
    </div>
    <form class="st-form" data-studio-form novalidate>
      <label class="st-field st-field--full"><span>What is it for?</span>
        <select name="purpose" required>
          <option>Dance practice</option><option>Birthday party</option><option>Yoga batch</option><option>Workshop / creative shoot</option><option>Brand / commercial shoot</option>
        </select>
      </label>
      <label class="st-field"><span>Date</span><input type="date" name="date" required></label>
      <label class="st-field"><span>Start time</span><input type="time" name="start" value="10:00" min="06:00" max="21:00" step="1800" required></label>
      <label class="st-field"><span>Hours</span><input type="number" name="hours" value="2" min="1" max="16" inputmode="numeric" required></label>
      <label class="st-field"><span>People</span><input type="number" name="people" value="10" min="1" max="40" inputmode="numeric" required></label>
      <label class="st-field st-field--full"><span>Your name</span><input name="name" autocomplete="name" required></label>
      <div class="st-estimate st-field--full" aria-live="polite">
        <p class="st-mono">Estimate</p>
        <p class="st-estimate__total" data-total>–</p>
        <p class="st-estimate__how" data-how></p>
        <p class="st-estimate__warn" data-warn hidden></p>
      </div>
      <p class="st-err st-field--full" data-err role="alert" hidden></p>
      <button class="st-btn st-btn--primary st-field--full" type="submit">${STUDIO_WA ? `${icon(I.wa)} Send on WhatsApp` : 'Prepare my message'}</button>
      <div class="st-msg st-field--full" data-msg hidden>
        <p>${STUDIO_WA ? 'WhatsApp should have opened. If it didn\'t, copy this message and send it to us:' : 'Copy this message and send it to us:'}</p>
        <pre data-msg-text></pre>
        <button type="button" class="st-btn st-btn--ghost" data-copy>${icon(I.copy)} Copy message</button>
      </div>
    </form>
  </div>
</section>

<section class="st-band st-band--alt" aria-labelledby="st-faq-h">
  <div class="st-wrap st-narrow">
    <h2 id="st-faq-h">Questions</h2>
    <div class="st-faq">${faqs.map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`)}</div>
  </div>
</section>`;

function render(page) {
  const url = `${SITE_URL}${page.path}`;
  return html`<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#24206b">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${STUDIO.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_IN">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Manrope:wght@400;500;700&family=IBM+Plex+Mono:wght@500&display=swap">
<link rel="stylesheet" href="/assets/css/studio.css">
${photos.length ? `<link rel="preload" as="image" href="/assets/img/studio/${photos[0][0]}.webp" fetchpriority="high">` : ''}
${analytics()}
${schema(page)}
</head>
<body class="studio">
<a class="st-skip" href="#main">Skip to content</a>
<header class="st-top">
  <div class="st-wrap st-top__in">
    <a class="st-mark" href="/studio" aria-label="${STUDIO.name} home"><span class="st-mark__dot" aria-hidden="true"></span>Poorvam <b>Studio</b></a>
    <a class="st-btn st-btn--primary st-btn--sm" href="#book" data-cta="header">Check a slot</a>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="st-foot">
  <div class="st-wrap st-foot__in">
    <div>
      <p class="st-mark st-mark--foot">Poorvam <b>Studio</b></p>
      <p>${esc(P1.street)}, Bengaluru ${P1.postalCode}</p>
      <p>Open ${STUDIO.hoursDisplay}.</p>
    </div>
    <div>
      ${STUDIO_WA ? `<p><a href="https://wa.me/${STUDIO_WA}" target="_blank" rel="noopener" data-cta="footer_wa">WhatsApp ${phoneDisplay}</a></p>` : '<p>Send a booking request from the form above.</p>'}
      <p><a href="${P1.mapUrl}" target="_blank" rel="noopener">Directions on Google Maps</a></p>
      <p class="st-mono st-foot__small">A separate space with its own entrance at the Poorvam Care building.</p>
    </div>
  </div>
</footer>
${clientConfig()}
<script src="/assets/js/studio.js" defer></script>
</body>
</html>
`;
}

export const studioPage = {
  path: '/studio',
  title: 'Hall for Rent by the Hour in Electronic City | Poorvam Studio',
  description: '1,500 sq ft AC hall with a mirror wall for rent by the hour in Hulimangala, Electronic City Phase 1. Dance practice, yoga batches, kids\' birthdays. From ₹500/hr.',
  prices: true,
  llms: false,
  changefreq: 'monthly',
  priority: 0.6,
  faqs: [],
  body,
  render,
};
