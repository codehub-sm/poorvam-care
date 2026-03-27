import { useState } from "react";
import { MapPin, Phone, Mail, Clock, PhoneCall, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import SeoHead from "@/components/seo-head";
import StructuredData, { createBreadcrumbSchema } from "@/components/structured-data";

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

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Loc 1: EC Phase 1, Hulimangla Road, Near Westside & Sai Baba Temple Road, Bangalore",
      "Loc 2: EC Phase 2, Ananth Nagar, Above Bata Showroom, Opp. Udipi Aaradhya Restaurant, Bangalore",
    ],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 886 176 4343"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@poorvamcare.in", "appointments@poorvamcare.in"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Mon-Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"],
  },
];

export default function ContactPage() {
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

  const submitContactForm = async (data: ContactFormData) => {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzlz71svz_5jZu8xw5_V6pHZlEPI53zPtg9Ye4UcDm8Eet8zKi4A62mlkxIxr7SgLilWg/exec';

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

    await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    return { success: true };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.consent) {
      toast({ title: "Consent Required", description: "Please agree to the consent terms before submitting.", variant: "destructive" });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({ title: "Required Fields Missing", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      toast({ title: "Message Sent!", description: "Thank you for contacting us. We'll get back to you within 24 hours." });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", childName: "", childAge: "", serviceType: "", message: "", consent: false });
    } catch {
      toast({ title: "Submission Failed", description: "There was an error. Please try again or call us directly.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const update = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <SeoHead
        title="Contact Poorvam Care - Book Free Consultation | Electronic City, Bangalore"
        description="Contact Poorvam Care in Electronic City, Bangalore. Book a free consultation for child therapy, speech therapy, hearing care. Two locations: EC Phase 1 & Phase 2. Call +91 886 176 4343."
        canonical="https://poorvamcare.in/contact"
      />
      <StructuredData data={createBreadcrumbSchema([
        { name: "Home", url: "https://poorvamcare.in/" },
        { name: "Contact", url: "https://poorvamcare.in/contact" },
      ])} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-warm-bg via-white to-warm-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-brown-deep mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto">
            Ready to take the first step? Book a free consultation or reach out with any questions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-coral/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-coral" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-brown-deep text-sm mb-1">{info.title}</h3>
                      {info.lines.map((line, j) => (
                        <p key={j} className="text-sm text-brown-mid font-body">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="pt-4 space-y-3">
                <Button
                  className="w-full justify-start h-12 bg-coral hover:bg-coral-dark text-white rounded-xl font-heading font-semibold"
                  onClick={() => window.open('tel:+918861764343')}
                >
                  <PhoneCall className="w-5 h-5 mr-3" />
                  Call Now: +91 886 176 4343
                </Button>
                <Button
                  className="w-full justify-start h-12 bg-sage hover:bg-sage-dark text-white rounded-xl font-heading font-semibold"
                  onClick={() => window.open('mailto:appointments@poorvamcare.in')}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Email for Appointment
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-warm-bg rounded-2xl p-8 border border-warm-gray-200">
                <h2 className="text-2xl font-heading font-bold text-brown-deep mb-2">Send Us a Message</h2>
                <p className="text-brown-mid font-body text-sm mb-6">We'll get back to you within 24 hours</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-heading font-medium text-gray-700">First Name *</Label>
                      <Input id="firstName" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} required className="mt-1 rounded-xl" placeholder="Your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-heading font-medium text-gray-700">Last Name *</Label>
                      <Input id="lastName" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} required className="mt-1 rounded-xl" placeholder="Your last name" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-heading font-medium text-gray-700">Email *</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required className="mt-1 rounded-xl" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-heading font-medium text-gray-700">Phone *</Label>
                      <Input id="phone" type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required className="mt-1 rounded-xl" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="childName" className="text-sm font-heading font-medium text-gray-700">Child's Name</Label>
                      <Input id="childName" value={formData.childName} onChange={(e) => update("childName", e.target.value)} className="mt-1 rounded-xl" placeholder="Optional" />
                    </div>
                    <div>
                      <Label htmlFor="childAge" className="text-sm font-heading font-medium text-gray-700">Child's Age</Label>
                      <Input id="childAge" value={formData.childAge} onChange={(e) => update("childAge", e.target.value)} className="mt-1 rounded-xl" placeholder="e.g., 5 years" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serviceType" className="text-sm font-heading font-medium text-gray-700">Service Type</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => update("serviceType", value)}>
                      <SelectTrigger className="mt-1 rounded-xl">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Label htmlFor="message" className="text-sm font-heading font-medium text-gray-700">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => update("message", e.target.value)} className="mt-1 rounded-xl resize-none" rows={4} placeholder="Tell us about your needs or questions..." />
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox id="consent" checked={formData.consent} onCheckedChange={(checked) => update("consent", checked as boolean)} className="mt-0.5" />
                    <Label htmlFor="consent" className="text-xs text-brown-mid font-body leading-relaxed">
                      I consent to being contacted by Poorvam Care regarding my inquiry and understand that my information will be handled according to the privacy policy. *
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-coral hover:bg-coral-dark text-white rounded-xl font-heading font-bold text-base disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
