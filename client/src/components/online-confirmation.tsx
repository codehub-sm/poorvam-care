import { CheckCircle } from "lucide-react";
import { CONTACT, whatsappLink, telLink } from "@/config/site";
import { trackWhatsAppClick, trackCallClick } from "@/lib/analytics";

/**
 * Final step of an ONLINE enquiry: confirm we have the details and offer a
 * faster channel.
 *
 * Nothing is charged online. Fees are set case by case once the team has
 * spoken to the family, so the site makes no price promise here — the lead is
 * already written to the sheet, and the team calls back from that.
 */
export default function OnlineConfirmation({
  leadId,
  parentName,
}: {
  leadId: string;
  parentName: string;
}) {
  const firstName = parentName.trim().split(/\s+/)[0] || "";

  return (
    <div className="rounded-2xl border border-sage/30 bg-sage/10 p-8 text-center">
      <CheckCircle className="w-10 h-10 text-sage-dark mx-auto mb-4" />
      <h3 className="text-xl font-heading font-bold text-brown-deep mb-2">
        {firstName ? `Thank you, ${firstName} — we have your details` : "Thank you — we have your details"}
      </h3>
      <p className="text-brown-mid font-body text-sm leading-relaxed max-w-md mx-auto">
        One of our team will be in touch within one working day to arrange your
        consultation. If you'd rather not wait, message us directly.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappLink(
            `Hi Poorvam Care, I just submitted an online therapy enquiry (ref ${leadId}).`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("enquiry-confirmation")}
          className="rounded-xl border-2 border-green-600 bg-green-600 px-6 py-3 font-heading font-semibold text-white hover:bg-green-700"
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
      <p className="mt-4 text-xs text-brown-light font-body">Your reference: {leadId}</p>
    </div>
  );
}
