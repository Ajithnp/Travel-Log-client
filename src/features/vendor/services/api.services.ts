import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";

import type { VendorVerificationPayload, UpdateProfilePayload } from "../types/payload.type";
import type { ApiResponse } from "@/types/IApiResponse";
import type { VendorProfileData } from "../types/response.type";
import type { AxiosResponse } from "axios";

export const verification = async (
  payload: VendorVerificationPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.VERIFICATION_FORM}`,
    payload
  );
  return response.data;
};

export const profile = async (): Promise<ApiResponse<VendorProfileData>> => {
  const response = await api.get<ApiResponse<VendorProfileData>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PROFILE}`
  );
  return response.data;
};

export const updateProfileLogo = async (payload:UpdateProfilePayload): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.UPDATE_PROFILE_LOGO}`,
    payload
  );
  return response.data;
};

export const initiateStripeOnboarding = async (): Promise<ApiResponse<{ onboardingUrl: string }>> => {
  const response: AxiosResponse<ApiResponse<{ onboardingUrl: string }>> =
    await api.post(`${API_ENDPOINTS.STRIPE}/onboard`);
  return response.data;
};

export const getStripeOnboardingStatus = async (): Promise<ApiResponse<IStripeOnboardingStatusDTO>> => {
  const response: AxiosResponse<ApiResponse<IStripeOnboardingStatusDTO>> =
    await api.get(`${API_ENDPOINTS.STRIPE}/onboard/status`);
  return response.data;
};

export interface IStripeOnboardingStatusDTO {
  hasStripeAccount: boolean;
  onboardingComplete: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}