import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: "About Us", action: () => scrollToSection('onboarding') },
    { name: "Our Services", action: () => scrollToSection('disorders') },
    { name: "Meet Our Team", action: () => scrollToSection('team') },
    { name: "Resources", action: () => scrollToSection('resources') },
    { name: "Contact Us", action: () => scrollToSection('contact') },
    { name: "Privacy Policy", action: () => {} }
  ];

  const services = [
    { name: "Speech Therapy", action: () => {} },
    { name: "Occupational Therapy", action: () => {} },
    { name: "Autism Support", action: () => {} },
    { name: "Hearing Services", action: () => scrollToSection('hearing-center') },
    { name: "Early Intervention", action: () => scrollToSection('onboarding') },
    { name: "Family Support", action: () => {} }
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61572411165781", color: "hover:bg-blue-600" },
    { icon: Twitter, href: "", color: "hover:bg-blue-400" },
    { icon: Instagram, href: "https://www.instagram.com/poorvam_care/", color: "hover:bg-pink-600" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" }
  ];

  const legalLinks = ["Terms of Service", "Privacy Policy", "Cookie Policy"];

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
                alt="Poorvam" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="text-3xl font-serif font-bold text-blue-400">Poorvam</h3>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md font-serif">
              Dedicated to unlocking every child's potential through compassionate, evidence-based therapy and early intervention services.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className={`w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ${social.color} transition-colors`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={link.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left font-serif"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-xl font-serif font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={service.action}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left font-serif"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0 font-serif">
            © 2024 Poorvam. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {legalLinks.map((link, index) => (
              <button 
                key={index}
                className="text-gray-400 hover:text-blue-400 transition-colors font-serif"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
