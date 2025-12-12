import { useResendOtpMutation } from "./api.hooks";
import { getStorageitem, setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { calculateOtpTimer } from "@/utils/calculateOtpTimer";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { useCallback } from "react";

interface UseResendOtpReturn {
  resendOTP: () => void;
  isLoadingOtp: boolean;
}

const useResentOtp = (
  setTimer: (value: number) => void
): UseResendOtpReturn => {
  const { mutate: sendOtp, isPending: isLoadingOtp } = useResendOtpMutation();

  const resendOTP = useCallback(() => {
    const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
    if (!data.email) {
      toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
      return;
    }

    sendOtp(
      { email: data.email },
      {
        onSuccess: (res) => {
          const { otpExpiresIn, serverTime } = res.data ?? {};

          if (!otpExpiresIn || !serverTime) {
            toast.error(ERROR_MESSAGES.SOMETHING_WENT_WRONG);
            return;
          }

          if (otpExpiresIn && serverTime) {
            setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
              ...getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL),
              otpExpiry: otpExpiresIn,
              serverTime,
            });

            const calculatedTime = calculateOtpTimer(otpExpiresIn, serverTime);
            setTimer(calculatedTime);
            toast.success(res.message);
          }
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
          );
        },
      }
    );
  }, [sendOtp, setTimer]);

  return { resendOTP, isLoadingOtp };
};

export default useResentOtp;
