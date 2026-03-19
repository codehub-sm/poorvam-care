import { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StickyCtaBar from "@/components/sticky-cta-bar";
import FloatingWhatsApp from "@/components/floating-whatsapp";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-warm-bg overflow-x-hidden">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <StickyCtaBar />
      <FloatingWhatsApp />
    </div>
  );
}
