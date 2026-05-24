
import { Loader2, Wallet2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PriceSummary } from "./pricing-summary";
import type {
  Coupon,
  PricingBreakdown,
  PricingTierType,
  Schedule,
} from "@/types/booking.types";
import type { PaymentSplit } from "@/utils/booking/payment-split-calculator";
import Wallet from "@/features/user/wallet/pages/wallet";


interface Step4PaymentProps {
  selectedSchedule: Schedule | null;
  selectedTierType: PricingTierType;
  pricing: PricingBreakdown;
  appliedCoupon: Coupon | null;
  bookingId: string | null;
  checkoutUrl: string | null;
  isProcessing: boolean;

  walletBalance: number;
  isLoadingWallet: boolean;
  useWallet: boolean;
  onToggleWallet: (val: boolean) => void;
  split: PaymentSplit;
  onPay: () => Promise<void>;  
  onBack: () => void;
}

export function Step4Payment({
  selectedSchedule,
  selectedTierType,
  pricing,
  appliedCoupon,
  checkoutUrl,
  isProcessing,
  walletBalance,
  isLoadingWallet,
  useWallet,
  onToggleWallet,
  split,
  onPay,
  onBack,
}: Step4PaymentProps) {
  const tierLabel =
    selectedTierType.charAt(0) + selectedTierType.slice(1).toLowerCase();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  if (checkoutUrl) {
    window.location.href = checkoutUrl;
    console.log('checkout url', checkoutUrl)
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
        <p className="text-sm font-medium text-gray-600">
          Redirecting to payment...
        </p>
      </div>
    );
  }

  const payButtonLabel = () => {
    if (isProcessing) {
      return (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {split.method === 'wallet' ? 'Confirming...' : 'Securing seats...'}
        </span>
      );
    }
    if (split.method === 'wallet') {
      return `Pay ₹${pricing.totalAmount.toLocaleString('en-IN')} from Wallet`;
    }
    if (split.method === 'combined') {
      return `Pay ₹${split.stripeAmount.toLocaleString('en-IN')}→`;
    }
    return (
      <span className="flex items-center justify-center gap-1.5">
        Pay ₹{pricing.totalAmount.toLocaleString('en-IN')}
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
        <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
          <h3 className="text-sm font-semibold uppercase text-card">Order Summary</h3>
        </div>
        <div className="px-5 py-5 space-y-4 text-sm">
          {selectedSchedule && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-gray-600">
              <span className="leading-snug">
                {formatDate(selectedSchedule.startDate)} –{' '}
                {formatDate(selectedSchedule.endDate)}
              </span>
              <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-md w-fit">
                {tierLabel}
              </span>
            </div>
          )}
          <div className="bg-gray-50 -mx-5 px-5 py-4 flex items-center justify-between border-t border-gray-200">
            <span className="text-sm font-semibold text-gray-900">Total payable</span>
            <span className="text-lg font-bold text-gray-900">
              ₹{pricing.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Card>

      {/*Wallet Section */}
      {!isLoadingWallet && walletBalance > 0 && (
        <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
          <div className="px-5 pt-5 pb-3 bg-accent-foreground/80">
            <h3 className="text-sm font-semibold uppercase text-card flex items-center gap-2">
              <Wallet2 className="w-4 h-4" /> Wallet
            </h3>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Available: ₹{walletBalance.toLocaleString('en-IN')}
                </p>
                {useWallet && split.method === 'combined' && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    ₹{split.walletAmount.toLocaleString('en-IN')} from wallet
                    {' + '}₹{split.stripeAmount.toLocaleString('en-IN')}
                  </p>
                )}
                {useWallet && split.method === 'wallet' && (
                  <p className="text-xs text-green-600 mt-0.5 font-medium">
                    ✓ Full amount covered
                  </p>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className="text-sm text-gray-600">Use wallet</span>
                <input
                  type="checkbox"
                  checked={useWallet}
                  onChange={(e) => onToggleWallet(e.target.checked)}
                  className="w-4 h-4 accent-gray-900"
                />
              </label>
            </div>
          </div>
        </Card>
      )}

      <PriceSummary 
        pricing={pricing} 
        appliedCoupon={appliedCoupon} 
        walletDeduction={split.walletAmount} 
      />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 rounded-xl py-6 text-base font-semibold border-gray-300"
        >
          ← Back
        </Button>

        <Button
          type="button"
          disabled={isProcessing}
          onClick={onPay}
          className="flex-1 bg-gray-600 text-white rounded-xl py-6 text-base font-semibold
              transition-all duration-200 ease-out
              hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md
              active:translate-y-0 active:shadow-sm
              disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {payButtonLabel()}
        </Button>
      </div>

      {split.method !== 'wallet' && (
        <p className="text-center text-xs text-gray-400 pb-4">
          You'll be redirected to Stripe's secure payment page.
        </p>
      )}
    </div>
  );
}