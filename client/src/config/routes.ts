/**
 * The route registry — the single source of truth for every URL on the site.
 *
 * Before this file, adding a page meant five hand-synchronised edits (page
 * component, App.tsx route, the prerender array in vite.config.ts, sitemap.xml,
 * and infra/amplify-redirects.json) plus a sixth step outside the repo: pasting
 * the redirects JSON into the Amplify Console, which the build does not do.
 *
 * Missing the Amplify step is a silent failure. Client-side routing still works
 * in a browser, so the page looks fine — but crawlers get the homepage HTML,
 * because the SPA catch-all rewrite fires before the prerendered
 * `<route>/index.html` can be served. That is exactly what caused the
 * zero-click Search Console problem.
 *
 * Everything downstream is now derived from `ROUTES`:
 *   - vite.config.ts  → the prerender route list
 *   - vite.config.ts  → dist/public/sitemap.xml (generated, with real lastmod)
 *   - vite.config.ts  → infra/amplify-redirects.json (still needs pasting)
 *   - App.tsx         → <Route> elements, asserted against the component map
 *
 * This file must stay free of React and browser imports: vite.config.ts loads
 * it in Node at build time.
 */

export type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface RouteDef {
  /** URL path, no trailing slash. */
  path: string;
  /** Source file, relative to repo root — used to derive lastmod from git. */
  file: string;
  changefreq: ChangeFreq;
  priority: number;
  /**
   * Excluded from the sitemap, the prerender pass, and Amplify rewrites.
   * Use for pages that must not be reachable by crawlers at all (e.g. /admin).
   */
  private?: boolean;
  /**
   * Prerendered and given a rewrite, but kept OUT of the sitemap.
   *
   * For pages that need to serve real HTML but carry `robots: noindex` — a
   * conversion endpoint, for example. Listing a noindex URL in the sitemap
   * sends contradictory signals, so the two must agree.
   */
  noIndex?: boolean;
}

const P = "client/src/pages";

export const ROUTES: RouteDef[] = [
  { path: "/", file: `${P}/home.tsx`, changefreq: "weekly", priority: 1.0 },

  // Core service pillars
  { path: "/child-development", file: `${P}/child-development.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/therapeutic-enrichment", file: `${P}/therapeutic-enrichment.tsx`, changefreq: "monthly", priority: 0.9 },

  // Audiology bridge page. Hearing is its own brand (poorvamhearing.com), but
  // the GBP name is "Poorvam Care & Hearing Solutions" and GSC shows steady
  // "hearing test / audiologist near me" queries this site should capture and
  // route — leaving it unrouted served 404s to that demand.
  { path: "/hearing-center", file: `${P}/hearing-center.tsx`, changefreq: "monthly", priority: 0.8 },

  // Centre locations
  { path: "/electronic-city-phase-1", file: `${P}/electronic-city-phase-1.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/electronic-city-phase-2", file: `${P}/electronic-city-phase-2.tsx`, changefreq: "monthly", priority: 0.9 },

  // Site pages
  { path: "/about", file: `${P}/about.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/contact", file: `${P}/contact.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/service-packages", file: `${P}/service-packages.tsx`, changefreq: "monthly", priority: 0.7 },
  { path: "/faq", file: `${P}/faq.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/parent-counselling", file: `${P}/parent-counselling.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/blog", file: `${P}/blog.tsx`, changefreq: "weekly", priority: 0.8 },

  // Service landing pages
  { path: "/speech-therapy-for-autism-bangalore", file: `${P}/speech-therapy-for-autism-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/occupational-therapy-for-children-bangalore", file: `${P}/occupational-therapy-for-children-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/speech-therapy-for-speech-delay-bangalore", file: `${P}/speech-therapy-for-speech-delay-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/aba-therapy-for-children-bangalore", file: `${P}/aba-therapy-for-children-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/special-education-for-children-bangalore", file: `${P}/special-education-for-children-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },

  // Neighbourhood landing pages
  { path: "/speech-therapy-electronic-city", file: `${P}/speech-therapy-electronic-city.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/child-therapy-hsr-layout-bangalore", file: `${P}/child-therapy-hsr-layout-bangalore.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/speech-therapy-btm-layout-bangalore", file: `${P}/speech-therapy-btm-layout.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/speech-therapy-koramangala-bangalore", file: `${P}/speech-therapy-koramangala.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/speech-therapy-whitefield-bangalore", file: `${P}/speech-therapy-whitefield.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/speech-therapy-marathahalli-bangalore", file: `${P}/speech-therapy-marathahalli.tsx`, changefreq: "monthly", priority: 0.8 },

  // Online / teletherapy. These are a separate entity from the local centre
  // pages: no Bangalore NAP, no MedicalBusiness schema, no geo.* meta.
  { path: "/online", file: `${P}/online.tsx`, changefreq: "weekly", priority: 0.9 },
  { path: "/online/india", file: `${P}/online-india.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/online/australia", file: `${P}/online-australia.tsx`, changefreq: "monthly", priority: 0.8 },
  { path: "/online/uae", file: `${P}/online-uae.tsx`, changefreq: "monthly", priority: 0.8 },

  // Per-discipline online pages. These target "does this work for my child's
  // difficulty?" while the country pages above target "can I get it where I
  // live?" — deliberately distinct content so they do not compete.
  { path: "/online/speech-therapy", file: `${P}/online-speech-therapy.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/online/occupational-therapy", file: `${P}/online-occupational-therapy.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/online/behavioural-therapy", file: `${P}/online-behavioural-therapy.tsx`, changefreq: "monthly", priority: 0.9 },
  { path: "/online/special-education", file: `${P}/online-special-education.tsx`, changefreq: "monthly", priority: 0.8 },

  // Conversion endpoint — prerendered and routed, but noindex (set in the page)
  // so it does not compete with /online in search results.
  { path: "/online/enquiry", file: `${P}/online-enquiry.tsx`, changefreq: "monthly", priority: 0.5, noIndex: true },

  // Not indexed — no sitemap entry, no prerender, no rewrite.
  { path: "/admin", file: `${P}/admin.tsx`, changefreq: "never", priority: 0.0, private: true },
];

/** Priority and changefreq applied to every generated /blog/<slug> route. */
export const BLOG_POST_ROUTE_DEFAULTS = {
  file: `${P}/blog-post.tsx`,
  changefreq: "monthly" as ChangeFreq,
  priority: 0.7,
};

/** Routes that should be prerendered and given an Amplify rewrite. */
export const publicRoutes = (): RouteDef[] => ROUTES.filter((r) => !r.private);

/** Routes that belong in the sitemap — public and indexable. */
export const indexableRoutes = (): RouteDef[] =>
  ROUTES.filter((r) => !r.private && !r.noIndex);

/**
 * Expands blog slugs into full route definitions.
 *
 * Takes slugs as an argument rather than importing blog-posts.ts so this module
 * stays dependency-free and cheap for the client bundle to pull in.
 */
export function blogRoutes(slugs: string[]): RouteDef[] {
  return slugs.map((slug) => ({
    path: `/blog/${slug}`,
    ...BLOG_POST_ROUTE_DEFAULTS,
  }));
}

/** Every crawlable route (prerender + rewrites), including blog posts. */
export function allPublicRoutes(blogSlugs: string[]): RouteDef[] {
  return [...publicRoutes(), ...blogRoutes(blogSlugs)];
}

/** Every route that belongs in the sitemap, including blog posts. */
export function allIndexableRoutes(blogSlugs: string[]): RouteDef[] {
  return [...indexableRoutes(), ...blogRoutes(blogSlugs)];
}
