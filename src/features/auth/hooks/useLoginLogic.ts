import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/store/slices/user.slice";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { setStorageItem } from "@/utils/StorageUtils";
import { ROUTES } from "@/lib/constants/routes";
import { useLoginMutation, useResendOtpMutation } from "./api.hooks";
import { type LoginSchemaType } from "../validations/login-schema";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { useCallback } from "react";

interface UseLoginLogicParams {
  role:"user"|"vendor"
}

export interface UseLoginLogicReturn {
  handleLogin: (data: LoginSchemaType) => void;
  isPending: boolean;
}

const useLoginLogic = ({role}:UseLoginLogicParams): UseLoginLogicReturn => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginMutation();
  const { mutate: resendOtp } = useResendOtpMutation();

  const handleEmailNotVerified = useCallback(
    (email: string) => {
      if (window.confirm("Your email is not verified. Verify your email")) {
        resendOtp(
          { email },
          {
            onSuccess: (res) => {
              setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
                email,
                role: role,
                otpExpiry: res.data?.otpExpiresIn,
                serverTime: res.data?.serverTime,
              });
              toast.success("Verification email sent!");
              navigate(`/${role}/verify-email`);
            },
            onError: (err) => {
              toast.error(
                err?.response?.data?.message ||
                  err?.message ||
                  "Failed to resend OTP"
              );
            },
          }
        );
      }
    },
    [navigate, resendOtp,role]
  );

  const handleLogin = useCallback(
    (data: LoginSchemaType) => {
      loginUser(data, {
        onSuccess: (res) => {
          if (res.data.role !== role)
            return toast.warning(ERROR_MESSAGES.USER_NOT_FOUND);
          dispatch(setUser(res.data));
          toast.success(res.message);
          navigate(ROUTES.HOME);
        },
        onError: (error) => {
          const code = error?.response?.data?.error?.code;
          const message = error?.response?.data?.message || error?.message;
          if (code === "EMAIL_NOT_VERIFIED") {
            handleEmailNotVerified(data.email);
            return;
          }
          toast.error(message);
        },
      });
    },
    [loginUser, dispatch, navigate, handleEmailNotVerified,role]
  );

  return { handleLogin, isPending };
};

export default useLoginLogic;
