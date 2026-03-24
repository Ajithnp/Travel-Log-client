import { useState } from "react";
import { Smartphone, Building2, Shield, Loader2, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PriceSummary } from "./pricing-summary";
import type { Coupon, PaymentMethodId, PricingBreakdown, PricingTierType, Schedule } from "@/types/booking.types";



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
  selectedSchedule: Schedule | null;
  selectedTierType: PricingTierType;
  pricing: PricingBreakdown;
  appliedCoupon: Coupon | null;
  isSubmitting?: boolean;
  onBack: () => void;
  onConfirm: (paymentMethod: PaymentMethodId, upiId: string) => void;
}



export function Step4Payment({
  selectedSchedule,
  selectedTierType,
  pricing,
  appliedCoupon,
  isSubmitting,
  onBack,
  onConfirm,
}: Step4PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("upi");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");

  const handleConfirm = () => {
    if (paymentMethod === "upi" && !upiId.includes("@")) {
      setUpiError("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    onConfirm(paymentMethod, upiId);
  };

  const tierLabel = selectedTierType.charAt(0) + selectedTierType.slice(1).toLowerCase();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });


  return (
    <div className="space-y-4">
      {/* Payment method selector */}
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Payment Method
          </h3>
        </div>

        <div className="px-5 py-5 space-y-5">
          <div className="space-y-2">
            {PAYMENT_METHODS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                disabled={isSubmitting}
                onClick={() => setPaymentMethod(id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
            ${isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            ${paymentMethod === id
                    ? "border-gray-900 bg-gray-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${paymentMethod === id ? "text-gray-900" : "text-gray-500"
                    }`} />
                  <span className="text-sm font-medium text-gray-800">
                    {label}
                  </span>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center
              ${paymentMethod === id
                      ? "border-gray-900"
                      : "border-gray-300"}`}
                >
                  {paymentMethod === id && (
                    <div className="w-2 h-2 rounded-full bg-gray-900" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* CONDITIONAL SECTIONS */}
          {paymentMethod === "upi" && (
            <div className="space-y-2">
              <Input
                value={upiId}
                onChange={(e) => {
                  setUpiId(e.target.value);
                  setUpiError("");
                }}
                placeholder="yourname@upi"
                disabled={isSubmitting}
                className="rounded-lg border-gray-200"
              />
              {upiError && (
                <p className="text-red-500 text-xs">{upiError}</p>
              )}
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 leading-relaxed">
              You will be redirected to your bank's secure portal to complete the payment.
            </div>
          )}

          {paymentMethod === "wallet" && (
            <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 leading-relaxed">
              EMI options available on 3, 6, 9 and 12 month plans. Details at checkout.
            </div>
          )}

          {/* SECURITY BLOCK */}
          <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl p-3">
            <Shield className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Secured by Razorpay · Free cancellation up to 7 days before trip
            </p>
          </div>

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

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 rounded-xl py-6 text-base font-semibold border-gray-300"
        >
          ← Back
        </Button>
        <Button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-6 text-base font-semibold disabled:opacity-70"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </span>
          ) : (
            `Confirm & Pay ₹${pricing.totalAmount.toLocaleString("en-IN")}`
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400 -mt-1">
        By proceeding, you agree to our Terms of Service &amp; Privacy Policy.
      </p>
    </div>
  );
}