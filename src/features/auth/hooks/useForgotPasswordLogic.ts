import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "./api.hooks";
import { ROLE } from "@/types/Role";
import { toast } from "sonner";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";

interface ForgotPasswordParams {
  email: string;
};

interface ForgotPasswordLogicReturn {
  handleEmailVerify: (payload: ForgotPasswordParams) => void;
  isLoading: boolean;
}


const useForgotPasswordLogic = ():ForgotPasswordLogicReturn => {
  const navigate = useNavigate();
  const { mutate: forgotPassword, isPending: isLoading } =
    useForgotPasswordMutation();

  const handleEmailVerify = useCallback(({ email }: ForgotPasswordParams) => {
    forgotPassword(
      { email },
      {
        onSuccess: (res) => {
          if (res.data.role !== ROLE.USER) {
            toast.error(ERROR_MESSAGES.USER_NOT_FOUND);
            return;
          }

          setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
            email: res.data.email,
            role: res.data.role,
            otpExpiry: res.data?.otpExpiresIn,
            serverTime: res.data?.serverTime,
          });
          navigate(`${BASE_ROUTE.USER}${ROUTES.OTP_VERIFY}`);
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
          );
        },
      }
    );
  }, [forgotPassword, navigate]);
    
    return {
        handleEmailVerify, isLoading
    }
};

export default useForgotPasswordLogic;
