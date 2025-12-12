import {
  type IChangeEmailResponse,
  type AuthResponse,
  type IResendOtpResponse,
} from "../types/auth.response";
import {
  login,
  register,
  emailVerify,
  resetPassword,
  updatePassword,
  resendOtp,
  verifyOtp,
  logout,
  googleSign,
  changeEmail,
  updateEmail,
} from "../services/authService";
import {
  type IRegisterPayload,
  type ILoginPayload,
  type IEmailVerifyPayload,
  type IForgotPasswordPayload,
  type IGoogleSignPayload,
  type IResendOtpPayload,
  type IUpdatePasswordPayload,
  type IVerifyOtpPayload,
  type IChangeEmailPayload,
  type IUpdateEmailPayload,
} from "../types/auth.payload";
import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import { AxiosError } from "axios";
// import type { ApiResponse } from "@/types/axios";
import type { ApiResponse } from "@/types/IApiResponse";

export const useLoginMutation = () => {
  return useMutation<AuthResponse, AxiosError<ApiResponse>, ILoginPayload>({
    mutationFn: login,
  });
};

export const useRegisterMutation = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    IRegisterPayload
  >({
    mutationFn: register,
  });
};

export const useGoogleSignMutation = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    IGoogleSignPayload
  >({
    mutationFn: googleSign,
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    IEmailVerifyPayload
  >({
    mutationFn: emailVerify,
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    IForgotPasswordPayload
  >({
    mutationFn: resetPassword,
  });
};

export const useUpdatePasswordMutation = () => {
  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    IUpdatePasswordPayload
  >({
    mutationFn: updatePassword,
  });
};

export const useChangeEmailMutation = () => {
  return useMutation<
    IChangeEmailResponse,
    AxiosError<ApiResponse>,
    IChangeEmailPayload
  >({
    mutationFn: changeEmail,
  });
};

export const useUpdateEmailMutation = () => {
  return useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    IUpdateEmailPayload>(
    {
      mutationFn: updateEmail,
    }
  );
};

export const useResendOtpMutation = () => {
  return useMutation<
    IResendOtpResponse,
    AxiosError<ApiResponse>,
    IResendOtpPayload
  >({
    mutationFn: resendOtp,
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
    IVerifyOtpPayload
  >({
    mutationFn: verifyOtp,
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, AxiosError<{ message: string }>>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(); // clear all cached queries
    },
  });
};
