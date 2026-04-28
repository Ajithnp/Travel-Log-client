import { useEffect, useState } from "react";
import { Smartphone, Building2, Loader2, Wallet, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PriceSummary } from "./pricing-summary";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
} from "@stripe/react-stripe-js";
import type { Coupon, PaymentMethodId, PricingBreakdown, PricingTierType, Schedule, TravellerInfo } from "@/types/booking.types";
import { useBookingFlow } from "@/hooks/app/booking-flow";
import { toast } from "sonner";
import { CheckoutForm } from "./checkout-form";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);
interface PaymentMethodConfig {
  id: PaymentMethodId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const PAYMENT_METHODS: PaymentMethodConfig[] = [
  { id: "upi", label: "UPI", Icon: Smartphone },
  { id: "netbanking", label: "Net banking", Icon: Building2 },
  { id: "wallet", label: "Wallet", Icon: Wallet },
];


interface Step4PaymentProps {
  packageId: string;
  selectedSchedule: Schedule | null;
  seatsCount: number;
  travellers: TravellerInfo[];
  selectedTierType: PricingTierType;
  pricing: PricingBreakdown;
  appliedCoupon: Coupon | null;
  isSubmitting?: boolean;
  onBack: () => void;
  onConfirm: (paymentMethod: PaymentMethodId, upiId: string) => void;
}



export function Step4Payment({
  packageId,
  seatsCount,
  travellers,
  selectedSchedule,
  selectedTierType,
  pricing,
  appliedCoupon,
  onBack,

}: Step4PaymentProps) {
  
    const {
    bookingId,
    clientSecret,
    expiresAt,
    initiateBooking,
    confirmBooking,
    isInitiatingBooking,
  } = useBookingFlow();

   const [hasHeldSeats, setHasHeldSeats] = useState(false);
  // const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("upi");
  // const [upiId, setUpiId] = useState("");
  // const [upiError, setUpiError] = useState("");

    useEffect(() => {
    if (!selectedSchedule || hasHeldSeats) return;

    initiateBooking({
      packageId,
      scheduleId: selectedSchedule.scheduleId,
      tierType: selectedTierType,
      seatsCount,
       travelers: travellers,
      amountInPaise: pricing.totalAmount * 100, // INR to paise
    }).then(() => {
      setHasHeldSeats(true);
    });

    // Cleanup on unmount handled by releaseHold if not confirmed
    return () => {
      // In a real production app, we'd only release if unmounting without success
      // We rely on backend TTL for safety.
    };
  }, []);
  
  

  const tierLabel = selectedTierType.charAt(0) + selectedTierType.slice(1).toLowerCase();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  
    if (isInitiatingBooking || !clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
        <p className="text-sm font-medium text-gray-600">
          Securing your seats...
        </p>
      </div>
    );
  }


   return (
    <div className="space-y-4">
      <Card className="border border-amber-200 bg-amber-50 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-800">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-semibold">Seats Held!</span>
          </div>
          <CountdownTimer
            expiresAt={expiresAt!}
            onExpire={() => {
              toast.error("Seat hold expired.");
              onBack();
            }}
          />
        </div>
      </Card>

      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Payment
          </h3>
        </div>

        <div className="px-5 py-5">
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              bookingId={bookingId!}
              pricing={pricing}
              confirmBooking={confirmBooking}
            />
          </Elements>
        </div>
      </Card>

      {/* Order summary */}
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Order Summary
          </h3>
        </div>
        <div className="px-5 py-5 space-y-4 text-sm">
          {selectedSchedule && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-gray-600">
              <span className="leading-snug">
                {formatDate(selectedSchedule.startDate)} –{" "}
                {formatDate(selectedSchedule.endDate)}
              </span>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md w-fit">
                {tierLabel}
              </span>
            </div>
          )}
          <div className="bg-gray-50 -mx-5 px-5 py-4 flex items-center justify-between border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-900">
              Total payable
            </span>
            <span className="text-lg font-bold text-gray-900">
              ₹{pricing.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </Card>
      <PriceSummary pricing={pricing} appliedCoupon={appliedCoupon} />

      <p className="text-center text-xs text-gray-400 -mt-1 pb-4">
        By proceeding, you agree to our Terms of Service & Privacy Policy.
      </p>
    </div>
  );
}





function CountdownTimer({
  expiresAt,
  onExpire,
}: {
  expiresAt: string;
  onExpire: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState<string>("10:00");

  useEffect(() => {
    const target = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft("00:00");
        onExpire();
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return <span className="text-sm font-bold text-amber-800">{timeLeft}</span>;
}