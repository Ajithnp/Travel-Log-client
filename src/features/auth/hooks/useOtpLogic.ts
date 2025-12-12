import React from "react";

import { useState, useCallback } from "react";
import { useResendOtpMutation } from "../hooks/api.hooks";
import { toast } from "sonner";
import { getStorageitem, setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { calculateOtpTimer } from "@/utils/calculateOtpTimer";

interface VerifyEmailData {
  email: string;
  otpExpiry?: number;
  serverTime?: number;
}

type UseOtpLogicResult = {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
  resendOTP: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
};

const useOtpLogic = (
  setTimer: (value: number) => void,
  otpReceiver: (otp: string) => void
): UseOtpLogicResult => {
  const [otp, setOtp] = useState<string>("");

  const { mutate: sendOtp, isPending: isLoading } = useResendOtpMutation();

  const resendOTP = useCallback(() => {
    const data = getStorageitem(
      LOCAL_STORAGE_KEY.VERIFY_EMAIL
    ) as VerifyEmailData | null;
    if (!data?.email) return;

    sendOtp(
      { email: data.email },
      {
        onSuccess: (res) => {
          const { otpExpiresIn, serverTime } = res.data || {};

          if (otpExpiresIn && serverTime) {
            setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
              ...data,
              otpExpiry: otpExpiresIn,
              serverTime,
            });

            const calculated = calculateOtpTimer(otpExpiresIn, serverTime);
            setTimer(calculated);
          }

          toast.success(res.message);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
          );
        },
      }
    );
  }, [sendOtp, setTimer]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (otp.length < 6) {
        toast.error(ERROR_MESSAGES.ENTER_VALID_OTP);
        return;
      }

      otpReceiver(otp);
    },
    [otp, otpReceiver]
  );

  return {
    otp,
    setOtp,
    resendOTP,
    handleSubmit,
    isLoading,
  };
};

export default useOtpLogic;
