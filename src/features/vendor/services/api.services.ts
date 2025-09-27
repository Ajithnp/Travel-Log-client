import api from "@/config/api/axios";
import type { ApiResponse } from "@/types/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { VendorProfileResponse } from "../types/response.type";

export const verification = async (
  payload: FormData
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}/verification`,
    payload
  );
  return response.data;
};

export const profile = async (): Promise<VendorProfileResponse> => {
  const response = await api.get<VendorProfileResponse>(
    `${API_ENDPOINTS.VENDOR}/me`
  );
  return response.data;
};
