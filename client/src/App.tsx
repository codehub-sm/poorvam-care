import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import Home from "@/pages/home";

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

function Router() {
  useRedirects();
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/child-development" component={ChildDevelopment} />
        <Route path="/therapeutic-enrichment" component={TherapeuticEnrichment} />
        <Route path="/electronic-city-phase-1" component={ElectronicCityPhase1} />
        <Route path="/electronic-city-phase-2" component={ElectronicCityPhase2} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/service-packages" component={ServicePackagesPage} />
        <Route path="/faq" component={FAQPage} />
        <Route path="/speech-therapy-for-autism-bangalore" component={SpeechTherapyForAutism} />
        <Route path="/occupational-therapy-for-children-bangalore" component={OccupationalTherapyForChildren} />
        <Route path="/speech-therapy-for-speech-delay-bangalore" component={SpeechTherapyForSpeechDelay} />
        <Route path="/aba-therapy-for-children-bangalore" component={ABATherapyForChildren} />
        <Route path="/special-education-for-children-bangalore" component={SpecialEducationForChildren} />
        <Route path="/speech-therapy-electronic-city" component={SpeechTherapyElectronicCity} />
        <Route path="/child-therapy-hsr-layout-bangalore" component={ChildTherapyHSRLayout} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/parent-counselling" component={ParentCounselling} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/speech-therapy-btm-layout-bangalore" component={SpeechTherapyBTMLayout} />
        <Route path="/speech-therapy-koramangala-bangalore" component={SpeechTherapyKoramangala} />
        <Route path="/speech-therapy-whitefield-bangalore" component={SpeechTherapyWhitefield} />
        <Route path="/speech-therapy-marathahalli-bangalore" component={SpeechTherapyMarathahalli} />
        <Route component={NotFound} />
      </Switch>
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
