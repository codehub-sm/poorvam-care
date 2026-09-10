import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

const PAYMENT_BUTTON_SCRIPT = "https://checkout.razorpay.com/v1/payment-button.js";

/**
 * Mounts a Razorpay-hosted Payment Button.
 *
 * Razorpay's embed is a `<script>` that must sit inside a `<form>`; it draws
 * the button, opens the hosted checkout, collects the payer's details and
 * shows its own receipt. There is no callback to the page, so the record of a
 * payment is the Razorpay dashboard and its email alert — this component
 * only reports the click to analytics.
 *
 * Skipped under Puppeteer so the prerender pass does not bake Razorpay's
 * iframe into the static HTML; the real browser mounts it on hydration.
 */
export default function RazorpayPaymentButton({
  buttonId,
  trackAs,
  className,
}: {
  /** The `pl_…` id from the dashboard. Renders nothing when empty. */
  buttonId: string;
  /** Analytics label, e.g. "consultation-fee". */
  trackAs: string;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form || !buttonId || navigator.webdriver) return;

    const script = document.createElement("script");
    script.src = PAYMENT_BUTTON_SCRIPT;
    script.async = true;
    script.dataset.payment_button_id = buttonId;
    form.appendChild(script);

    return () => {
      // The script injects siblings into the form; clear the lot so a re-mount
      // with a different id never shows two buttons.
      form.replaceChildren();
    };
  }, [buttonId]);

  if (!buttonId) return null;

  return (
    <form
      ref={formRef}
      className={className}
      onClickCapture={() => trackEvent("payment_button_click", { item: trackAs })}
    />
  );
}
