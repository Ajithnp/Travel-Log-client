import type {
  AuthResponse,
  IResendOtpResponse,
  IChangeEmailResponse,
} from "@/features/auth/types/auth.response";
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
  IChangeEmailPayload,
  IUpdateEmailPayload,
} from "../types/auth.payload";
// import type { ApiResponse } from "@/types/axios";
import type { ApiResponse } from "@/types/IApiResponse";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import { API_ROUTE } from "@/lib/constants/routes";

export const login = async (payload: ILoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.LOGIN}`,
    payload
  );
  return response.data;
};

export const register = async (
  payload: IRegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.SIGNUP}`,
    payload
  );
  return response.data;
};

export const googleSign = async (
  payload: IGoogleSignPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.GOOGLE_CALLBACK}`,
    payload
  );

  return response.data;
};

export const emailVerify = async (
  payload: IEmailVerifyPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.VERIFY_EMAIL}`,
    payload
  );
  return response.data;
};

export const resetPassword = async (
  payload: IForgotPasswordPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.FORGOT_PASSWORD}`,
    payload
  );
  return response.data;
};

export const updatePassword = async (
  payload: IUpdatePasswordPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.CHANGE_PASSWORD}`,
    payload
  );
  return response.data;
};

export const changeEmail = async (payload: IChangeEmailPayload): Promise<IChangeEmailResponse> => {
  const response = await api.post<IChangeEmailResponse>(
    `${API_ENDPOINTS.AUTH}/me`,
    payload
  );
  return response.data;
};

export const updateEmail = async (payload: IUpdateEmailPayload): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(
    `${API_ENDPOINTS.USER}/me`,
    payload
  );
  return response.data;
};


export const verifyOtp = async (
  payload: IVerifyOtpPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.VERIFY_OTP}`,
    payload
  );
  return response.data;
};

export const resendOtp = async (
  payload: IResendOtpPayload
): Promise<IResendOtpResponse> => {
  const response = await api.post<IResendOtpResponse>(
    `${API_ENDPOINTS.AUTH}${API_ROUTE.RESEND_OTP}`,
    payload
  );
  return response.data;
};

// logout function
export const logout = async (): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(`${API_ENDPOINTS.AUTH}${API_ROUTE.LOGOUT}`);
  return response.data;
};
