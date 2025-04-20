import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Parent",
    content: "The team at Poorvam Care has been instrumental in our child's development. Their personalized approach and dedication make all the difference.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "Parent",
    content: "Exceptional therapy services! Our child has shown remarkable progress in speech and social skills since starting here.",
    rating: 5
  },
  {
    name: "Meera Patel",
    role: "Parent",
    content: "The therapists are highly skilled and create such a warm, welcoming environment. We're grateful to have found Poorvam Care.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4">What Parents Say</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png" 
              alt="Google Reviews" 
              className="h-8 w-8 mr-2"
            />
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="ml-2 font-medium">4.9/5 on Google</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Quote className="absolute text-primary/10 h-24 w-24 -top-4 -left-4" />
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-600 mb-4 relative z-10">{testimonial.content}</p>
              <div className="flex items-center">
                <div>
                  <p className="font-heading font-semibold text-neutral-800">{testimonial.name}</p>
                  <p className="text-primary text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a 
            href="https://g.page/r/poorvam-care/review" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-dark font-medium"
          >
            Read more reviews on Google →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 