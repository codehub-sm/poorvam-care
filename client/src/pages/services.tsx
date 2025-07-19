import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import ServicesTabs from "@/components/services-tabs";
import Footer from "@/components/footer";
import LoginModals from "@/components/login-modals";

export default function Services() {
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState<'early-intervention' | 'hearing'>('early-intervention');
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
      setActiveTab('hearing');
    } else if (hash === 'early-intervention') {
      setActiveTab('early-intervention');
    }
  }, [location]);

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
          
          {/* Quick Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a 
              href="#early-intervention"
              onClick={() => setActiveTab('early-intervention')}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300"
            >
              Early Intervention Services
            </a>
            <a 
              href="#hearing"
              onClick={() => setActiveTab('hearing')}
              className="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-700 transition-all duration-300"
            >
              Hearing Services
            </a>
          </div>
        </div>
      </section>

      <ServicesTabs initialActiveTab={activeTab} />
      <Footer />
      <LoginModals 
        isParentModalOpen={isParentModalOpen}
        isEmployeeModalOpen={isEmployeeModalOpen}
        onCloseModals={onCloseModals}
      />
    </div>
  );
} 