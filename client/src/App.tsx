import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import Home from "@/pages/home";

// Existing pages
const ChildDevelopment = lazy(() => import("@/pages/child-development"));
const HearingCenter = lazy(() => import("@/pages/hearing-center"));
const Ucube = lazy(() => import("@/pages/ucube"));
const About = lazy(() => import("@/pages/about"));
const ContactPage = lazy(() => import("@/pages/contact"));
const ServicePackagesPage = lazy(() => import("@/pages/service-packages"));
const AdminPage = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Service pages (Task 3)
const SpeechTherapy = lazy(() => import("@/pages/speech-therapy"));
const OccupationalTherapy = lazy(() => import("@/pages/occupational-therapy"));
const ABATherapy = lazy(() => import("@/pages/aba-therapy"));
const SpecialEducation = lazy(() => import("@/pages/special-education"));
const ParentCounselling = lazy(() => import("@/pages/parent-counselling"));
const TherapeuticEnrichment = lazy(() => import("@/pages/therapeutic-enrichment"));

// Location pages (Task 4)
const ElectricCityPhase1 = lazy(() => import("@/pages/electronic-city-phase-1"));
const ElectricCityPhase2 = lazy(() => import("@/pages/electronic-city-phase-2"));

// Teletherapy (Task 5)
const Teletherapy = lazy(() => import("@/pages/teletherapy"));

// Blog (Task 6)
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blog-post"));

// Service area pages (Task 7)
const SpeechTherapyHSR = lazy(() => import("@/pages/speech-therapy-hsr-layout"));
const SpeechTherapyBTM = lazy(() => import("@/pages/speech-therapy-btm-layout"));
const SpeechTherapyKoramangala = lazy(() => import("@/pages/speech-therapy-koramangala"));
const SpeechTherapyWhitefield = lazy(() => import("@/pages/speech-therapy-whitefield"));
const SpeechTherapyMarathahalli = lazy(() => import("@/pages/speech-therapy-marathahalli"));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {/* Existing routes */}
        <Route path="/" component={Home} />
        <Route path="/child-development" component={ChildDevelopment} />
        <Route path="/hearing-center" component={HearingCenter} />
        <Route path="/ucube" component={Ucube} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/service-packages" component={ServicePackagesPage} />
        <Route path="/admin" component={AdminPage} />

        {/* Legacy URL redirects (fixes GSC 404s) */}
        <Route path="/occupational-therapy-for-children-bangalore">
          <Redirect to="/occupational-therapy" />
        </Route>
        <Route path="/occupational-therapy-for-children-bangalore/">
          <Redirect to="/occupational-therapy" />
        </Route>
        <Route path="/speech-therapy-for-speech-delay-bangalore">
          <Redirect to="/speech-therapy" />
        </Route>
        <Route path="/speech-therapy-for-speech-delay-bangalore/">
          <Redirect to="/speech-therapy" />
        </Route>
        <Route path="/speechAndLanguage.html">
          <Redirect to="/speech-therapy" />
        </Route>
        <Route path="/occupationalTherapy.html">
          <Redirect to="/occupational-therapy" />
        </Route>
        <Route path="/developmentalEducation.html">
          <Redirect to="/special-education" />
        </Route>
        <Route path="/socialSkillsGroupTraining.html">
          <Redirect to="/therapeutic-enrichment" />
        </Route>
        <Route path="/therapy.html">
          <Redirect to="/child-development" />
        </Route>
        <Route path="/about.html">
          <Redirect to="/about" />
        </Route>
        <Route path="/contact.html">
          <Redirect to="/contact" />
        </Route>
        <Route path="/blog.html">
          <Redirect to="/blog" />
        </Route>
        <Route path="/team.html">
          <Redirect to="/about" />
        </Route>
        <Route path="/booking.html">
          <Redirect to="/contact" />
        </Route>
        <Route path="/index-2.html">
          <Redirect to="/" />
        </Route>

        {/* Service pages */}
        <Route path="/speech-therapy" component={SpeechTherapy} />
        <Route path="/occupational-therapy" component={OccupationalTherapy} />
        <Route path="/aba-therapy" component={ABATherapy} />
        <Route path="/special-education" component={SpecialEducation} />
        <Route path="/parent-counselling" component={ParentCounselling} />
        <Route path="/therapeutic-enrichment" component={TherapeuticEnrichment} />

        {/* Location pages */}
        <Route path="/electronic-city-phase-1" component={ElectricCityPhase1} />
        <Route path="/electronic-city-phase-2" component={ElectricCityPhase2} />

        {/* Teletherapy */}
        <Route path="/teletherapy" component={Teletherapy} />

        {/* Blog */}
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />

        {/* Service area pages */}
        <Route path="/speech-therapy-hsr-layout" component={SpeechTherapyHSR} />
        <Route path="/speech-therapy-btm-layout" component={SpeechTherapyBTM} />
        <Route path="/speech-therapy-koramangala" component={SpeechTherapyKoramangala} />
        <Route path="/speech-therapy-whitefield" component={SpeechTherapyWhitefield} />
        <Route path="/speech-therapy-marathahalli" component={SpeechTherapyMarathahalli} />

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
