import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import ConsultationBooking from "@/components/consultation-booking";
import { submitLead } from "@/lib/leads";
import { trackWhatsAppClick, trackCallClick, trackEvent } from "@/lib/analytics";
import { CONTACT, whatsappLink, telLink } from "@/config/site";
import { MARKET_LIST } from "@/config/markets";

/**
 * Progressive enquiry form for the online offering.
 *
 * The important property is that step 1 SUBMITS ON ITS OWN. A parent who fills
 * in their name and email and then abandons at step 2 is still a captured lead
 * — under a single long form, that same parent is lost entirely. Later steps
 * enrich the same record via a shared `leadId` rather than replacing it.
 *
 * The country field is a real eligibility gate, not a disclaimer. Speech-language
 * pathology is a licensed profession in the US and Canada and licensure follows
 * the CLIENT's location, so an RCI registration does not permit us to treat a
 * child resident there. A footer disclaimer contradicted by a booking flow that
 * accepts those clients anyway is worse than no disclaimer — it establishes that
 * we knew. So the gate sits here, in the flow, before any booking exists.
 */

/** Countries we cannot lawfully serve, with the reason surfaced to the user. */
const BLOCKED_COUNTRIES = ["United States", "Canada"];

const COUNTRY_OPTIONS = [
  ...MARKET_LIST.map((m) => m.countryName),
  ...BLOCKED_COUNTRIES,
  "Other",
];

const CONCERNS = [
  "Not talking / late to talk",
  "Unclear speech others can't understand",
  "Stammering or stuttering",
  "Autism-related communication",
  "Language delay",
  "Reading or learning difficulty",
  "Not sure yet",
];

const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];

interface Step1Data {
  parentName: string;
  email: string;
  country: string;
  childAge: string;
}

/** Correlates the step-1 row with its step-2 enrichment in the sheet. */
function newLeadId(): string {
  return `L${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
}

export default function OnlineEnquiryForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [leadId, setLeadId] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const [s1, setS1] = useState<Step1Data>({
    parentName: "",
    email: "",
    country: "",
    childAge: "",
  });
  const [concern, setConcern] = useState("");
  const [language, setLanguage] = useState("");
  const [notes, setNotes] = useState("");

  const blocked = BLOCKED_COUNTRIES.includes(s1.country);
  const step1Valid =
    s1.parentName.trim() && s1.email.trim() && s1.country && !blocked;

  const submitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step1Valid) return;
    setBusy(true);

    const id = newLeadId();
    setLeadId(id);
    const result = await submitLead(
      { leadId: id, stage: "enquiry-step-1", ...s1 },
      "online-enquiry",
    );
    setBusy(false);

    if (result.status === "failed") {
      setFailed(true);
      return;
    }
    setFailed(false);
    setStep(2);
  };

  const submitStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    // Fire-and-continue: step 1 already captured the lead, so a failure here
    // must not block the parent or lose what we already have.
    await submitLead(
      { leadId, stage: "enquiry-step-2", ...s1, concern, language, notes },
      "online-enquiry",
    );
    setBusy(false);
    setStep(3);
  };

  const skipToEnd = () => {
    trackEvent("enquiry_step2_skipped", { lead_id: leadId });
    setStep(3);
  };

  /* ---------------------------------------------------------------- */

  if (blocked) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-bold text-amber-900">
              We can't take clients in {s1.country}
            </p>
            <p className="mt-2 text-sm text-amber-800 font-body leading-relaxed">
              Speech-language pathology is a licensed profession in {s1.country}, and
              the licence has to be held where the child lives — not where the
              therapist works. Our clinicians hold Indian registration, which doesn't
              cover us to treat a child resident there. We'd rather tell you this now
              than take a booking we can't lawfully honour.
            </p>
            <p className="mt-3 text-sm text-amber-800 font-body">
              Your national professional association is the best route to a local
              provider, and many run directories of clinicians offering telehealth
              within your country.
            </p>
            <button
              type="button"
              onClick={() => setS1({ ...s1, country: "" })}
              className="mt-4 text-sm font-heading font-semibold text-amber-900 underline"
            >
              Choose a different country
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    // The lead is captured and the country gate has passed; only now do we
    // ask for the booking fee. See ConsultationBooking for why that order.
    return <ConsultationBooking leadId={leadId} parentName={s1.parentName} />;
  }

  if (step === 2) {
    return (
      <form onSubmit={submitStep2} className="space-y-5">
        <div className="rounded-lg bg-sage/10 px-4 py-3 text-sm text-sage-dark font-body">
          Got it — we have your contact details. A couple more questions help us match
          the right therapist, but you can skip them.
        </div>

        <div>
          <Label htmlFor="oe-concern">What's your main concern?</Label>
          <Select value={concern} onValueChange={setConcern}>
            <SelectTrigger id="oe-concern" className="mt-1">
              <SelectValue placeholder="Select the closest match" />
            </SelectTrigger>
            <SelectContent>
              {CONCERNS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="oe-language">Preferred language for therapy</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="oe-language" className="mt-1">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="oe-notes">Anything else we should know?</Label>
          <Textarea
            id="oe-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 resize-none"
            placeholder="Previous assessments, diagnoses, what you've already tried…"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            type="submit"
            disabled={busy}
            className="bg-coral hover:bg-coral-dark text-white"
          >
            {busy ? "Sending…" : "Finish"}
          </Button>
          <Button type="button" variant="ghost" onClick={skipToEnd}>
            Skip this
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={submitStep1} className="space-y-5">
      <div>
        <Label htmlFor="oe-name">Your name *</Label>
        <Input
          id="oe-name"
          value={s1.parentName}
          onChange={(e) => setS1({ ...s1, parentName: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="oe-email">Email *</Label>
        <Input
          id="oe-email"
          type="email"
          value={s1.email}
          onChange={(e) => setS1({ ...s1, email: e.target.value })}
          required
          className="mt-1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="oe-country">Where do you live? *</Label>
          <Select
            value={s1.country}
            onValueChange={(v) => setS1({ ...s1, country: v })}
          >
            <SelectTrigger id="oe-country" className="mt-1">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_OPTIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="oe-age">Child's age</Label>
          <Input
            id="oe-age"
            value={s1.childAge}
            onChange={(e) => setS1({ ...s1, childAge: e.target.value })}
            className="mt-1"
            placeholder="e.g. 4 years"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={busy || !step1Valid}
        className="w-full bg-coral hover:bg-coral-dark text-white"
      >
        {busy ? "Sending…" : "Continue"}
      </Button>

      <p className="text-xs text-brown-mid font-body">
        We'll use these details only to contact you about therapy for your child.
      </p>

      {failed && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm">
          <p className="font-heading font-bold text-red-800">
            We couldn't send that.
          </p>
          <p className="mt-1 text-red-700 font-body">
            Your details are still here, so you can try again — or reach us directly.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href={whatsappLink(
                `Hi Poorvam Care, I tried to enquire about online therapy but the form didn't go through. My name is ${s1.parentName}.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("enquiry-fallback")}
              className="rounded-md bg-green-600 px-4 py-2 font-heading font-semibold text-white hover:bg-green-700"
            >
              WhatsApp us
            </a>
            <a
              href={telLink}
              onClick={() => trackCallClick("enquiry-fallback")}
              className="rounded-md border border-red-300 px-4 py-2 font-heading font-semibold text-red-800 hover:bg-red-100"
            >
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
