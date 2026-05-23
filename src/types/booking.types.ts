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
  discountValue: number;  
}


export interface TravellerInfo {
  fullName: string;
  idType: string;
  idNumber: string;

  isLead: boolean;

  phoneNumber?: string;
  emailAddress?: string;

  emergencyContact?: string;
  relation?: string;
}


export interface PricingBreakdown {
  pricePerHead:   number;   
  travellersCount: number;
  baseAmount:     number;   
  discountAmount: number;
  totalAmount:    number;
}


export interface BookingState {
  step:             number;
  selectedSchedule: PublicScheduleDTO | null;
  selectedTierType: PricingTierType;
  travellers:       TravellerInfo[];
  appliedCoupon:    Coupon | null;
}


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