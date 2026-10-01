import { useEffect, useRef, useState } from "react";
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
import OnlineConfirmation from "@/components/online-confirmation";
import CentreHandoff from "@/components/centre-handoff";
import { beaconLeadAlert, sendLeadAlert, submitLead } from "@/lib/leads";
import { trackWhatsAppClick, trackCallClick, trackEvent } from "@/lib/analytics";
import { CONTACT, LOCATIONS, whatsappLink, telLink } from "@/config/site";
import { MARKET_LIST } from "@/config/markets";

/**
 * Progressive enquiry form behind every "book a consultation" CTA on the site.
 *
 * ONE FORM, TWO ENDINGS. The questions a parent answers are the same whether
 * the child is seen in Bengaluru or over video; what differs is what happens
 * after. Online ends on a confirmation with a callback promise
 * (OnlineConfirmation); in-centre ends on WhatsApp (CentreHandoff), because
 * the front desk closes those bookings by chat anyway. Forking the ending rather than the
 * form is what keeps the lead schema, the step-1-captures-the-lead property
 * and the abandonment alerts identical across both funnels.
 *
 * The important property is that step 1 SUBMITS ON ITS OWN. A parent who fills
 * in their name and email and then abandons at step 2 is still a captured lead
 * — under a single long form, that same parent is lost entirely. Later steps
 * enrich the same record via a shared `leadId` rather than replacing it.
 *
 * Every step writes the Sheet, but the team gets ONE email per lead: sent on
 * step 2 (submit or skip) so it carries everything the parent told us, or —
 * if the parent leaves during step 2 — as the page closes, with step 1 alone.
 * `alerted` guards the three paths so exactly one of them fires.
 *
 * The country field is a real eligibility gate, not a disclaimer. Speech-language
 * pathology is a licensed profession in the US and Canada and licensure follows
 * the CLIENT's location, so an RCI registration does not permit us to treat a
 * child resident there. A footer disclaimer contradicted by a booking flow that
 * accepts those clients anyway is worse than no disclaimer — it establishes that
 * we knew. So the gate sits here, in the flow, before any booking exists.
 *
 * The gate is online-only on purpose: an in-centre booking is care delivered in
 * Bengaluru under Indian registration, whoever the family are and wherever they
 * usually live, so asking a walk-in parent for their country would gate nothing
 * and cost a field.
 */

export type EnquiryMode = "online" | "centre";

/** Countries we cannot lawfully serve, with the reason surfaced to the user. */
const BLOCKED_COUNTRIES = ["United States", "Canada"];

const COUNTRY_OPTIONS = [
  ...MARKET_LIST.map((m) => m.countryName),
  ...BLOCKED_COUNTRIES,
  "Other",
];

/** Centre choices, plus the answer a parent who does not know the area needs. */
const CENTRE_OPTIONS = [
  ...LOCATIONS.map((l) => l.name.replace("Poorvam Care - ", "")),
  "Whichever has a slot sooner",
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

/**
 * When the family can actually attend, in the words a parent uses.
 *
 * Deliberately coarse. An exact slot picker would promise availability this
 * form cannot see — the diary lives in the centre software, not here — so the
 * parent states a window and a human confirms the time.
 */
const TIME_PREFERENCES = [
  "Weekday mornings (9am–12pm)",
  "Weekday afternoons (12–4pm)",
  "Weekday evenings (4–7pm)",
  "Saturdays",
  "As soon as anything is free",
];

interface Step1Data {
  parentName: string;
  email: string;
  phone: string;
  country: string;
  centre: string;
  childAge: string;
}

/** Correlates the step-1 row with its step-2 enrichment in the sheet. */
function newLeadId(): string {
  return `L${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`.toUpperCase();
}

export default function EnquiryForm({ mode = "online" }: { mode?: EnquiryMode }) {
  const centreMode = mode === "centre";
  /** Names the funnel in the sheet, the alert email and GA4. */
  const formName = centreMode ? "centre-enquiry" : "online-enquiry";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [leadId, setLeadId] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const [s1, setS1] = useState<Step1Data>({
    parentName: "",
    email: "",
    phone: "",
    country: "",
    centre: "",
    childAge: "",
  });
  const [concern, setConcern] = useState("");
  const [language, setLanguage] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [notes, setNotes] = useState("");

  const blocked = !centreMode && BLOCKED_COUNTRIES.includes(s1.country);
  const step1Valid = centreMode
    ? s1.parentName.trim() && s1.phone.trim() && s1.centre
    : s1.parentName.trim() && s1.email.trim() && s1.country && !blocked;

  // Set once the team has been emailed about this lead; see header comment.
  const alerted = useRef(false);

  /**
   * The row both funnels write, minus the fields a step has not collected yet.
   *
   * `service` is how the sheet distinguishes an in-centre request from an
   * online one, and for a centre booking it carries which centre — so the team
   * can read the destination without opening the message column.
   */
  const identity = () => ({
    parentName: s1.parentName,
    email: s1.email,
    phone: s1.phone,
    country: centreMode ? "India" : s1.country,
    childAge: s1.childAge,
    service: centreMode ? `In-centre consultation — ${s1.centre}` : "Online consultation",
  });

  // Latest step-1 payload for the unload alert, read at teardown time.
  const step1Payload = useRef<Record<string, unknown>>({});
  step1Payload.current = { leadId, stage: "enquiry-step-1", ...identity() };

  useEffect(() => {
    if (step !== 2) return;
    const alertOnLeave = () => {
      if (alerted.current) return;
      alerted.current = true;
      beaconLeadAlert(step1Payload.current, formName);
    };
    window.addEventListener("pagehide", alertOnLeave);
    return () => {
      window.removeEventListener("pagehide", alertOnLeave);
      // Unmounting on step 2 means an in-app navigation away from the form.
      if (!alerted.current) alertOnLeave();
    };
  }, [step, formName]);

  const submitStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step1Valid) return;
    setBusy(true);

    const id = newLeadId();
    setLeadId(id);
    const payload = { leadId: id, stage: "enquiry-step-1", ...identity() };
    let result = await submitLead(payload, formName, { alert: false });

    // The Sheet is step 1's only sink, so if it failed the email is the lead's
    // one chance to survive — send it now rather than waiting for step 2.
    if (result.status === "failed") {
      result = await sendLeadAlert(payload, formName);
      if (result.status !== "failed") alerted.current = true;
    }
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
    const alert = !alerted.current;
    alerted.current = true;
    // Fire-and-continue: step 1 already captured the lead, so a failure here
    // must not block the parent or lose what we already have.
    await submitLead(
      {
        leadId,
        stage: "enquiry-step-2",
        ...identity(),
        concern,
        language,
        preferredTime,
        notes,
      },
      formName,
      { alert },
    );
    setBusy(false);
    setStep(3);
  };

  const skipToEnd = () => {
    trackEvent("enquiry_step2_skipped", { lead_id: leadId, mode });
    if (!alerted.current) {
      alerted.current = true;
      void sendLeadAlert(step1Payload.current, formName);
    }
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
    // The lead is captured and, online, the country gate has passed.
    return centreMode ? (
      <CentreHandoff
        leadId={leadId}
        parentName={s1.parentName}
        centre={s1.centre}
        childAge={s1.childAge}
        concern={concern}
        preferredTime={preferredTime}
      />
    ) : (
      <OnlineConfirmation leadId={leadId} parentName={s1.parentName} />
    );
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
          <Label htmlFor="oe-when">When can you usually attend?</Label>
          <Select value={preferredTime} onValueChange={setPreferredTime}>
            <SelectTrigger id="oe-when" className="mt-1">
              <SelectValue placeholder="Select a window that suits you" />
            </SelectTrigger>
            <SelectContent>
              {TIME_PREFERENCES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
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

      {centreMode ? (
        <div>
          <Label htmlFor="oe-phone">Phone / WhatsApp number *</Label>
          <Input
            id="oe-phone"
            type="tel"
            value={s1.phone}
            onChange={(e) => setS1({ ...s1, phone: e.target.value })}
            required
            className="mt-1"
            placeholder="e.g. 98765 43210"
          />
        </div>
      ) : (
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {centreMode ? (
          <div>
            <Label htmlFor="oe-centre">Which centre? *</Label>
            <Select
              value={s1.centre}
              onValueChange={(v) => setS1({ ...s1, centre: v })}
            >
              <SelectTrigger id="oe-centre" className="mt-1">
                <SelectValue placeholder="Select a centre" />
              </SelectTrigger>
              <SelectContent>
                {CENTRE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
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
        )}
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

      {centreMode && (
        <div>
          <Label htmlFor="oe-email-optional">Email</Label>
          <Input
            id="oe-email-optional"
            type="email"
            value={s1.email}
            onChange={(e) => setS1({ ...s1, email: e.target.value })}
            className="mt-1"
            placeholder="Optional"
          />
        </div>
      )}

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
                `Hi Poorvam Care, I tried to book a consultation but the form didn't go through. My name is ${s1.parentName}.`,
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
