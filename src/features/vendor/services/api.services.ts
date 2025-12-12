import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { VendorProfileResponse } from "../types/response.type";
import type { VendorVerificationPayload, UpdateProfilePayload } from "../types/payload.type";
import type { ApiResponse } from "@/types/IApiResponse";

export const verification = async (
  payload: VendorVerificationPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.VERIFICATION_FORM}`,
    payload
  );
  return response.data;
};

export const profile = async (): Promise<VendorProfileResponse> => {
  const response = await api.get<VendorProfileResponse>(
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
