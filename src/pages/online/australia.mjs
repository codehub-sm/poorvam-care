import { html, breadcrumb, byline, callButton, ctaBand, faqSection } from '../../layout.mjs';
import { head, cards, stats, callout, more } from '../../ui.mjs';
import { STATS, ONLINE } from '../../site.mjs';
import {
  ONLINE_REVIEWED, SESSION_MINUTES, bookOnline, languageList, disciplineCards, parentViewBand,
  sessionSteps, sessionWeek, setupCards, startSteps, onlineServiceSchema,
} from '../online.mjs';

const PATH = '/online/australia';
const TRAIL = [['Online therapy', '/online'], ['Australia', PATH]];

const faqs = [
  {
    q: 'Is it legal for an India-based therapist to treat my child in Australia?',
    a: 'For speech pathology, yes. Unlike medicine or psychology, speech pathology in Australia is a self-regulated profession. It is not registered under AHPRA, and there is no legal requirement for a practitioner to hold Australian registration to provide speech pathology services. Speech Pathology Australia membership is voluntary and works as a quality marker, not a licence. Our clinicians are registered with the Rehabilitation Council of India, the statutory registration body for speech-language pathologists in India.',
  },
  {
    q: 'Can I use my NDIS funding for this?',
    a: 'It depends on how your plan is managed. Self-managed participants can buy supports from any provider, including one overseas. Plan-managed participants can also use unregistered providers, as long as purchases stay within the NDIS price limits, which our fees do. Agency-managed (NDIA-managed) plans can only be used with NDIS-registered providers, and we are not one. If you are plan-managed, check with your plan manager before the first session; they may need a Statement by a Supplier form on file.',
  },
  {
    q: 'What times are sessions available?',
    a: 'Between 3 pm and 8 pm in your local time, which is morning and midday in India, so sessions after school work well. We do not ask families to take sessions at awkward hours to suit our time zone. If we cannot offer a slot that genuinely works for your child, we tell you on the consultation call, before anything starts.',
  },
  {
    q: 'Is online speech therapy actually as effective as in person?',
    a: 'For many speech and language goals, research shows results comparable to face-to-face therapy, particularly for language delay, articulation and phonology, stammering and social communication. Online is a weaker fit for feeding and swallowing difficulties, where hands-on assessment matters. If we think your child would be better served in person, we will say so on the consultation call, even when that means we are not the right provider for you.',
  },
  {
    q: 'What happens in the first session?',
    a: 'Before anything is booked, you have a consultation call with our team to talk through your concerns and decide whether online therapy suits your child. If you go ahead, the first session is an assessment: the therapist works with your child over video while you watch, then explains what they found and proposes goals. You get a written summary and a home activity plan after every session.',
  },
  {
    q: 'What do I need at home for an online session?',
    a: `A laptop or tablet with a camera is best; a phone works if that is what you have. You also need a reasonably stable connection and a quiet room for ${SESSION_MINUTES} minutes. With younger children a parent stays in the room, because a large share of progress comes from what you do between sessions.`,
  },
  {
    q: 'Do daylight saving changes affect our session time?',
    a: 'Your session stays at the same local time. India does not change its clocks, so when daylight saving starts in NSW, Victoria, Tasmania, the ACT or South Australia, we move our side by an hour and your child keeps the same after-school slot.',
  },
];

// Hours ahead of India (IST, UTC+5:30) in Australian standard time. IST has no daylight saving.
const ZONES = [
  ['Sydney, Melbourne, Canberra, Hobart', 'AEST', '10:30 am – 3:30 pm'],
  ['Brisbane', 'AEST, no daylight saving', '10:30 am – 3:30 pm'],
  ['Adelaide, Darwin', 'ACST', '11 am – 4 pm'],
  ['Perth', 'AWST, no daylight saving', '12:30 – 5:30 pm'],
];

const compare = [
  ['Self- or plan-managed NDIS', 'Can be used, within NDIS price limits.', 'Can be used.'],
  ['Agency-managed NDIS', 'Cannot be used. We are not NDIS-registered.', 'Can be used if the clinic is registered.'],
  ['Travel', 'None. Sessions at home after school.', 'Regional families may drive hours each way.'],
  ['Languages', 'English plus five Indian languages.', 'Varies by clinic.'],
  ['Feeding, swallowing, hands-on OT', 'Not suitable online.', 'Better in person.'],
];

export default {
  path: PATH,
  title: 'Online Therapy for Kids in Australia | Speech & OT | Poorvam Care',
  description: 'Live online speech therapy, OT and behaviour support for children in Australia, 3 pm to 8 pm your time. RCI-registered therapists; self- and plan-managed NDIS.',
  reviewed: ONLINE_REVIEWED,
  local: false,
  current: '/online',
  breadcrumb: TRAIL,
  faqs,
  schema: [
    onlineServiceSchema({
      path: PATH,
      name: 'Online therapy for children in Australia',
      description: 'Live online speech therapy, occupational therapy, behaviour support and learning support for children in Australia, by RCI-registered therapists, in Australian after-school hours.',
      countries: ['Australia'],
    }),
  ],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Online therapy for kids in Australia</h1>
    <p class="answer">Poorvam Care's RCI-registered therapists, based in Bengaluru, give live one-to-one speech therapy, occupational therapy, behaviour support and learning support over video to children in Australia. Sessions are ${SESSION_MINUTES} minutes, between 3 pm and 8 pm your time, and suit self- and plan-managed NDIS families.</p>
    <div class="phero__acts">${bookOnline()}${callButton()}</div>
    ${stats([
      { label: 'Session times, your local time', value: '3 pm – 8 pm', tone: 'blue' },
      { label: 'Minutes per session', value: String(SESSION_MINUTES), tone: 'mint' },
      { label: 'NDIS plans', value: 'Self- and plan-managed', tone: 'violet' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Can my child have online therapy in Australia?', 'Yes, if you are self- or plan-managed, or paying privately. Here is what applies before you book.')}
    ${callout('Speech pathology is self-regulated in Australia', 'It is not registered under AHPRA, so there is no Australian registration requirement for this service. Speech Pathology Australia membership is voluntary. Our clinicians are registered with the Rehabilitation Council of India.', 'good')}
    ${cards([
      { icon: 'check', title: 'Self-managed NDIS', text: 'You may buy supports from any provider, including one overseas.' },
      { icon: 'check', title: 'Plan-managed NDIS', text: 'You may use unregistered providers within NDIS price limits. Our fees sit within them.' },
      { icon: 'shield', title: 'Agency-managed NDIS', text: 'Only NDIS-registered providers can be used, and we are not one. Check your plan type first.' },
      { icon: 'clock', title: 'Australian afternoons', text: 'Sessions are set for your after-school hours, not Indian business hours.' },
    ].map((c) => ({ ...c, tone: 'mint' })), { cols: 4 })}
    ${more('Plan-managed? One thing to do first', '<p>Confirm the arrangement with your plan manager before the first session. They may need a Statement by a Supplier form on file, because we are an overseas provider that is not NDIS-registered.</p>')}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('When are sessions, in Australian time?', 'Always 3 pm to 8 pm where you live. That falls inside our working day in India.')}
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">Where you live</th><th scope="col">Time zone</th><th scope="col">Same window, India time</th></tr></thead>
      <tbody>${ZONES.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`)}</tbody>
      <caption>Australian standard time. From October to April, NSW, Victoria, Tasmania, the ACT and South Australia move clocks forward an hour; Queensland, the NT and WA do not. Your slot stays the same.</caption>
    </table></div>
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Online with us or a local clinic?', 'An honest comparison. For some children a local clinic is the better choice, and we will say so.')}
    <div class="table-wrap"><table>
      <thead><tr><th scope="col">Question</th><th scope="col">Online with Poorvam Care</th><th scope="col">A local clinic</th></tr></thead>
      <tbody>${compare.map(([a, b, c]) => `<tr><td>${a}</td><td>${b}</td><td>${c}</td></tr>`)}</tbody>
    </table></div>
    ${more('Why Australian families look at online therapy', `<p>Speech pathologists are on the Occupation Shortage List in every Australian state (Jobs and Skills Australia, 2025). That shortage shows up as waiting lists, in the public system and at many private clinics.</p>
      <p>Video removes the capacity limit: our clinicians are in Bengaluru, trained and registered to the standards that apply in India. It also removes the travel. For families in regional Australia, where the nearest children's speech pathologist may be hours away, that is often what makes weekly therapy possible at all.</p>
      <p>Fees are explained on the consultation call, once we understand your child's needs.</p>`)}
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
    <p>Therapy is in English, or in ${languageList(ONLINE.languages.slice(1))} if your family speaks one of them at home.</p>
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Therapies available online in Australia', 'Each page is honest about what that therapy does well over video, and what needs a room.')}
    ${disciplineCards()}
  </div>
</section>

${parentViewBand()}

<section class="band band--paper">
  <div class="wrap">
    ${head('How to start', 'From booking to a weekly slot, in five steps.')}
    ${startSteps('in your Australian afternoon or evening')}
    <p>The team has ${STATS.years} years of clinical experience. <a href="/about">Meet the team</a> or <a href="/online">see how online therapy works</a>.</p>
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online therapy in Australia: questions')}
${ctaBand('Start with a consultation call', 'Tell us about your child and your NDIS plan type. We call back within one working day and say honestly whether online therapy fits.')}
`,
};
