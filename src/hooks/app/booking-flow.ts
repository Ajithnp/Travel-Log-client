import { useMutation } from "@tanstack/react-query";
import { initiateBooking } from "@/services/app-service";
import {
  type InitiateBookingRequestDTO,
  type InitiateBookingResponseDTO,
  PAYMENT_METHODS
} from "@/types/api/booking-api.types";
import { toast } from "sonner";
import { useState } from "react";
import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/IApiResponse";
import { useWalletBalanceQuery } from "@/features/user/wallet/hooks/api.hooks";
import { useConfirmBookingWalletMutation } from "./api.hooks";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "../useAuthUser";


export function useBookingFlow() {
  const user = useAuthUser()
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [useWallet, setUseWallet] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading: isLoadingWallet } = useWalletBalanceQuery(user.isLoggedIn);
  const confirmWalletMutation = useConfirmBookingWalletMutation();


  const initiateBookingMutation = useMutation<ApiResponse<
    InitiateBookingResponseDTO>,
    AxiosError<ApiResponse>,
    InitiateBookingRequestDTO
  >({
    mutationFn: initiateBooking,
    onSuccess: async (res) => {
      if (!res.success || !res.data) return;

      const { bookingId, paymentMethod, checkoutUrl } = res.data;

      setBookingId(bookingId);

      if (paymentMethod === PAYMENT_METHODS.WALLET) {
        // No Stripe — confirm directly
        await confirmWalletMutation.mutateAsync(bookingId, {
          onSuccess: (res) => {
            navigate("/user/payment/success", {
              replace: true,
              state: {
                bookingId: res.data?.bookingId,
                bookingCode: res.data?.bookingCode,
                amount: res.data?.amount,
              },
            });
            toast.success('Booking confirmed! Wallet payment successful.');
          },
          onError: () => {
            navigate("/user/payment/failure", {
              replace: true,
              state: {
                bookingId,
              },
            });
            toast.error('Payment failed. Your wallet was not charged.');
          },
        });
        return;
      }

      // Stripe or combined: redirect to payment page
      if (checkoutUrl) {
        setCheckoutUrl(checkoutUrl);
      }
    },
    onError: (err) => {
      console.log("error occured", err)
      toast.error(err?.response?.data?.message || "Failed to initiate booking");
    },
  });

  return {
    bookingId,
    checkoutUrl,
    useWallet,
    setUseWallet,
    walletBalance: data?.data?.balance || 0,
    isLoadingWallet,
    initiateBooking: initiateBookingMutation.mutateAsync,
    isInitiatingBooking: initiateBookingMutation.isPending,
    isProcessing: initiateBookingMutation.isPending || confirmWalletMutation.isPending,
  };
}
