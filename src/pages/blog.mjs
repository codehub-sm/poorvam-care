import { html, bookButton, callButton, breadcrumb, ctaBand, icon, orgId, urlOf } from '../layout.mjs';
import { head, cards } from '../ui.mjs';
import { SITE_URL, BRAND, DIRECTOR } from '../site.mjs';
import { POSTS, CATEGORIES, postPath, authorNode } from './blog/posts.mjs';

const PATH = '/blog';
const fmt = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Topics as a parent thinks of them; autism and early development share a band. */
const GROUPS = [
  { id: 'speech', h2: 'Speech therapy guides', lede: 'Late talking, warning signs by age, and what speech therapy for autism involves.', cats: ['Speech therapy'] },
  { id: 'ot', h2: 'Occupational therapy guides', lede: 'How OT helps with sensory needs, motor skills and daily routines.', cats: ['Occupational therapy'] },
  { id: 'autism', h2: 'Autism and child development guides', lede: 'What ABA is, and why starting therapy early makes such a difference.', cats: ['Autism', 'Child development'] },
];

const card = (p) => {
  const c = CATEGORIES[p.category];
  return { href: postPath(p), icon: c.icon, tone: c.tone, title: p.h1, text: `${p.summary}<br><small class="muted">${p.category}. ${fmt(p.published)}</small>` };
};

const description = 'Guides for parents on speech therapy, occupational therapy, autism and child development, written by Poorvam Care\'s therapists in Electronic City, Bangalore.';

export default {
  path: PATH,
  title: 'Blog: Speech Therapy & Child Development Resources | Poorvam Care',
  description,
  current: PATH,
  breadcrumb: [['Guides for parents', PATH]],
  schema: [{
    '@type': 'Blog',
    '@id': `${urlOf(PATH)}#blog`,
    name: `${BRAND} guides for parents`,
    description,
    url: urlOf(PATH),
    inLanguage: 'en-IN',
    publisher: { '@type': 'Organization', '@id': orgId, name: BRAND },
    blogPost: POSTS.map((p) => ({
      '@type': 'BlogPosting',
      '@id': `${urlOf(postPath(p))}#article`,
      headline: p.h1,
      url: urlOf(postPath(p)),
      datePublished: p.published,
      dateModified: p.published,
      articleSection: p.category,
      author: authorNode(p.author),
      image: `${SITE_URL}/assets/img/og.png`,
    })),
  }],
  body: html`
<section class="phero" style="padding-bottom:clamp(7rem, 12vw, 9rem)">
  <div class="wrap">
    ${breadcrumb([['Guides for parents', PATH]])}
    <h1>Speech therapy and child development guides</h1>
    <p class="answer">Plain-language guides for parents on speech delay, occupational therapy, autism, ABA and early intervention. Each one is written or reviewed by ${DIRECTOR.name}, ${DIRECTOR.credentials}, and covers what is typical, the signs worth acting on, and what therapy involves.</p>
    <div class="phero__acts">${bookButton('Book a consultation', 'assessment')}${callButton()}</div>
  </div>
</section>

<nav class="quick" aria-label="Guide topics">
  <div class="wrap quick__grid">${GROUPS.map((g) => {
    const c = CATEGORIES[g.cats[0]];
    return `<a href="#${g.id}" style="--c:var(--${c.tone});--t:var(--t-${c.tone})"><span class="q-ico">${icon(c.icon)}</span><strong>${g.h2.replace(' guides', '')}</strong><span>${POSTS.filter((p) => g.cats.includes(p.category)).length} guides</span></a>`;
  })}<a href="/book?service=assessment" data-book="assessment" style="--c:var(--coral);--t:var(--t-coral)"><span class="q-ico">${icon('search')}</span><strong>Book an assessment</strong><span>Not sure what your child needs? Start here.</span></a></div>
</nav>

${GROUPS.map((g, i) => `<section class="band${i % 2 ? ' band--paper' : ''}">
  <div class="wrap">
    ${head(g.h2, g.lede, { id: g.id })}
    ${cards(POSTS.filter((p) => g.cats.includes(p.category)).map(card), { cols: g.cats.length > 1 || POSTS.filter((p) => g.cats.includes(p.category)).length === 2 ? 2 : 3 })}
  </div>
</section>`)}

${ctaBand('Have questions about your child?', 'Our therapists are here to help. Book a consultation at Poorvam Care in Electronic City, Bangalore, and we call back within one working day.')}
`,
};
