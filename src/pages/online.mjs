import { html, bookButton, whatsappButton, breadcrumb, byline, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../ui.mjs';
import { STATS, DIRECTOR, ONLINE, LOCATIONS } from '../site.mjs';

/*
 * The online therapy hub, plus the blocks the three country pages share.
 * Online is not a local service: every /online page sets `local: false` and
 * mentions Bengaluru only as where the team is based.
 */

const PATH = '/online';
const REVIEWED = '2026-10-11';
export const ONLINE_REVIEWED = REVIEWED;
export const SESSION_MINUTES = 45;

/** The one booking call every online page uses; the sheet asks for the country and gates the US and Canada. */
export const bookOnline = (label = 'Book an online consultation') => bookButton(label, 'speech', 'btn btn--ink', 'online');

/** "English, Hindi, Kannada, Tamil, Telugu and Malayalam" */
export const languageList = (langs = ONLINE.languages) => `${langs.slice(0, -1).join(', ')} and ${langs[langs.length - 1]}`;
const LANG_CODES = { English: 'en', Hindi: 'hi', Kannada: 'kn', Tamil: 'ta', Telugu: 'te', Malayalam: 'ml' };

/** The four therapies offered online, each in the colour its therapy owns site-wide. */
export const DISCIPLINES = [
  { href: '/online/speech-therapy', icon: 'speech', tone: 'blue', title: 'Speech and language therapy', text: 'Late talking, unclear speech, language delay, stammering, and communication for autistic children.' },
  { href: '/online/occupational-therapy', icon: 'hand', tone: 'green', title: 'Occupational therapy', text: 'Sensory strategies, fine motor skills, handwriting, self-care routines and regulation, coached through you.' },
  { href: '/online/behavioural-therapy', icon: 'blocks', tone: 'sky', title: 'Behaviour therapy and parent training', text: 'ABA-informed help with meltdowns, transitions, sleep, toileting and daily routines, delivered by coaching you.' },
  { href: '/online/special-education', icon: 'book', tone: 'teal', title: 'Special education', text: 'Remedial teaching for reading, writing and maths difficulties, including dyslexia and ADHD.' },
];
export const disciplineCards = () => cards(DISCIPLINES, { cols: 4 });

/** What a parent sees on their phone. Grounded in the parent view families already use. */
export const PARENT_VIEW = [
  { icon: 'calendar', tone: 'blue', title: 'Your schedule, always visible', text: 'See every upcoming session, and book or reschedule yourself, without phone tag.' },
  { icon: 'check', tone: 'green', title: 'The actual therapy goals', text: 'Written down and tracked, not a vague "she\'s doing well".' },
  { icon: 'book', tone: 'sky', title: 'Session notes and reports', text: 'What happened in each session and how your child is progressing.' },
  { icon: 'home', tone: 'teal', title: 'Home practice, spelled out', text: 'The activities to do between sessions, with instructions, because most progress happens at home.' },
  { icon: 'chat', tone: 'aqua', title: 'Your therapist, a message away', text: 'Ask a question between sessions instead of saving it for the next one.' },
  { icon: 'shield', tone: 'blue', title: 'Billing you can check', text: 'Sessions attended, what has been paid and what is outstanding. No surprises at month end.' },
];
export function parentViewBand(lede = 'You get a live view of your child\'s therapy on your phone, not a word at the end of a call.') {
  return html`<section class="band">
  <div class="wrap">
    ${head('You shouldn\'t have to guess how therapy is going', lede)}
    ${cards(PARENT_VIEW, { cols: 3 })}
  </div>
</section>`;
}

/** What one online session looks like, start to finish. */
export const sessionSteps = () => steps([
  ['Join from home', 'Open the video link on a laptop, tablet or phone, in a quiet room.'],
  ['Therapy, live', 'The therapist works with your child one to one. You sit alongside.'],
  ['Coaching you', 'For OT and behaviour goals, the therapist coaches you to run each activity.'],
  ['A plan to keep', 'Every session ends with a written summary and a home activity plan.'],
]);

export const sessionWeek = () => weekPlan({
  tone: 'blue',
  session: [`${SESSION_MINUTES} minutes, live and one to one`, 'Activities built around your child\'s goals', 'The last minutes on what to practise'],
  home: ['A home activity plan after every session', 'Short practice inside meals, baths and play', 'Notes and messages on your phone'],
});

/** Device and room. The same four things whichever country you live in. */
export const setupCards = () => cards([
  { icon: 'video', tone: 'blue', title: 'A laptop or tablet, ideally', text: 'A bigger screen lets your child see the therapist\'s mouth and materials. A phone works if that is what you have.' },
  { icon: 'globe', tone: 'blue', title: 'A stable connection', text: 'Home broadband or a steady mobile signal, so the video does not freeze mid-activity.' },
  { icon: 'home', tone: 'blue', title: 'A quiet room', text: `Few toys in view, the TV off, and no one else needing the room for ${SESSION_MINUTES} minutes.` },
  { icon: 'users', tone: 'blue', title: 'You, close by', text: 'With younger children a parent stays in the room throughout, to help them engage and to learn the practice.' },
], { cols: 4 });

/** From booking to weekly therapy. `when` says when the consultation happens in the family's own time. */
export const startSteps = (when = 'in your time zone') => steps([
  ['Book online', 'Tell us your child\'s age, what you are seeing and which country you live in.'],
  ['We call you back', 'Within one working day, by phone or WhatsApp, to find a time that suits you.'],
  ['Consultation call', `A short call ${when}. We say honestly whether online suits your child.`],
  ['Assessment over video', 'The therapist works with your child while you watch, then proposes goals.'],
  ['Weekly sessions', `${SESSION_MINUTES} minutes at a regular time, with goals reviewed with you.`],
]);

/** What each therapy does well on video, and where a room is better. */
export function fitTable() {
  const rows = [
    ['Speech and language', 'Works well. Results comparable to in-person for most goals.', 'Feeding and swallowing, which need hands-on assessment.'],
    ['Behaviour and parent training', 'Works well. You use the strategies every day; we coach you.', 'Decided case by case on the consultation call.'],
    ['Special education', 'Close to format-neutral for reading, writing and maths.', 'Little difference for most children.'],
    ['Occupational therapy', 'Works as parent coaching: sensory, routines, fine motor.', 'Goals needing hands-on assessment or clinic equipment.'],
    ['Children under three', 'Often best through you, coached by the therapist.', 'Some engage better with a therapist in the room.'],
  ];
  return html`<div class="table-wrap"><table>
    <thead><tr><th scope="col">Therapy</th><th scope="col">How it works online</th><th scope="col">When a room is better</th></tr></thead>
    <tbody>${rows.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`)}</tbody>
    <caption>Telepractice evidence: ASHA Practice Portal, "Telepractice". The consultation call checks what applies to your child.</caption>
  </table></div>`;
}

/**
 * The Service node every online page emits. Same types as the React site
 * (Service, ServiceChannel, Offer without a price, Country), so the rich
 * result signals carry over. No price: it is discussed on the call.
 */
export function onlineServiceSchema({ path, name, description, countries, serviceType = 'Online paediatric therapy' }) {
  const url = urlOf(path);
  const areaServed = countries.map((c) => ({ '@type': 'Country', name: c }));
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    serviceType,
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    areaServed,
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
      availableLanguage: ONLINE.languages.map((l) => ({ '@type': 'Language', name: l, alternateName: LANG_CODES[l] })),
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      description: `${SESSION_MINUTES}-minute live online session`,
      url,
      areaServed,
    },
  };
}

const MARKET_INFO = {
  india: { icon: 'pin', tone: 'blue', text: 'Sessions 9 am to 8 pm, India time. RCI is the registration that applies in India.' },
  australia: { icon: 'globe', tone: 'green', text: 'Sessions 3 pm to 8 pm, your local time. Self- and plan-managed NDIS families can use us.' },
  uae: { icon: 'globe', tone: 'teal', text: 'Sessions 3 pm to 8 pm, UAE time. India is only 90 minutes ahead.' },
};

const faqs = [
  {
    q: 'Where are your therapists based?',
    a: `In Bengaluru, India. We say so up front. Every therapist is registered with the Rehabilitation Council of India (RCI), the statutory registration body for the profession in India, and the team has ${STATS.years} years of clinical experience, led by <a href="/about">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}.`,
  },
  {
    q: 'Which countries do you serve?',
    a: 'Families living in <a href="/online/india">India</a>, <a href="/online/australia">Australia</a> and <a href="/online/uae">the UAE</a>, across all four online therapies. Elsewhere it depends on local rules for therapists, which vary a great deal. Tell us your country when you book and we will confirm straight away whether we can help.',
  },
  {
    q: 'How much does it cost?',
    a: 'Fees depend on your country, the type of therapy and how often your child needs sessions, so we explain them on the first call once we understand your child\'s needs, rather than quoting a number that may not apply to you. You have a clear figure before you commit to anything, and there is no package you must buy up front.',
  },
  {
    q: 'Is online therapy actually effective?',
    a: 'It depends on the therapy. Speech and language therapy and caregiver-led behaviour work have strong telehealth evidence, with results comparable to in-person sessions. Special education is close to format-neutral. Occupational therapy works well as parent coaching, but not for goals that need hands-on assessment or clinic equipment. If online is not right for your child, we will tell you on the consultation call.',
  },
  {
    q: 'What languages do you work in?',
    a: `${languageList()}. For a bilingual child this is a clinical matter, not a convenience: a child assessed only in English can look delayed when they are developing typically across two languages, which leads to both over-diagnosis and missed diagnosis.`,
  },
  {
    q: 'How long is an online session?',
    a: `${SESSION_MINUTES} minutes, live and one to one over video. Each session ends with a written summary and a home activity plan, which you can also see in the parent view on your phone.`,
  },
  {
    q: 'What do I need at home for online therapy?',
    a: 'A laptop or tablet is best, because your child can see the therapist\'s mouth and materials clearly. A phone works if that is what you have. You also need a reasonably stable connection and a quiet room, and with younger children a parent stays in the room.',
  },
  {
    q: 'We live near Electronic City. Can we mix online and centre sessions?',
    a: `Yes. Many families near our ${LOCATIONS.map((l) => l.name).join(' and ')} centres do the assessment in person and part of the weekly therapy online. Your therapist plans both from the same goals. <a href="/contact">See both centres</a>.`,
  },
];

export default {
  path: PATH,
  photo: 'online',
  title: 'Online Therapy for Children | Speech, OT & ABA | Poorvam Care',
  description: 'Live online speech therapy, occupational therapy, behaviour therapy and special education for children in India, Australia and the UAE. RCI-registered therapists.',
  reviewed: REVIEWED,
  local: false,
  current: PATH,
  breadcrumb: [['Online therapy', PATH]],
  faqs,
  schema: [
    onlineServiceSchema({
      path: PATH,
      name: 'Online therapy for children: speech, occupational, behaviour and special education',
      description: 'Live online speech therapy, occupational therapy, behaviour therapy and special education for children, delivered by RCI-registered therapists based in Bengaluru.',
      countries: ONLINE.markets.map((m) => m.name),
    }),
  ],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Online therapy', PATH]])}
    <h1>Online therapy for children, wherever you are</h1>
    <p class="answer">Poorvam Care's RCI-registered therapists, based in Bengaluru, run live one-to-one video sessions in speech therapy, occupational therapy, behaviour therapy and special education for children in India, Australia and the UAE, in English or five Indian languages, with you involved throughout.</p>
    <div class="phero__acts">${bookOnline()}${whatsappButton('Hi Poorvam Care, I would like to know about online therapy for my child.')}</div>
    ${stats([
      { label: 'Countries we serve', value: String(ONLINE.markets.length), tone: 'blue' },
      { label: 'Minutes per session', value: String(SESSION_MINUTES), tone: 'green' },
      { label: 'Languages', value: String(ONLINE.languages.length), tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Where are you based?', 'Session times and the rules that apply differ by country. Pick yours.')}
    ${cards(ONLINE.markets.map((m) => ({ ...MARKET_INFO[m.id], href: m.page, title: `Online therapy in ${m.name}` })), { cols: 3 })}
    ${callout('Not available in the United States or Canada', `Licensure for therapy follows where the child lives, not where the therapist is. Our therapists are registered in India, so we cannot work with families living in the ${ONLINE.blocked.join(' or ')}.`, 'info')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What we offer online', 'Four therapies. Each page is honest about what works over video and what really needs a room.')}
    ${disciplineCards()}
    <p class="mt-2">Families near Bengaluru can also come to a centre for <a href="/occupational-therapy-for-children-bangalore">occupational therapy</a>, <a href="/speech-therapy-for-autism-bangalore">speech therapy for autism</a>, <a href="/speech-therapy-for-speech-delay-bangalore">speech delay</a> or <a href="/therapeutic-enrichment">therapeutic enrichment groups</a>.</p>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Does online therapy work for every child?', 'Not every therapy moves to video the same way. Here is where it works, and where a room is better.')}
    ${fitTable()}
    ${more('What if online is not right for my child?', '<p>The consultation call exists partly so we can say so. Feeding and swallowing difficulties need someone in the room, and some children under three engage better face to face. If we think your child would do better in person, we will tell you, and suggest finding a therapist locally rather than taking a booking we do not think will help.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What an online session looks like', `${SESSION_MINUTES} minutes, live, with you beside your child. Then a plan for the week.`)}
    ${sessionSteps()}
    ${sessionWeek()}
  </div>
</section>

${parentViewBand()}

<section class="band band--paper">
  <div class="wrap">
    ${head('How to start online therapy', 'From booking to a weekly slot, in five steps.')}
    ${startSteps()}
    <div class="phero__acts mt-2">${bookOnline()}<a class="btn btn--line" href="/about">Meet the team</a></div>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online therapy: questions')}
${ctaBand('Start with a consultation call', 'Tell us about your child and where you live. We call back within one working day and say honestly whether online therapy fits.')}
`,
};
