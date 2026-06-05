import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  type PricingBreakdown,
} from "@/types/booking.types";
import { PriceSummary } from "./pricing-summary";

interface Step3AddOnsProps {
  pricing: PricingBreakdown;
  onContinue: () => void;
  onBack: () => void;
  offerPercentage?: number;
}

export function Step3AddOns({
  pricing,
  onContinue,
  onBack,
  offerPercentage
}: Step3AddOnsProps) {


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

      <PriceSummary pricing={pricing} offerPercentage={offerPercentage} />

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

