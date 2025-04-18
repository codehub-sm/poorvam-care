import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-[#6BA7E9] to-[#4A90E2] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              Nurturing Growth for Every Child
            </h2>
            <p className="text-white/90 text-lg mb-8">
              At Bright Beginnings, we provide specialized developmental services to help children reach their full potential in a supportive, engaging environment.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                asChild
                className="bg-white text-primary hover:bg-white/90 font-heading font-semibold px-8 py-6 rounded-xl shadow-md hover:shadow-lg"
              >
                <a href="#services">Our Services</a>
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-heading font-semibold px-8 py-6 rounded-xl"
              >
                <a href="#contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1574840881669-be18d3bf1bc1?auto=format&fit=crop&q=80&w=700&h=500" 
              alt="Diverse children in learning environment" 
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
            <motion.div 
              className="absolute -bottom-5 -left-5 bg-[#FFD966] p-4 rounded-xl shadow-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <div className="font-heading font-bold text-neutral-800">20+ Years</div>
              <div className="text-sm text-neutral-700">of Child Development Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
