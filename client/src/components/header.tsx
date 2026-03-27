import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Child Development", href: "/child-development" },
  { label: "Ucube", href: "/ucube" },
  { label: "Hearing Center", href: "/hearing-center" },
  { label: "Pricing", href: "/service-packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#FFF8F0]/90 backdrop-blur-xl sticky top-0 z-50 border-b border-brown-light/30">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
              alt="Poorvam Care"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md ring-2 ring-warm-bg group-hover:ring-coral/40 transition-all"
              width={48}
              height={48}
            />
            <div>
              <span className="text-xl md:text-2xl font-heading font-bold text-coral group-hover:text-coral/80 transition-colors">
                Poorvam
                <span className="text-sage ml-0.5">.</span>
              </span>
              <span className="hidden sm:block text-xs text-brown-mid font-body -mt-0.5">
                Comprehensive Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                  location === link.href
                    ? "text-coral bg-coral/10"
                    : "text-brown-mid hover:text-coral hover:bg-warm-bg"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-coral transition-transform origin-left ${
                    location === link.href ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="bg-coral text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm hover:bg-coral/90 transition-colors shadow-md shadow-coral/20"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden text-brown-mid hover:text-coral p-2"
                aria-label="Open menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 bg-[#FFF8F0]">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-brown-light/30">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
                      alt="Poorvam Care"
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                    <span className="text-lg font-heading font-bold text-coral">
                      Poorvam<span className="text-sage">.</span> Care
                    </span>
                  </div>
                </div>
                <nav className="flex-1 p-4" aria-label="Mobile navigation">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-3 rounded-xl text-base font-body font-medium transition-colors ${
                          location === link.href
                            ? "text-coral bg-coral/10"
                            : "text-brown-mid hover:text-coral hover:bg-warm-bg"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="p-6 border-t border-brown-light/30">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block w-full bg-coral text-white text-center py-3 rounded-full font-heading font-semibold hover:bg-coral/90 transition-colors shadow-md shadow-coral/20"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="tel:+918861764343"
                    className="block w-full text-center mt-3 text-brown-mid font-body text-sm hover:text-coral transition-colors"
                  >
                    Call: +91 886 176 4343
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
