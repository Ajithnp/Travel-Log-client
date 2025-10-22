import React from "react";
import OtpForm from "../../components/Otp";
import { useNavigate } from "react-router-dom";
import { getStorageitem, removeStorageItem } from "@/utils/utils";
import { useVerifyOtpMutation } from "../../hooks/auth.hooks";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { ROUTES } from "@/lib/constants/routes";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { mutate: verifyEmail, isPending: isLoading } = useVerifyOtpMutation();

  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
  if (!data.email) return;

  const otpReceiverHandler = (otp: string) => {
    verifyEmail(
      { email: data.email, otp },
      {
        onSuccess(response) {
          toast.success(response.message);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_EXPIRY);
          navigate(`${BASE_ROUTE.USER}${ROUTES.RESET_PASSWORD}`, { replace: true });
        },

        onError(error) {
          toast.error(error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        },
      }
    );
  };

  return (
    <OtpForm
      otpReceiver={otpReceiverHandler}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_OTP}
    />
  );
};

export default VerifyOtp;
