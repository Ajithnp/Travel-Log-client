import { useMutation } from "@tanstack/react-query";
import { initiateBooking, confirmBooking,  } from "@/services/app-service";
import type { 
  InitiateBookingRequestDTO, 
  ConfirmBookingRequestDTO, 
  InitiateBookingResponseDTO
} from "@/types/api/booking-api.types";
import { toast } from "sonner";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/IApiResponse";

export function useBookingFlow() {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  const initiateBookingMutation = useMutation<ApiResponse<
  InitiateBookingResponseDTO>, 
  AxiosError<ApiResponse>,               
  InitiateBookingRequestDTO             
>({
    mutationFn: (payload: InitiateBookingRequestDTO) => initiateBooking(payload),
    onSuccess: (res) => {
      if (res.success && res.data) {
        setBookingId(res.data.bookingId);
        setCheckoutUrl(res.data.checkoutUrl);
      }
    },
    onError: (err) => {
      console.log("error occured", err)
      toast.error(err?.response?.data?.message || "Failed to initiate booking");
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
    checkoutUrl,
    initiateBooking: initiateBookingMutation.mutateAsync,
    isInitiatingBooking: initiateBookingMutation.isPending,
    confirmBooking: confirmBookingMutation.mutateAsync,
    isConfirmingBooking: confirmBookingMutation.isPending,
  };
}
