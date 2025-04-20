import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, MessageSquare, Activity, Heart, Users, Baby, BookOpen } from 'lucide-react';
import { services } from '@/lib/services';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4">Our Services</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            We offer comprehensive developmental programs designed to meet the needs of children at various stages and abilities.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={fadeIn}>
              <Card className="service-card bg-white hover:-translate-y-1 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                      {service.id === 'speech' && <MessageSquare className="h-12 w-12 text-primary" />}
                      {service.id === 'occupational' && <Activity className="h-12 w-12 text-primary" />}
                      {service.id === 'physical' && <Heart className="h-12 w-12 text-primary" />}
                      {service.id === 'social' && <Users className="h-12 w-12 text-primary" />}
                      {service.id === 'early' && <Baby className="h-12 w-12 text-primary" />}
                      {service.id === 'parent' && <BookOpen className="h-12 w-12 text-primary" />}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-xl mb-2">{service.title}</h3>
                  <p className="text-neutral-600 mb-4">
                    {service.description}
                  </p>
                  <a href={`#services-${service.id}`} className="font-heading font-medium text-primary hover:text-primary-dark flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
