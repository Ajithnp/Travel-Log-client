import type { TravellerInfo } from "../booking.types";
import type { PricingType } from "../types";

 

export interface InitiateBookingRequestDTO {
  packageId: string;
  scheduleId: string;
  tierType: PricingType;
  seatsCount: number;
  travelers: TravellerInfo[];
  amountInPaise: number;
}

export interface InitiateBookingResponseDTO {
  bookingId: string;
  clientSecret: string;
  expiresAt: string; // ISO string
}

export interface ConfirmBookingRequestDTO {
  bookingId: string;
  stripePaymentIntentId: string;
}

export interface ConfirmBookingResponseDTO {
  bookingId: string;
  message: string;
}