import { Link } from "wouter";

/**
 * The primary "Book a consultation" button on the online pages.
 *
 * Carries no price and no fee note: fees are agreed case by case after the
 * team has spoken to the family. The 2px border matches the outlined
 * WhatsApp button it usually sits beside, so the two render the same height.
 */
export default function ConsultationCta({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/online/enquiry"
      className={`inline-block bg-coral border-2 border-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark hover:border-coral-dark transition-colors shadow-lg shadow-coral/25 text-center ${className}`}
    >
      Book a consultation
    </Link>
  );
}
