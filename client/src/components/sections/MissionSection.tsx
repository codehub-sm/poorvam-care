import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, UsersRound } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const MissionSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4">Our Mission</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            We believe every child deserves the opportunity to develop to their fullest potential, regardless of their starting point or challenges.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-neutral-50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Personalized Care</h3>
                <p className="text-neutral-600">
                  We develop individualized programs that address each child's unique developmental needs and abilities.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-neutral-50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-[#50C878]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#50C878]" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Expert Team</h3>
                <p className="text-neutral-600">
                  Our staff includes certified therapists, educators, and child development specialists passionate about helping children.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-neutral-50 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="bg-[#FFD966]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <UsersRound className="h-8 w-8 text-[#E6C25C]" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Family Partnership</h3>
                <p className="text-neutral-600">
                  We work closely with families, providing resources and training to continue development at home.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
