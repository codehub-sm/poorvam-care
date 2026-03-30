import { Link } from "wouter";
import { X } from "lucide-react";
import { useState } from "react";

export default function SummerCampBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-coral via-coral-dark to-sage text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/30 rounded-full blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <span className="text-2xl sm:text-3xl flex-shrink-0" aria-hidden="true">
              &#9728;&#65039;
            </span>
            <div className="min-w-0">
              <p className="font-heading font-bold text-sm sm:text-base leading-tight">
                Summer Therapy Camp 2026 — Enrolling Now!
              </p>
              <p className="font-body text-xs sm:text-sm text-white/90 leading-snug mt-0.5 hidden sm:block">
                Sensory art, therapeutic yoga, movement therapy, music &amp; social skills — a fun, therapy-driven summer for your child.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/contact"
              className="bg-white text-coral px-4 py-2 rounded-lg font-heading font-bold text-xs sm:text-sm hover:bg-warm-bg transition-colors whitespace-nowrap shadow-md"
            >
              Enquire Now
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss summer camp banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
