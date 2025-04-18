import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sprout, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/#home', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/#resources', label: 'Resources' },
  { href: '/#contact', label: 'Contact' }
];

const Navbar: React.FC = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (href: string) => {
    if (href === '/#home' && location === '/') return true;
    return location === href;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                <Sprout className="text-white h-5 w-5" />
              </div>
              <h1 className="font-heading font-bold text-2xl text-primary">Bright Beginnings</h1>
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className={`font-heading font-medium ${
                  isActive(link.href) 
                    ? 'text-primary' 
                    : 'text-neutral-600 hover:text-primary'
                } transition-colors py-2`}
                onClick={(e) => {
                  if (link.href.startsWith('/#')) {
                    e.preventDefault();
                    const id = link.href.substring(2);
                    const element = document.getElementById(id);
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth'
                      });
                    }
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-neutral-600 focus:ring-0"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav 
              className="md:hidden py-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.href}
                    href={link.href}
                    className={`font-heading font-medium ${
                      isActive(link.href) 
                        ? 'text-primary' 
                        : 'text-neutral-600 hover:text-primary'
                    } transition-colors py-2`}
                    onClick={(e) => {
                      if (link.href.startsWith('/#')) {
                        e.preventDefault();
                        const id = link.href.substring(2);
                        const element = document.getElementById(id);
                        if (element) {
                          window.scrollTo({
                            top: element.offsetTop - 80,
                            behavior: 'smooth'
                          });
                          setMobileMenuOpen(false);
                        }
                      }
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
