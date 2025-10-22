import type { AuthResponse } from "../types/auth.response";
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
} from "../services/authService";
import type {
  IRegisterPayload,
  ILoginPayload,
  IEmailVerifyPayload,
  IForgotPasswordPayload,
  IGoogleSignPayload,
  IResendOtpPayload,
  IUpdatePasswordPayload,
  IVerifyOtpPayload,
} from "../types/auth.payload";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { ApiResponse } from "@/types/axios";

export const useLoginMutation = () => {
  return useMutation<
    AuthResponse,
    AxiosError<{ message: string }>,
    ILoginPayload
  >({
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

export const useResendOtpMutation = () => {
  return useMutation<
    ApiResponse,
    AxiosError<{ message: string }>,
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
  return useMutation<ApiResponse, AxiosError<{ message: string }>>({
    mutationFn: logout,
  });
};
