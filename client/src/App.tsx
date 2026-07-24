import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import { trackPageView } from "@/lib/analytics";
import { ROUTES } from "@/config/routes";

const ChildDevelopment = lazy(() => import("@/pages/child-development"));
const TherapeuticEnrichment = lazy(() => import("@/pages/therapeutic-enrichment"));
const ElectronicCityPhase1 = lazy(() => import("@/pages/electronic-city-phase-1"));
const ElectronicCityPhase2 = lazy(() => import("@/pages/electronic-city-phase-2"));
const About = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ServicePackagesPage = lazy(() => import("@/pages/service-packages"));
const FAQPage = lazy(() => import("@/pages/faq"));
const SpeechTherapyForAutism = lazy(() => import("@/pages/speech-therapy-for-autism-bangalore"));
const OccupationalTherapyForChildren = lazy(() => import("@/pages/occupational-therapy-for-children-bangalore"));
const SpeechTherapyForSpeechDelay = lazy(() => import("@/pages/speech-therapy-for-speech-delay-bangalore"));
const ABATherapyForChildren = lazy(() => import("@/pages/aba-therapy-for-children-bangalore"));
const SpecialEducationForChildren = lazy(() => import("@/pages/special-education-for-children-bangalore"));
const SpeechTherapyElectronicCity = lazy(() => import("@/pages/speech-therapy-electronic-city"));
const ChildTherapyHSRLayout = lazy(() => import("@/pages/child-therapy-hsr-layout-bangalore"));
const AdminPage = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ParentCounselling = lazy(() => import("@/pages/parent-counselling"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostPage = lazy(() => import("@/pages/blog-post"));
const SpeechTherapyBTMLayout = lazy(() => import("@/pages/speech-therapy-btm-layout"));
const SpeechTherapyKoramangala = lazy(() => import("@/pages/speech-therapy-koramangala"));
const SpeechTherapyWhitefield = lazy(() => import("@/pages/speech-therapy-whitefield"));
const SpeechTherapyMarathahalli = lazy(() => import("@/pages/speech-therapy-marathahalli"));
const OnlineHub = lazy(() => import("@/pages/online"));
const OnlineIndia = lazy(() => import("@/pages/online-india"));
const OnlineAustralia = lazy(() => import("@/pages/online-australia"));
const OnlineUae = lazy(() => import("@/pages/online-uae"));
const OnlineEnquiry = lazy(() => import("@/pages/online-enquiry"));
const OnlineSpeechTherapy = lazy(() => import("@/pages/online-speech-therapy"));
const OnlineOccupationalTherapy = lazy(() => import("@/pages/online-occupational-therapy"));
const OnlineBehaviouralTherapy = lazy(() => import("@/pages/online-behavioural-therapy"));
const OnlineSpecialEducation = lazy(() => import("@/pages/online-special-education"));

// Legacy .html paths that need to redirect to the home page.
// Keys must be lowercase — we normalize the incoming path before lookup.
// Primary 301 redirects are handled by Amplify Hosting rules in
// infra/amplify-redirects.json. This hook is a client-side fallback that
// silently rewrites the URL bar during in-session SPA navigation.
const LEGACY_REDIRECTS: Record<string, string> = {
  "/occupationaltherapy.html": "/",
  "/speechtherapy.html": "/",
  "/aba.html": "/",
  "/specialeducation.html": "/",
};

function useRedirects() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Strip trailing slash (except root) to canonicalize URLs
    if (location.length > 1 && location.endsWith("/")) {
      setLocation(location.slice(0, -1), { replace: true });
      return;
    }

    // Legacy path redirects — case-insensitive match
    const lower = location.toLowerCase();
    if (LEGACY_REDIRECTS[lower]) {
      setLocation(LEGACY_REDIRECTS[lower], { replace: true });
    }
  }, [location, setLocation]);
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/** Sends a GA4 pageview on every wouter navigation, including the first. */
function usePageViews() {
  const [location] = useLocation();
  useEffect(() => {
    trackPageView(location);
  }, [location]);
}

/**
 * Maps every registry path to its component.
 *
 * Keys must match ROUTES in @/config/routes exactly — the assertion below
 * fails the dev build if they drift, so a page can never be registered for
 * prerendering without also being routable (or vice versa).
 */
const PAGES: Record<string, ComponentType> = {
  "/": Home,
  "/child-development": ChildDevelopment,
  "/therapeutic-enrichment": TherapeuticEnrichment,
  "/electronic-city-phase-1": ElectronicCityPhase1,
  "/electronic-city-phase-2": ElectronicCityPhase2,
  "/about": About,
  "/contact": ContactPage,
  "/service-packages": ServicePackagesPage,
  "/faq": FAQPage,
  "/parent-counselling": ParentCounselling,
  "/blog": BlogPage,
  "/speech-therapy-for-autism-bangalore": SpeechTherapyForAutism,
  "/occupational-therapy-for-children-bangalore": OccupationalTherapyForChildren,
  "/speech-therapy-for-speech-delay-bangalore": SpeechTherapyForSpeechDelay,
  "/aba-therapy-for-children-bangalore": ABATherapyForChildren,
  "/special-education-for-children-bangalore": SpecialEducationForChildren,
  "/speech-therapy-electronic-city": SpeechTherapyElectronicCity,
  "/child-therapy-hsr-layout-bangalore": ChildTherapyHSRLayout,
  "/speech-therapy-btm-layout-bangalore": SpeechTherapyBTMLayout,
  "/speech-therapy-koramangala-bangalore": SpeechTherapyKoramangala,
  "/speech-therapy-whitefield-bangalore": SpeechTherapyWhitefield,
  "/speech-therapy-marathahalli-bangalore": SpeechTherapyMarathahalli,
  "/online": OnlineHub,
  "/online/india": OnlineIndia,
  "/online/australia": OnlineAustralia,
  "/online/uae": OnlineUae,
  "/online/speech-therapy": OnlineSpeechTherapy,
  "/online/occupational-therapy": OnlineOccupationalTherapy,
  "/online/behavioural-therapy": OnlineBehaviouralTherapy,
  "/online/special-education": OnlineSpecialEducation,
  "/online/enquiry": OnlineEnquiry,
  "/admin": AdminPage,
};

if (import.meta.env.DEV) {
  const missing = ROUTES.filter((r) => !PAGES[r.path]).map((r) => r.path);
  const extra = Object.keys(PAGES).filter(
    (p) => !ROUTES.some((r) => r.path === p),
  );
  if (missing.length || extra.length) {
    console.error(
      "[routes] Registry and component map disagree.\n" +
        (missing.length ? `  In ROUTES but no component: ${missing.join(", ")}\n` : "") +
        (extra.length ? `  Has component but not in ROUTES: ${extra.join(", ")}\n` : "") +
        "  A route missing from ROUTES is not prerendered and serves homepage HTML to crawlers.",
    );
  }
}

/**
 * Signals the prerenderer (Puppeteer) that the routed page has rendered.
 *
 * Lives INSIDE the Suspense boundary so it cannot commit until the lazy page
 * chunk has resolved — an effect in main.tsx fired after App mounted but
 * before the chunk loaded, which snapshotted a page-less shell whenever the
 * chunk lost that race (deterministic for one blog route on Amplify's build
 * machines). Child effects run first, so SeoHead has set title/meta by the
 * time this fires. Harmless no-op in a normal browser.
 */
function PrerenderReady() {
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setTimeout(() => document.dispatchEvent(new Event("prerender-ready")), 0),
      ),
    );
  }, []);
  return null;
}

function Router() {
  useRedirects();
  usePageViews();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {ROUTES.map((r) => {
          const Component = PAGES[r.path];
          return Component ? (
            <Route key={r.path} path={r.path} component={Component} />
          ) : null;
        })}
        {/* Dynamic — expanded from blog-posts.ts at build time, not listed in ROUTES. */}
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route component={NotFound} />
      </Switch>
      {/* After Switch so its effect fires after the page's own effects. */}
      <PrerenderReady />
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Layout>
          <Router />
        </Layout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
