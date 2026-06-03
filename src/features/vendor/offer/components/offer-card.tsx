import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Calendar,
  Loader2,
  PercentIcon,
  PowerOff,
  ShieldCheck,
  Torus,
  Users,
  Wallet,
} from "lucide-react";
import type { OfferDTO } from "../types/types";

interface OfferCardProps {
  offer: OfferDTO;
  onDeactivate: (offerId: string) => void;
  isDeactivating: string | null;
}

export function OfferCard({ offer, onDeactivate, isDeactivating }: OfferCardProps) {

  const isExpired = new Date(offer.validUntil) < new Date();
  const statusLabel = !offer.isActive ? "Inactive" : isExpired ? "Expired" : "Active";
  const statusColor = !offer.isActive || isExpired
    ? "bg-red-100 text-red-500 border-slate-200"
    : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <Card className="border border-border shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className={`h-1 w-full ${offer.isActive && !isExpired ? "bg-orange-400" : "bg-red-300"}`} />

      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <PercentIcon className="w-4 h-4 text-primary" />
              </div>
              <h3 className="font-bold text-sm text-foreground leading-tight truncate">
                {offer.name}
              </h3>
            </div>
          </div>
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold uppercase tracking-wide shrink-0 ${statusColor}`}
          >
            {statusLabel}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
          <span className="text-xs text-muted-foreground font-medium">Discount</span>
          <span className="text-2xl font-extrabold text-primary">
            {offer.discountValue}% off
          </span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Torus className="w-3.5 h-3.5 text-violet-500 shrink-0" />
            <span>
              Package{" : "}
              <span className="font-semibold text-foreground">
                {offer.packageTittle}
              </span>
            </span>
          </div>
          {offer.maxDiscountCap && (
            <div className="flex items-center gap-2">
              <Wallet className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                Max cap:{" "}
                <span className="font-semibold text-foreground">
                  ₹{offer.maxDiscountCap.toLocaleString()}
                </span>
              </span>
            </div>
          )}
          {offer.minBookingAmount && (
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>
                Min booking:{" "}
                <span className="font-semibold text-foreground">
                  ₹{offer.minBookingAmount.toLocaleString()}
                </span>
              </span>
            </div>
          )}
          {offer.usageLimit && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-violet-500 shrink-0" />
              <span>
                Used{" "}
                <span className="font-semibold text-foreground">
                  {offer.usedCount} / {offer.usageLimit}
                </span>{" "}
                bookings
              </span>
            </div>
          )}
          {!offer.usageLimit && (
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-violet-500 shrink-0" />
              <span>
                Used:{" "}
                <span className="font-semibold text-foreground">
                  {offer.usedCount}
                </span>{" "}
                · Unlimited
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>
              {format(new Date(offer.validFrom), "dd MMM yyyy")} —{" "}
              {format(new Date(offer.validUntil), "dd MMM yyyy")}
            </span>
          </div>
        </div>

        {/* Deactivate action */}
        {offer.isActive && !isExpired && (
          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs gap-2 text-destructive border-destructive/30 hover:bg-destructive/5"
            onClick={() => onDeactivate(offer.id)}
            disabled={isDeactivating === offer.id}
          >
            {isDeactivating === offer.id ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <PowerOff className="w-3.5 h-3.5" />
            )}
            Deactivate Offer
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
