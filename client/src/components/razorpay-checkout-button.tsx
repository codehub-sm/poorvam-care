import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { payWithRazorpay, paymentsConfigured, type PayRequest, type PaymentOutcome } from "@/lib/razorpay";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import { whatsappLink } from "@/config/site";

/**
 * "Pay online" button that runs Razorpay Standard Checkout end to end and
 * renders its own outcome: the button, an inline error, or a paid receipt.
 *
 * Renders nothing when VITE_RAZORPAY_KEY_ID is absent, so a build without
 * payment config looks exactly like the site does today. Turning payments on
 * is an env var, not a code change.
 *
 * What to do with a successful payment is the caller's decision via
 * `onPaid` — this component knows nothing about leads or bookings.
 */

interface Props extends PayRequest {
  /** Button text, e.g. "Pay ₹2,500 online". */
  label: string;
  /** Fires once per verified payment. */
  onPaid?: (outcome: Extract<PaymentOutcome, { status: "paid" }>) => void;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export default function RazorpayCheckoutButton({
  label,
  onPaid,
  className,
  size = "default",
  ...request
}: Props) {
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<PaymentOutcome | null>(null);

  if (!paymentsConfigured()) return null;

  const pay = async () => {
    setBusy(true);
    setOutcome(null);
    trackEvent("payment_started", { item: request.description, amount: request.amountPaise });

    const result = await payWithRazorpay(request);

    setBusy(false);
    setOutcome(result);

    trackEvent(`payment_${result.status}`, {
      item: request.description,
      amount: request.amountPaise,
      ...(result.status === "failed" ? { stage: result.stage } : {}),
    });
    if (result.status === "paid") onPaid?.(result);
  };

  if (outcome?.status === "paid") {
    return (
      <div className="rounded-lg border border-sage/30 bg-sage/10 p-3 text-sm">
        <p className="flex items-center gap-2 font-heading font-bold text-sage-dark">
          <CheckCircle className="w-4 h-4" /> Payment received
        </p>
        <p className="mt-1 text-brown-mid font-body">
          We'll call you to schedule. Reference: {outcome.paymentId}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button type="button" size={size} onClick={pay} disabled={busy} className={className}>
        {busy ? "Opening secure checkout…" : label}
      </Button>

      {outcome?.status === "failed" && (
        <p className="flex items-start gap-2 text-xs text-red-700 font-body">
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <span>{outcome.error}. You can try again or pay at the centre.</span>
        </p>
      )}

      {outcome?.status === "unverified" && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-body">
          <p className="font-heading font-bold text-amber-900">
            Payment went through, but we couldn't confirm it automatically.
          </p>
          <p className="mt-1 text-amber-800">
            Don't pay again. Keep this reference and message us so we can match it:{" "}
            <span className="font-semibold">{outcome.paymentId}</span>
          </p>
          <a
            href={whatsappLink(
              `Hi Poorvam Care, I paid online for ${request.description} but the site couldn't confirm it. Payment id: ${outcome.paymentId}, order id: ${outcome.orderId}.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("payment-unverified")}
            className="mt-2 inline-block rounded-md bg-green-600 px-3 py-1.5 font-heading font-semibold text-white hover:bg-green-700"
          >
            WhatsApp us the reference
          </a>
        </div>
      )}
    </div>
  );
}
