import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { submitLead } from "@/lib/leads";
import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";
import { CONTACT, whatsappLink, telLink } from "@/config/site";

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

export default function Contact({ formName = "contact" }: { formName?: string }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "", lastName: "", email: "", phone: "",
    childName: "", childAge: "", serviceType: "", message: "", consent: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({ title: "Consent Required", description: "Please agree to the consent terms.", variant: "destructive" });
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({ title: "Required Fields Missing", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    const result = await submitLead({ ...formData }, formName);
    setIsSubmitting(false);

    if (result.status === "failed") {
      // Never clear the form here — the parent's answers are the only copy of
      // this lead, and a fallback channel is the last chance to keep it.
      setFailed(true);
      toast({
        title: "We couldn't send that",
        description: "Please WhatsApp or call us — we don't want to miss you.",
        variant: "destructive",
      });
      return;
    }

    setFailed(false);
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", childName: "", childAge: "", serviceType: "", message: "", consent: false });
  };

  const update = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cf-firstName">First Name *</Label>
          <Input id="cf-firstName" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="cf-lastName">Last Name *</Label>
          <Input id="cf-lastName" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} required className="mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cf-email">Email *</Label>
          <Input id="cf-email" type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} required className="mt-1" />
        </div>
        <div>
          <Label htmlFor="cf-phone">Phone *</Label>
          <Input id="cf-phone" type="tel" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required className="mt-1" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cf-childName">Child's Name</Label>
          <Input id="cf-childName" value={formData.childName} onChange={(e) => update("childName", e.target.value)} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="cf-childAge">Child's Age</Label>
          <Input id="cf-childAge" value={formData.childAge} onChange={(e) => update("childAge", e.target.value)} className="mt-1" />
        </div>
      </div>
      <div>
        <Label htmlFor="cf-serviceType">Service Type</Label>
        <Select value={formData.serviceType} onValueChange={(value) => update("serviceType", value)}>
          <SelectTrigger className="mt-1"><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="speech-therapy">Speech Therapy</SelectItem>
            <SelectItem value="occupational-therapy">Occupational Therapy</SelectItem>
            <SelectItem value="behavioral-therapy">Behavioral Therapy</SelectItem>
            <SelectItem value="hearing-assessment">Hearing Assessment</SelectItem>
            <SelectItem value="hearing-aids">Hearing Aids</SelectItem>
            <SelectItem value="enrichment">Enrichment Programs</SelectItem>
            <SelectItem value="consultation">General Consultation</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="cf-message">Message</Label>
        <Textarea id="cf-message" value={formData.message} onChange={(e) => update("message", e.target.value)} className="mt-1 resize-none" rows={3} placeholder="Tell us about your needs..." />
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="cf-consent" checked={formData.consent} onCheckedChange={(checked) => update("consent", checked as boolean)} className="mt-0.5" />
        <Label htmlFor="cf-consent" className="text-xs text-gray-600 leading-relaxed">
          I consent to being contacted by Poorvam Care regarding my inquiry. *
        </Label>
      </div>
      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {failed && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
          <p className="font-semibold text-red-800">We couldn't send your message.</p>
          <p className="mt-1 text-red-700">
            Your details are still filled in above, so you can try again — or reach us
            directly and we'll pick it up from there.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsappLink(
                `Hi Poorvam Care, I tried to send an enquiry through your website but it didn't go through. My name is ${formData.firstName} ${formData.lastName}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("contact-form-fallback")}
              className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              WhatsApp us
            </a>
            <a
              href={telLink}
              onClick={() => trackCallClick("contact-form-fallback")}
              className="rounded-md border border-red-300 px-4 py-2 font-semibold text-red-800 hover:bg-red-100"
            >
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
