# Design rules for poorvamcare.in pages (read before touching a page)

The owner rejected the old style of these sites as "too text heavy", "black and white blend" and "design taste inconsistent". The fix, signed off on poorvamhearing.com and now on poorvamcare.in, is one component kit and binding rules. The reference pages are `src/pages/speech-therapy-electronic-city.mjs` (content page) and `src/pages/index.mjs` (home). Match their structure and rhythm.

## The rule: show before you tell
Every section (except the FAQ and the CTA band) MUST be built around a visual component:
- `head(h2, lede)`: every section starts with this. The lede is one sentence of 25 words or fewer.
- `cards(items, {cols: 2|3|4, compact})`: mini-topics, signs, what we work on, options. Each item: `icon`, `title` (≤ 6 words), `text` (≤ 25 words), optional `href`, optional `tone`. **Tone carries meaning**: each therapy owns a colour (speech `blue`, OT `mint`, ABA `violet`, special education `sun`, enrichment `pink`, parent counselling `coral`). On a single-therapy page, set every card to that therapy's tone, as the speech page does with blue.
- `stats([{value,label,tone}])`: 2–4 facts under the hero answer (ages, centres, session length, years).
- `callout(title, text, 'warn'|'info'|'good')`: one key message or a safety boundary ("See a paediatrician soon if…"). `warn` for red flags.
- `steps([[title, text], …])`: ONLY a real sequence, 3–5 steps, each text ≤ 18 words.
- `signs([...])`: a list of short observable signs a parent can check.
- `weekPlan({tone, session:[…], home:[…]})`: what happens in the session vs at home, 3 items each.
- `milestoneLadder({highlight})`: CDC talking milestones. Use on speech, delay, autism and child-development pages.
- `soundAgeChart()`: speech sound ages. Speech pages only.
- `split(textHtml, visualHtml)`: words beside a visual. Never prose on both sides.
- Tables: `<div class="table-wrap"><table>` with `<thead>` and a `<caption>` for sources. Use them for comparisons with 3+ rows. They stack into cards on phones automatically. Cell text ≤ 15 words.
- `more(label, html)`: any explanation longer than 2 short sentences that only some readers need. Search engines and LLMs still read folded text, so detail goes here, not on the surface.
- Layout blocks: `centresBlock(h2, lede)`, `centreCard(location)`, `areasBlock(h2)`, `serviceList(excludePath)`, `faqSection(faqs, heading)`, `ctaBand(h2, sub)`, `byline('11 October 2026')`, `breadcrumb(trail)`.
- Icons (`icon(name)`): phone, whatsapp, pin, clock, calendar, check, home, chat, star, ear, speech, hand, blocks, book, spark, heart, globe, video, users, sprout, search, shield, child, route.

## Hard limits
- Hero: `<section class="phero"><div class="wrap">` + breadcrumb + H1 (8 words or fewer where possible, keyword first, reads like a sentence) + `<p class="answer">` (≤ 45 words) + `phero__acts` (coral `bookButton` + `callButton()` or `whatsappButton()`) + `stats()`.
- Never two `<h2>` inside one column. Never prose on both sides of a two-column layout.
- No paragraph over 45 words on the surface. At most 2 consecutive paragraphs outside `more()`.
- Section rhythm: alternate `band` and `band band--paper`. At most ONE tinted band (`band--sun`, `band--mint`, `band--violet`) per page. `areasBlock` counts as the tinted band (it is mint). End with `faqSection(faqs, …)` then `ctaBand(…)`. `byline(…)` sits at the end of the main content, before the centres block or FAQ, on clinical pages.
- Coral is the action colour. Do not use the coral tone for decoration except on parent counselling cards.
- No images. The repo's photos are stock and would misrepresent the centre. Visuals are the components above, plus inline SVG if you really need a diagram (keep it simple, use `currentColor` and the CSS variables).
- Do NOT edit `assets/css/site.css`, `src/layout.mjs`, `src/ui.mjs`, `src/site.mjs`, `src/story.mjs`, `build.mjs`, or any page you were not assigned. Other agents are writing other pages in parallel. If you need a component or fact that doesn't exist, say so in your report and work around it with existing parts.

## Verify, it's not optional
Other agents are building at the same time, so build and serve in isolation. Your prompt gives you a GROUP name and a PORT.
1. Build only your pages into your own folder:
   `ONLY=/path-a,/path-b OUT=dist-<group> DRAFT=1 node build.mjs`
   It must pass. (Links to pages outside your set are listed as "DRAFT: linked pages not written yet"; that is fine.)
2. Serve that folder on your port, once, in the background: `python3 -m http.server <PORT> --directory dist-<group>`.
3. Screenshot: `PORT=<PORT> node tools/shot.mjs /private/tmp/pc-shots-<group> /path-a /path-b`. It prints `HORIZONTAL OVERFLOW` if a page scrolls sideways on a phone; that must never happen.
4. LOOK at every `-m-*.png` (phone, 390px) and `-d-*.png` (desktop) chunk with the Read tool. Fix anything cramped, overflowing, empty, misaligned, wall-of-text or inconsistent with the reference pages, rebuild, and shoot again.
5. When you finish, stop your server and delete `dist-<group>`.
