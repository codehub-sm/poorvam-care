import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Calendar, PhoneCall, Download } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  serviceType: string;
  message: string;
  consent: boolean;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    childName: "",
    childAge: "",
    serviceType: "",
    message: "",
    consent: false,
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Message Sent!",
        description: data.warning ? "Message saved locally. We'll get back to you soon." : "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        childName: "",
        childAge: "",
        serviceType: "",
        message: "",
        consent: false,
      });
    },
    onError: (error) => {
      console.error("Contact form error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Consent Required",
        description: "Please agree to the consent terms before submitting.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const updateFormData = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "Poorvam Care Child Development Center\n\nLocation 1: Electronic City Phase 2, Ananth Nagar, Bangalore, India\nLocation 2: Electronic City Phase 1, Neeladiri Road, Bangalore, India",
      color: "bg-blue-600"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 8861764343",
      color: "bg-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      content: "poorvam.care@gmail.com",
      color: "bg-cyan-600"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Sat: 9AM-6PM",
      color: "bg-orange-600"
    }
  ];



  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule Assessment",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: PhoneCall,
      title: "Request Callback",
      color: "bg-green-600 hover:bg-green-700"
    },

    {
      icon: Download,
      title: "Download Brochure",
      color: "bg-cyan-600 hover:bg-cyan-700"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-6">
            Get in <span className="text-blue-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
            Ready to start your child's journey? Contact us today for a free consultation and assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center">
                      <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 font-serif">{info.title}</h4>
                        <p className="text-gray-600 whitespace-pre-line font-serif">{info.content}</p>
                      </div>
                    </div>
                  );
                })}
                

              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Quick Actions</h3>
              
              <div className="space-y-4">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button key={index} className={`w-full ${action.color} text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center font-serif`}>
                      <IconComponent className="w-5 h-5 mr-3" />
                      {action.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="font-serif">First Name *</Label>
                  <Input 
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    className="font-serif"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName" className="font-serif">Last Name *</Label>
                  <Input 
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    className="font-serif"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="font-serif">Email *</Label>
                  <Input 
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your@email.com"
                    className="font-serif"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="font-serif">Phone *</Label>
                  <Input 
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="font-serif"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="childName" className="font-serif">Child's Name</Label>
                  <Input 
                    id="childName"
                    type="text"
                    value={formData.childName}
                    onChange={(e) => updateFormData('childName', e.target.value)}
                    placeholder="Child's name"
                    className="font-serif"
                  />
                </div>
                
                <div>
                  <Label htmlFor="childAge" className="font-serif">Child's Age</Label>
                  <Select value={formData.childAge} onValueChange={(value) => updateFormData('childAge', value)}>
                    <SelectTrigger className="font-serif">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="11-15">11-15 years</SelectItem>
                      <SelectItem value="16+">16+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="serviceType" className="font-serif">Service of Interest</Label>
                <Select value={formData.serviceType} onValueChange={(value) => updateFormData('serviceType', value)}>
                  <SelectTrigger className="font-serif">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speech-therapy">Speech Therapy</SelectItem>
                    <SelectItem value="occupational-therapy">Occupational Therapy</SelectItem>
                    <SelectItem value="developmental-assessment">Developmental Assessment</SelectItem>
                    <SelectItem value="autism-support">Autism Support</SelectItem>
                    <SelectItem value="hearing-services">Hearing Services</SelectItem>
                    <SelectItem value="early-intervention">Early Intervention</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message" className="font-serif">Message</Label>
                <Textarea 
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateFormData('message', e.target.value)}
                  placeholder="Tell us about your concerns or questions..."
                  className="font-serif"
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => updateFormData('consent', checked as boolean)}
                  required
                />
                <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed font-serif">
                  I consent to being contacted by Poorvam Care & Hearing Solutions regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                </Label>
              </div>
              
              <Button 
                type="submit" 
                disabled={contactMutation.isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-serif"
              >
                {contactMutation.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
