import type { AuthResponse } from "@/features/auth/types/auth.response";
import api from "@/config/api/axios";
import type {
  ILoginPayload,
  IRegisterPayload,
  IGoogleSignPayload,
  IEmailVerifyPayload,
  IForgotPasswordPayload,
  IUpdatePasswordPayload,
  IVerifyOtpPayload,
  IResendOtpPayload,
} from "../types/auth.payload";
import type { ApiResponse } from "@/types/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";

export const login = async (payload: ILoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}/login`,
    payload
  );
  return response.data;
};

export const register = async (
  payload: IRegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}/signup`,
    payload
  );
  return response.data;
};

export const googleSign = async (
  payload: IGoogleSignPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}/google/callback`,
    payload
  );

  return response.data;
};

export const emailVerify = async (
  payload: IEmailVerifyPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}/verify-email`,
    payload
  );
  return response.data;
};

export const resetPassword = async (
  payload: IForgotPasswordPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}/forgot-password`,
    payload
  );
  return response.data;
};

export const updatePassword = async (
  payload: IUpdatePasswordPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.AUTH}/change-password`,
    payload
  );
  return response.data;
};

export const verifyOtp = async (
  payload: IVerifyOtpPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.AUTH}/otp-verify`,
    payload
  );
  return response.data;
};

export const resendOtp = async (
  payload: IResendOtpPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.AUTH}/resend-otp`,
    payload
  );
  return response.data;
};

// logout function
export const logout = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(`${API_ENDPOINTS.AUTH}/logout`);
  return response.data;
};
