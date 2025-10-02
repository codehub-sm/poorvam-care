import { useState } from "react";
import { Menu, X, ChevronDown, Heart, Ear, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useServiceContext } from "@/contexts/ServiceContext";

interface HeaderProps {
  onOpenLoginModal?: (type: 'parent' | 'employee') => void;
}

export default function Header({ onOpenLoginModal }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [location] = useLocation();
  const { setActiveBusinessLine } = useServiceContext();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsServicesDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 300); // 300ms delay before closing
    setDropdownTimeout(timeout);
  };

  const navigateToBusinessLine = (businessLine: 'child-development' | 'hearing-center' | 'ucube') => {
    if (location === '/') {
      // If on home page, scroll to services section and set active business line
      setActiveBusinessLine(businessLine);
      scrollToSection('services');
    } else {
      // If on other pages, navigate to services page with hash
      const serviceMap = {
        'child-development': 'early-intervention',
        'hearing-center': 'hearing',
        'ucube': 'future-skills'
      };
      window.location.href = `/services#${serviceMap[businessLine]}`;
    }
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <img 
                src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg" 
                alt="Poorvam" 
                className="w-14 h-14 rounded-full object-cover shadow-lg ring-2 ring-blue-100 group-hover:ring-blue-300 transition-all duration-300"
              />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent font-serif group-hover:from-blue-600 group-hover:to-emerald-600 transition-all duration-300">Poorvam</h2>
              <p className="text-xs text-slate-500 font-serif">Comprehensive Care Solutions</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {location === '/' ? (
              <>
                <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Home</button>
                <button onClick={() => scrollToSection('onboarding')} className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-serif">Our Process</button>
                {/* Services Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button 
                    className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-serif flex items-center space-x-1"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Premium Dropdown Menu */}
                  {isServicesDropdownOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 py-2 z-50"
                    >
                      <div className="px-6 py-4 border-b border-slate-100">
                        <h3 className="text-lg font-bold text-slate-800 font-serif">Our Business Lines</h3>
                        <p className="text-sm text-slate-600 font-serif">Comprehensive care across three specialized areas</p>
                      </div>
                      
                      {/* Child Development Center */}
                      <button 
                        onClick={() => navigateToBusinessLine('child-development')}
                        className="w-full px-6 py-4 text-left hover:bg-blue-50 transition-all duration-300 group"
                        onMouseEnter={handleDropdownMouseEnter}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Heart className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-serif">Child Development Center</h4>
                            <p className="text-sm text-slate-600 font-serif">Therapies and counselling for developmental needs</p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Hearing Center */}
                      <button 
                        onClick={() => navigateToBusinessLine('hearing-center')}
                        className="w-full px-6 py-4 text-left hover:bg-cyan-50 transition-all duration-300 group"
                        onMouseEnter={handleDropdownMouseEnter}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Ear className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-cyan-600 transition-colors font-serif">Hearing Center</h4>
                            <p className="text-sm text-slate-600 font-serif">Hearing tests, aids, and comprehensive audiological care</p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Ucube */}
                      <button 
                        onClick={() => navigateToBusinessLine('ucube')}
                        className="w-full px-6 py-4 text-left hover:bg-emerald-50 transition-all duration-300 group"
                        onMouseEnter={handleDropdownMouseEnter}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Sparkles className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors font-serif">Ucube</h4>
                            <p className="text-sm text-slate-600 font-serif">Enrichment skills: Dance, Yoga, Music, Art & more</p>
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
                <button onClick={() => scrollToSection('onboarding')} className="block w-full text-left text-gray-700 hover:text-blue-600 py-2 font-serif">Our Process</button>
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
                        onClick={() => navigateToBusinessLine('child-development')}
                        className="block w-full text-left text-gray-600 hover:text-blue-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Heart className="w-4 h-4 text-blue-600" />
                        <span>Child Development Center</span>
                      </button>
                      <button 
                        onClick={() => navigateToBusinessLine('hearing-center')}
                        className="block w-full text-left text-gray-600 hover:text-cyan-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Ear className="w-4 h-4 text-cyan-600" />
                        <span>Hearing Center</span>
                      </button>
                      <button 
                        onClick={() => navigateToBusinessLine('ucube')}
                        className="block w-full text-left text-gray-600 hover:text-emerald-600 py-2 font-serif flex items-center space-x-2"
                      >
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>Ucube</span>
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
