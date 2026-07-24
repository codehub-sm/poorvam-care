# Poorvam Care — SEO & AEO Audit + 90-Day Roadmap

**Date:** 2026-07-06
**Domain:** poorvamcare.in
**Goal:** More qualified leads via #1 Google Maps presence, top organic rankings, and being the answer AI tools (ChatGPT, Perplexity, Google AI Overviews, Claude) give for local therapy queries.

---

## 1. Executive summary

The website is in the **top ~10% of local-business sites technically**. It already has server-side pre-rendered pages, comprehensive JSON-LD schema (MedicalBusiness, Person, Service, FAQ, Breadcrumb, aggregateRating/Review), geo-targeting, an AI-crawler-friendly robots.txt, 8 blog posts, and ~30 indexed URLs including neighbourhood landing pages.

**So the bottleneck to more leads is NOT the website — it's off-site prominence:** Google Business Profile optimization, review velocity, and citation consistency. That's where the fastest lead gains are. The website changes below are incremental polish; the GBP playbook (`GBP_MAPS_PLAYBOOK.md`) is where the real Maps ranking is won.

**Scorecard (current state):**

| Area | Score | Notes |
|---|---|---|
| Technical SEO | 9/10 | SSG, canonical, sitemap, self-hosted fonts, clean robots.txt |
| On-page / content | 8/10 | Strong service + neighbourhood pages, blog live |
| Structured data | 9/10 | Very complete; minor risk on self-serving review markup |
| AEO readiness | 8/10 | Great static content + schema; now has llms.txt |
| Local / GBP | 5/10 | NAP inconsistency across directories; review count + velocity below competitors |
| Off-site / citations | 4/10 | Inconsistent listings, thin authoritative backlinks |

---

## 2. Changes made in this pass (already applied to the code)

1. **Unified the contact email across the entire site to `poorvam.care@gmail.com`** (your primary address). The site previously mixed `info@poorvamcare.in`, `appointments@poorvamcare.in`, and a gmail address across schema, footer, contact page, and location pages. All are now the single `poorvam.care@gmail.com` in `index.html`, `structured-data.tsx`, `footer.tsx`, `home.tsx`, `contact.tsx`, and both Electronic City page schemas — consistent contact details strengthen entity trust and NAP consistency. (Tip: make sure this exact email is also what's on your Google Business Profile and every directory listing.)
2. **Added `llms.txt`** (`client/public/llms.txt`) — the emerging standard file AI answer engines read to understand a site. It gives ChatGPT/Perplexity/Claude a clean, structured summary of who you are, services, locations, hours, and key Q&A, making Poorvam far more likely to be cited accurately in AI answers.

> These edits are made to the files but **not committed**. Review, then commit and deploy (rebuild so `llms.txt` lands in `dist/public/`).

---

## 3. Website opportunities still open (ranked by impact)

### High impact
1. **Grow real review count and keep schema in sync.** `aggregateRating` is 4.5 / 61 — accurate today. As GBP reviews grow, update this number so it always matches reality (mismatched counts erode trust and rich-result eligibility).
2. **Reconsider on-page self-authored review markup.** The 3 hard-coded `Review` entries with generic names ("Priya M.") on the organization schema are technically "self-serving" and *not eligible for Google review rich results* — and in rare cases risk a manual action. Safer long-term: pull live Google reviews via a widget, or drop the star markup and rely on GBP for stars. Low urgency, but a known risk.
3. **Publish 2 blog posts/month** targeting question-style, top-of-funnel searches (these are what AI engines quote): "signs of speech delay by age," "ABA vs speech therapy," "how to choose a therapy centre in Bangalore," "what to expect in the first OT session." Each should answer the question in the first 2–3 sentences (AEO pattern).

### Medium impact
4. **Add `Speakable` schema** to the FAQ/blog pages for voice-assistant eligibility.
5. **Interlink more aggressively.** Every service page should link to the 2–3 most relevant neighbourhood pages and vice versa; every blog post should link to the matching service page.
6. **Image SEO.** Ensure all therapy photos have descriptive, keyword-aware `alt` text and geotagged filenames (e.g., `speech-therapy-electronic-city-poorvam.jpg`).
7. **Core Web Vitals check.** Run PageSpeed Insights on the homepage and top 3 landing pages; keep LCP < 2.5s, CLS < 0.1.

### Lower impact / hygiene
8. Add an `llms-full.txt` (full-text export of key pages) once content stabilises.
9. Add breadcrumb navigation visibly in the UI (not just schema) on deep pages.
10. Set up **Google Search Console + Bing Webmaster + GA4** conversion tracking on the contact/WhatsApp actions, so leads are measurable.

---

## 4. AEO (AI Answer Engine Optimization) — how to become the AI-recommended choice

AI tools cite sources that are (a) crawlable, (b) clearly structured, (c) entity-consistent, and (d) corroborated across the web. Status and actions:

- ✅ Crawlable: robots.txt already allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, OAI-SearchBot.
- ✅ Structured: strong schema + new `llms.txt`.
- ✅ Answer-first content: the static homepage FAQ answers questions directly — keep this pattern on every new page.
- 🔲 **Corroboration is the gap.** AI engines trust entities that appear consistently across many sites. The same work that helps Maps — consistent citations on Justdial/Practo/Sulekha, mentions in local parenting blogs, a Wikipedia-style presence — is what makes AI confidently name Poorvam. **AEO and local citation-building are the same project.**
- 🔲 Get listed/mentioned on high-authority third parties AI engines lean on: Practo profiles, local news/parenting features, "best speech therapy in Bangalore" listicles (reach out to those authors), and directory pages.

---

## 5. 90-day roadmap

### Weeks 1–2 (foundation)
- Deploy the two code changes (NAP fix + llms.txt).
- GBP Priority 0: standardise name everywhere, verify both listings, set precise categories.
- Set up GSC, Bing Webmaster, GA4 conversion events.

### Weeks 3–6 (prominence engine)
- Launch the review system (QR + WhatsApp), target 8–12 reviews/month.
- Complete 100% of both GBP profiles; upload 20 photos each; seed Q&A.
- Start weekly Google Posts.
- Claim/standardise Justdial, Practo, Sulekha, Bing Places, Apple Business Connect.

### Weeks 7–12 (content + authority)
- Publish 2 AEO blog posts/month (answer-first, question-targeted).
- Outreach for backlinks: pediatricians, schools, parenting blogs, "best of Bangalore" listicles.
- Add Speakable schema; tighten internal linking + image alt text.
- Review CWV and fix any red metrics.

### Ongoing (monthly review)
- Track: GBP Performance (calls, directions, clicks), review count/rating, local-pack position for target terms, organic traffic (GSC), and AI-answer mentions (spot-check ChatGPT/Perplexity for "speech therapy Electronic City").

---

## 6. KPIs & targets (measure monthly)

| Metric | Tool | 90-day target |
|---|---|---|
| Google reviews | GBP | 90+ (from ~61), rating ≥4.6 |
| Local pack visibility | Manual / Local Falcon | Top 3 for "speech therapy Electronic City" |
| GBP calls + direction requests | GBP Performance | +50% |
| Organic traffic | GSC | +30% |
| Target keyword rankings | GSC | Top 10 for primary clusters |
| AI-answer mentions | Manual spot-check | Named in ChatGPT/Perplexity for local therapy queries |
| Contact/WhatsApp leads | GA4 | +40% |

---

## 7. The one-sentence version

The site is already excellent; **your growth now comes from Google Business Profile reviews + consistent citations everywhere**, which is simultaneously the lever for Maps ranking *and* for AI tools recommending you — so run the GBP playbook relentlessly and keep the website's schema/content in sync with reality.
