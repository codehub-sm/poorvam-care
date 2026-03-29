import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

const serviceLinks = [
  { name: "Child Development Center", href: "/child-development" },
  { name: "Therapeutic Enrichment", href: "/therapeutic-enrichment" },
  { name: "Speech Therapy for Autism", href: "/speech-therapy-for-autism-bangalore" },
  { name: "Occupational Therapy for Children", href: "/occupational-therapy-for-children-bangalore" },
  { name: "Speech Delay Therapy", href: "/speech-therapy-for-speech-delay-bangalore" },
  { name: "Hulimangala, Ecity Phase 1", href: "/electronic-city-phase-1" },
  { name: "Ananth Nagar, Ecity Phase 2", href: "/electronic-city-phase-2" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Pricing & Plans", href: "/service-packages" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572411165781", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/poorvam_care/", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2D2319] text-white" role="contentinfo">
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
              <span className="text-xl font-heading font-bold text-coral">
                Poorvam<span className="text-sage">.</span> Care
              </span>
            </div>
            <p className="text-brown-light font-body text-sm leading-relaxed mb-6">
              Multi-disciplinary early intervention centre — trusted by 500+ families in Electronic City, Bangalore.
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
                    className="w-9 h-9 bg-white/10 hover:bg-coral rounded-lg flex items-center justify-center transition-colors"
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
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-coral mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brown-light hover:text-coral text-sm font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Footer quick links">
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-coral mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-brown-light hover:text-coral text-sm font-body transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-widest text-coral mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm font-body text-brown-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-coral/50 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-warm-gray text-xs">Location 1:</span><br />
                  <a href="https://maps.app.goo.gl/gwKDYNhfzywxhvd5A" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                    Electronic City Phase 1, Hulimangla Road, Near Westside &amp; Sai Baba Temple Road, Bangalore
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-coral/50 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-warm-gray text-xs">Location 2:</span><br />
                  <a href="https://maps.app.goo.gl/gWCjwHqTvoRYs6Mj9" target="_blank" rel="noopener noreferrer" className="hover:text-coral transition-colors">
                    Electronic City Phase 2, Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Bangalore
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-coral/50 flex-shrink-0" />
                <a href="tel:+918861764343" className="hover:text-coral transition-colors">
                  +91 886 176 4343
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-coral/50 flex-shrink-0" />
                <a href="mailto:info@poorvamcare.in" className="hover:text-coral transition-colors">
                  info@poorvamcare.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-coral/50 flex-shrink-0" />
                <span>Mon-Fri: 9AM-6PM<br />Sat: 9AM-2PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Hearing cross-referral */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-brown-light/60 text-sm font-body">
            For hearing assessments and hearing aids, visit{" "}
            <a href="https://poorvamhearing.com" target="_blank" rel="noopener noreferrer" className="text-coral hover:text-coral/80 transition-colors underline">
              Poorvam Hearing &rarr; poorvamhearing.com
            </a>
          </p>
        </div>

        <div className="border-t border-white/10 mt-6 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-brown-light/60 text-sm font-body text-center md:text-left">
            <p>&copy; 2026 Poorvam Care. All rights reserved.</p>
            <p className="mt-1">
              Centre management powered by{" "}
              <a href="https://theraflow.in" target="_blank" rel="dofollow" className="hover:text-coral transition-colors underline">
                TheraFlow
              </a>
            </p>
          </div>
          <div className="flex gap-6 text-sm text-brown-light/60 font-body">
            <span className="hover:text-coral cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-coral cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
