import { useState } from "react";
import { Menu, X, ChevronDown, Puzzle, Ear, Rocket } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useServiceContext } from "@/contexts/ServiceContext";

interface HeaderProps {
  onOpenLoginModal?: (type: 'parent' | 'employee') => void;
}

export default function Header({ onOpenLoginModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [location] = useLocation();
  const { setActiveService } = useServiceContext();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navigateToService = (serviceType: string) => {
    if (location === '/') {
      // If on home page, scroll to services section and set active service
      setActiveService(serviceType as 'early-intervention' | 'hearing' | 'future-skills');
      scrollToSection('services');
    } else {
      // If on other pages, navigate to services page with hash
      window.location.href = `/services#${serviceType}`;
    }
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
              alt="Poorvam" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <h2 className="text-2xl font-serif font-bold text-blue-600">Poorvam</h2>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {location === '/' ? (
              <>
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Home</button>
                <button onClick={() => scrollToSection('onboarding')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">How It Works</button>
                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif flex items-center space-x-1">
                    <span>Services</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Our Services</h3>
                      </div>
                      
                      {/* Early Intervention */}
                      <button 
                        onClick={() => navigateToService('early-intervention')}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Puzzle className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 font-serif">Early Intervention</h4>
                            <p className="text-sm text-gray-600 font-serif">Therapeutic services for special needs children</p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Hearing Services */}
                      <button 
                        onClick={() => navigateToService('hearing')}
                        className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Ear className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 font-serif">Hearing Services</h4>
                            <p className="text-sm text-gray-600 font-serif">Comprehensive hearing care for all ages</p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Future Skills */}
                      <button 
                        onClick={() => navigateToService('future-skills')}
                        className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors duration-200 group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Rocket className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 font-serif">Future Skills</h4>
                            <p className="text-sm text-gray-600 font-serif">STEM, Arts & Creative learning with uCUBE</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
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
                {/* Mobile Services Dropdown */}
                <div className="border-b border-gray-100 pb-2">
                  <button 
                    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                    className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif flex items-center justify-between"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isServicesDropdownOpen && (
                    <div className="ml-4 space-y-2 mt-2">
                      <button 
                        onClick={() => navigateToService('early-intervention')}
                        className="block w-full text-left text-gray-600 hover:text-blue-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Puzzle className="w-4 h-4 text-blue-600" />
                        <span>Early Intervention</span>
                      </button>
                      <button 
                        onClick={() => navigateToService('hearing')}
                        className="block w-full text-left text-gray-600 hover:text-blue-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Ear className="w-4 h-4 text-blue-600" />
                        <span>Hearing Services</span>
                      </button>
                      <button 
                        onClick={() => navigateToService('future-skills')}
                        className="block w-full text-left text-gray-600 hover:text-green-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Rocket className="w-4 h-4 text-green-600" />
                        <span>Future Skills</span>
                      </button>
                    </div>
                  )}
                </div>
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
