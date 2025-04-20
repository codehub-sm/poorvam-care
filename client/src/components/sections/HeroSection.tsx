import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sprout, Clock, Users, Star } from 'lucide-react';

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
              At Poorvam Care, we provide specialized developmental services to help children reach their full potential in a supportive, engaging environment.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 text-[#FFD966] mr-2" />
                  <span className="text-white font-bold">2000+</span>
                </div>
                <p className="text-white/90 text-sm">Hours of Sessions</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Users className="h-5 w-5 text-[#FFD966] mr-2" />
                  <span className="text-white font-bold">500+</span>
                </div>
                <p className="text-white/90 text-sm">Happy Families</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-[#FFD966] mr-2" />
                  <span className="text-white font-bold">20+ Years</span>
                </div>
                <p className="text-white/90 text-sm">of Excellence</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1602046819770-9571767bc3d3?auto=format&fit=crop&q=80&w=700&h=500" 
              alt="Child development therapy session" 
              className="rounded-2xl shadow-lg w-full h-auto object-cover"
            />
            
            {/* Google Reviews Preview */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg max-w-xs"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">4.9/5</span>
              </div>
              <p className="text-neutral-600 text-sm">"Amazing support for our child's development. The therapists are incredibly skilled and caring!"</p>
              <p className="text-neutral-500 text-xs mt-2">- Parent Review on Google</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
