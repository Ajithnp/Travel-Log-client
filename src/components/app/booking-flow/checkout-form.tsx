import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import type { PricingBreakdown } from "@/types/booking.types";

export function CheckoutForm({
  bookingId,
  pricing,
  confirmBooking,
}: {
  bookingId: string;
  pricing: PricingBreakdown;
  confirmBooking: ({bookingId, stripePaymentIntentId}: { bookingId: string; stripePaymentIntentId: string }) => Promise<void>;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setLoading(false);
      return;
    }

    await confirmBooking({
      bookingId,
      stripePaymentIntentId: paymentIntent?.id,
    });

    setLoading(false);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <PaymentElement />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading ? "Processing..." : `Pay ₹${pricing.totalAmount}`}
      </Button>
    </form>
  );
}