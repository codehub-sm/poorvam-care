import { html, bookButton, callButton, breadcrumb, byline, serviceList, centresBlock, areasBlock, ctaBand, faqSection, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, more, split, weekPlan, signs } from '../ui.mjs';
import { DIRECTOR, CONTACT, LOCATIONS, HOME_VISITS } from '../site.mjs';

const PATH = '/stammering-therapy-for-children-bangalore';
const REVIEWED = '2026-10-16';
const TRAIL = [['Speech therapy', '/speech-therapy-electronic-city'], ['Stammering', PATH]];

const faqs = [
  {
    q: 'Is stammering in toddlers normal?',
    a: 'Some repeating is common between ages 2 and 5, while language grows faster than the mouth can keep up. Many children who start stammering stop within a year or two. It is worth an assessment if it has lasted more than six months, if your child pushes, blinks or tenses to get words out, if they seem upset by it, or if someone in the family still stammers.',
  },
  {
    q: 'Will my child grow out of stammering?',
    a: 'Many children do: studies of young children who start to stammer find most stop within a few years, often without therapy. Nobody can tell in advance which children will. Children who have stammered for more than a year, started after age 3½, or have a parent who still stammers are less likely to stop on their own, and therapy is worth starting.',
  },
  {
    q: 'What is the difference between stammering and stuttering?',
    a: 'None. Stammering is the word used in India and the UK, and stuttering the word used in the US. Both mean speech that is interrupted by repeated sounds or words, stretched sounds, or moments where the word gets stuck.',
  },
  {
    q: 'How is stammering treated in children?',
    a: 'For children under about 6, the best-studied approaches are run mostly by parents, with a speech-language pathologist coaching them: short daily practice at home, and a calm, specific way of responding to smooth and bumpy speech. Older children also learn techniques for speaking more smoothly and work on confidence, so stammering stops deciding when they speak.',
  },
  {
    q: 'What should I do when my child stammers?',
    a: 'Wait for them to finish, keep looking at them, and respond to what they said, not how they said it. Avoid finishing their words or telling them to slow down or take a breath, which tends to make them more aware of it. Slowing your own speech a little and giving them unhurried time to talk each day helps.',
  },
  {
    q: 'Does stress or a new sibling cause stammering?',
    a: 'Stammering is not caused by anxiety or by anything a parent did. It runs in families and is linked to how the brain plans speech. Excitement, tiredness or being rushed can make it worse on a given day, which is why it often comes and goes.',
  },
  {
    q: 'How long does stammering therapy take?',
    a: 'It depends on your child\'s age, how long they have stammered and how much practice happens at home. Young children often need a few months of weekly sessions plus daily home practice, then less frequent check-ins. We set goals at the start and review progress with you regularly.',
  },
  {
    q: 'Can stammering therapy be done online or at home?',
    a: `Yes. Because so much of the work happens through parents, stammering therapy suits <a href="/online/speech-therapy">online speech therapy</a> well. For families living near our Electronic City centres, the speech-language pathologist can also <a href="${HOME_VISITS.page}">come to your home</a>. Fees are explained on the first call: ${CONTACT.phoneDisplay}.`,
  },
];

const when = [
  'It has lasted more than six months',
  'Your child pushes, blinks or tenses to get words out',
  'Words get completely stuck, with no sound coming out',
  'Your child avoids words, talking, or speaking at school',
  'They seem upset or embarrassed when it happens',
  'Someone in the family still stammers',
];

const kinds = [
  { icon: 'chat', title: 'Repeating', text: 'Sounds, syllables or words: "b-b-b-ball", "I-I-I want".', tone: 'blue' },
  { icon: 'speech', title: 'Stretching', text: 'Holding a sound for too long: "sssssun".', tone: 'blue' },
  { icon: 'shield', title: 'Getting stuck', text: 'A silent block, where the word will not come out.', tone: 'blue' },
];

export default {
  path: PATH,
  photo: 'speech',
  title: 'Stammering Therapy for Children in Bangalore | Poorvam Care',
  description: 'Stammering (stuttering) therapy for children in Electronic City, Bengaluru: when to worry, parent-led therapy for young children, and help for older kids.',
  reviewed: REVIEWED,
  current: PATH,
  breadcrumb: TRAIL,
  faqs,
  schema: [{
    '@type': ['MedicalTherapy', 'Service'],
    '@id': `${urlOf(PATH)}#service`,
    name: 'Stammering therapy for children in Bengaluru',
    alternateName: 'Stuttering therapy for children',
    serviceType: 'Speech-language therapy for stammering (stuttering)',
    url: urlOf(PATH),
    provider: { '@id': orgId },
    audience: { '@type': 'PeopleAudience', suggestedMinAge: 2, suggestedMaxAge: 14 },
    relevantSpecialty: 'SpeechPathology',
    areaServed: [...new Set([...LOCATIONS.flatMap((l) => l.nearby), 'Electronic City', 'Bengaluru'])].map((n) => ({ '@type': 'Place', name: n === 'Bengaluru' ? n : `${n}, Bengaluru` })),
    availableChannel: LOCATIONS.map((l) => ({ '@type': 'ServiceChannel', serviceLocation: { '@id': `${urlOf(l.page)}#business` } })),
  }],
  body: html`
<section class="phero">
  <div class="wrap">
    ${breadcrumb(TRAIL)}
    <h1>Stammering therapy for children in Bengaluru</h1>
    <p class="answer">Stammering (also called stuttering) is speech that gets interrupted by repeated sounds, stretched sounds or words that get stuck. Many young children grow out of it, but not all. Poorvam Care's speech-language pathologists in Electronic City assess your child, tell you whether to treat or watch, and coach you to help at home.</p>
    <div class="phero__acts">${bookButton('Book a speech assessment', 'speech', 'btn btn--ink')}${callButton()}</div>
    ${stats([
      { label: 'Usually starts', value: '2–5 years', tone: 'blue' },
      { label: 'Session length', value: '45–60 min', tone: 'green' },
      { label: 'Where', value: 'Centre, home or online', tone: 'sky' },
      { label: 'Therapists', value: 'RCI registered', tone: 'teal' },
    ])}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What stammering sounds like', 'Most children who stammer do one or more of these. It often comes and goes from week to week.')}
    ${cards(kinds, { cols: 3 })}
    ${more('Stammering or ordinary toddler repeating?', '<p>Most toddlers repeat whole words or phrases now and then, especially when excited: "I want, I want the ball". That is usual while language grows fast.</p><p>Repeating parts of words ("b-b-ball"), stretching sounds, getting stuck, or showing effort or frustration when talking is more typical of stammering. If you are unsure which you are hearing, a short phone video of your child talking helps the therapist a great deal.</p>')}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${split(`${head('When to book an assessment', 'One of these is a reason to ask. A young child who has only just started can usually be watched for a few months first.')}
      ${signs(when)}`, callout('Starting early helps', 'Therapy for young children who stammer works best before school age, while speech habits are still forming. An assessment tells you whether to start therapy now or watch with a plan.', 'good'))}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('What therapy looks like at each age', 'The younger your child, the more of the work happens through you.')}
    <div class="table-wrap"><table>
      <caption class="muted">How therapy is usually shaped. Your therapist adjusts this after the assessment.</caption>
      <thead><tr><th>Age</th><th>Focus</th><th>Your part</th></tr></thead>
      <tbody>
        <tr><td>2 to 6</td><td>Smoother speech through short daily practice and calm feedback</td><td>Most of it: a few minutes of practice a day, coached by the therapist</td></tr>
        <tr><td>7 to 11</td><td>Techniques for smoother speech, and talking about stammering openly</td><td>Practice at home, and a word with the teacher</td></tr>
        <tr><td>12 to 14</td><td>Techniques, confidence, and speaking in class and with friends</td><td>Support, and less pressure to sound fluent</td></tr>
      </tbody>
    </table></div>
    ${weekPlan({
      tone: 'blue',
      session: ['Play or conversation that gives your child a lot of talking time', 'Practising smoother speech, at your child\'s level', 'Time with you on what to practise this week'],
      home: ['A few minutes a day of the practice you were shown', 'Unhurried talking time, with you speaking a little slower', 'Notes and home activities on your phone'],
    })}
  </div>
</section>

<section class="band">
  <div class="wrap">
    ${head('Other help under one roof', 'Stammering sometimes comes with other speech or language needs. One team plans all of it together.')}
    ${serviceList('/speech-therapy-electronic-city')}
    <p class="mt-2">Stammering therapy is part of our <a href="/speech-therapy-electronic-city">speech therapy in Electronic City</a>, led by <a href="/about#${DIRECTOR.id}">${DIRECTOR.name}</a>, ${DIRECTOR.credentials}, with ${DIRECTOR.years} years in practice.</p>
    <div class="wrap--narrow">${byline('16 October 2026')}</div>
  </div>
</section>

${centresBlock('Stammering therapy at both Electronic City centres', 'Same speech-language pathologists and hours at both. Pick the one closer to home or school.')}
${areasBlock('Stammering help across south Bengaluru')}
${faqSection(faqs, 'Stammering: questions parents ask')}
${ctaBand('Worried about your child\'s stammering?', 'Book a speech assessment. We call back within one working day to plan the first visit.', 'speech')}
`,
};
