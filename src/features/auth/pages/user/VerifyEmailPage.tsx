import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store/slices/user.slice";
import { Loader } from "lucide-react";
import { getStorageitem, removeStorageItem } from "@/utils/utils";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "../../hooks/auth.hooks";
import OtpForm from "../../components/Otp";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";

const UserEmailverifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);

  const { mutate: verifyEmail, isPending: isLoading } = useVerifyEmailMutation();

  if (!data.email) {
    return null;
  }

  const otpReceiverHandler = (otp: string) => {
    verifyEmail(
      { email: data.email, otp },
      {
        onSuccess(response) {
          dispatch(setUser(response.data));
          removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_EXPIRY);
          navigate(ROUTES.HOME);
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
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_EMAIL}
    />
  );
};

export default UserEmailverifyPage;
