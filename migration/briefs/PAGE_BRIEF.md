# Writing a page for poorvamcare.in (revamp, Oct 2026)

poorvamcare.in is being rebuilt from a React SPA into a static site in the same design system as poorvamhearing.com. The owner has signed off the look on two pages. **Read both before writing anything. They are the reference, so match their structure, voice and density.**
- `src/pages/index.mjs` (home)
- `src/pages/speech-therapy-electronic-city.mjs` (the reference content page)

The site ALREADY RANKS. Every page you write replaces a live URL. Losing what that URL ranks for is the main way this project fails. Read the parity contract below as carefully as the design rules.

## Engine
- `node build.mjs` renders every `src/pages/**/*.mjs` into `dist/`. Use `DRAFT=1 node build.mjs` while sibling pages are still missing; it relaxes only links to pages that don't exist yet.
- One file per page: `src/pages/<slug>.mjs`. For nested URLs use folders: `/online/india` → `src/pages/online/india.mjs`. A module may default-export one page object or an array.
- All facts live in `src/site.mjs`. Import them; never retype a phone number, address, hour or count.

## Page object
```js
import { html, bookButton, callButton, whatsappButton, breadcrumb, byline, faqSection, ctaBand, centresBlock, centreCard, areasBlock, serviceList, icon, orgId, urlOf } from '../layout.mjs';
import { head, cards, stats, callout, steps, signs, more, split, milestoneLadder, soundAgeChart, weekPlan } from '../ui.mjs';
import { STATS, DIRECTOR, CONTACT, LOCATIONS, HOURS, SERVICES, ONLINE, AREAS, SISTER, SUMMER_CAMP } from '../site.mjs';
export default {
  path: '/occupational-therapy-for-children-bangalore', // EXACTLY the live URL: leading slash, no trailing slash, no .html
  title: '…',          // ≤ 65 chars. Must still contain the page's primary query (see parity). Ends "| Poorvam Care" if it fits
  description: '…',    // 110–165 chars: what + where + one concrete fact. Never "free"
  reviewed: '2026-10-11', // clinical pages: reviewer schema + sitemap lastmod
  breadcrumb: [['All therapies', '/child-development'], ['Occupational therapy', '/occupational-therapy-for-children-bangalore']],
  current: '/occupational-therapy-for-children-bangalore', // nav highlight (optional)
  faqs: [{ q, a }],    // rendered by faqSection(faqs) AND emitted as FAQPage schema automatically; `a` may contain <a href="/…">
  schema: [ /* extra JSON-LD nodes, no @context. e.g. {'@type':['MedicalTherapy','Service'], '@id': `${urlOf(PATH)}#service`, provider: {'@id': orgId}, areaServed: [...] } */ ],
  local: false,        // ONLY on /online/* pages: drops the Bengaluru geo meta (online is not a local service)
  noindex: true,       // ONLY on conversion endpoints
  body: html`…`,
};
```
**Links are root-absolute and extensionless**: `href="/about"`, `href="/online/india"`, `href="/book"`. Never relative, never `.html`, never a trailing slash. The build fails on relative links, trailing slashes, broken links and missing `#anchors`.

The build also fails on: title > 65, description outside 110–165, ≠ 1 `<h1>`, a duplicate title or description, the word TODO, **any rupee figure** (the site publishes no prices), and **an exclamation mark** in body text.

Booking ids for `bookButton(label, id, cls?, centre?)`: `assessment`, `speech`, `ot`, `aba`, `special-ed`, `enrichment`, `parent`. Centre ids: `phase-1`, `phase-2`, `online`. Example: `bookButton('Book an OT assessment', 'ot')`, `bookButton('Book online therapy', 'speech', 'btn btn--ink', 'online')`.

## Parity contract (non-negotiable; this is what keeps the rankings)
Before writing, run `node migration/old.mjs <path>`. It prints the live page's title, H1, H2s, schema types, word count, internal links, GSC clicks, every FAQ question **and answer**, and the full visible text.
1. **Same URL.** `path` is exactly the live path.
2. **Title keeps the primary query.** The primary query is the keyword phrase at the front of the live title (e.g. "Occupational Therapy for Children", "Speech Therapy in Koramangala"). If the live title is > 65 chars, shorten it from the end ("| Poorvam Care Electronic City Bangalore" → "| Poorvam Care"), never from the front. Use "Bangalore" in titles where the live title does; people search "Bangalore".
3. **Every old FAQ question is kept.** Same question text (fix only grammar or typos). Rewrite the answer in our voice, keeping every true fact in it. Drop claims that break the rules below ("free consultation", testimonials, invented numbers) and say why in your report. Add 1–3 new questions where a parent would obviously ask them. 5–10 FAQs in total.
4. **Schema types are a superset.** The layout already emits MedicalBusiness, EducationalOrganization, MedicalClinic/LocalBusiness, Person, WebSite, WebPage, BreadcrumbList and FAQPage (when faqs exist). Add the page-specific node the old page had: usually `MedicalTherapy` + `Service` with `provider: {'@id': orgId}` and `areaServed`. Online pages had `Service`, `ServiceChannel`, `Offer`(no price), `Country`; keep those types.
5. **No content lost.** Visible copy should be roughly half of the old page, but nothing true is deleted: detail moves into `more()` folds, FAQs or cards. Folded text counts as indexed text. Total words (visible + folds + FAQ answers) should be at least 80% of the old `words` figure.
6. **Internal links**: keep linking to the sibling pages the old page linked to (see `internalLinks`), plus 3–6 contextual links.

## Facts you may state
- Everything in `src/site.mjs`: two centres (addresses, landmarks, access: Phase 1 has a lift, Phase 2 is up a flight of stairs with no lift), hours Mon–Sat 9 am – 7 pm at both, phone/WhatsApp +91 88848 64343, email, ages 2–14, 13+ years, 1000+ families, RCI-registered team, the director Apoorva Rai (MASLP, RCI registered, ISHA member), the six therapies, online therapy for India, Australia and the UAE only (US and Canada are closed: licensure follows where the child lives), the summer therapy camp every April–May.
- Sessions are 45 to 60 minutes. Online sessions run 45 minutes. Families get a parent view on their phone (schedule, goals, session notes, home practice, messaging, billing).
- The team calls back within one working day of a booking request.
- Things the live page says about method (what happens in OT, what ABA involves, what special education covers) you may keep, rewritten in plain words.
- Clinical facts (milestones, sound ages, what a condition is) only from mainstream sources (CDC, ASHA, AAP, WHO, RCI, NHS), and cite the source in a figcaption, table `<caption>` or a `.muted` line.

## Never
- Prices, fees or rupee figures of any kind. Cost questions are answered: fees depend on the therapy and frequency, and are explained on the first call once we understand the child's needs.
- "Free" anything (consultation, assessment, session).
- Reviews, testimonials, star ratings, patient stories or quotes. The live site has three unattributed testimonials; drop them and note it in your report.
- Invented numbers (success rates, waiting times, therapist counts, "hundreds of children"), equipment names, hospital tie-ups, insurance, awards, guarantees of outcomes or timelines.
- Medical claims that therapy "cures" autism or anything else. Autism is not a disease; therapy builds skills and independence.
- A hearing test offered by Poorvam Care. Hearing is the sister brand: link `SISTER.childHearing` (https://poorvamhearing.com/child-hearing.html) when hearing might be the issue.

## Voice
- Readers are parents, mostly on phones, often worried. Plain words, short sentences, second person, speakable aloud on a call. Warm, not clinical; honest, never fear-selling.
- Sentence case everywhere. No ALL-CAPS labels, no eyebrows above headings, no "→" on links, no "A · B · C" strings, no emoji, no exclamation marks, no "unlock / empower / journey / holistic / tailored solutions".
- Say when a doctor is needed too: paediatrician or developmental paediatrician (regression, diagnosis), paediatric neurologist (seizures), ENT or audiologist (hearing, tongue-tie), psychiatrist (medication for ADHD).
- Every H2 is a question or a clear topic an answer engine can lift. The hero answer box is a self-contained 40–45 word answer.
- Mention Electronic City Phase 1 / Phase 2 and nearby localities naturally 2–4 times on local pages. Never stuff. Online pages mention Bengaluru only as where the team is based.
- India appears in SEO tags, slugs and facts only, never as a headline qualifier ("Online therapy in India" as an H1 on /online/india is fine, because that IS the page's query).

## Done means
1. `DRAFT=1 node build.mjs` passes with only "DRAFT: linked pages not written yet" warnings.
2. You screenshotted every page you wrote and LOOKED at every chunk (see DESIGN_RULES.md, Verify).
3. Your final report lists, per page: path, title, primary query kept, old vs new FAQ count, schema types added, total words old→new (visible+folded+FAQ), anything dropped and why, and anything you needed but couldn't do (missing component, missing fact).
