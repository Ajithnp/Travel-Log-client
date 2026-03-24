import type { PublicScheduleDTO, SchedulePricingDTO, PricingType } from "@/types/types"
import { User, Users, UserRoundPlus } from "lucide-react";

export type PaymentMethodId = "upi"| "netbanking" | "wallet";
export type ScheduleStatus  = "upcoming" | "sold-out";
export type CouponDiscountType = "percent" | "flat";

export type { PublicScheduleDTO as Schedule, SchedulePricingDTO as SchedulePricing };

export type PricingTierType = PricingType; 



export interface Coupon {
  code:          string;
  label:         string;
  description:   string;
  discountType:  CouponDiscountType;
  discountValue: number;  // percent (0-100) or flat ₹ amount
}


export interface TravellerInfo {
  fullName:         string;
  idType:           string;
  idNumber:         string;
  phoneNumber:      string;
  emailAddress?:    string;
  emergencyContact?: string;
  relation?:        string;
}

// ─── Computed pricing breakdown (single source of truth) ─────────────────────

export interface PricingBreakdown {
  pricePerHead:   number;   
  travellersCount: number;
  baseAmount:     number;   
  discountAmount: number;
  totalAmount:    number;
}

// ─── Wizard state ─────────────────────────────────────────────────────────────

export interface BookingState {
  step:             number;
  selectedSchedule: PublicScheduleDTO | null;
  selectedTierType: PricingTierType;
  travellers:       TravellerInfo[];
  appliedCoupon:    Coupon | null;
}

// ─── Tier UI metadata (display-only, not from backend) ───────────────────────

export interface TierMeta {
  type:  PricingTierType;
  label: string;
 
}



export const ICON_MAP = {
  SOLO: User,
  DUO: Users,
  GROUP: UserRoundPlus,
};

export const TIER_META: TierMeta[] = [
  { type: "SOLO",  label: "Solo"  },
  { type: "DUO",   label: "Duo" },
  { type: "GROUP", label: "Group"  },
];

// ─── Pricing calculation (single source of truth) ────────────────────────────

/**
 * Derives the pricing breakdown from:
 *  - the selected schedule's pricing entry for the chosen tier
 *  - an optional applied coupon
 *
 * Formula:
 *   baseAmount   = the raw group price from backend (e.g. 9200 for DUO)
 *   pricePerHead = baseAmount / peopleCount
 *   platformFee  = 499 (fixed)
 *   discount     = percent → round(baseAmount × value / 100)
 *                  flat    → value
 *   total        = baseAmount + platformFee − discount
 */
export function calcPricing(
  selectedPricing: SchedulePricingDTO,
  appliedCoupon: Coupon | null
): PricingBreakdown {
  const baseAmount      = selectedPricing.price;
  const travellersCount = selectedPricing.peopleCount;
  const pricePerHead    = Math.round(baseAmount / travellersCount);

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount =
      appliedCoupon.discountType === "percent"
        ? Math.round((baseAmount * appliedCoupon.discountValue) / 100)
        : appliedCoupon.discountValue;
  }

  const totalAmount = baseAmount - discountAmount;

  return {
    pricePerHead,
    travellersCount,
    baseAmount,
    discountAmount,
    totalAmount,
  };
}



export const ID_TYPES = ["Aadhaar", "Voter ID", "Driving License"] as const;

export const RELATIONS = ["Parent", "Spouse", "Sibling", "Friend", "Colleague",] as const;

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code:          "TRAIL10",
    label:         "Trail10",
    description:   "10% off on base price",
    discountType:  "percent",
    discountValue: 10,
  },
  {
    code:          "FIRSTTRIP",
    label:         "First Trip",
    description:   "₹500 off for first-time users",
    discountType:  "flat",
    discountValue: 500,
  },
  {
    code:          "SUMMER500",
    label:         "Summer Special",
    description:   "₹500 off on summer packages",
    discountType:  "flat",
    discountValue: 500,
  },
];