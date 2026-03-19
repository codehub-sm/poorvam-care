import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

const serviceLinks = [
  { name: "Child Development Center", href: "/child-development" },
  { name: "Hearing Center", href: "/hearing-center" },
  { name: "Ucube - Enrichment", href: "/ucube" },
  { name: "Speech Therapy", href: "/child-development" },
  { name: "Hearing Assessments", href: "/hearing-center" },
  { name: "Service Packages", href: "/service-packages" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Pricing & Plans", href: "/service-packages" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572411165781", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/poorvam_care/", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
                alt="Poorvam Care"
                className="w-10 h-10 rounded-full object-cover"
                width={40}
                height={40}
              />
              <span className="text-xl font-heading font-bold text-white">
                Poorvam Care
              </span>
            </div>
            <p className="text-gray-400 font-body text-sm leading-relaxed mb-6">
              Expert therapy, hearing care, and enrichment programs — trusted by 2500+ families in Bangalore.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm font-body text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <span>Electronic City Phase 2, Ananth Nagar, Bangalore</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a href="tel:+918861764343" className="hover:text-white transition-colors">
                  +91 886 176 4343
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a href="mailto:info@poorvamcare.in" className="hover:text-white transition-colors">
                  info@poorvamcare.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
                <span>Mon-Fri: 9AM-6PM<br />Sat: 9AM-2PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-body">
            &copy; 2026 Poorvam Care. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 font-body">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
