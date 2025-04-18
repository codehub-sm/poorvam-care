import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Video, BookOpen, ChevronUp, ChevronDown, PlusCircle, MinusCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/lib/faqs';

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

const ResourcesSection: React.FC = () => {
  return (
    <section id="resources" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4">Resources for Parents</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            We provide these helpful resources to support you in continuing your child's development at home.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div variants={fadeInUp}>
            <Card className="bg-white hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Development Guides</h3>
                <p className="text-neutral-600 mb-4">
                  Age-specific guides covering developmental milestones and activities to encourage growth.
                </p>
                <a href="#guides" className="font-heading font-medium text-primary hover:text-primary-dark flex items-center">
                  Browse guides <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-white hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="bg-[#50C878]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-[#50C878]" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Video Library</h3>
                <p className="text-neutral-600 mb-4">
                  Instructional videos demonstrating therapy techniques and activities you can do at home.
                </p>
                <a href="#videos" className="font-heading font-medium text-primary hover:text-primary-dark flex items-center">
                  Watch videos <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <Card className="bg-white hover:shadow-md transition-shadow h-full">
              <CardContent className="p-6">
                <div className="bg-[#FFD966]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-[#E6C25C]" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">Recommended Reading</h3>
                <p className="text-neutral-600 mb-4">
                  Books and articles selected by our specialists on child development and parenting.
                </p>
                <a href="#reading" className="font-heading font-medium text-primary hover:text-primary-dark flex items-center">
                  Explore reading list <ChevronUp className="ml-1 h-4 w-4 rotate-90" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <h3 className="font-heading font-bold text-2xl text-neutral-800 mb-4">Frequently Asked Questions</h3>
            <div className="w-12 h-1 bg-primary mx-auto mb-4"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border-none"
                >
                  <AccordionTrigger className="p-5 font-heading font-medium text-neutral-800 hover:no-underline">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 text-neutral-600">
                    <p>{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;
