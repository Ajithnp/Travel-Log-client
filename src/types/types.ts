
import type { BasePackageDraftSchema } from "@/features/vendor/package/base-package/validations/draft-base-package-schema";
import type{ BasePackageSchema } from "@/features/vendor/package/base-package/validations/base-package-schema";
import type { PackageStatus } from "@/lib/constants/constants";
import type { DifficultyLevel } from "@/features/vendor/package/base-package/type/package";
import type { ScheduleStatus } from "@/hooks/app/package-listing";
import type { CancellationPolicies } from "@/lib/constants/cancellation-policies";
export type ImageStatus = "PENDING_UPLOAD" | "UPLOADED" | "REMOVED"

export interface IPackageImage {        // Local unique ID for UI keys
  url?: string;      // S3 URL (present if already uploaded)
  key: string;      // S3 Key (present if already uploaded)
  file?: File;       // Local File object (present if not yet uploaded)
  status?: ImageStatus; 
}

export type DraftPackagePayload = Partial<BasePackageDraftSchema> & {
  status: "DRAFT";
};

export type PublishPackagePayload = BasePackageSchema & {
  status: "PUBLISHED";
};


export interface ActivityDTO {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  location: string;
  specials: string[];
  included: boolean;
}

export interface ItineraryDayDTO {
  dayNumber: number;
  title: string;
  activities: ActivityDTO[];
}

export interface PopulatedVendor {
  id: string;
  name: string;
}
export interface PublicPackageDetailDTO {
  packageId: string;
  vendor: PopulatedVendor;
  title: string;
  location: string;
  state: string;
  usp: string;
  category: string | null;
  difficultyLevel: DifficultyLevel | undefined;
  description: string;
  days: string;
  nights: string;
  basePrice: string;
  images: { key: string, url?:string }[];
  itinerary: ItineraryDayDTO[];
  inclusions: string[];
  exclusions: string[];
  packingList: string[];
  cancellationPolicy: CancellationPolicies
  status: PackageStatus;
  isActive: boolean;
}

export type PricingType = 'SOLO' | 'DUO' | 'GROUP';
export interface SchedulePricingDTO {
  type: PricingType;
  peopleCount: number;
  price: number;
}

export interface PublicScheduleDTO {
  scheduleId: string;
  startDate: string;
  endDate: string;
  status: ScheduleStatus;
  seatsRemaining: number;
  pricing: SchedulePricingDTO[];
}

export interface TravellerInfo {
  fullName: string;
  idType: string;
  idNumber: string;
  phoneNumber: string;
  emergencyContact?: string;
  relation?: string;
}
 
 
export interface Coupon {
  code: string;
  label: string;
  description: string;
  discountType: "percent" | "flat";
  discountValue: number;
}
 

export interface BookingState {
  step: number;
  selectedSchedule: string | null;
  groupType: PricingType;
  travellers: TravellerInfo[];
  appliedCoupon: Coupon | null;
  paymentMethod: "upi" | "wallet" | "netbanking" | null;
  upiId?: string;
}



export interface BookingTraveller {
  name: string;          
  idType: string;            // "Aadhaar" | "PAN card" | "Driving licence" | "Voter ID"
  idNumber: string;
  isLead: boolean;
  // Lead traveller only
  phone?: string;
  // Non-lead travellers only
  emergencyContact?: string;
  emergencyRelation?: string;
}
 

export interface BookingCoupon {
  code: string;
  discount: number;          //  amount already calculated on frontend
}
 
export interface CreateBookingPayload {
  packageId: string;
  scheduleId: string;
  tier: "solo" | "duo" | "group";
  travellers: BookingTraveller[];
  coupon: BookingCoupon | null;
  pricing: {
    baseAmount: number;
    platformFee: number;
    addonAmount: number;
    discountAmount: number;
    totalAmount: number;
  };
  paymentMethod: "upi" | "card" | "netbanking" | "emi";
  upiId?: string;            // only when paymentMethod === "upi"
}