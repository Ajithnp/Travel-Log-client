import { useState } from "react";
import { Copy, Check, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AVAILABLE_COUPONS,
  type Coupon,
  type PricingBreakdown,
} from "@/types/booking.types";
import { PriceSummary } from "./pricing-summary";

interface Step3AddOnsProps {
  pricing: PricingBreakdown;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon) => void;
  onRemoveCoupon: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export function Step3AddOns({
  pricing,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onContinue,
  onBack,
}: Step3AddOnsProps) {
  const [couponInput, setCouponInput] = useState(appliedCoupon?.code ?? "");
  const [couponError, setCouponError] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleSelectCoupon = (coupon: Coupon) => {
    setCouponInput(coupon.code);
    setCouponError("");
  };

  const handleApplyCoupon = () => {
    const found = AVAILABLE_COUPONS.find(
      (c) => c.code.toLowerCase() === couponInput.trim().toLowerCase(),
    );
    if (found) {
      onApplyCoupon(found);
      setCouponError("");
    } else {
      setCouponError(
        "Invalid coupon code. Try TRAIL10, FIRSTTRIP, or SUMMER500.",
      );
    }
  };

  const handleRemoveCoupon = () => {
    onRemoveCoupon();
    setCouponInput("");
    setCouponError("");
  };

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 flex items-center justify-between bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">Add-Ons</h3>
          <span className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
            Optional
          </span>
        </div>
        <div className="border-t border-gray-100 mx-5" />
        <div className="px-5 py-6 flex items-center justify-center">
          <p className="text-sm text-gray-400 text-center max-w-[220px] leading-relaxed">
            No add-ons available for this package.
          </p>
        </div>
      </Card>

      {/* Coupon */}
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">
            Coupon / Promo Code
          </h3>
        </div>
        <div className="px-5 py-5 space-y-4">
          {/* VIEW COUPONS */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium">
                <Tag className="w-3.5 h-3.5" />
                View available coupons
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-72 max-w-[90vw]">
              {AVAILABLE_COUPONS.map((coupon) => (
                <DropdownMenuItem
                  key={coupon.code}
                  className="flex items-start justify-between gap-2 py-2.5 cursor-pointer"
                  onSelect={() => handleSelectCoupon(coupon)}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {coupon.label}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {coupon.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyCode(coupon.code);
                    }}
                    className="text-gray-400 hover:text-gray-700 transition-colors p-1 rounded shrink-0"
                  >
                    {copiedCode === coupon.code ? (
                      <Check className="w-3.5 h-3.5 text-green-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* INPUT + BUTTON (RESPONSIVE FIX) */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              value={couponInput}
              onChange={(e) => {
                setCouponInput(e.target.value);
                setCouponError("");
              }}
              placeholder="Enter code (try TRAIL10)"
              disabled={!!appliedCoupon}
              className="rounded-lg border-gray-200 w-full"
            />

            {appliedCoupon ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemoveCoupon}
                className="w-full sm:w-auto rounded-lg border-red-200 text-red-600 hover:bg-red-50"
              >
                Remove
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponInput.trim()}
                className="w-full sm:w-auto rounded-lg bg-gray-900 hover:bg-gray-800 text-white"
              >
                Apply
              </Button>
            )}
          </div>

          {/* FEEDBACK */}
          {couponError && <p className="text-red-500 text-xs">{couponError}</p>}

          {appliedCoupon && (
            <p className="text-green-600 text-xs font-medium">
              ✓ Coupon applied — saving ₹
              {pricing.discountAmount.toLocaleString("en-IN")}!
            </p>
          )}
        </div>
      </Card>

      <PriceSummary pricing={pricing} appliedCoupon={appliedCoupon} />

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-xl py-6 text-base font-semibold border-gray-300"
        >
          ← Back
        </Button>

        <Button
          type="button"
          onClick={onContinue}
          className="flex-1 bg-gray-600 text-white rounded-xl py-6 text-base font-semibold
                     transition-all duration-200 ease-out
                   hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md
                     active:translate-y-0 active:shadow-sm
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
                     group"
        >
          <span className="flex items-center justify-center gap-1.5">
            Continue
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
}

