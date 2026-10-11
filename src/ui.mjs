/**
 * Visual building blocks for content pages.
 *
 * The rule these exist to enforce: a page shows before it tells. Milestones
 * are a ladder, sound ages are a chart, short facts are tiles, and long
 * explanations fold behind "Read more". Pages compose these instead of
 * writing paragraphs, so every page reads the same way on a phone.
 */

import { html, esc, icon } from './layout.mjs';

const TONES = ['blue', 'mint', 'violet', 'sun', 'pink', 'coral'];
const tone = (t, i) => (TONES.includes(t) ? t : TONES[i % TONES.length]);

/** Section heading with an optional one-line lede. */
export function head(h2, lede = '', { center = false, id = '' } = {}) {
  return `<div class="section-head${center ? ' section-head--center' : ''}"${id ? ` id="${id}"` : ''}><h2>${h2}</h2>${lede ? `<p class="lede">${lede}</p>` : ''}</div>`;
}

/** Icon cards. items: { icon, title, text, tone?, href? } */
export function cards(items, { cols = 3, compact = false } = {}) {
  return html`<ul class="cards cards--${cols}${compact ? ' cards--compact' : ''}">${items.map((it, i) => {
    const inner = `<span class="cards__ico">${icon(it.icon ?? 'check')}</span><strong>${it.title}</strong>${it.text ? `<span>${it.text}</span>` : ''}`;
    return `<li class="tone-${tone(it.tone, i)}">${it.href ? `<a href="${it.href}">${inner}</a>` : `<div>${inner}</div>`}</li>`;
  })}</ul>`;
}

/** Big-number facts. items: { value, label, tone? } */
export function stats(items) {
  // A value that is words, not a figure, gets a calmer size so it doesn't shout.
  const isText = (v) => String(v).replace(/<[^>]+>/g, '').length > 12 && !/^[₹\d]/.test(String(v));
  return html`<dl class="stats">${items.map((s, i) => `<div class="tone-${tone(s.tone, i)}"><dt>${s.label}</dt><dd${isText(s.value) ? ' class="is-text"' : ''}>${s.value}</dd></div>`)}</dl>`;
}

/** A collapsible "read more" for the detail a few readers want. Crawlers still read it. */
export function more(label, inner) {
  return `<details class="more"><summary>${esc(label)}</summary><div class="more__body">${inner}</div></details>`;
}

/** Two columns: words on one side, a visual on the other. */
export function split(text, visual, { reverse = false } = {}) {
  return `<div class="media${reverse ? ' media--rev' : ''}"><div class="media__text">${text}</div><div class="media__vis">${visual}</div></div>`;
}

/** Callout with an icon. kind: 'warn' | 'info' | 'good' */
export function callout(title, text, kind = 'info') {
  const ico = { warn: 'shield', info: 'chat', good: 'check' }[kind] ?? 'chat';
  return `<div class="callout callout--${kind}"><span class="callout__ico">${icon(ico)}</span><div><strong>${title}</strong><p>${text}</p></div></div>`;
}

/** A real sequence of 3–5 steps. items: [title, text] */
export function steps(items) {
  return html`<ol class="steps">${items.map(([t, s]) => `<li><strong>${t}</strong><span>${s}</span></li>`)}</ol>`;
}

/** Red flags as a list of dots: things a parent can check against their own child. */
export function signs(items) {
  return html`<ul class="signs">${items.map((s) => `<li>${s}</li>`)}</ul>`;
}

/**
 * Talking milestones most children reach by each age, from the CDC's 2022
 * "Learn the Signs. Act Early." checklists (the age at which 75% of children
 * do it, so missing one is a reason to ask, not a diagnosis).
 */
export const MILESTONES = [
  { age: '12 months', short: '1 yr', words: 'Waves bye-bye. Calls a parent "mama" or "dada". Understands "no".' },
  { age: '18 months', short: '18 mo', words: 'Tries to say three or more words besides "mama" or "dada". Follows a one-step instruction without a gesture.' },
  { age: '2 years', short: '2 yrs', words: 'Says at least two words together, like "more milk". Points to things in a book when you name them.' },
  { age: '30 months', short: '2½ yrs', words: 'Says about 50 words. Uses an action word in a two-word phrase, like "doggie run".' },
  { age: '3 years', short: '3 yrs', words: 'Holds a back-and-forth of at least two turns. Asks who, what, where or why.' },
  { age: '4 years', short: '4 yrs', words: 'Says sentences of four or more words. Tells you one thing that happened during the day.' },
  { age: '5 years', short: '5 yrs', words: 'Tells a story with at least two events. Keeps a conversation going for three or more turns.' },
];

/** Milestones as a ladder: each rung an age, the bubble what most children say by then. */
export function milestoneLadder({ highlight = '' } = {}) {
  return html`<figure class="mladder" data-reveal>
    <ol>${MILESTONES.map((m, i) => `<li class="${m.age === highlight ? 'is-hl' : ''}" style="--n:${i}"><b>${m.age}</b><span class="mladder__bubble">${esc(m.words)}</span></li>`)}</ol>
    <figcaption>What most children (three in four) do by each age. Source: CDC "Learn the Signs. Act Early." milestones, 2022. Missing one is a reason to ask, not a diagnosis.</figcaption>
  </figure>`;
}

/**
 * The age by which 90% of English-speaking children say each consonant
 * clearly, from McLeod & Crowe (2018), a review of 27 languages. Shown as
 * bars so a parent can find "s" or "r" and see whether their child is early,
 * on time or past the age most children have it.
 */
export const SOUND_AGES = [
  { band: 'By 3 years', from: 2, to: 3, sounds: ['p', 'b', 'm', 'd', 'n', 'h', 't', 'k', 'g', 'w', 'ng', 'f', 'y'] },
  { band: 'By 4 years', from: 3, to: 4, sounds: ['l', 'j', 'ch', 's', 'v', 'sh', 'z'] },
  { band: 'By 5 years', from: 4, to: 5, sounds: ['r', 'zh'] },
  { band: 'By 7 years', from: 5, to: 7, sounds: ['th (thin)', 'th (this)'] },
];

export function soundAgeChart() {
  const max = 7;
  const pct = (v) => ((v - 2) / (max - 2)) * 100;
  return html`<figure class="sounds" data-reveal>
    <div class="sounds__axis" aria-hidden="true">${[2, 3, 4, 5, 6, 7].map((a) => `<span style="left:${pct(a)}%">${a} yrs</span>`)}</div>
    <ol>${SOUND_AGES.map((b, i) => `<li class="tone-${['blue', 'mint', 'violet', 'pink'][i]}" style="--from:${pct(b.from)}%;--to:${pct(b.to)}%;--n:${i}">
      <strong>${b.band}</strong>
      <span class="sounds__bar"><i></i></span>
      <span class="sounds__set">${b.sounds.map((s) => `<em>${esc(s)}</em>`).join('')}</span>
    </li>`)}</ol>
    <figcaption>The age by which 90% of children say each English consonant clearly. Source: McLeod &amp; Crowe (2018), American Journal of Speech-Language Pathology. Children learning two languages may reach some sounds a little later.</figcaption>
  </figure>`;
}

/** A therapy's weekly rhythm: what happens in the room, and what happens at home. */
export function weekPlan({ session, home, tone: t = 'blue' }) {
  return html`<div class="week tone-${t}">
    <div class="week__col"><span class="week__ico">${icon('users')}</span><strong>In the session</strong><ul class="ticks">${session.map((s) => `<li>${s}</li>`)}</ul></div>
    <div class="week__col"><span class="week__ico">${icon('home')}</span><strong>At home, between sessions</strong><ul class="ticks">${home.map((s) => `<li>${s}</li>`)}</ul></div>
  </div>`;
}
