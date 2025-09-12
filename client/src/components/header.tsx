import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

interface HeaderProps {
  onOpenLoginModal?: (type: 'parent' | 'employee') => void;
}

export default function Header({ onOpenLoginModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
              alt="Poorvam Care & Hearing Solutions Logo" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-2xl font-serif font-bold text-blue-600">Poorvam Care & Hearing Solutions</h2>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {location === '/' ? (
              <>
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Home</button>
                <button onClick={() => scrollToSection('onboarding')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">How It Works</button>
                <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Services</button>
                <Link href="/service-packages" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Book Online</Link>
                <button onClick={() => scrollToSection('team')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Team</button>
                <button onClick={() => scrollToSection('resources')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Resources</button>
                <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Contact</button>
              </>
            ) : (
              <>
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Home</Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Services</Link>
                <Link href="/service-packages" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Book Online</Link>
                <Link href="/#team" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Team</Link>
                <Link href="/#resources" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Resources</Link>
                <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Contact</Link>
              </>
            )}
          </nav>
          
          {/* Login Buttons */}
          <div className="flex items-center space-x-4">
            {/* <button 
              onClick={() => onOpenLoginModal?.('parent')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Parent Login
            </button>
            <button 
              onClick={() => onOpenLoginModal?.('employee')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Staff Login
            </button> */}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-blue-600" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {location === '/' ? (
              <>
                <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Home</button>
                <button onClick={() => scrollToSection('onboarding')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">How It Works</button>
                <button onClick={() => scrollToSection('services')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Services</button>
                <Link href="/service-packages" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Book Online</Link>
                <button onClick={() => scrollToSection('team')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Team</button>
                <button onClick={() => scrollToSection('resources')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Resources</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Contact</button>
              </>
            ) : (
              <>
                <Link href="/" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Home</Link>
                <Link href="/services" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Services</Link>
                <Link href="/service-packages" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Book Online</Link>
                <Link href="/#team" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Team</Link>
                <Link href="/#resources" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Resources</Link>
                <Link href="/#contact" className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Contact</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
