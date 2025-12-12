import OtpForm from "../../components/Otp";
import { Loader } from "lucide-react";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { useVerifyOtpLogic } from "../../hooks/useVerifyOtpLogic";

const VerifyOtp = () => {
  const {isLoading, verifyOtp } = useVerifyOtpLogic();

  return (
    <OtpForm
      otpReceiver={verifyOtp}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_OTP}
    />
  );
};

export default VerifyOtp;
