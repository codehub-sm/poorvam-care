import { html, bookButton, callButton, breadcrumb, ctaBand, esc } from '../layout.mjs';
import { cards, stats } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, ONLINE, SUMMER_CAMP } from '../site.mjs';

const PATH = '/faq';
const CRUMB = [['Questions', PATH]];
const list = (xs) => xs.join(', ').replace(/, ([^,]*)$/, ' and $1');

const GROUPS = [
  {
    id: 'getting-started', title: 'Getting started', icon: 'search', tone: 'blue', blurb: 'When to ask, what the first visit is like, how to book.',
    faqs: [
      {
        q: 'What age should I start speech therapy for my child?',
        a: 'Earlier is easier, and support started before age 3 makes the most of a time when language grows fastest. Ask a speech-language pathologist if your child is not babbling by 12 months, not using single words by 18 months, or not joining two words by age 2. We see toddlers from 18 months, through play-based therapy that coaches you too. <a href="/early-intervention-for-toddlers-bangalore">Early intervention for toddlers</a>. <a href="/speech-therapy-for-speech-delay-bangalore">Read about speech delay</a>.',
      },
      {
        q: 'How do I know if my child needs occupational therapy?',
        a: 'Signs include trouble with fine motor tasks such as holding a pencil, strong reactions to textures or sounds, poor balance and coordination, difficulty with self-care like dressing or eating, and trouble focusing in class. An OT assessment at Poorvam Care shows which areas need support. <a href="/occupational-therapy-for-children-bangalore">More about occupational therapy</a>.',
      },
      {
        q: 'What happens at the first assessment?',
        a: 'A therapist plays with your child, watches how they talk, move and play, and asks what you have noticed at home. You then hear plainly whether therapy is needed, which kind, how often, and the two or three goals to start with. <a href="/child-development">How an assessment works</a>.',
      },
      {
        q: 'How do I book an appointment at Poorvam Care?',
        a: `Call ${CONTACT.phoneDisplay}, send a WhatsApp message to the same number, <a href="/book">book online</a>, or visit either centre in Electronic City Phase 1 or Phase 2. The team calls you back within one working day and schedules a time that suits you for the first visit.`,
      },
    ],
  },
  {
    id: 'therapies', title: 'Therapies', icon: 'blocks', tone: 'sky', blurb: 'Autism, speech or OT, enrichment and the summer camp.',
    faqs: [
      {
        q: 'Do you work with children with autism?',
        a: `Yes, it is one of our core areas. We offer speech therapy, ABA (Applied Behaviour Analysis), occupational therapy and special education for autistic children, all from one plan. The team, led by ${DIRECTOR.name} (${DIRECTOR.credentials.split(',')[0]}, ${DIRECTOR.years} years in practice), builds each plan around your child's needs and strengths. Therapy builds communication, skills and independence; autism is not something to cure. <a href="/speech-therapy-for-autism-bangalore">Speech therapy for autism</a>.`,
      },
      {
        q: 'What is the difference between speech therapy and occupational therapy?',
        a: 'Speech therapy works on communication: speaking clearly, understanding language and expressing yourself. Occupational therapy works on fine motor skills, sensory processing, coordination and daily living tasks. Many children benefit from both working together, which is why Poorvam Care offers them under one roof from one plan.',
      },
      {
        q: 'What is Therapeutic Enrichment at Poorvam Care?',
        a: 'Therapeutic enrichment is small-group sessions (sensory art, movement, therapeutic yoga, music and rhythm, and social skills groups) designed for children with developmental differences. They are not general activity classes: our therapy team runs them, and each session connects back to your child\'s own goals. <a href="/therapeutic-enrichment">More about enrichment</a>.',
      },
      {
        q: 'Do you run a summer therapy camp?',
        a: `Yes, every ${SUMMER_CAMP.months}. The camp has sensory art, therapeutic yoga, movement, music and rhythm, and social skills groups for children with autism, ADHD, speech delay and other developmental differences, led by our therapists. Call or WhatsApp ${CONTACT.phoneDisplay} for this year's dates.`,
      },
    ],
  },
  {
    id: 'centres-online', title: 'Centres and online', icon: 'pin', tone: 'green', blurb: 'Where we are, when we are open, and online sessions.',
    faqs: [
      {
        q: 'Where are your centres?',
        a: `Two centres in Electronic City, Bengaluru. ${LOCATIONS[0].name}: ${LOCATIONS[0].street}. ${LOCATIONS[0].access} ${LOCATIONS[1].name}: ${LOCATIONS[1].street}. ${LOCATIONS[1].access} Both offer the same therapies with the same team. <a href="/contact">Directions to both centres</a>.`,
      },
      {
        q: 'What are your opening hours?',
        a: `Both centres are open ${HOURS.display}. ${HOURS.closedDisplay}. After-school slots run from 4 to 7 pm.`,
      },
      {
        q: 'Do you offer online therapy?',
        a: `Yes, live 45-minute video sessions for families in ${list(ONLINE.markets.map((m) => m.name))}. We cannot see children living in the ${list(ONLINE.blocked)}, because therapy licensing follows where the child lives. Many Bengaluru families also mix online sessions with centre visits. <a href="/online">How online therapy works</a>.`,
      },
    ],
  },
  {
    id: 'cost', title: 'Cost and practicalities', icon: 'calendar', tone: 'teal', blurb: 'Fees, how many sessions, and how long each one is.',
    faqs: [
      {
        q: 'What is the cost of speech therapy in Bangalore?',
        a: `Fees depend on the therapy, how many sessions a week your child needs and whether some are online. Packages are available, from single sessions to regular monthly plans. We explain the full cost on the first call, once we understand your child's needs. Call ${CONTACT.phoneDisplay}.`,
      },
      {
        q: 'How many sessions does a child typically need?',
        a: 'It depends on your child\'s needs, how strong the difficulty is, and the goals. Many children come two or three times a week, and some need longer-term support than others. We review progress regularly, adjust the plan as your child moves on, and keep you informed at every step.',
      },
      {
        q: 'How long is each session?',
        a: 'Sessions at the centre are 45 to 60 minutes; online sessions run 45 minutes. The last few minutes are for showing you what was practised and what to do at home.',
      },
      {
        q: 'How will I know how therapy is going?',
        a: 'Families get a parent view on their phone with the schedule, the therapy goals, session notes, home practice, messages to the therapist and billing. Progress is also reviewed with you against the goals.',
      },
    ],
  },
];

const faqs = GROUPS.flatMap((g) => g.faqs);

export default {
  path: PATH,
  title: 'FAQ: Speech Therapy & Child Development Questions | Poorvam Care',
  description: 'Answers to common questions about speech therapy, occupational therapy, autism therapy and child development at Poorvam Care, Electronic City, Bangalore.',
  current: PATH,
  breadcrumb: CRUMB,
  faqs,
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(CRUMB)}
    <h1>Frequently asked questions</h1>
    <p class="answer">Answers to what parents most often ask us about speech therapy, occupational therapy, autism and child development at Poorvam Care: when to start, which therapy, our two Electronic City centres, online sessions, fees and booking.</p>
    <div class="phero__acts">${bookButton('Book a consultation', 'assessment', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Open', value: 'Mon–Sat', tone: 'blue' },
      { label: 'Hours', value: '9 am – 7 pm', tone: 'green' },
      { label: 'Ages we work with', value: STATS.ages, tone: 'sky' },
      { label: 'Call back within', value: '1 working day', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band band--paper band--tight" aria-label="Topics">
  <div class="wrap">
    ${cards(GROUPS.map((g) => ({ icon: g.icon, tone: g.tone, title: g.title, text: g.blurb, href: `#${g.id}` })), { cols: 4, compact: true })}
  </div>
</section>

${GROUPS.map((g, i) => `<section class="band${i % 2 ? ' band--paper' : ''}" id="${g.id}">
  <div class="wrap wrap--narrow">
    <h2>${esc(g.title)}</h2>
    <div class="faq">${g.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="faq__a"><p>${f.a}</p></div></details>`).join('')}</div>
  </div>
</section>`)}

${ctaBand('Still have a question?', 'Call or book a consultation and speak directly to our therapy team. We call back within one working day.')}
`,
};
