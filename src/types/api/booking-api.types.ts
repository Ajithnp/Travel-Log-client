import type { TravellerInfo } from "../booking.types";
import type { PricingType } from "../types";

export const PAYMENT_METHODS = {
  WALLET: "wallet",
  STRIPE: "stripe",
  COMBINED: "combined",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[keyof typeof PAYMENT_METHODS];

export interface InitiateBookingRequestDTO {
  packageId: string;
  scheduleId: string;
  tierType: PricingType;
  seatsCount: number;
  useWallet: boolean;
  travelers: TravellerInfo[];
  amountInPaise: number;
}

export interface InitiateBookingResponseDTO {
  bookingId: string;
  paymentMethod: PaymentMethod;  
  checkoutUrl?: string;          
  walletAmountUsed?: number;     
  stripeAmount?: number; 
}

export interface ConfirmBookingRequestDTO {
  bookingId: string;
  stripePaymentIntentId?: string;
}

export interface ConfirmBookingResponseDTO {
  bookingId: string;
  bookingCode?: string;
  amount: number;
  message: string;
}

export type VerifyPaymentResponseDTO =
  | {
      status: "success";
      bookingId: string;
      amount: number;
    }
  | {
      status: "failure";
    };