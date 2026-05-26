import { retryBooking } from "@/services/app-service";
import { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export const useRetryPayment = () => {
  const [isLoading, setIsLoading] = useState(false);

  const retry = async (bookingId: string) => {
    setIsLoading(true);

    try {
      const { data } = await retryBooking(bookingId);

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message ?? "Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { retryPayment:retry, isLoading };
}