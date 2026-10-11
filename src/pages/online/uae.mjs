import { html, breadcrumb, byline, whatsappButton, ctaBand, faqSection } from '../../layout.mjs';
import { head, cards, stats, callout, more, split } from '../../ui.mjs';
import { STATS, ONLINE } from '../../site.mjs';
import {
  ONLINE_REVIEWED, SESSION_MINUTES, bookOnline, languageList, disciplineCards, parentViewBand,
  sessionSteps, sessionWeek, setupCards, startSteps, onlineServiceSchema,
} from '../online.mjs';

const PATH = '/online/uae';
const TRAIL = [['Online therapy', '/online'], ['UAE', PATH]];

const faqs = [
  {
    q: 'Can I claim this on my UAE health insurance?',
    a: 'No. This is a private-pay service and it is not billable to UAE health insurance. The mandatory basic package in Dubai excludes allied health services such as speech therapy in any case, and enhanced plans that do cover therapy require the provider to be DHA-licensed and usually need a physician referral. We would rather say this plainly than have you find out after starting therapy.',
  },
  {
    q: 'What languages do your therapists work in?',
    a: `${languageList()}. This matters for bilingual children. A child growing up between English and a home language often shows patterns that look like a delay when assessed only in English, but are typical for a bilingual learner. Assessing across both languages is the only reliable way to tell the difference, and a common reason bilingual children are over-diagnosed or missed.`,
  },
  {
    q: 'What times are sessions available?',
    a: 'Between 3 pm and 8 pm, UAE time. India is only 90 minutes ahead of Gulf Standard Time, which makes the UAE the easiest place for us to schedule. After-school and early-evening slots are straightforward, and we can usually offer the same time every week rather than moving your child around.',
  },
  {
    q: 'How does an online session actually work?',
    a: `You need a laptop or tablet with a camera, a reasonably stable connection and a quiet room. Sessions run ${SESSION_MINUTES} minutes over secure video. With younger children a parent stays in the room throughout, partly to help keep your child engaged and partly because much of the progress comes from what you do between sessions. Every session ends with a home activity plan and a written summary.`,
  },
  {
    q: 'Is online therapy suitable for my child?',
    a: 'It depends on the therapy and on your child. Speech and language therapy and caregiver-led behaviour work translate well to video, with results comparable to in-person sessions. Special education is close to format-neutral. Occupational therapy works well as parent coaching, but not for goals needing hands-on assessment or clinic equipment. Feeding and swallowing difficulties do need someone in the room. The consultation call tells you which applies, including when you should see someone locally in person.',
  },
  {
    q: 'How much does online therapy cost?',
    a: 'Fees depend on the type of therapy and how often your child needs sessions. We explain them on the consultation call, once we understand your child\'s needs, and you have a clear figure for your child\'s plan before you commit to anything.',
  },
  {
    q: 'Which parts of the UAE do you work with?',
    a: 'Families anywhere in the UAE, including Dubai, Abu Dhabi and Sharjah. The whole country is on Gulf Standard Time with no daylight saving, so your slot stays the same all year.',
  },
];

const compare = [
  ['Insurance', 'Private pay. Not billable to UAE insurance.', 'Enhanced plans may cover a DHA-licensed provider, usually with referral.'],
  ['Knowing the cost', 'A clear figure on the consultation call, before you commit.', 'Many clinics quote only after an assessment.'],
  ['Languages', 'English plus Hindi, Malayalam, Tamil, Telugu, Kannada.', 'Varies by clinic.'],
  ['Travel', 'None. Sessions at home after school.', 'A drive across the city each week.'],
  ['Feeding, swallowing, hands-on OT', 'Not suitable online.', 'Better in person.'],
];

export default {
  path: PATH,
  title: 'Online Child Therapy in UAE & Dubai | Speech & OT | Poorvam Care',
  description: 'Live online speech therapy, OT and behaviour support for children in the UAE, 3 pm to 8 pm Gulf time, in English, Hindi, Malayalam, Tamil, Telugu or Kannada.',
  reviewed: ONLINE_REVIEWED,
  local: false,
  current: '/online',
  breadcrumb: TRAIL,
  faqs,
  schema: [
    onlineServiceSchema({
      path: PATH,
      name: 'Online therapy for children in the UAE',
      description: 'Live online speech therapy, occupational therapy, behaviour support and learning support for children in the UAE, by RCI-registered therapists, in Gulf Standard Time.',
      countries: ['United Arab Emirates'],
    }),
  ],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Online child therapy in the UAE and Dubai</h1>
    <p class="answer">Poorvam Care's RCI-registered therapists, based in Bengaluru, give live one-to-one speech therapy, occupational therapy, behaviour support and learning support over video to children in the UAE. Sessions are ${SESSION_MINUTES} minutes, 3 pm to 8 pm UAE time, in English or your home language. It is private pay.</p>
    <div class="phero__acts">${bookOnline()}${whatsappButton('Hi Poorvam Care, I would like to know about online therapy for my child in the UAE.')}</div>
    ${stats([
      { label: 'Session times, UAE time', value: '3 pm – 8 pm', tone: 'blue' },
      { label: 'India is ahead by', value: '90 min', tone: 'mint' },
      { label: 'Languages', value: String(ONLINE.languages.length), tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Can my child have online therapy in the UAE?', 'Families across the UAE book with us. Here is what you should know before booking.')}
    ${cards([
      { icon: 'chat', title: 'Your family\'s language', text: `Therapy in ${languageList(['English', 'Hindi', 'Malayalam', 'Tamil', 'Telugu', 'Kannada'])}.` },
      { icon: 'check', title: 'A clear cost up front', text: 'Explained on the consultation call, before you commit. No assessment-first pricing reveal.' },
      { icon: 'clock', title: 'Gulf Standard Time', text: 'Sessions 3 pm to 8 pm, including evenings after school.' },
      { icon: 'shield', title: 'RCI-registered clinicians', text: `Registered with the Rehabilitation Council of India, with ${STATS.years} years of clinical experience.` },
    ].map((c) => ({ ...c, tone: 'sun' })), { cols: 4 })}
    ${callout('This is a private-pay service', 'It is not billable to UAE health insurance. Enhanced plans that cover therapy require a DHA-licensed provider and usually a physician referral.', 'info')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${split(`${head('The easiest time zone we work with', 'India is 90 minutes ahead of the UAE, so after-school slots line up neatly.')}
      <p>A 3 pm session in Dubai is 4:30 pm in Bengaluru; an 8 pm finish is 9:30 pm. The UAE has no daylight saving, so the same weekly slot holds all year.</p>`,
      stats([
        { label: 'Your session window, UAE time', value: '3 pm – 8 pm', tone: 'blue' },
        { label: 'Same window, India time', value: '4:30 – 9:30 pm', tone: 'mint' },
      ]))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Online with us or a clinic in the UAE?', 'An honest comparison. For some children an in-person clinic is the better choice.')}
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">Question</th><th scope="col">Online with Poorvam Care</th><th scope="col">A clinic in the UAE</th></tr></thead>
      <tbody>${compare.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`)}</tbody>
    </table></div>
    ${more('Why UAE families choose online therapy', `<p>Children's speech therapy in Dubai and Abu Dhabi is largely paid out of pocket. The mandatory basic health insurance package excludes allied health services, so unless a family holds an enhanced corporate plan, therapy is paid privately, and a year of weekly sessions adds up.</p>
      <p>Pricing is often opaque: many clinics do not publish rates, and the cost of the programme emerges after the assessment. We do it the other way round, with a clear figure for your child's plan on the consultation call.</p>
      <p>There is a language reason too. Many children in the UAE grow up between English and a home language such as Hindi, Malayalam, Tamil, Telugu or Kannada. Assessing a bilingual child accurately needs a clinician who understands both languages, or the home language gets mistaken for a delay. For a family raising a bilingual child in Dubai or Sharjah, that is often the difference between a useful assessment and a misleading one.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What an online session looks like', `${SESSION_MINUTES} minutes over secure video, with you beside your child. Then a plan for the week.`)}
    ${sessionSteps()}
    ${sessionWeek()}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What you need at home', 'No special equipment. Four things make a session work.')}
    ${setupCards()}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapies available online in the UAE', 'Each page is honest about what that therapy does well over video, and what needs a room.')}
    ${disciplineCards()}
  </div>
</section>

${parentViewBand()}

<section class="band band--paper">
  <div class="wrap">
    ${head('How to start', 'From booking to a weekly slot, in five steps.')}
    ${startSteps('in UAE time')}
    <p><a href="/about">Meet the team</a> or <a href="/online">see how online therapy works</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online therapy in the UAE: questions')}
${ctaBand('Start with a consultation call', 'Tell us about your child. We call back within one working day and say honestly whether online therapy fits.')}
`,
};
