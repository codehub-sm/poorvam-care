import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ServiceProvider } from "@/contexts/ServiceContext";
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServicePackagesPage from "@/pages/service-packages";
import AdminPage from "@/pages/admin";
import FloatingWhatsApp from "@/components/floating-whatsapp";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/service-packages" component={ServicePackagesPage} />
      <Route path="/admin" component={AdminPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ServiceProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <FloatingWhatsApp />
        </TooltipProvider>
      </ServiceProvider>
    </QueryClientProvider>
  );
}

export default App;
