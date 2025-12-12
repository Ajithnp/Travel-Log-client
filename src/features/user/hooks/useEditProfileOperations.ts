import {
  useChangeEmailRequestMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useUpdateProfileMutation,
} from "../hooks/api.hooks";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/user.slice";
import type { ProfileSchemaType } from "../validations/usese-profile-schema";
import { setStorageItem } from "@/utils/StorageUtils";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { useLogoutMutation } from "@/features/auth/hooks/api.hooks";
import { useCallback } from "react";

export type ModalType = "email" | "otp" | "password";

export interface EditProfileParams {
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

interface EditProfileOperations {
  handleEmailChangeRequest: (email: string) => void;
  isLoadingEmail: boolean;

  handleOtpVerification: (otp: string, email: string) => void;
  isLoadingOtp: boolean;

  handlePasswordChange: (newPassword: string, oldPassword: string) => void;
  isLoadingPassword: boolean;

  handleProfileUpdate: (data: ProfileSchemaType) => void;
  isLoadingProfile: boolean;

}

export const useEditProfileOperations = ({
  openModal,
  closeModal,
}: EditProfileParams):EditProfileOperations => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutateAsync: logoutUser } = useLogoutMutation();

  const { mutate: requestEmailChange, isPending: isLoadingEmail } =
    useChangeEmailRequestMutation();

  const { mutate: verifyEmailOtp, isPending: isLoadingOtp } =
    useChangeEmailMutation();

  const { mutate: changePassword, isPending: isLoadingPassword } =
    useChangePasswordMutation();

  const { mutate: updateProfile, isPending: isLoadingProfile } =
    useUpdateProfileMutation();
  


  const handleEmailChangeRequest = useCallback(
    (email: string) => {
      requestEmailChange(
        { email },
        {
          onSuccess: (res) => {
            setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
              email: res.data.email,
              otpExpiry: res.data.otpExpiresIn,
              serverTime: res.data.serverTime,
            });

            toast.success(res.message || "OTP sent to new email");
            openModal("otp");
          },

          onError: (err) => {
            toast.error(
              err.response?.data?.message || "Email change request failed"
            );
          },
        }
      );
    },
    [requestEmailChange, openModal]
  );

  const handleOtpVerification = useCallback(
    async (otp: string, email: string) => {
      verifyEmailOtp(
        { otp, email },
        {
          onSuccess: async (res) => {
            toast.success(
              `${res.message}\nPlease login again with your new email`
            );

            dispatch(clearUser());
            await logoutUser();

            navigate("/user/login", { replace: true });
            closeModal();
          },

          onError: (err) =>
            toast.error(
              err.response?.data?.message || "OTP verification failed"
            ),
        }
      );
    },
    [verifyEmailOtp, dispatch, logoutUser, navigate, closeModal]
  );

  const handlePasswordChange = useCallback(
    async (newPassword: string, oldPassword: string) => {
      changePassword(
        { newPassword, oldPassword },
        {
          onSuccess: async (res) => {
            toast.success(
              `${res.message} — Please login again with your new password`
            );

            dispatch(clearUser());
            closeModal();

            await logoutUser();
            navigate("/user/login", { replace: true });
          },

          onError: (err) =>
            toast.error(
              err.response?.data?.message || "Password change failed"
            ),
        }
      );
    },
    [changePassword, dispatch, logoutUser, navigate, closeModal]
  );

  const handleProfileUpdate = useCallback(
    (updatedData: ProfileSchemaType) => {
      updateProfile(updatedData, {
        onSuccess: (res) =>
          toast.success(res.message || "Profile updated successfully"),

        onError: (err) =>
          toast.error(err.response?.data?.message || "Profile update failed"),
      });
    },
    [updateProfile]
  );



  return {
    handleEmailChangeRequest,
    isLoadingEmail,
    handleOtpVerification,
    isLoadingOtp,
    handlePasswordChange,
    isLoadingPassword,
    handleProfileUpdate,
    isLoadingProfile,
  };
};
