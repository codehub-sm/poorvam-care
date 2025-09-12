import Header from "@/components/header";
import Footer from "@/components/footer";
import ServicePackages from "@/components/service-packages";
import FloatingWhatsApp from "@/components/floating-whatsapp";

export default function ServicePackagesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ServicePackages />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}