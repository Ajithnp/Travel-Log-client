// hooks/useVerifyOtp.ts
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { removeStorageItem, getStorageitem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { ROUTES, BASE_ROUTE } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { toast } from "sonner";
import { useVerifyOtpMutation } from "../hooks/api.hooks";

type UseVerifyOtpReturn = {
  verifyOtp: (otp: string) => void;
  isLoading: boolean;
};

export const useVerifyOtpLogic = (): UseVerifyOtpReturn => {
  const navigate = useNavigate();
  const { mutate: verifyEmail, isPending: isLoading } = useVerifyOtpMutation();

  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);

  const verifyOtp = useCallback(
    (otp: string) => {
      if (!data?.email) {
        toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        return;
      }

      verifyEmail(
        { email: data.email, otp },
        {
          onSuccess: (response) => {
            toast.success(response.message);

            removeStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER);
            removeStorageItem(LOCAL_STORAGE_KEY.OTP_EXPIRY);

            navigate(`${BASE_ROUTE.USER}${ROUTES.RESET_PASSWORD}`, {
              replace: true,
            });
          },

          onError: (error) => {
            toast.error(
              error?.response?.data?.message ||
                ERROR_MESSAGES.SOMETHING_WENT_WRONG
            );
          },
        }
      );
    },
    [verifyEmail, navigate, data?.email]
  );

  return {
    verifyOtp,
    isLoading,
  };
};
