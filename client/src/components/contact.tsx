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
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl mb-6 shadow-lg">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6 font-serif">
            Get In Touch with Poorvam
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-serif leading-relaxed">
            Ready to explore how Poorvam can help you or your family? Contact us today to schedule a consultation 
            or learn more about our comprehensive services across all three business lines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-3xl font-bold text-slate-800 mb-8 font-serif">Contact Information</h3>
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="group p-6 bg-gradient-to-r from-white/50 to-white/30 rounded-2xl border border-white/40 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-start space-x-4">
                        <div className={`${info.color} p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800 mb-3 text-lg font-serif">{info.title}</h4>
                          <p className="text-slate-600 whitespace-pre-line leading-relaxed font-serif">{info.content}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h4 className="text-2xl font-bold text-slate-800 mb-6 font-serif">Quick Actions</h4>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                  onClick={() => window.open('tel:+918861764343')}
                >
                  <PhoneCall className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Call Now: +91 8861764343
                </Button>
                <Button 
                  className="w-full justify-start h-14 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                  onClick={() => window.open('mailto:appointments@poorvamcare.in')}
                >
                  <Calendar className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Schedule Appointment
                </Button>
                <Button 
                  className="w-full justify-start h-14 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
                  onClick={() => {/* Add brochure download functionality */}}
                >
                  <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl mb-4 shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-slate-800 font-serif">Send Us a Message</h3>
              <p className="text-slate-600 mt-2 font-serif">We'll get back to you within 24 hours</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-slate-700 font-semibold font-serif">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("firstName", e.target.value)}
                    required
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-slate-700 font-semibold font-serif">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("lastName", e.target.value)}
                    required
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-semibold font-serif">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("email", e.target.value)}
                    required
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-semibold font-serif">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("phone", e.target.value)}
                    required
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="+91 8861764343"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="childName" className="text-slate-700 font-semibold font-serif">Child's Name (Optional)</Label>
                  <Input
                    id="childName"
                    type="text"
                    value={formData.childName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childName", e.target.value)}
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Child's name"
                  />
                </div>
                <div>
                  <Label htmlFor="childAge" className="text-slate-700 font-semibold font-serif">Child's Age (Optional)</Label>
                  <Input
                    id="childAge"
                    type="text"
                    value={formData.childAge}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childAge", e.target.value)}
                    className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceType" className="text-slate-700 font-semibold font-serif">Service Type</Label>
                <Select value={formData.serviceType} onValueChange={(value: string) => updateFormData("serviceType", value)}>
                  <SelectTrigger className="mt-2 h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200 shadow-xl">
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
                <Label htmlFor="message" className="text-slate-700 font-semibold font-serif">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("message", e.target.value)}
                  className="mt-2 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                  rows={4}
                  placeholder="Tell us about your needs or any questions you have about our services..."
                />
              </div>

              <div className="flex items-start space-x-3 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked: boolean) => updateFormData("consent", checked)}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-slate-600 leading-relaxed font-serif">
                  I consent to being contacted by Poorvam regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
