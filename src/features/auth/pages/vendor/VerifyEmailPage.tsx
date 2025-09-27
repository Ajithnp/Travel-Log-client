import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { getStorageitem, removeStorageItem } from "@/utils/utils";
import { toast } from "sonner";
import OtpForm from "../../components/Otp";
import { useVerifyEmailMutation } from "../../hooks/auth.hooks";
import { setVendor } from "@/store/slices/vendor.slice";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";

const VendorEmailverifyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);

  const { mutate: verifyEmail, isPending: isLoading } =
    useVerifyEmailMutation();
  if (!data.email) {
    toast.error(ERROR_MESSAGES.INVALID_EMAIL);
    return null;
  }

  const otpReceiverHandler = (otp: string) => {
    verifyEmail(
      { email: data.email, otp },
      {
        onSuccess(response) {
          dispatch(setVendor(response.data));
          removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_TIMER);
          removeStorageItem(LOCAL_STORAGE_KEY.OTP_EXPIRY);
          navigate(`${BASE_ROUTE.VENDOR}${ROUTES.PROFILE}`);
        },

        onError(error) {
          toast.error(
            error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
          );
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

export default VendorEmailverifyPage;
