/**
 * "How words grow": the scroll story on the home page.
 *
 * One stage stays pinned while chapter cards scroll past. site.js sets
 * `data-ch` on the section as each card reaches mid-screen, and the CSS
 * decides what the stage shows in each chapter: what the child says, how many
 * words they have, and three bars for understanding, talking and clear sounds.
 *
 * The arc is the order language usually develops in (gesture, single words,
 * two-word phrases, sentences, conversation), not an outcome or a timeline we
 * promise. Nothing animates by itself, so with JS or motion off the cards
 * still read top to bottom and the stage is a still picture.
 */

import { html, bookButton } from './layout.mjs';

const CHAPTERS = [
  {
    say: 'Uh… uh…',
    note: 'pointing at the shelf',
    h: 'It starts with what you notice',
    p: 'Your child points, pulls your hand or cries for what they want. Other children their age are already using words, and relatives have started to ask.',
  },
  {
    say: 'ba… ba',
    note: 'understands more than they can say',
    h: 'An assessment finds the gap',
    p: 'A therapist plays with your child and checks three things separately: how much they understand, how much they say, and how clearly. Often understanding is ahead of talking, and that shapes the plan.',
  },
  {
    say: 'Ball',
    note: 'a first clear word',
    h: 'A plan for the room and for home',
    p: 'Weekly sessions target one or two goals at a time. You leave each session with one routine to use at home, at bath time, meals or play, because that is where most practice happens.',
  },
  {
    say: 'More ball',
    note: 'two words together',
    h: 'Words start to join up',
    p: 'Single words become pairs: "more ball", "daddy go". The therapist moves the goal on as soon as one is steady, and tells you what to listen for next.',
  },
  {
    say: 'I want the red ball',
    note: 'a whole sentence',
    h: 'Sentences, and fewer tears',
    p: 'When a child can say what they want, a lot of the frustration goes. Sessions shift to longer sentences, describing words and following instructions.',
  },
  {
    say: 'Can we play ball after school?',
    note: 'asking, planning, chatting',
    h: 'Conversation, and ready for school',
    p: 'Questions, stories about the day, taking turns in a chat. We review progress with you regularly and taper sessions as your child needs us less.',
    cta: true,
  },
];

/** How many words the child has, out of the 48 dots on the stage, per chapter. */
const WORDS = [3, 5, 9, 20, 34, 48];
/** Understanding, talking, clear sounds: bar widths (%) per chapter, illustrative. */
const BARS = [[40, 12, 20], [55, 15, 22], [62, 28, 35], [72, 45, 50], [84, 68, 66], [94, 88, 82]];

function stage() {
  const dots = Array.from({ length: 48 }, (_, i) => `<i style="--k:${i}"></i>`).join('');
  return html`<div class="story__stage" aria-hidden="true">
    <div class="talk">
      <div class="talk__kid"><svg viewBox="0 0 120 140"><circle class="talk__head" cx="60" cy="46" r="34"/><circle class="talk__eye" cx="48" cy="44" r="3.5"/><circle class="talk__eye" cx="72" cy="44" r="3.5"/><path class="talk__mouth" d="M50 60q10 8 20 0"/><path class="talk__body" d="M22 140c0-30 17-48 38-48s38 18 38 48z"/></svg></div>
      <div class="talk__bubble">${CHAPTERS.map((c, i) => `<p class="talk__say talk__say--${i + 1}"><span>${c.say}</span><small>${c.note}</small></p>`)}</div>
    </div>
    <div class="talk__words"><span class="talk__label">Words your child uses</span><div class="talk__dots">${dots}</div></div>
    <dl class="talk__bars">
      <div><dt>Understands</dt><dd><i class="b1"></i></dd></div>
      <div><dt>Talks</dt><dd><i class="b2"></i></dd></div>
      <div><dt>Clear sounds</dt><dd><i class="b3"></i></dd></div>
    </dl>
  </div>`;
}

/** Per-chapter state, written as CSS so the HTML stays a plain picture without it. */
export function storyCss() {
  return CHAPTERS.map((_, i) => {
    const n = i + 1;
    const [u, t, s] = BARS[i];
    return `.story[data-ch="${n}"]{--u:${u}%;--t:${t}%;--s:${s}%}.story[data-ch="${n}"] .talk__say--${n}{opacity:1;transform:none}.story[data-ch="${n}"] .talk__dots i:nth-child(-n+${WORDS[i]}){background:var(--green);transform:scale(1)}`;
  }).join('');
}

export function story() {
  return html`<section class="story" id="story" data-ch="1" aria-labelledby="story-h">
  <style>${storyCss()}</style>
  <div class="wrap story__intro">
    <h2 id="story-h">How a child's words grow</h2>
    <p>Most children learn to talk in the same order. Therapy helps a child who is stuck move to the next step, with you doing much of the practice at home.</p>
  </div>
  <div class="wrap story__body">
    ${stage()}
    <ol class="story__steps">${CHAPTERS.map((c, i) => html`<li class="story__step${i === 0 ? ' is-on' : ''}" data-ch="${i + 1}">
      <div class="story__card">
        <span class="n">${i + 1}</span>
        <h3>${c.h}</h3>
        <p>${c.p}</p>
        ${c.cta ? bookButton('Book a first assessment', 'assessment', 'btn btn--ink') : ''}
      </div>
    </li>`)}</ol>
  </div>
  <p class="wrap story__foot">Every child moves at their own pace. This is the usual order of steps, not a timeline we promise.</p>
</section>`;
}
