import { useMutation } from "@tanstack/react-query";
import { initiateBooking, confirmBooking,  } from "@/services/app-service";
import type { 
  InitiateBookingRequestDTO, 
  ConfirmBookingRequestDTO 
} from "@/types/api/booking-api.types";
import { toast } from "sonner";
import { useState } from "react";

export function useBookingFlow() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  const initiateBookingMutation = useMutation({
    mutationFn: (payload: InitiateBookingRequestDTO) => initiateBooking(payload),
    onSuccess: (res) => {
      if (res.success && res.data) {
        setBookingId(res.data.bookingId);
        setClientSecret(res.data.clientSecret);
        setExpiresAt(res.data.expiresAt);
      }
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to initiate booking");
    },
  });

  const confirmBookingMutation = useMutation({
    mutationFn: (payload: ConfirmBookingRequestDTO) => confirmBooking(payload),
    onSuccess: (res) => {
       toast.success(res.message || "Booking confirmed successfully!");
      
    },
    onError: (err) => {
      toast.error(err?.message || "Failed to confirm booking");
    },
  });


  return {
    bookingId,
    clientSecret,
    expiresAt,
    initiateBooking: initiateBookingMutation.mutateAsync,
    isInitiatingBooking: initiateBookingMutation.isPending,
    confirmBooking: confirmBookingMutation.mutateAsync,
    isConfirmingBooking: confirmBookingMutation.isPending,
  };
}
