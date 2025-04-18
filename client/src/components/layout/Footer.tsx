import React, { useState } from 'react';
import { Sprout, Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { insertSubscriberSchema } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const extendedSubscriberSchema = insertSubscriberSchema.extend({
  email: z.string().email('Please enter a valid email address')
});

const Footer: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof extendedSubscriberSchema>>({
    resolver: zodResolver(extendedSubscriberSchema),
    defaultValues: {
      email: ''
    }
  });
  
  const onSubmit = async (data: z.infer<typeof extendedSubscriberSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest('POST', '/api/subscribe', data);
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
          description: result.message || "Failed to subscribe. Please try again.",
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
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <Sprout className="text-primary h-5 w-5" />
              </div>
              <h2 className="font-heading font-bold text-2xl">Bright Beginnings</h2>
            </div>
            <p className="mb-4">
              Nurturing development and unlocking potential in every child through specialized care and support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white/80 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white/80 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white/80 transition-colors">Our Services</a></li>
              <li><a href="#resources" className="hover:text-white/80 transition-colors">Resources</a></li>
              <li><a href="#contact" className="hover:text-white/80 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white/80 transition-colors">Speech Therapy</a></li>
              <li><a href="#services" className="hover:text-white/80 transition-colors">Occupational Therapy</a></li>
              <li><a href="#services" className="hover:text-white/80 transition-colors">Physical Therapy</a></li>
              <li><a href="#services" className="hover:text-white/80 transition-colors">Social Skills Groups</a></li>
              <li><a href="#services" className="hover:text-white/80 transition-colors">Early Intervention</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-xl mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to receive updates, resources, and event information.</p>
            <form className="mb-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-l-lg rounded-r-none text-neutral-800 focus:outline-none flex-grow"
                  aria-label="Email for newsletter"
                  {...form.register('email')}
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  className="bg-[#FFD966] text-neutral-800 font-medium rounded-r-lg rounded-l-none"
                  disabled={isSubmitting}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {form.formState.errors.email && (
                <p className="text-white/90 text-sm mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </form>
            <p className="text-sm text-white/80">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Bright Beginnings Child Development Center. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
