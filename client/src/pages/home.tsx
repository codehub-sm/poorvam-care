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
    document.title = "Bright Beginnings - Child Development Center";
    
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
