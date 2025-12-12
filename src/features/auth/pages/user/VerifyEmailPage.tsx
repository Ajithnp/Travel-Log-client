import { Loader } from "lucide-react";
import OtpForm from "../../components/Otp";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useEmailVerificationLogic from "../../hooks/useEmailVerificationLogic";

const UserEmailverifyPage = () => {
  const { email, verifyOtp, isLoading } = useEmailVerificationLogic();

  if (!email) return null;

  return (
    <OtpForm
      otpReceiver={verifyOtp}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_EMAIL}
    />
  );
};

export default UserEmailverifyPage;
