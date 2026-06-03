
export interface OfferDTO {
  id: string;
  vendorId: string;
  packageId: string;
  packageTittle:string;
  scheduleId?: string | null;
  name: string;
  discountType: "percentage";
  discountValue: number;
  maxDiscountCap?: number | null;
  minBookingAmount?: number | null;
  usageLimit?: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  createdAt: string;
}


export interface CreateOfferPayload {
  packageId: string;
  scheduleId?: string;
  name: string;
  discountType: "percentage";
  discountValue: number;
  maxDiscountCap?: number;
  minBookingAmount?: number;
  usageLimit?: number;
  validFrom: string;
  validUntil: string;
}

export interface OfferFormValues {
  packageId: string;
  scheduleId?: string;
  name: string;
  discountValue: number;
  maxDiscountCap?: number;
  minBookingAmount?: number;
  usageLimit?: number;
  validFrom: string;
  validUntil: string;
}

export interface OfferQueryParams {
  page:number,
  limit:number,
  isActive?: boolean;
  search?: string;
}

export interface PackageForOfferResponseDTO {
  id: string;
  title: string;
  hasOffer: boolean;
  offerValue?: number;
}