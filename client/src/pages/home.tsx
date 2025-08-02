import { useState } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import ServiceToggle from "@/components/service-toggle";
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
      <div className="pt-20">
        <ServiceToggle />
      </div>
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
