import { html, bookButton, whatsappButton, breadcrumb, byline, faqSection, ctaBand } from '../../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../../ui.mjs';
import { STATS, ONLINE } from '../../site.mjs';
import { onlineSchema, parentViewSection, marketsSection, otherOnline } from './speech-therapy.mjs';

const PATH = '/online/behavioural-therapy';
const TONE = 'violet';
const DESCRIPTION = 'Online behavioural therapy and ABA-informed parent training for meltdowns, transitions, sleep, toileting and routines. Weekly 45-minute live sessions.';

const faqs = [
  {
    q: 'Is this ABA therapy?',
    a: 'It is ABA-informed, but it is not intensive one-to-one ABA. We offer behavioural consultation and structured parent training based on the principles of applied behaviour analysis, usually one session a week, with you using the strategies between sessions. Intensive ABA programmes of 20 to 40 hours a week are an in-person model and we do not offer them online. If that is what your child needs, we say so and help you look for it locally. In Bengaluru, see <a href="/aba-therapy-for-children-bangalore">ABA therapy at our centres</a>.',
  },
  {
    q: 'Does behavioural therapy work over video?',
    a: 'For the parent-training model, yes. It has some of the strongest evidence for online delivery of any therapy we offer, particularly for autistic children. The reason is simple: the strategies were always going to be used by you at home, not by a therapist in a clinic, so coaching you over video does not remove anything essential. What it cannot do is manage a crisis in the moment or give intensive direct teaching.',
  },
  {
    q: 'Does my child need to attend the sessions?',
    a: 'Often not, or only briefly. Much of this work is done with you. For some goals the therapist will want to see your child, during a transition, a mealtime or play, either live or through a short video you record. Unlike speech therapy, your child does not need to sit at a screen for 45 minutes, which is a relief for families whose child finds that hard.',
  },
  {
    q: 'My child hasn\'t been diagnosed. Can we still get help?',
    a: 'Yes. You do not need a diagnosis to get behavioural support, and many families we work with do not have one. Some are waiting for an assessment, some have decided not to pursue one. We work with the behaviour in front of us. If something suggests a formal assessment by a developmental paediatrician would help, we tell you and explain why, without pressure.',
  },
  {
    q: 'How long until we see a change?',
    a: 'It depends on the behaviour. A well-defined pattern, like one difficult transition or a bedtime routine, usually changes sooner than a longstanding or complex one. Progress is rarely a straight line: things often get a little worse for a while when a strategy first changes, and that is expected. Anyone promising a fixed timeline before assessing your child is guessing, so we track progress against written goals instead.',
  },
  {
    q: 'Can both parents join the sessions?',
    a: 'Yes, and we encourage it. Different responses from different carers are one of the most common reasons behaviour plans fail: a strategy used by one parent and not the other usually changes nothing, or makes things worse. Grandparents and other regular carers are welcome too where it is practical.',
  },
  {
    q: 'Is online behaviour support suitable for autistic children?',
    a: 'Yes. Parent-led behaviour support over video is especially well studied for autistic children. The aim is not to change who your child is, but to build communication, cut frustration and make daily routines easier for everyone. Many autistic children also need speech therapy; see <a href="/speech-therapy-for-autism-bangalore">speech therapy for autism</a>.',
  },
  {
    q: 'How much does online behavioural therapy cost?',
    a: 'Fees depend on how many sessions a week your family needs. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts.',
  },
];

const works = [
  { icon: 'heart', title: 'Meltdowns and tantrums', text: 'What sets them off, what keeps them going, and how to calm things down.' },
  { icon: 'route', title: 'Transitions', text: 'Leaving the house, ending screen time, changing from one activity to the next.' },
  { icon: 'clock', title: 'Sleep and bedtime', text: 'A bedtime routine that holds, and less resistance at lights out.' },
  { icon: 'home', title: 'Toileting and mealtimes', text: 'Toilet training and calmer meals, worked on at home where they happen.' },
  { icon: 'chat', title: 'Communication over frustration', text: 'Giving your child a way to ask, so behaviour does not have to.' },
  { icon: 'users', title: 'Waiting and turn-taking', text: 'Following instructions, waiting and sharing, in small steps.' },
];

const who = [
  { icon: 'heart', title: 'You, in every session', text: 'The plan is built around what you can do at home, so you are always there.' },
  { icon: 'users', title: 'Both parents', text: 'Encouraged. The same response from both of you is what makes a plan work.' },
  { icon: 'home', title: 'Grandparents and carers', text: 'Welcome where practical, so everyone at home does the same thing.' },
  { icon: 'child', title: 'Your child, sometimes', text: 'Briefly, live or through a short phone video, when the therapist needs to see a moment.' },
];

export default {
  path: PATH,
  title: 'Online Behavioural Therapy & Parent Training for Children',
  description: DESCRIPTION,
  reviewed: '2026-10-11',
  current: ONLINE.page,
  local: false,
  breadcrumb: [['Online therapy', ONLINE.page], ['Behavioural therapy online', PATH]],
  faqs,
  schema: [onlineSchema({ path: PATH, name: 'Online behavioural therapy and parent training for children', serviceType: 'Online behavioural consultation and parent training (ABA-informed)', description: DESCRIPTION })],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Online therapy', ONLINE.page], ['Behavioural therapy online', PATH]])}
    <h1>Online behavioural therapy and parent training</h1>
    <p class="answer">Online behaviour therapy is mostly parent training, and that works well. A therapist helps you understand meltdowns, transitions, sleep and toileting, then coaches you weekly on strategies that hold up at home. Intensive ABA and crisis support need someone in person.</p>
    <div class="phero__acts">${bookButton('Book an online consultation', 'aba', 'btn btn--ink', 'online')}${whatsappButton('Hi Poorvam Care, I would like to know about online behaviour support for my child.', 'btn btn--line')}</div>
    ${stats([
      { label: 'Each online session', value: '45 min', tone: 'violet' },
      { label: 'Who the sessions are for', value: 'Mostly parents', tone: 'blue' },
      { label: 'Open to families in', value: ONLINE.markets.map((m) => m.name).join(', '), tone: 'mint' },
      { label: 'Therapists', value: 'RCI registered', tone: 'sun' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What online behaviour support helps with', 'Behaviour rarely happens on schedule in a therapy room. It happens at home, so that is where we work.')}
    ${cards(works.map((w) => ({ ...w, tone: TONE })), { cols: 3 })}
    ${more('Why parent training translates so well to video', `<p>Behaviour difficulties happen at 7 am when the shoes go on, at bedtime, in the supermarket, when a routine changes without warning. Support that trains the person who is there for those moments was always going to happen at home, so video loses very little.</p>
      <p>Of the therapies we offer online, this one has arguably the strongest research behind remote delivery. Parent-led behaviour support over video has been studied widely, particularly for autistic children, and results compare well with clinic-based support.</p>
      <p>What we offer is ABA-informed behavioural consultation and structured parent training, usually weekly. That is what most families are looking for when they describe the problems they face.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What works online, and what needs someone in person', 'We would rather tell you the limits now than have you find them three sessions in.')}
    <div class="table-wrap"><table>
      <thead><tr><th>What your family needs</th><th>Online</th><th>In person</th></tr></thead>
      <tbody>
        <tr><td>Meltdowns and transitions</td><td>Works well through parent training</td><td>Not needed</td></tr>
        <tr><td>Sleep, toileting and mealtimes</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Understanding why a behaviour happens</td><td>Works well, through your account and short videos</td><td>Not needed</td></tr>
        <tr><td>Intensive ABA, 20 to 40 hours a week</td><td>Not offered online</td><td>An in-person programme</td></tr>
        <tr><td>Self-injury or a safety risk</td><td>Not suitable on its own</td><td>Needs a professional who can be present</td></tr>
        <tr><td>Managing a crisis as it happens</td><td>Not suitable</td><td>Needs someone physically there</td></tr>
        <tr><td>Behaviour at school</td><td>Not suitable</td><td>Needs a classroom observation</td></tr>
      </tbody>
      <caption>How we decide at the consultation. We tell you plainly if online is not the right fit.</caption>
    </table></div>
    ${callout('This model depends on practice between sessions', 'The strategies work when they are used every day at home. If that is not possible for your family right now, tell us, and we will talk through what else could help.', 'info')}
    ${callout('Get help now if your child is at risk of harm', 'If your child is seriously hurting themselves or others, see a paediatrician or child psychiatrist in person promptly, as well as starting behaviour support.', 'warn')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('How online behavioural support works', 'Weekly 45-minute video sessions, built on what actually happens in your home.')}
    ${steps([
      ['Tell us about your child', 'Your child\'s age, what is happening and where you live.'],
      ['We get in touch', 'We call or WhatsApp within one working day to find a time.'],
      ['Assessment conversation', 'With you, not your child: when it happens, what comes before and after.'],
      ['A plan for the cause', 'Strategies aimed at why the behaviour happens, not just what it looks like.'],
      ['Weekly sessions', 'What worked, what did not, adjust, and agree the next step.'],
    ])}
    ${weekPlan({
      tone: TONE,
      session: ['Going through the week: what happened, what helped', 'Adjusting the plan, and practising the next step together', 'Agreeing exactly what everyone at home will do'],
      home: ['The same response from every carer, every time', 'A short phone video of a hard moment, if useful', 'Goals and notes on your phone to track change'],
    })}
    ${more('More about the first session and the plan', `<p>The first session is an assessment conversation with you. We want to understand the behaviour in detail: when it happens, what comes just before, what happens afterwards, what you have tried and what did or did not help. If you are comfortable, short phone videos of the behaviour tell us far more than a description can.</p>
      <p>The plan targets the reason for the behaviour rather than its surface. A child who melts down at bedtime and a child who melts down when a routine changes may look the same and need entirely different strategies. Guessing at that is why generic advice from the internet so often fails.</p>
      <p>Progress is tracked against written goals rather than impressions, so you can see whether things are really improving.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('Who joins the sessions', 'Everyone who cares for your child is welcome. A plan only works when everyone does the same thing.')}
    ${cards(who.map((w) => ({ ...w, tone: TONE })), { cols: 4 })}
  </div>
</section>

${parentViewSection(TONE)}

${marketsSection('Who can book online behavioural therapy', 'Sessions are open to families living in India, Australia and the UAE. The team is based in Bengaluru.', TONE)}

<section class="band band--paper">
  <div class="wrap">
    ${head('Other therapies we offer online', 'Many children need more than one kind of help. Online therapists share one plan and one record.')}
    ${otherOnline(PATH, { title: 'ABA at our centres', text: 'In Bengaluru? See the same team in person in Electronic City.', href: '/aba-therapy-for-children-bangalore' })}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online behavioural therapy: questions')}
${ctaBand('Book an online consultation', `Tell us about your child. We call or WhatsApp within one working day to find a time that suits your time zone. Ages ${STATS.ages}.`)}
`,
};
