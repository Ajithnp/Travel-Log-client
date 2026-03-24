import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

type Batch = {
  id: string;
  price: number;
  // add other fields if needed
};

type Pricing = {
  base: number;
  platformFee: number;
};

type BookingCardProps = {
  rating: number;
  reviewCount: number;
  pricing: Pricing;
  batches: Batch[];
  selectedBatch: string;
  onSelectBatch: (id: string) => void;
};

export function BookingCard({
  rating,
  reviewCount,
  pricing,
  batches,
  selectedBatch,
  onSelectBatch,
}: BookingCardProps) {
  const batch = batches.find((b) => b.id === selectedBatch);

  if (!batch) {
    return <p>No batch selected</p>;
  }

  const total = batch.price + pricing.platformFee;

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 dark:bg-slate-950 px-5 py-4 text-white">
        <p className="text-xs text-slate-400 mb-1">Starting from</p>

        <p className="text-3xl font-bold">
          ₹{pricing.base.toLocaleString()}
        </p>

        <p className="text-xs text-slate-400 mt-0.5">per person</p>

        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-xs text-slate-400">
            ({reviewCount} reviews)
          </span>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Select Date */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Select a Date</h3>
          </div>

          <div className="space-y-2">
            {batches.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBatch(b.id)}
                className={`w-full text-left p-2 rounded-md border ${
                  selectedBatch === b.id
                    ? "border-primary bg-accent"
                    : "border-border"
                }`}
              >
                ₹{b.price.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Group Type (static for now) */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Group Type</h3>

          <div className="flex gap-2">
            {["Solo", "Duo", "Group"].map((type) => (
              <button
                key={type}
                className="flex-1 py-2 rounded-md border text-xs font-medium"
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              ₹{batch.price.toLocaleString()} × 1 person
            </span>
            <span>₹{batch.price.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Platform fee
            </span>
            <span>₹{pricing.platformFee}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        <Button className="w-full" size="lg">
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}