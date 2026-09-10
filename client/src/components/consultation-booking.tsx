import { CheckCircle, ShieldCheck } from "lucide-react";
import RazorpayPaymentButton from "@/components/razorpay-payment-button";
import { PAYMENT_BUTTONS, CONSULTATION_FEE_COPY, CONSULTATION_FEE_DISPLAY } from "@/config/payments";
import { CONTACT, whatsappLink, telLink } from "@/config/site";
import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";

/**
 * The final step of the online enquiry: reserve the consultation slot.
 *
 * Sits AFTER the enquiry form on purpose. The form is where the country gate
 * lives — we cannot lawfully treat a child resident in the US or Canada — so
 * no one can pay before we know we may serve them, and the lead is already
 * captured if they stop here. The fee is not the lead; it is the commitment.
 *
 * With no button configured this renders the pre-payment confirmation the
 * page showed before, so an unconfigured build degrades to "we'll call you"
 * rather than to a dead end.
 */
export default function ConsultationBooking({
  leadId,
  parentName,
}: {
  leadId: string;
  parentName: string;
}) {
  const buttonId = PAYMENT_BUTTONS.consultation;
  const firstName = parentName.trim().split(/\s+/)[0] || "";

  const contactRow = (
    <div className="mt-6 flex flex-wrap justify-center gap-3">
      <a
        href={whatsappLink(
          `Hi Poorvam Care, I just submitted an online therapy enquiry (ref ${leadId}).`,
        )}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("enquiry-confirmation")}
        className="rounded-xl bg-green-600 px-6 py-3 font-heading font-semibold text-white hover:bg-green-700"
      >
        WhatsApp us
      </a>
      <a
        href={telLink}
        onClick={() => trackCallClick("enquiry-confirmation")}
        className="rounded-xl border-2 border-sage px-6 py-3 font-heading font-semibold text-sage-dark hover:bg-sage/10"
      >
        Call {CONTACT.phoneDisplay}
      </a>
    </div>
  );

  if (!buttonId) {
    return (
      <div className="rounded-2xl border border-sage/30 bg-sage/10 p-8 text-center">
        <CheckCircle className="w-10 h-10 text-sage-dark mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-brown-deep mb-2">
          Thank you — we have your details
        </h3>
        <p className="text-brown-mid font-body text-sm leading-relaxed max-w-md mx-auto">
          One of our team will be in touch within one working day to arrange your
          consultation. If you'd rather not wait, message us directly.
        </p>
        {contactRow}
        <p className="mt-4 text-xs text-brown-light font-body">Your reference: {leadId}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-sage/30 bg-sage/10 p-6 md:p-8">
      <div className="flex items-center gap-2 text-sage-dark text-sm font-heading font-semibold">
        <CheckCircle className="w-4 h-4" /> Details received
      </div>
      <h3 className="mt-2 text-xl font-heading font-bold text-brown-deep">
        {firstName ? `${firstName}, reserve your slot` : "Reserve your slot"}
      </h3>
      <p className="mt-2 text-brown-mid font-body text-sm leading-relaxed">
        {CONSULTATION_FEE_COPY.why} {CONSULTATION_FEE_COPY.terms}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-brown-mid font-body">
        {[
          "Paid bookings are scheduled first — you'll get a confirmed time, not a callback queue",
          `${CONSULTATION_FEE_DISPLAY} comes off your first session`,
          "Receipt from Razorpay, slot confirmation from us within one working day",
        ].map((line) => (
          <li key={line} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sage-dark flex-shrink-0 mt-0.5" />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <RazorpayPaymentButton buttonId={buttonId} trackAs="consultation-fee" />
      </div>

      <p className="mt-4 flex items-center gap-2 text-xs text-brown-light font-body">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        Payment is handled by Razorpay. We never see your card details. Poorvam Care,
        Electronic City, Bengaluru — RCI-registered clinicians.
      </p>

      <p className="mt-5 text-center text-sm text-brown-mid font-body">
        Prefer to talk first? We'll still call you — paid bookings are just ahead in the
        queue.
      </p>
      {contactRow}
      <p className="mt-4 text-center text-xs text-brown-light font-body">
        Your reference: {leadId}
      </p>
    </div>
  );
}
