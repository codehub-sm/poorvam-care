import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
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
const AdminPage = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

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
        <Route path="/admin" component={AdminPage} />
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
