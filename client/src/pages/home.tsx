<<<<<<< HEAD
import React, { useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import MissionSection from '@/components/sections/MissionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ResourcesSection from '@/components/sections/ResourcesSection';
import ContactSection from '@/components/sections/ContactSection';

const Home: React.FC = () => {
  // Handle smooth scrolling and setting document title
  useEffect(() => {
    document.title = "Poorvam Care - Child Development Center";
    
    // Smooth scroll to section on page load if URL has hash
    const handleHashScroll = () => {
      if (window.location.hash) {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop - 80,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };
    
    handleHashScroll();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll);
    };
  }, []);
  
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <AboutSection />
      <ResourcesSection />
      <ContactSection />
    </>
  );
};

export default Home;
=======
import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Onboarding from "@/components/onboarding";
import ServicesTabs from "@/components/services-tabs";
import TeamCarousel from "@/components/team-carousel";
import Resources from "@/components/resources";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import LoginModals from "@/components/login-modals";

export default function Home() {
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const onCloseModals = () => {
    setIsParentModalOpen(false);
    setIsEmployeeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <Onboarding />
      <ServicesTabs />
      <TeamCarousel />
      <Resources />
      <Contact />
      <Footer />
      <LoginModals 
        isParentModalOpen={isParentModalOpen}
        isEmployeeModalOpen={isEmployeeModalOpen}
        onCloseModals={onCloseModals}
      />
    </div>
  );
}
>>>>>>> b7fb164 (new site changes)
