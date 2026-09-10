import { useState } from "react";
import { Check, Phone, ArrowRight, Brain, Sparkles, Clock, ChevronDown, MapPin, Wifi, Home } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Contact from "@/components/contact";
import SeoHead from "@/components/seo-head";

// ── Types ───────────────────────────────────────────────────────

type ServiceMode = "center" | "online" | "home";

// ── Assessments (same across modes) ─────────────────────────────

const assessments = [
  {
    name: "Developmental Assessment",
    price: 2500,
    duration: "2-3 hrs",
    description: "Complete evaluation of developmental milestones, cognition, communication, and behavior with written report and intervention plan.",
    includes: ["Cognitive & behavioral evaluation", "Communication assessment", "Written report with recommendations", "Parent consultation", "Follow-up session"],
    icon: Brain,
    accent: "blue" as const,
  },
  {
    name: "Autism Screening",
    price: 3000,
    duration: "2-3 hrs",
    description: "Comprehensive ASD screening using standardized tools (ADOS-2, ADI-R) with clinical observation and diagnostic report.",
    includes: ["ADOS-2 & ADI-R assessment", "Clinical observation", "Sensory profile assessment", "Diagnostic report", "Treatment recommendations"],
    icon: Sparkles,
    accent: "purple" as const,
  },
];

// ── Pricing Data ────────────────────────────────────────────────

/*
  CENTER PRICING:
  - Standard rate: ₹800/session (₹900 for OT)
  - No discount for fewer than 3 sessions/week
  - Discount tier: 2 sessions/day × 6 days/week = 48 sessions/month
    → ₹750/session (₹850 for OT)

  ONLINE PRICING:
  - ₹800/session flat (all therapy types)
  - No further discount — ₹800 is the minimum for any online service

  HOME VISIT PRICING:
  - ₹1,500/session (₹1,600 for OT) — includes travel within Electronic City
  - No further discount — ₹1,500 is the minimum for any home visit service
*/

const modeConfig: Record<ServiceMode, {
  label: string;
  icon: typeof MapPin;
  description: string;
  color: string;
  perSession: { standard: string; ot: string };
  intensive: { sessions: number; label: string; standard: string; ot: string };
  note: string;
}> = {
  center: {
    label: "At Our Center",
    icon: MapPin,
    description: "Visit our Electronic City clinics for in-person therapy sessions with full equipment access.",
    color: "blue",
    perSession: { standard: "₹800", ot: "₹900" },
    intensive: { sessions: 48, label: "2 sessions/day, 6 days/week", standard: "₹750", ot: "₹850" },
    note: "45-min sessions at Electronic City Phase 1 & Phase 2.",
  },
  online: {
    label: "Online Sessions",
    icon: Wifi,
    description: "Convenient teletherapy from home. Ideal for speech therapy, behavioral consultations, and parent training.",
    color: "emerald",
    perSession: { standard: "₹800", ot: "₹800" },
    intensive: { sessions: 48, label: "2 sessions/day, 6 days/week", standard: "₹800", ot: "₹800" },
    note: "45-min sessions via secure video call. All therapy types same rate.",
  },
  home: {
    label: "Home Visits",
    icon: Home,
    description: "Our therapists come to you. Best for children who respond better in their home environment.",
    color: "orange",
    perSession: { standard: "₹1,500", ot: "₹1,600" },
    intensive: { sessions: 48, label: "2 sessions/day, 6 days/week", standard: "₹1,500", ot: "₹1,600" },
    note: "45-min sessions. Travel included within Electronic City. Additional travel charges may apply beyond.",
  },
};

const therapyTypes = ["Speech Therapy", "Occupational Therapy", "Behavioral Therapy", "Special Education", "Physiotherapy"];

// ── Accent helpers ──────────────────────────────────────────────

const accentMap: Record<string, { bg: string; light: string; border: string }> = {
  blue: { bg: "bg-coral", light: "bg-coral/10", border: "border-coral/20" },
  cyan: { bg: "bg-sky", light: "bg-sky/10", border: "border-sky/20" },
  purple: { bg: "bg-[#B8A9D4]", light: "bg-[#B8A9D4]/10", border: "border-[#B8A9D4]/20" },
  emerald: { bg: "bg-sage", light: "bg-sage/10", border: "border-sage/20" },
  orange: { bg: "bg-gold", light: "bg-gold/10", border: "border-gold/20" },
};

// ── Component ───────────────────────────────────────────────────

export default function ServicePackages() {
  const [mode, setMode] = useState<ServiceMode>("center");
  const config = modeConfig[mode];
  const ModeIcon = config.icon;

  return (
    <>
      <SeoHead
        title="Therapy Pricing - Affordable Speech Therapy & OT in Electronic City, Bangalore | Poorvam Care"
        description="Transparent therapy pricing at Poorvam Care, Electronic City Bangalore. Center sessions from ₹800, online from ₹800, home visits from ₹1,500. Speech therapy, OT, ABA. Call +91 88617 64343."
        canonical="https://poorvamcare.in/service-packages"
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-warm-bg via-white to-warm-gray-50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-heading font-extrabold text-brown-deep mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-brown-mid font-body max-w-2xl mx-auto mb-6">
            Therapy your way — at our center, online, or at your home. Same quality care, flexible delivery.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-body text-brown-light">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" /> No hidden fees</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" /> Free initial consultation</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-sage" /> Pay per session — no lock-in</span>
          </div>
        </div>
      </section>

      {/* ── Mode Selector ───────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-warm-gray-200 sticky top-16 md:top-20 z-30 backdrop-blur-md bg-white/95">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(modeConfig) as ServiceMode[]).map((key) => {
              const m = modeConfig[key];
              const Icon = m.icon;
              const selected = mode === key;
              const colorStyles: Record<string, { bg: string; border: string; icon: string }> = {
                blue: { bg: "#FFF3E4", border: "#E8725A", icon: "text-coral" },
                emerald: { bg: "#F0F7F0", border: "#7BA87B", icon: "text-sage" },
                orange: { bg: "#FFF8F0", border: "#E5A94E", icon: "text-gold" },
              };
              const cs = colorStyles[m.color];
              return (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={`rounded-xl p-3 md:p-4 text-center transition-all font-body text-sm border-2 ${
                    selected ? "shadow-sm" : "bg-warm-gray-50 border-transparent hover:border-warm-gray-200"
                  }`}
                  style={selected ? { backgroundColor: cs.bg, borderColor: cs.border } : undefined}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${selected ? cs.icon : "text-brown-light"}`} />
                  <div className={`font-heading font-semibold text-xs md:text-sm ${selected ? "text-brown-deep" : "text-brown-mid"}`}>
                    {m.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mode Description ────────────────────────────────── */}
      <section className="py-6 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 bg-warm-bg rounded-xl p-4 border border-warm-gray-200">
            <ModeIcon
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              style={{ color: config.color === "blue" ? "#E8725A" : config.color === "emerald" ? "#7BA87B" : "#E5A94E" }}
            />
            <div>
              <p className="text-sm text-brown-mid font-body">{config.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Per-Session Rates ───────────────────────────────── */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Standard rates */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-bold text-brown-deep mb-1">Per-Session Rates</h2>
            <p className="text-sm text-brown-light font-body mb-5">
              Pay as you go. No minimum commitment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {therapyTypes.map((t) => {
                const isOT = t === "Occupational Therapy";
                const price = isOT ? config.perSession.ot : config.perSession.standard;
                return (
                  <div key={t} className="bg-warm-bg rounded-xl p-3 border border-warm-gray-200 text-center">
                    <div className="text-lg font-heading font-bold text-brown-deep">{price}</div>
                    <div className="text-xs text-brown-light font-body leading-tight">{t}</div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-brown-light font-body mt-3">{config.note}</p>
          </div>

          {/* Intensive rate callout — only center has a discount */}
          {mode === "center" ? (
            <div className="bg-sage/10 rounded-2xl border border-sage/20 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-sage text-white text-xs font-heading font-bold px-3 py-1 rounded-full">
                      Best Value
                    </span>
                    <span className="text-sm text-brown-light font-body">Intensive Plan</span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brown-deep mb-1">
                    48 sessions/month
                  </h3>
                  <p className="text-sm text-brown-mid font-body mb-2">
                    2 sessions/day, 6 days/week — discounted rates for families who commit to a full intensive schedule.
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-2xl font-heading font-extrabold text-sage-dark">₹750</span>
                      <span className="text-sm text-brown-light font-body">/session</span>
                    </div>
                    <div className="text-sm text-brown-light font-body">
                      OT: <span className="font-semibold text-brown-mid">₹850</span>/session
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-sage hover:bg-sage-dark text-white font-heading font-semibold rounded-xl px-6">
                        Enquire About Intensive Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Intensive Plan Enquiry (Center)</DialogTitle>
                        <DialogDescription>
                          48 sessions/month at ₹750/session. Tell us about your needs.
                        </DialogDescription>
                      </DialogHeader>
                      <Contact />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-sage/20">
                <p className="text-xs font-heading font-semibold text-sage-dark mb-2">Monthly comparison (48 sessions):</p>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="text-sm font-body">
                    <span className="text-brown-light">Standard rate: </span>
                    <span className="text-brown-light line-through">₹38,400</span>
                  </div>
                  <div className="text-sm font-body">
                    <span className="text-brown-light">Intensive rate: </span>
                    <span className="font-semibold text-sage-dark">₹36,000</span>
                  </div>
                </div>
                <p className="text-xs text-sage font-heading font-semibold mt-1">
                  You save ₹2,400/month on standard therapy sessions
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-coral/10 rounded-2xl border border-coral/20 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-lg font-heading font-bold text-brown-deep mb-1">
                    Need an Intensive Schedule?
                  </h3>
                  <p className="text-sm text-brown-mid font-body">
                    {mode === "online"
                      ? "Online sessions are available at ₹800/session for any frequency. Book as many sessions as you need — same rate whether it's 4 or 48 per month."
                      : "Home visits are available at ₹1,500/session (₹1,600 for OT) for any frequency. Contact us for scheduling high-frequency home therapy."}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-coral hover:bg-coral-dark text-white font-heading font-semibold rounded-xl px-6">
                        Enquire Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Intensive Schedule Enquiry ({config.label})</DialogTitle>
                        <DialogDescription>Tell us about your needs and preferred schedule.</DialogDescription>
                      </DialogHeader>
                      <Contact />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Assessments ─────────────────────────────────────── */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl font-heading font-bold text-brown-deep mb-2">Assessments</h2>
            <p className="text-brown-mid font-body">
              One-time evaluations to understand your child's needs and create a clear path forward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {assessments.map((a) => {
              const Icon = a.icon;
              const c = accentMap[a.accent];
              return (
                <div key={a.name} className={`rounded-2xl border ${c.border} ${c.light} p-6 flex flex-col`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-brown-deep text-base">{a.name}</h3>
                      <span className="text-xs text-brown-light font-body flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {a.duration}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-brown-mid font-body leading-relaxed mb-4">{a.description}</p>
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {a.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-brown-mid font-body">
                        <Check className="w-3.5 h-3.5 text-sage mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-warm-gray-200">
                    <div className="text-2xl font-heading font-bold text-brown-deep">
                      ₹{a.price.toLocaleString("en-IN")}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className={`${c.bg} hover:opacity-90 text-white font-heading font-semibold rounded-lg`}>
                          Book Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Book {a.name}</DialogTitle>
                          <DialogDescription>Fill in the form and we'll schedule your assessment.</DialogDescription>
                        </DialogHeader>
                        <Contact />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Which Mode Is Right ─────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-brown-deep text-center mb-3">
            Which Mode Is Right for You?
          </h2>
          <p className="text-brown-mid font-body text-center max-w-xl mx-auto mb-10">
            Compare our three service delivery options and pick what works best for your family.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-[600px] text-sm font-body">
              <thead>
                <tr className="border-b border-warm-gray-200">
                  <th className="text-left py-3 pr-4 font-heading font-semibold text-brown-light text-xs uppercase tracking-wider w-[30%]"></th>
                  <th className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <MapPin className="w-4 h-4 text-coral" />
                      <span className="font-heading font-bold text-brown-deep">Center</span>
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Wifi className="w-4 h-4 text-sage" />
                      <span className="font-heading font-bold text-brown-deep">Online</span>
                    </div>
                  </th>
                  <th className="py-3 px-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <Home className="w-4 h-4 text-gold" />
                      <span className="font-heading font-bold text-brown-deep">Home Visit</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Standard rate", center: "₹800", online: "₹800", home: "₹1,500" },
                  { label: "OT rate", center: "₹900", online: "₹800", home: "₹1,600" },
                  { label: "Intensive rate (48/mo)", center: "₹750", online: "₹800", home: "₹1,500" },
                  { label: "Intensive OT rate", center: "₹850", online: "₹800", home: "₹1,600" },
                  { label: "Speech Therapy", center: "✓", online: "✓", home: "✓" },
                  { label: "Occupational Therapy", center: "✓", online: "Limited", home: "✓" },
                  { label: "Behavioral Therapy", center: "✓", online: "✓", home: "✓" },
                  { label: "Special Education", center: "✓", online: "✓", home: "✓" },
                  { label: "Physiotherapy", center: "✓", online: "—", home: "✓" },
                  { label: "Equipment access", center: "Full", online: "—", home: "Portable" },
                  { label: "Best for", center: "Full programs", online: "Convenience", home: "Young children" },
                ].map((row, i) => (
                  <tr key={i} className={`border-b border-warm-gray-200 ${i < 4 ? "bg-warm-gray-50/50" : ""}`}>
                    <td className="py-2.5 pr-4 text-brown-mid font-medium">{row.label}</td>
                    <td className="py-2.5 px-3 text-center text-brown-mid">{row.center}</td>
                    <td className="py-2.5 px-3 text-center text-brown-mid">{row.online}</td>
                    <td className="py-2.5 px-3 text-center text-brown-mid">{row.home}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold text-brown-deep text-center mb-8">
            Common Questions
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "How does the Intensive Plan discount work?",
                a: "The discounted rate applies when you commit to 2 sessions per day, 6 days a week (48 sessions/month). This is our most comprehensive option and offers the best per-session rate. You can mix therapy types across the 48 sessions.",
              },
              {
                q: "Can I get a discount for fewer sessions?",
                a: "Our standard per-session rates apply for any frequency up to the intensive threshold. We keep our base rates fair and competitive — the intensive discount rewards families making a full-schedule commitment.",
              },
              {
                q: "Can I mix center, online, and home sessions?",
                a: "Yes! Many families combine modes. For example, 3 center sessions and 1 online parent training session per week. Each session is billed at the rate for that mode. The intensive discount applies per-mode when you hit 48 sessions/month in that mode.",
              },
              {
                q: "What therapies are available online?",
                a: "Speech therapy, behavioral therapy, special education, and parent training work great online. Occupational therapy is available online in a limited format (consultation and home program guidance). Physiotherapy requires in-person sessions.",
              },
              {
                q: "Is there an extra travel charge for home visits?",
                a: "Home visit rates include travel within the Electronic City area. For locations beyond Electronic City, a small additional travel charge may apply — we'll discuss this when scheduling.",
              },
              {
                q: "Do you accept insurance?",
                a: "We provide detailed invoices that you can submit to your insurance provider for reimbursement. Many families successfully claim. Contact us for documentation support.",
              },
              {
                q: "What's the cancellation policy?",
                a: "We require 24 hours notice to reschedule at no charge. Sessions cancelled with less notice are billed at the standard rate. For the intensive plan, we offer flexible rescheduling within the same week.",
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-warm-gray-200">
                <summary className="flex items-center justify-between cursor-pointer p-5 text-sm font-heading font-semibold text-brown-deep hover:text-coral transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-brown-light group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-5 pb-5 text-sm text-brown-mid font-body leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <section className="py-16 bg-brown-deep">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-warm-bg mb-3">
            Not Sure Where to Start?
          </h2>
          <p className="text-warm-bg/90 font-body mb-8">
            Book a free 15-minute consultation. We'll assess your child's needs and recommend the right therapy, frequency, and delivery mode — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white text-coral hover:bg-gray-100 font-heading font-bold shadow-lg rounded-xl px-8">
                  Book a Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Book a Consultation</DialogTitle>
                  <DialogDescription>Tell us about your needs and we'll recommend the right plan and mode.</DialogDescription>
                </DialogHeader>
                <Contact />
              </DialogContent>
            </Dialog>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-coral font-heading font-bold rounded-xl px-8 bg-transparent"
              onClick={() => window.open("tel:+918861764343")}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call: +91 88617 64343
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
