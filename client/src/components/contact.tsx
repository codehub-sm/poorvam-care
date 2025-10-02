import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Calendar, PhoneCall, Download } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Google Apps Script integration
  const submitContactForm = async (data: ContactFormData) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec';
    
    console.log('🚀 Submitting to Google Sheets via Apps Script:', scriptUrl);
    console.log('📝 Form data:', data);
    
    // Create JSON payload for Google Apps Script
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      childName: data.childName,
      childAge: data.childAge,
      serviceType: data.serviceType,
      message: data.message,
      consent: data.consent,
      timestamp: new Date().toISOString()
    };

    console.log('📦 JSON payload:', payload);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'no-cors' // Required for Google Apps Script
    });

    console.log('✅ Form submitted to Google Sheets');
    return { success: true };

    // Commented out Lambda approach for reference
    /*
    const apiUrl = 'https://gnuk7074fb.execute-api.ap-south-1.amazonaws.com/prod/contact';
    
    console.log('🚀 Submitting contact form to:', apiUrl);
    console.log('📝 Form data:', data);
    
    const response = await fetch(apiUrl, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('✅ API Success:', result);
    return result;
    */
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('🎯 Form submitted!');
    console.log('📋 Form data:', formData);
    
    if (!formData.consent) {
      console.log('❌ Consent missing');
      toast({
        title: "Consent Required",
        description: "Please agree to the consent terms before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      console.log('❌ Required fields missing');
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields (First Name, Last Name, Email, Phone).",
        variant: "destructive",
      });
      return;
    }

    console.log('✅ Validation passed, submitting...');
    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm(formData);
      
      console.log('🎉 Form submission successful:', result);
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      // Reset form
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

    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      content: "info@poorvamcare.in\nappointments@poorvamcare.in",
      color: "bg-purple-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
      color: "bg-orange-600"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-60">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10"></div>
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-24">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl mb-8 shadow-2xl relative">
            <Phone className="w-10 h-10 text-white" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-3xl blur-lg opacity-50"></div>
          </div>
          <h2 className="text-6xl lg:text-7xl font-bold text-white mb-8 font-serif tracking-tight">
            Connect with <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Poorvam</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto font-serif leading-relaxed">
            Ready to explore how Poorvam can help you or your family? Contact us today to schedule a consultation 
            or learn more about our comprehensive services across all three business lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative">
                <h3 className="text-4xl font-bold text-white mb-10 font-serif">Contact Information</h3>
                <div className="grid grid-cols-1 gap-8">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <div className="flex items-start space-x-6">
                          <div className={`${info.color} p-5 rounded-2xl shadow-xl group-hover:scale-110 transition-all duration-500 relative`}>
                            <Icon className="w-7 h-7 text-white relative z-10" />
                            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-4 text-xl font-serif">{info.title}</h4>
                            <p className="text-slate-300 whitespace-pre-line leading-relaxed font-serif text-lg">{info.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="relative">
                <h4 className="text-3xl font-bold text-white mb-8 font-serif">Quick Actions</h4>
                <div className="space-y-6">
                  <Button 
                    className="w-full justify-start h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                    onClick={() => window.open('tel:+918861764343')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <PhoneCall className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">Call Now: +91 8861764343</span>
                  </Button>
                  <Button 
                    className="w-full justify-start h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                    onClick={() => window.open('mailto:appointments@poorvamcare.in')}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Calendar className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">Schedule Appointment</span>
                  </Button>
                  <Button 
                    className="w-full justify-start h-16 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-400 hover:to-slate-500 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-slate-500/25 transition-all duration-500 transform hover:scale-[1.02] group relative overflow-hidden"
                    onClick={() => {/* Add brochure download functionality */}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Download className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform duration-500 relative z-10" />
                    <span className="relative z-10">Download Brochure</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl mb-6 shadow-2xl relative">
                  <Mail className="w-8 h-8 text-white relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-2xl blur-lg opacity-50"></div>
                </div>
                <h3 className="text-4xl font-bold text-white font-serif mb-4">Send Us a Message</h3>
                <p className="text-slate-300 text-lg font-serif">We'll get back to you within 24 hours</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="firstName" className="text-white font-bold font-serif text-lg mb-3 block">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("firstName", e.target.value)}
                      required
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white font-bold font-serif text-lg mb-3 block">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("lastName", e.target.value)}
                      required
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="email" className="text-white font-bold font-serif text-lg mb-3 block">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("email", e.target.value)}
                      required
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white font-bold font-serif text-lg mb-3 block">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("phone", e.target.value)}
                      required
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="+91 8861764343"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="childName" className="text-white font-bold font-serif text-lg mb-3 block">Child's Name (Optional)</Label>
                    <Input
                      id="childName"
                      type="text"
                      value={formData.childName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childName", e.target.value)}
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="Child's name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="childAge" className="text-white font-bold font-serif text-lg mb-3 block">Child's Age (Optional)</Label>
                    <Input
                      id="childAge"
                      type="text"
                      value={formData.childAge}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childAge", e.target.value)}
                      className="h-14 rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm"
                      placeholder="e.g., 5 years"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="serviceType" className="text-white font-bold font-serif text-lg mb-3 block">Service Type</Label>
                  <Select value={formData.serviceType} onValueChange={(value: string) => updateFormData("serviceType", value)}>
                    <SelectTrigger className="h-14 rounded-2xl border-white/20 bg-white/10 text-white focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 backdrop-blur-sm">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-white/20 bg-slate-800/95 backdrop-blur-xl shadow-2xl">
                    <SelectItem value="speech-therapy">Speech Therapy</SelectItem>
                    <SelectItem value="occupational-therapy">Occupational Therapy</SelectItem>
                    <SelectItem value="behavioral-therapy">Behavioral Therapy</SelectItem>
                    <SelectItem value="developmental-assessment">Developmental Assessment</SelectItem>
                    <SelectItem value="hearing-assessment">Hearing Assessment</SelectItem>
                    <SelectItem value="hearing-aids">Hearing Aids</SelectItem>
                    <SelectItem value="dance-classes">Dance Classes</SelectItem>
                    <SelectItem value="yoga-classes">Yoga Classes</SelectItem>
                    <SelectItem value="music-classes">Music Classes</SelectItem>
                    <SelectItem value="art-craft">Art & Craft</SelectItem>
                    <SelectItem value="public-speaking">Public Speaking</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

                <div>
                  <Label htmlFor="message" className="text-white font-bold font-serif text-lg mb-3 block">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("message", e.target.value)}
                    className="rounded-2xl border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 focus:bg-white/20 transition-all duration-500 resize-none backdrop-blur-sm"
                    rows={5}
                    placeholder="Tell us about your needs or any questions you have about our services..."
                  />
                </div>

                <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked: boolean) => updateFormData("consent", checked)}
                    className="mt-1"
                  />
                  <Label htmlFor="consent" className="text-sm text-slate-300 leading-relaxed font-serif">
                    I consent to being contacted by Poorvam regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-white rounded-2xl font-bold text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {isSubmitting ? (
                    <div className="flex items-center space-x-3 relative z-10">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Send Message</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
