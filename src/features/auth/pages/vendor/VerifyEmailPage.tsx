import { Loader } from "lucide-react";
import OtpForm from "../../components/Otp";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useEmailVerificationLogic from "../../hooks/useEmailVerificationLogic";

const VendorEmailverifyPage = () => {
  const { verifyOtp, isLoading } = useEmailVerificationLogic();

  return (
    <OtpForm
      otpReceiver={verifyOtp}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_EMAIL}
    />
  );
};

export default VendorEmailverifyPage;
