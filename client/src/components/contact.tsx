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
    <section id="contact" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your child's journey? Contact us today to schedule a consultation 
            or learn more about our services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`${info.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                        <p className="text-gray-600 whitespace-pre-line text-sm">{info.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Call Now: +91 8861764343
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Brochure
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("firstName", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("lastName", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("email", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("phone", e.target.value)}
                    required
                    className="mt-1"
                    placeholder="+91 8861764343"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="childName">Child's Name (Optional)</Label>
                  <Input
                    id="childName"
                    type="text"
                    value={formData.childName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childName", e.target.value)}
                    className="mt-1"
                    placeholder="Child's name"
                  />
                </div>
                <div>
                  <Label htmlFor="childAge">Child's Age (Optional)</Label>
                  <Input
                    id="childAge"
                    type="text"
                    value={formData.childAge}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("childAge", e.target.value)}
                    className="mt-1"
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select value={formData.serviceType} onValueChange={(value: string) => updateFormData("serviceType", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="speech-therapy">Speech Therapy</SelectItem>
                    <SelectItem value="occupational-therapy">Occupational Therapy</SelectItem>
                    <SelectItem value="behavioral-therapy">Behavioral Therapy</SelectItem>
                    <SelectItem value="developmental-assessment">Developmental Assessment</SelectItem>
                    <SelectItem value="consultation">General Consultation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("message", e.target.value)}
                  className="mt-1"
                  rows={4}
                  placeholder="Tell us about your child's needs or any questions you have..."
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked: boolean) => updateFormData("consent", checked)}
                />
                <Label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                  I consent to being contacted by Poorvam Care regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full py-3 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
