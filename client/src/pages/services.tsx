import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import ServiceToggle from "@/components/service-toggle";
import ServicesTabs from "@/components/services-tabs";
import TeamCarousel from "@/components/team-carousel";
import Footer from "@/components/footer";
import LoginModals from "@/components/login-modals";
import { useServiceContext } from "@/contexts/ServiceContext";

export default function Services() {
  const [location] = useLocation();
  const { activeBusinessLine, setActiveBusinessLine } = useServiceContext();
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const onCloseModals = () => {
    setIsParentModalOpen(false);
    setIsEmployeeModalOpen(false);
  };

  // Handle direct navigation to specific business line sections
  useEffect(() => {
    const hash = location.split('#')[1];
    if (hash === 'hearing') {
      setActiveBusinessLine('hearing-center');
    } else if (hash === 'early-intervention') {
      setActiveBusinessLine('child-development');
    } else if (hash === 'future-skills') {
      setActiveBusinessLine('ucube');
    }
  }, [location, setActiveBusinessLine]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section for Services */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
        {/* Premium Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6 font-serif">
            Our <span className="text-blue-600">Business Lines</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-serif leading-relaxed">
            Poorvam offers comprehensive care across three specialized business lines: Child Development Center, Hearing Center, and Ucube. 
            Choose the business line that best fits your needs.
          </p>
          
          {/* Service Toggle */}
          <div className="mt-12">
            <ServiceToggle />
          </div>
        </div>
      </section>

      <ServicesTabs />
      <TeamCarousel />
      <Footer />
      <LoginModals 
        isParentModalOpen={isParentModalOpen}
        isEmployeeModalOpen={isEmployeeModalOpen}
        onCloseModals={onCloseModals}
      />
    </div>
  );
} 