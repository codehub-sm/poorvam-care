import { Link } from "wouter";
import { CONSULTATION_FEE_COPY, CONSULTATION_FEE_REASSURANCE } from "@/config/payments";

/**
 * The "Book a consultation · ₹100" button with its safety-net line.
 *
 * A price on a button with nothing under it reads as a paywall. The same
 * button with "adjusted against your first session · refunded if it doesn't
 * happen" beneath it reads as a deposit. Keeping the two together in one
 * component means no page can show the fee without the reassurance.
 */
export default function ConsultationCta({
  tone = "light",
  align = "left",
  className = "",
}: {
  /** "dark" for use on the brown-deep CTA band. */
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const note = tone === "dark" ? "text-warm-bg/70" : "text-brown-mid";
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`inline-flex flex-col gap-2 ${alignment} ${className}`}>
      <Link
        href="/online/enquiry"
        className="bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25 text-center"
      >
        {CONSULTATION_FEE_COPY.cta}
      </Link>
      <p className={`text-xs font-body max-w-[17rem] leading-snug ${note}`}>
        {CONSULTATION_FEE_REASSURANCE}
      </p>
    </div>
  );
}
