import { html, esc, bookButton, callButton, whatsappButton, breadcrumb, serviceList, centreCard, ctaBand, faqSection, icon } from '../layout.mjs';
import { head, stats, callout, steps, more, split } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, AREAS, FAR_AREAS, ONLINE, SERVICES } from '../site.mjs';

const PATH = '/electronic-city-phase-2';
const L = LOCATIONS[1];
const OTHER = LOCATIONS[0];
const here = AREAS.filter((a) => a.centre === L.id);
const there = AREAS.filter((a) => a.centre === OTHER.id);
const names = (list) => list.map((a) => a.name);
const chip = (a) => (a.page ? `<li><a href="${a.page}">${esc(a.name)}</a></li>` : `<li>${esc(a.name)}</li>`);
const directions = (cls = 'btn btn--line') => `<a class="${cls}" href="${L.mapUrl}" target="_blank" rel="noopener" data-track="directions">${icon('route')}<span>Directions</span></a>`;

const faqs = [
  {
    q: 'Where exactly is the Phase 2 centre?',
    a: `In Ananth Nagar, Electronic City Phase 2: ${L.street}, Bengaluru ${L.postalCode}. Look for the Bata showroom near the Phase 2 main road; the centre is on the floor above it, opposite Udupi Aaradhya restaurant. <a href="${L.mapUrl}" target="_blank" rel="noopener">Open it in Google Maps</a> for turn-by-turn directions.`,
  },
  {
    q: 'Is there a lift at the Phase 2 centre?',
    a: `No. The centre is up a flight of stairs and there is no lift. If you are coming with a pram, a wheelchair or a child who can't manage stairs, book at our <a href="${OTHER.page}">Phase 1 centre on Hulimangla Road</a>, which has a lift and offers the same therapies, the same team and the same hours.`,
  },
  {
    q: 'What are the timings of the Phase 2 centre?',
    a: `${HOURS.display}. ${HOURS.closedDisplay}. Both centres keep the same hours, and you can ask for after-school times when you book.`,
  },
  {
    q: 'Which centre is closer for me, Phase 1 or Phase 2?',
    a: `Phase 2 is usually closer for ${names(here).slice(1).join(', ')}. Phase 1 on Hulimangla Road is usually closer for ${names(there).slice(1, 8).join(', ')} and HSR Layout. Families from Hosa Road and Bommanahalli use both. If you are unsure, tell us where you live when we call and we will suggest one.`,
  },
  {
    q: 'What should I bring to the first visit?',
    a: 'Bring any reports you already have (from your paediatrician, a hearing test, school or another therapist), a short note of what you have noticed and when it started, and a snack or a favourite toy. Plan for your child to play while the therapist watches and talks with you. Both parents are welcome.',
  },
  {
    q: 'What therapies are available at the Phase 2 centre?',
    a: `All six: speech therapy, occupational therapy, behaviour therapy (ABA), special education, therapeutic enrichment groups and parent counselling, for children aged ${STATS.ages}. The team is led by ${DIRECTOR.name}, ${DIRECTOR.credentials}, with ${STATS.years} years in practice, and works from one plan for your child.`,
  },
  {
    q: 'Can I book online sessions instead of coming to the centre?',
    a: `Yes. Many families start with an assessment at the centre, then do some weekly sessions online on the days travel is hard. Online sessions are live video, 45 minutes long, with the same therapists. <a href="${ONLINE.page}">How online therapy works</a>.`,
  },
];

export default {
  path: PATH,
  title: 'Speech Therapy & Child Development Centre Electronic City Phase 2',
  description: 'Poorvam Care in Ananth Nagar, Electronic City Phase 2: speech therapy, OT, ABA and special education for ages 2–14. Above the Bata showroom, open Mon–Sat.',
  current: '/contact',
  breadcrumb: [['Centres', '/contact'], ['Electronic City Phase 2', PATH]],
  faqs,
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Centres', '/contact'], ['Electronic City Phase 2', PATH]])}
    <h1>Speech therapy &amp; child development centre, Electronic City Phase 2</h1>
    <p class="answer">Poorvam Care's Phase 2 centre is in Ananth Nagar, above the Bata showroom and opposite Udupi Aaradhya. It is open ${HOURS.display}. Speech therapy, OT, ABA and special education for children aged ${STATS.ages}. The centre is up a flight of stairs, with no lift.</p>
    <div class="phero__acts">${bookButton('Book at Phase 2', '', 'btn btn--ink', L.id)}${directions()}${callButton()}</div>
    ${stats([
      { label: 'Open', value: 'Mon–Sat, 9–7', tone: 'blue' },
      { label: 'Access', value: 'Stairs, no lift', tone: 'teal' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'green' },
      { label: 'Therapies here', value: String(SERVICES.length), tone: 'sky' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Where is the Phase 2 centre?', 'In Ananth Nagar, on the floor above the Bata showroom, near the Electronic City Phase 2 main road.')}
      <ul class="ticks">
        <li>Above the Bata showroom, which you can see from the road</li>
        <li>Opposite Udupi Aaradhya restaurant</li>
        <li>Well connected to Hosa Road and Bommanahalli</li>
      </ul>
      ${more('How to get there', `<p>From Hosa Road or Bommanahalli, head towards the Electronic City Phase 2 main road in Ananth Nagar. The centre is upstairs, above the Bata showroom, opposite Udupi Aaradhya restaurant. If you are coming by auto or cab, give the driver "Bata showroom, Ananth Nagar". For live directions from where you are, use the Directions button.</p>`)}
      <div class="phero__acts mt-2">${whatsappButton(`Hi Poorvam Care, I would like to visit the Phase 2 centre.`, 'btn btn--wa')}</div>`, centreCard(L, { map: true }))}
    ${callout('Coming with a pram or a wheelchair?', `The Phase 2 centre is reached by stairs only. There is no lift. Our <a href="${OTHER.page}">Phase 1 centre on Hulimangla Road</a> has a lift, the same therapists and the same hours.`, 'info')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapies at the Phase 2 centre', `Every therapy we offer runs here, led by ${DIRECTOR.name} and the same RCI-registered team as Phase 1.`)}
    ${serviceList()}
    ${more('About this centre', `<p>The Phase 2 centre in Ananth Nagar is one of two Poorvam Care centres in Electronic City. ${DIRECTOR.name}, ${DIRECTOR.credentials}, leads the team, with ${STATS.years} years in practice and more than ${STATS.families.replace('+', '')} families seen across south Bengaluru. Children here work on autism, speech delay, ADHD, developmental delay and learning differences.</p><p>Parents are part of every plan. You see what happens in each session, get home practice you can fit around school and meals, and follow goals, session notes and the schedule on your phone. Read more <a href="/about">about the team</a>, or <a href="/therapeutic-enrichment">the enrichment groups</a>.</p>`)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Your first visit to Phase 2', 'Four steps from your first call to weekly sessions.')}
    ${steps([
      ['Tell us what you\'ve noticed', `Book online, call or WhatsApp ${CONTACT.phoneDisplay}.`],
      ['We call you back', 'Within one working day, to understand your child and pick a time.'],
      ['Assessment at Phase 2', 'A therapist plays with your child and talks with you about what they see.'],
      ['A plan, then weekly sessions', 'Clear goals, how often to come, and sessions of 45 to 60 minutes.'],
    ])}
    <div class="phero__acts">${bookButton('Book at Phase 2', '', 'btn btn--ink', L.id)}<a class="btn btn--line" href="/child-development">How an assessment works</a></div>
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Neighbourhoods closest to Phase 2', 'Families come from across Electronic City and along Hosur Road. Here is which centre is usually nearer.')}
    <div class="areas">
      <div class="areas__col">
        <h3>Closest to Phase 2</h3>
        <ul>${here.map(chip)}</ul>
      </div>
      <div class="areas__col">
        <h3><a href="${OTHER.page}">Closer to Phase 1</a></h3>
        <ul>${there.map(chip)}</ul>
      </div>
      <div class="areas__col areas__col--home">
        <h3>Further away?</h3>
        <p>From ${FAR_AREAS.map((a) => `<a href="${a.page}">${esc(a.name)}</a>`).join(' or ')}, many families start with an assessment at a centre, then do part of the weekly therapy online.</p>
        <a class="btn btn--line btn--on-ink btn--sm" href="${ONLINE.page}">${icon('video')}<span>How online therapy works</span></a>
      </div>
    </div>
  </div>
</section>

${faqSection(faqs, 'Visiting the Phase 2 centre: questions')}
${ctaBand('Book a visit to the Phase 2 centre', 'Tell us what you have noticed. We call back within one working day to plan the first assessment in Ananth Nagar.')}
`,
};
