import { CheckCircle, MessageCircle, Clock } from "lucide-react";
import { CONTACT, whatsappLink, telLink } from "@/config/site";
import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";

/**
 * Final step of an IN-CENTRE booking: hand the parent to WhatsApp.
 *
 * The online flow ends at a ₹100 slot fee; this one deliberately does not.
 * A parent booking a Bengaluru centre can walk in, so a payment wall before
 * they have spoken to anyone costs more bookings than the no-shows it
 * prevents. What it does instead is carry the details they just typed into
 * the WhatsApp message, so the front desk opens a chat that already says who
 * is asking, for which child, and when they want to come — and can confirm a
 * slot in one reply rather than four.
 *
 * The lead is already written to the sheet before this renders, so a parent
 * who never taps the button is still a lead the team can call.
 */
export default function CentreHandoff({
  leadId,
  parentName,
  centre,
  childAge,
  concern,
  preferredTime,
}: {
  leadId: string;
  parentName: string;
  centre: string;
  childAge: string;
  concern: string;
  preferredTime: string;
}) {
  const firstName = parentName.trim().split(/\s+/)[0] || "";

  // Written as the parent would write it, because it arrives from their
  // number and the team reads it as their message.
  const message = [
    `Hi Poorvam Care, I'd like to book a consultation at ${centre}.`,
    parentName && `My name is ${parentName}.`,
    childAge && `My child is ${childAge}.`,
    concern && `Main concern: ${concern}.`,
    preferredTime && `I'm free: ${preferredTime}.`,
    `(Ref ${leadId})`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="rounded-2xl border border-sage/30 bg-sage/10 p-6 md:p-8">
      <div className="flex items-center gap-2 text-sage-dark text-sm font-heading font-semibold">
        <CheckCircle className="w-4 h-4" /> Details received
      </div>
      <h3 className="mt-2 text-xl font-heading font-bold text-brown-deep">
        {firstName ? `${firstName}, let's confirm your slot` : "Let's confirm your slot"}
      </h3>
      <p className="mt-2 text-brown-mid font-body text-sm leading-relaxed">
        Send us one message on WhatsApp and we'll come back with the exact times free
        at {centre}. Everything you've just told us is already in the message — you
        only need to press send.
      </p>

      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick("centre-booking")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-heading font-bold text-white hover:bg-green-700"
      >
        <MessageCircle className="w-5 h-5" /> Confirm on WhatsApp
      </a>

      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-brown-mid font-body">
        <Clock className="w-4 h-4 flex-shrink-0" />
        We reply within working hours, Mon–Sat.
      </p>

      <p className="mt-5 text-center text-sm text-brown-mid font-body">
        Prefer to talk? Call us — or do nothing, and we'll call you within one working
        day.
      </p>
      <div className="mt-3 flex justify-center">
        <a
          href={telLink}
          onClick={() => trackCallClick("centre-booking")}
          className="rounded-xl border-2 border-sage px-6 py-3 font-heading font-semibold text-sage-dark hover:bg-sage/10"
        >
          Call {CONTACT.phoneDisplay}
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-brown-light font-body">
        Your reference: {leadId}
      </p>
    </div>
  );
}
