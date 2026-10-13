import { html, bookButton, whatsappButton, breadcrumb, byline, faqSection, ctaBand } from '../../layout.mjs';
import { head, cards, stats, callout, steps, weekPlan, more } from '../../ui.mjs';
import { STATS, ONLINE } from '../../site.mjs';
import { onlineSchema, parentViewSection, marketsSection, otherOnline } from './speech-therapy.mjs';

const PATH = '/online/occupational-therapy';
const TONE = 'green';
const DESCRIPTION = 'Online occupational therapy for children, coached through you at home: sensory strategies, handwriting, self-care and regulation. 45-minute live sessions.';

const faqs = [
  {
    q: 'Can occupational therapy really be done online?',
    a: 'Yes, for many goals, but through parent coaching rather than the therapist working hands-on with your child. Research on online OT supports this model, especially for sensory strategies, fine motor skills, self-care routines and parent-led work. It is not suitable for goals that need physical handling or specialist equipment, and we tell you at the consultation which applies to your child.',
  },
  {
    q: 'What equipment or materials do I need?',
    a: 'Ordinary household items, almost always. You need a device with a camera, a stable connection and a space where your child can move a little. Before each session we send a short list of what to have ready: paper, crayons, a ball, cushions, kitchen items, whatever the session calls for. We build activities around what families already own, so you should not need to buy therapy equipment to make progress.',
  },
  {
    q: 'Do I need to be in the room the whole time?',
    a: 'Yes for younger children, and for most sensory and motor work at any age. This is how online OT works: the therapist coaches you, and you carry out the strategy with your child. Older children working on handwriting, organisation or study skills can often work more on their own, with you joining for the last few minutes to hear the plan.',
  },
  {
    q: 'My child has sensory processing difficulties. Can you help online?',
    a: 'Yes, and this is where online OT does especially well. Sensory difficulties show up at mealtimes, at bath time, in noisy rooms and while dressing, and a clinic visit rarely captures that. Seeing your home lets the therapist build a sensory plan around your real routines and triggers instead of a generic one. What we cannot give online is the hands-on physical input a therapist gives in the room.',
  },
  {
    q: 'How is this different from your speech therapy sessions?',
    a: 'Online speech therapy usually has the therapist working directly with your child through the screen, with you supporting. Online OT flips that: the therapist mostly coaches you, and you work with your child. Many families use both. When a child sees us for speech and OT, the two therapists share goals and notes in the same record, so the plans support each other.',
  },
  {
    q: 'Which countries do you offer online OT in?',
    a: `${ONLINE.markets.map((m) => m.name).join(', ').replace(/, ([^,]*)$/, ' and $1')}. Whether we can offer it elsewhere depends on local rules for health professionals, which vary a lot. Tell us where you live on the booking form and we confirm straight away whether we can help. See <a href="/online/india">India</a>, <a href="/online/australia">Australia</a> or <a href="/online/uae">the UAE</a> for details.`,
  },
  {
    q: 'Can we mix online OT with sessions at your centre?',
    a: 'Yes, if you live in or near Bengaluru. Some families start with an in-person assessment at one of our <a href="/occupational-therapy-for-children-bangalore">occupational therapy centres in Electronic City</a> for the hands-on checks, then do part of the weekly therapy online. The same therapist and plan carry across both.',
  },
  {
    q: 'How much does online occupational therapy cost?',
    a: 'Fees depend on how many sessions a week your child needs. We explain them on the first call, once we understand your child\'s needs, so you know the full cost before anything starts.',
  },
];

const works = [
  { icon: 'spark', title: 'Sensory needs', text: 'A sensory plan built around your real home, routines and triggers.' },
  { icon: 'hand', title: 'Fine motor and handwriting', text: 'Pencil grip, handwriting, scissors, buttons and laces.' },
  { icon: 'home', title: 'Self-care routines', text: 'Dressing, eating, brushing teeth and toileting, practised where they happen.' },
  { icon: 'heart', title: 'Calming and regulation', text: 'Strategies for big feelings, tried in the real moments they are needed.' },
  { icon: 'book', title: 'Ready for school', text: 'Play skills, attention and sitting at a table for longer.' },
  { icon: 'search', title: 'Setting up the space', text: 'Arranging the home or study corner so it helps your child.' },
];

const kit = [
  { icon: 'video', title: 'A device with a camera', text: 'Laptop or tablet, placed so the therapist can see your child move.' },
  { icon: 'globe', title: 'A stable connection', text: 'Enough for a steady video call for 45 minutes.' },
  { icon: 'home', title: 'Space to move a little', text: 'A cleared patch of floor, or the room where the routine happens.' },
  { icon: 'blocks', title: 'Ordinary household items', text: 'Paper, crayons, a ball, cushions, kitchen items. We send the list beforehand.' },
];

export default {
  path: PATH,
  title: 'Online Occupational Therapy for Children | Poorvam Care',
  description: DESCRIPTION,
  reviewed: '2026-10-11',
  current: ONLINE.page,
  local: false,
  breadcrumb: [['Online therapy', ONLINE.page], ['Occupational therapy online', PATH]],
  faqs,
  schema: [onlineSchema({ path: PATH, name: 'Online occupational therapy for children', serviceType: 'Online paediatric occupational therapy', description: DESCRIPTION })],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb([['Online therapy', ONLINE.page], ['Occupational therapy online', PATH]])}
    <h1>Online occupational therapy for children</h1>
    <p class="answer">Yes, for many goals, but it works differently. Online, an occupational therapist coaches you through sensory strategies, handwriting, dressing, mealtimes and calming, in the room where your child struggles. Hands-on checks and specialist equipment still need an in-person visit.</p>
    <div class="phero__acts">${bookButton('Book an online consultation', 'ot', 'btn btn--ink', 'online')}${whatsappButton('Hi Poorvam Care, I would like to know about online occupational therapy for my child.', 'btn btn--line')}</div>
    ${stats([
      { label: 'Each online session', value: '45 min', tone: 'green' },
      { label: 'Who works with your child', value: 'You, coached live', tone: 'blue' },
      { label: 'Open to families in', value: ONLINE.markets.map((m) => m.name).join(', '), tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What online occupational therapy helps with', 'For these goals, coaching at home is not a compromise. It is often where the work belongs.')}
    ${cards(works.map((w) => ({ ...w, tone: TONE })), { cols: 3 })}
    ${more('Why OT can work better at home', `<p>Rather than working hands-on with your child, the therapist watches and coaches you through each strategy, using the toys, furniture and routines you already have.</p>
      <p>A therapist watching your child try a real morning routine in a real bedroom learns more than from the same child in an unfamiliar clinic room. Sensory difficulties in particular show up in context: at the dinner table, in the bath, in a noisy room.</p>
      <p>It also puts the strategies in the hands of the person who is with your child all week. An OT sees your child for 45 minutes; you have the rest of the week. Parent-coached OT is built around that.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What works online, and what needs an in-person visit', 'We would rather tell you the limits now than have you find them three sessions in.')}
    <div class="table-wrap"><table>
      <thead><tr><th>Your child's need</th><th>Online</th><th>In person</th></tr></thead>
      <tbody>
        <tr><td>Sensory needs at home</td><td>Works well, built around your routines</td><td>For hands-on physical input</td></tr>
        <tr><td>Handwriting and fine motor</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Dressing, eating, toileting</td><td>Works well, practised where it happens</td><td>Not needed</td></tr>
        <tr><td>Calming and regulation</td><td>Works well</td><td>Not needed</td></tr>
        <tr><td>Muscle tone, reflexes, joint movement</td><td>Not suitable</td><td>Needs a hands-on assessment</td></tr>
        <tr><td>Swings, therapy balls, scooter boards</td><td>Not suitable</td><td>Needs specialist equipment</td></tr>
        <tr><td>Guiding your child's body directly</td><td>Not suitable</td><td>The therapist must be in the room</td></tr>
        <tr><td>Feeding with chewing or swallowing difficulty</td><td>Not suitable</td><td>Needs a hands-on feeding assessment</td></tr>
      </tbody>
      <caption>How we decide at the consultation. Children who cannot yet manage a screen for a while may also do better in person.</caption>
    </table></div>
    ${callout('Online OT is parent coaching', 'A parent is in the room for the whole session. That is not a weakness of the format: you deliver the strategy, and the therapist teaches and adjusts it live.', 'info')}
    ${callout('If your child needs to be seen in person', 'In Bengaluru, the same team sees children at our <a href="/occupational-therapy-for-children-bangalore">occupational therapy centres</a>. Anywhere else, we will say so on the consultation and help you look for someone local.', 'info')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What an online OT session looks like', 'Every session runs 45 minutes on a video call, with you beside your child.')}
    ${steps([
      ['Tell us about your child', 'Your child\'s age, what you are seeing and where you live.'],
      ['We get in touch', 'We call or WhatsApp within one working day to find a time.'],
      ['Assessment', 'You show the therapist how your child sits, grips, dresses and reacts. Then written goals.'],
      ['Weekly sessions', 'Review the week, try something new while the therapist watches, agree what next.'],
      ['Review', 'We check progress against the goals with you and move them on.'],
    ])}
    ${weekPlan({
      tone: TONE,
      session: ['How last week\'s strategies went, and what to change', 'A new activity you try while the therapist watches and corrects', 'Agreeing the one or two things to practise next'],
      home: ['Strategies folded into real routines: dressing, meals, bath', 'Short activities with things you already own', 'A written home plan and notes on your phone'],
    })}
    ${more('More about the first session', `<p>In the assessment the therapist asks you to show specific things: how your child sits at a table, holds a pencil, responds to a texture or sound, and what a difficult transition looks like. Often they will ask you to walk the camera around the room. You then get a written summary and the goals they propose.</p>
      <p>Every session ends with a written home plan in your parent view, alongside the goals and earlier notes, so nothing depends on what you remembered afterwards.</p>`)}
  </div>
</section>

<section class="band band--paper">
  <div class="wrap">
    ${head('What you need at home', 'We build sessions around what families already own. You should not need to buy therapy equipment.')}
    ${cards(kit.map((k) => ({ ...k, tone: TONE })), { cols: 4 })}
  </div>
</section>

${parentViewSection(TONE)}

${marketsSection('Who can book online occupational therapy', 'Sessions are open to families living in India, Australia and the UAE. The team is based in Bengaluru.', TONE)}

<section class="band band--paper">
  <div class="wrap">
    ${head('Other therapies we offer online', 'If your child sees us for more than one therapy, the therapists share goals and notes in one record.')}
    ${otherOnline(PATH, { title: 'OT at our centres', text: 'In Bengaluru? See the same team for hands-on OT in Electronic City.', href: '/occupational-therapy-for-children-bangalore' })}
    <div class="wrap--narrow">${byline('11 October 2026')}</div>
  </div>
</section>

${faqSection(faqs, 'Online occupational therapy: questions')}
${ctaBand('Book an online consultation', `Tell us about your child. We call or WhatsApp within one working day to find a time that suits your time zone. Ages ${STATS.ages}.`)}
`,
};
