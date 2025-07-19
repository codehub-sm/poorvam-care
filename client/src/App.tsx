import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
<<<<<<< HEAD
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
=======
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Services from "@/pages/services";
>>>>>>> b7fb164 (new site changes)

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
<<<<<<< HEAD
      <Route component={NotFound} />
=======
      <Route path="/home" component={Home} />
      <Route path="/services" component={Services} />
>>>>>>> b7fb164 (new site changes)
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
<<<<<<< HEAD
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
=======
        <Toaster />
        <Router />
>>>>>>> b7fb164 (new site changes)
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
