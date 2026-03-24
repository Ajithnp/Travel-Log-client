import { Card } from "@/components/ui/card";
import type { Coupon, PricingBreakdown } from "@/types/booking.types";

interface PriceSummaryProps {
  pricing: PricingBreakdown;
  appliedCoupon: Coupon | null;
}

export function PriceSummary({ pricing, appliedCoupon }: PriceSummaryProps) {
  const {
    pricePerHead,
    travellersCount,
    baseAmount,
    discountAmount,
    totalAmount,
  } = pricing;

  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
      <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
        <h3 className="text-sm font-semibold uppercase text-card">
          Price Summary
        </h3>
      </div>
      <div className="px-5 py-5 space-y-3 text-sm">
        {/* BASE */}
        <div className="flex justify-between items-start gap-2 text-gray-600">
          <span className="leading-snug">
            ₹{pricePerHead.toLocaleString("en-IN")} × {travellersCount} person
            {travellersCount > 1 ? "s" : ""}
          </span>
          <span className="shrink-0">
            ₹{baseAmount.toLocaleString("en-IN")}
          </span>
        </div>

        {/* PLATFORM FEE */}
        {/* <div className="flex justify-between items-center text-gray-600">
          <span>Platform fee</span>
          <span>₹{platformFee.toLocaleString("en-IN")}</span>
        </div> */}

        {/* DISCOUNT */}
        {appliedCoupon && discountAmount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span className="truncate">Discount ({appliedCoupon.code})</span>
            <span className="shrink-0">
              −₹{discountAmount.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        {/* TOTAL */}
        <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-center">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-base font-bold text-gray-900">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </Card>
  );
}
