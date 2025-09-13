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
  const { activeService, setActiveService } = useServiceContext();
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const onCloseModals = () => {
    setIsParentModalOpen(false);
    setIsEmployeeModalOpen(false);
  };

  // Handle direct navigation to specific service sections
  useEffect(() => {
    const hash = location.split('#')[1];
    if (hash === 'hearing') {
      setActiveService('hearing');
    } else if (hash === 'early-intervention') {
      setActiveService('early-intervention');
    } else if (hash === 'future-skills') {
      setActiveService('future-skills');
    }
  }, [location, setActiveService]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section for Services */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-baloo font-bold text-gray-800 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive care for developmental disorders and hearing health across all age groups. 
            Choose the service that best fits your needs.
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