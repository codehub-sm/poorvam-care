# Poorvam Care — SEO Execution Plan

**Last Updated:** 2026-04-02
**Domain:** poorvamcare.in
**Business:** Multi-disciplinary early intervention centre (Speech Therapy, OT, ABA, Special Education)
**Locations:** Electronic City Phase 1 & Phase 2, Bangalore

---

## 1. Current SEO State

### Strengths
- Pre-rendered static pages (SSG via @prerenderer/rollup-plugin)
- Comprehensive JSON-LD schema (Organization, Person, Service, Breadcrumb, FAQ, Event)
- Dynamic meta tag management per page (SeoHead component)
- Geo-targeting meta tags for local SEO (IN-KA, Electronic City)
- 16 neighborhoods in areaServed schema
- E-E-A-T signals (Apoorva Rai credentials, RCI license, 13+ years experience)
- 12 indexed URLs in sitemap

### Gaps Identified
- No dedicated pages for ABA Therapy, Special Education (offered services without landing pages)
- No neighborhood-specific service pages (HSR Layout, Hosa Road — high search volume areas)
- No location-specific speech therapy page (e.g., "speech therapy Electronic City")
- Missing service pages from sitemap (`/hearing-center`, `/ucube`)
- No LocalBusiness schema on location-specific pages
- Internal cross-linking between service pages is limited

---

## 2. Keyword Gap Analysis

### High-Priority Keywords (No Dedicated Page)

| Keyword Cluster | Monthly Search Volume (est.) | Current Coverage | Action |
|---|---|---|---|
| ABA therapy Bangalore / ABA therapy for children | High | Mentioned only | **New page: `/aba-therapy-for-children-bangalore`** |
| Special education Bangalore / special education for children | Medium | Mentioned only | **New page: `/special-education-for-children-bangalore`** |
| Speech therapy Electronic City | Medium-High | Generic coverage | **New page: `/speech-therapy-electronic-city`** |
| Child therapy HSR Layout / therapy near HSR Layout | Medium | In areaServed only | **New page: `/child-therapy-hsr-layout-bangalore`** |

### Existing Coverage (Maintain & Optimize)

| Page | Primary Keywords |
|---|---|
| `/speech-therapy-for-autism-bangalore` | autism speech therapy, ASD therapy Bangalore |
| `/occupational-therapy-for-children-bangalore` | occupational therapy children Bangalore, OT for kids |
| `/speech-therapy-for-speech-delay-bangalore` | speech delay therapy, late talker therapy Bangalore |

---

## 3. New Pages — Implementation Plan

### Page 1: `/aba-therapy-for-children-bangalore`
- **Target Keywords:** ABA therapy Bangalore, ABA therapy for children, applied behaviour analysis Electronic City, ABA therapy near me, ABA therapy cost Bangalore
- **Content:** What is ABA, how Poorvam Care applies it, integration with speech/OT, parent involvement, FAQs
- **Schema:** MedicalTherapy + Breadcrumb + FAQ
- **Internal Links:** → speech-therapy-for-autism, → child-development, → service-packages

### Page 2: `/special-education-for-children-bangalore`
- **Target Keywords:** special education Bangalore, special education for children, special educator near me Electronic City, special needs education, IEP therapy Bangalore
- **Content:** Special education approach, individualized plans, conditions addressed, integration with therapy, FAQs
- **Schema:** MedicalTherapy + Breadcrumb + FAQ
- **Internal Links:** → child-development, → occupational-therapy, → service-packages

### Page 3: `/speech-therapy-electronic-city`
- **Target Keywords:** speech therapy Electronic City, speech therapist near Electronic City, best speech therapy center Electronic City, speech therapy near me Electronic City Phase 1/2
- **Content:** Location-focused service page, both centres, nearby landmarks, all services available, FAQs
- **Schema:** MedicalTherapy + LocalBusiness + Breadcrumb + FAQ
- **Internal Links:** → electronic-city-phase-1, → electronic-city-phase-2, → speech-therapy-for-autism

### Page 4: `/child-therapy-hsr-layout-bangalore`
- **Target Keywords:** child therapy HSR Layout, speech therapy near HSR Layout, occupational therapy HSR Layout Bangalore, therapy center near HSR Layout
- **Content:** Neighborhood-targeted page, distance/accessibility from HSR Layout, all services, why parents from HSR choose Poorvam, FAQs
- **Schema:** MedicalTherapy + Breadcrumb + FAQ
- **Internal Links:** → child-development, → contact, → service-packages

---

## 4. Technical SEO Checklist

### For Each New Page
- [x] Add route to `App.tsx` (lazy loaded)
- [x] Add URL to `sitemap.xml` (priority 0.9, monthly changefreq)
- [x] Add route to `vite.config.ts` prerender list
- [x] Include `SeoHead` with title, description, canonical, keywords
- [x] Add `StructuredData` with MedicalTherapy + Breadcrumb schemas
- [x] Add `FAQSection` with 4+ unique FAQs per page
- [x] Cross-link to related service/location pages

### Schema Enhancements
- [x] Add `createLocalBusinessSchema()` helper for location-specific pages
- [x] Add `Konappana Agrahara` and `Kammasandra` to areaServed

---

## 5. Content Strategy (Next Steps)

### Blog / Resource Pages (Future)
1. "Early Signs of Speech Delay in Children" — informational, top-of-funnel
2. "ABA vs Speech Therapy: What's Right for My Child?" — comparison, mid-funnel
3. "How to Choose a Therapy Center in Bangalore" — local, decision-stage
4. "Parent's Guide to Occupational Therapy" — informational, awareness

### Google Business Profile Optimization
- Ensure both locations have complete GBP listings
- Post weekly updates (therapy tips, parent testimonials, event announcements)
- Respond to all reviews within 24 hours
- Add service menu with all 6 core services

### Link Building Opportunities
- Partner with local schools and pediatricians for referral links
- List on therapy directories (Practo, Justdial, Sulekha)
- Guest posts on parenting blogs targeting Bangalore parents

---

## 6. Monitoring & KPIs

| Metric | Tool | Target |
|---|---|---|
| Organic traffic | Google Search Console | +30% in 3 months |
| Indexed pages | Google Search Console | All new pages indexed within 2 weeks |
| Keyword rankings (target clusters) | GSC / Ahrefs | Top 10 for primary keywords |
| Click-through rate | GSC | >3% average |
| Core Web Vitals | PageSpeed Insights | All green (LCP <2.5s, CLS <0.1) |
| Local pack visibility | Manual search | Appear in 3-pack for "speech therapy Electronic City" |

---

## 7. Implementation Status

| Task | Status | Date |
|---|---|---|
| SEO execution plan created | Done | 2026-04-02 |
| New page: ABA therapy | Done | 2026-04-02 |
| New page: Special education | Done | 2026-04-02 |
| New page: Speech therapy Electronic City | Done | 2026-04-02 |
| New page: Child therapy HSR Layout | Done | 2026-04-02 |
| Routes + sitemap + prerender updated | Done | 2026-04-02 |
| Schema markup enhanced | Done | 2026-04-02 |
