import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { UserCheck, Shield } from 'lucide-react';
import { team } from '@/lib/team';

const fadeInUp = {
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

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-6">About Our Center</h2>
            <p className="text-neutral-600 mb-4">
              Founded in 2001, Bright Beginnings has been a trusted resource for families seeking developmental support for their children. Our center was created by Dr. Maria Chen, a developmental psychologist passionate about creating accessible, evidence-based interventions for children of all abilities.
            </p>
            <p className="text-neutral-600 mb-6">
              Today, our team of over 25 specialists works together to provide comprehensive care in a supportive, play-based environment. We've helped more than 5,000 children achieve developmental milestones and build confidence in their abilities.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <UserCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-heading font-bold text-2xl">25+</div>
                  <div className="text-neutral-600">Specialists</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-[#50C878]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-[#50C878]" />
                </div>
                <div>
                  <div className="font-heading font-bold text-2xl">20+</div>
                  <div className="text-neutral-600">Years Experience</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 grid grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={container}
          >
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1544776193-68e6f0533f56?auto=format&fit=crop&q=80&w=400&h=500" 
                alt="Child development activity" 
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Therapist working with child" 
                className="w-full h-40 object-cover rounded-xl shadow-md"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1510739859545-e7b9e979de86?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Child learning through play" 
                className="w-full h-40 object-cover rounded-xl shadow-md"
              />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <img 
                src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?auto=format&fit=crop&q=80&w=400&h=500" 
                alt="Supportive therapy environment" 
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Team Section */}
        <div className="mt-16">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="font-heading font-bold text-2xl text-neutral-800 mb-4">Our Team</h3>
            <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              Meet our dedicated professionals committed to helping your child thrive.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {team.map((member) => (
              <motion.div key={member.id} className="text-center" variants={fadeInUp}>
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <div className="absolute inset-0 bg-primary rounded-full opacity-10"></div>
                  <img 
                    src={member.imageUrl}
                    alt={member.name} 
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
                <h4 className="font-heading font-semibold text-lg">{member.name}</h4>
                <p className="text-primary">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
