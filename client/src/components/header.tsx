import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const serviceLinks = [
  { label: "Speech Therapy", href: "/speech-therapy" },
  { label: "Occupational Therapy", href: "/occupational-therapy" },
  { label: "ABA Therapy", href: "/aba-therapy" },
  { label: "Special Education", href: "/special-education" },
  { label: "Parent Counselling", href: "/parent-counselling" },
  { label: "Therapeutic Enrichment", href: "/therapeutic-enrichment" },
  { label: "Teletherapy", href: "/teletherapy" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Child Development", href: "/child-development" },
  { label: "Hearing Center", href: "/hearing-center" },
  { label: "Ucube", href: "/ucube" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/service-packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const mobileServiceLinks = serviceLinks;

export default function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const isServiceRoute = serviceLinks.some((l) => location === l.href);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
              alt="Poorvam Care"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-md ring-2 ring-blue-50 group-hover:ring-blue-200 transition-all"
              width={48}
              height={48}
            />
            <div>
              <span className="text-xl md:text-2xl font-heading font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Poorvam
              </span>
              <span className="hidden sm:block text-xs text-gray-500 font-body -mt-0.5">
                Comprehensive Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                  isServiceRoute
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Services <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-body transition-colors ${
                        location === link.href
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                  location === link.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918861764343"
              className="text-sm font-body text-gray-600 hover:text-blue-600 transition-colors"
            >
              +91 886 176 4343
            </a>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-heading font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden text-gray-700 hover:text-blue-600 p-2"
                aria-label="Open menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 overflow-y-auto">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
                      alt="Poorvam Care"
                      className="w-10 h-10 rounded-full object-cover"
                      width={40}
                      height={40}
                    />
                    <span className="text-lg font-heading font-bold text-gray-900">
                      Poorvam Care
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
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-2 pb-1 px-4">
                      <p className="text-xs font-body font-semibold text-gray-400 uppercase tracking-wider">
                        Our Services
                      </p>
                    </div>
                    {mobileServiceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-body font-medium transition-colors ml-2 ${
                          location === link.href
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </nav>
                <div className="p-6 border-t border-gray-100">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-heading font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Book Consultation
                  </Link>
                  <a
                    href="tel:+918861764343"
                    className="block w-full text-center mt-3 text-gray-600 font-body text-sm hover:text-blue-600"
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
