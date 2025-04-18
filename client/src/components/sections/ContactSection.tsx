import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertContactMessageSchema } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import Map from '@/components/ui/map';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Extending the schema for better validation messages
const extendedContactSchema = insertContactMessageSchema.extend({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must agree to the privacy policy'
  })
});

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof extendedContactSchema>>({
    resolver: zodResolver(extendedContactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      consent: false
    }
  });
  
  const onSubmit = async (data: z.infer<typeof extendedContactSchema>) => {
    setIsSubmitting(true);
    
    // Remove consent from the data to be sent to API
    const { consent, ...contactData } = data;
    
    try {
      const response = await apiRequest('POST', '/api/contact', contactData);
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send your message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="font-heading font-bold text-3xl text-neutral-800 mb-4">Contact Us</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Have questions or ready to schedule an appointment? We're here to help you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Card className="bg-neutral-50 shadow-sm">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading font-medium text-neutral-800">Full Name*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              className="px-4 py-3 rounded-xl" 
                              {...field} 
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading font-medium text-neutral-800">Email Address*</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email"
                              className="px-4 py-3 rounded-xl"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading font-medium text-neutral-800">Phone Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(123) 456-7890" 
                              type="tel"
                              className="px-4 py-3 rounded-xl"
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading font-medium text-neutral-800">Service of Interest*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger className="px-4 py-3 rounded-xl bg-white">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="speech">Speech & Language Therapy</SelectItem>
                              <SelectItem value="occupational">Occupational Therapy</SelectItem>
                              <SelectItem value="physical">Physical Therapy</SelectItem>
                              <SelectItem value="social">Social Skills Groups</SelectItem>
                              <SelectItem value="early">Early Intervention</SelectItem>
                              <SelectItem value="parent">Parent Coaching</SelectItem>
                              <SelectItem value="assessment">Development Assessment</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-heading font-medium text-neutral-800">Message*</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please share your questions or concerns..." 
                              className="px-4 py-3 rounded-xl min-h-[120px]"
                              rows={4}
                              {...field}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="consent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-neutral-600 text-sm font-normal">
                              I agree to the <a href="#" className="text-primary hover:underline">privacy policy</a> and consent to being contacted regarding my inquiry.
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark text-white font-heading font-semibold px-6 py-6 rounded-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <Card className="bg-neutral-50 shadow-sm mb-8">
              <CardContent className="p-8">
                <h3 className="font-heading font-semibold text-xl mb-4">Our Location</h3>
                <div className="flex items-start mb-4">
                  <MapPin className="text-primary h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Bright Beginnings Child Development Center</p>
                    <p className="text-neutral-600">123 Growth Avenue, Suite 200<br />Sunnyville, CA 90210</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <Clock className="text-primary h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Hours of Operation</p>
                    <p className="text-neutral-600">Monday to Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <Phone className="text-primary h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-neutral-600">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-primary h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-neutral-600">info@brightbeginningscenter.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Map */}
            <Map 
              address="123 Growth Avenue, Suite 200, Sunnyville, CA 90210" 
              className="h-80" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
