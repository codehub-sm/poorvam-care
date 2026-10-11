import { html, breadcrumb, byline, whatsappButton, ctaBand, faqSection } from '../../layout.mjs';
import { head, cards, stats, callout, more, split } from '../../ui.mjs';
import { STATS, DIRECTOR, ONLINE, LOCATIONS } from '../../site.mjs';
import {
  ONLINE_REVIEWED, SESSION_MINUTES, bookOnline, languageList, disciplineCards, parentViewBand,
  sessionSteps, sessionWeek, setupCards, startSteps, onlineServiceSchema,
} from '../online.mjs';

const PATH = '/online/india';
const TRAIL = [['Online therapy', '/online'], ['India', PATH]];

const faqs = [
  {
    q: 'Is online therapy available anywhere in India?',
    a: `Yes. Families anywhere in India can book, from a metro or a small town, as long as you have a stable connection. Every therapist is registered with the Rehabilitation Council of India (RCI), the statutory registration for this profession in India, so no other licence is needed for a child living in India.`,
  },
  {
    q: 'How much does online therapy cost?',
    a: 'Fees depend on the type of therapy and how often your child needs sessions, so we explain them on the first call once we understand your child\'s needs, rather than quoting a figure that may not apply to you. There is no package you have to buy into, no minimum number of sessions, and you have a clear figure before you commit to anything.',
  },
  {
    q: 'Which languages do you offer therapy in?',
    a: `${languageList()}. We match your child to a therapist who works in your home language. This matters clinically: a child's language can only be assessed accurately in the language they actually use, and assessing a Telugu-speaking child in English will understate what they can do.`,
  },
  {
    q: 'Do I need a computer, or will a phone work?',
    a: `A tablet or laptop is better, because the screen is bigger and your child can see the therapist's mouth and materials clearly. A phone works if that is what you have, and many families use one. What matters more is a reasonably stable connection and a quiet room where your child is not distracted for the ${SESSION_MINUTES} minutes.`,
  },
  {
    q: 'How long before we see progress?',
    a: 'It depends on your child\'s age, the kind of difficulty, and how regularly home practice happens between sessions. Your therapist sets two or three goals after the assessment and reviews them with you at set points, so you can see progress in writing. Be sceptical of anyone who promises a timeline before assessing your child, including us.',
  },
  {
    q: 'Is online therapy as good as coming to the centre?',
    a: `For most speech and language goals the evidence puts online therapy on par with in-person sessions. It is less suitable for feeding and swallowing difficulties, which need hands-on assessment, and some children under three engage better in a room with a therapist. If we think your child would do better in person, we will say so. If you are not near Bengaluru, we would rather suggest a therapist near you than take a booking we do not think will help.`,
  },
  {
    q: 'What times are online sessions in India?',
    a: 'Sessions run between 9 am and 8 pm, India time, so after-school slots are available, not only office hours. We try to keep the same slot every week, because a regular time helps a young child settle into therapy.',
  },
  {
    q: 'Can we come to a centre in Bengaluru as well?',
    a: `Yes. We have two centres in Electronic City, Bengaluru: <a href="${LOCATIONS[0].page}">${LOCATIONS[0].name}</a> and <a href="${LOCATIONS[1].page}">${LOCATIONS[1].name}</a>. Some families visiting Bengaluru do the assessment in person and continue online from home.`,
  },
];

const compare = [
  ['Travel', 'None. Therapy happens at home.', 'Often hours each way, or an overnight trip.'],
  ['How often', 'Weekly, at a regular slot.', 'Often slips to monthly, or stops.'],
  ['Language', 'Your home language, from six.', 'Whatever the centre offers.'],
  ['Home practice', 'Set in your own home, with your own toys.', 'Explained in a clinic, done later at home.'],
  ['Hands-on needs', 'Not suitable for feeding or swallowing.', 'Better for hands-on assessment.'],
];

export default {
  path: PATH,
  title: 'Online Therapy for Children in India | Speech & OT | Poorvam Care',
  description: 'Live online speech therapy, OT, behaviour therapy and special education for children anywhere in India. RCI-registered therapists, sessions in six languages.',
  reviewed: ONLINE_REVIEWED,
  local: false,
  current: '/online',
  breadcrumb: TRAIL,
  faqs,
  schema: [
    onlineServiceSchema({
      path: PATH,
      name: 'Online therapy for children in India',
      description: 'Live online speech therapy, occupational therapy, behaviour therapy and special education for children anywhere in India, by RCI-registered therapists, in English and five Indian languages.',
      countries: ['India'],
    }),
  ],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Online therapy for children in India</h1>
    <p class="answer">Poorvam Care's RCI-registered therapists give live one-to-one speech therapy, occupational therapy, behaviour therapy and special education over video to children anywhere in India. Sessions are ${SESSION_MINUTES} minutes, between 9 am and 8 pm, in English, Hindi, Tamil, Telugu, Kannada or Malayalam.</p>
    <div class="phero__acts">${bookOnline()}${whatsappButton('Hi Poorvam Care, I would like to know about online therapy for my child in India.')}</div>
    ${stats([
      { label: 'Session times, India time', value: '9 am – 8 pm', tone: 'blue' },
      { label: 'Minutes per session', value: String(SESSION_MINUTES), tone: 'mint' },
      { label: 'Languages', value: String(ONLINE.languages.length), tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Can my child have online therapy in India?', 'Yes, wherever you live in India. Here is what you should know before booking.')}
    ${cards([
      { icon: 'shield', title: 'RCI-registered therapists', text: `The statutory credential for this profession in India. The team has ${STATS.years} years of clinical experience.` },
      { icon: 'chat', title: 'Your home language', text: `Therapy in ${languageList()}.` },
      { icon: 'video', title: 'Phone, tablet or laptop', text: 'Any of them works with a stable connection. A bigger screen is better.' },
      { icon: 'book', title: 'A written plan every time', text: 'A summary and a home activity plan after every session.' },
      { icon: 'clock', title: 'After-school slots', text: 'Sessions between 9 am and 8 pm, India time, not only office hours.' },
      { icon: 'check', title: 'No minimum commitment', text: 'No package to buy into. You know the cost before you commit.' },
    ].map((c) => ({ ...c, tone: 'blue' })), { cols: 3 })}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Good therapy should not depend on your postcode', 'Children\'s speech therapy in India is concentrated in a few metros. Weekly therapy from home closes that gap.')}
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">What changes</th><th scope="col">Online from home</th><th scope="col">Travelling to a city centre</th></tr></thead>
      <tbody>${compare.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`)}</tbody>
    </table></div>
    ${more('Why weekly matters more than one long visit', `<p>Families in Tier 2 and Tier 3 cities often travel to Bengaluru, Chennai, Hyderabad or Mumbai for an assessment, then face the harder question of how to keep weekly therapy going from a few hundred kilometres away.</p>
      <p>What usually happens is that therapy becomes monthly, or stops. For a young child in the early intervention years, that gap matters more than most families are told. Steady practice over months drives progress; one intense visit does not make up for it.</p>
      <p>A weekly ${SESSION_MINUTES}-minute session from home is far easier to keep going for the months that real progress usually takes.</p>`)}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('Therapy in the language your family speaks', 'A child can only be assessed fairly in the language they actually use.')}
      <p>We match your child to a therapist who works in your home language. A Telugu-speaking child assessed in English will look less able than they are.</p>
      <p>Many children grow up with two languages. Learning two languages does not cause speech delay, and therapy can use both. <span class="muted">Source: ASHA, "Learning Two Languages".</span></p>`,
      stats(ONLINE.languages.map((l, i) => ({ label: 'Therapy in', value: l, tone: ['blue', 'mint', 'violet', 'sun', 'pink', 'blue'][i] }))).replace('<dl class="stats">', '<dl class="stats" style="grid-template-columns:repeat(2,minmax(0,1fr))">'))}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What an online session looks like', `${SESSION_MINUTES} minutes over video, with you beside your child. Then a plan for the week.`)}
    ${sessionSteps()}
    ${sessionWeek()}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What you need at home', 'No special equipment. Four things make a session work.')}
    ${setupCards()}
    ${callout('When a room is better', 'Feeding and swallowing difficulties need hands-on assessment, and some children under three engage better face to face. We will tell you on the consultation call if that is your child.', 'info')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapies available online in India', 'Each page is honest about what that therapy does well over video, and what needs a room.')}
    ${disciplineCards()}
  </div>
</section>

${parentViewBand()}

<section class="band band--paper">
  <div class="wrap">
    ${head('How to start', 'From booking to a weekly slot, in five steps.')}
    ${startSteps('at a time that suits you')}
    <p>Led by <a href="/about">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}. New to this? Read <a href="/child-development">how an assessment works</a> or <a href="/speech-therapy-for-speech-delay-bangalore">signs of speech delay</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online therapy in India: questions')}
${ctaBand('Start with a consultation call', 'Tell us about your child. We call back within one working day and say honestly whether online therapy fits.')}
`,
};
