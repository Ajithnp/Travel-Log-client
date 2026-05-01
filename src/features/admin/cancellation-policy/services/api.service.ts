import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse} from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { Policy } from "../types";



export const createPolicy = async (
  payload: Omit<Policy, "id" | "createdAt" | "updatedAt" | "isActive">,
): Promise<ApiResponse<Policy>> => {

  const response: AxiosResponse<ApiResponse<Policy>> =
    await api.post(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CANCELLATION_POLICY}`, payload);
  return response.data;
};

export const getPolicies = async (includeInactive: boolean): Promise<ApiResponse<Policy[]>> => {

  const response: AxiosResponse<ApiResponse<Policy[]>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CANCELLATION_POLICY}?includeInactive=${includeInactive}`);
  return response.data;
};

export const togglePolicyActive = async (
payload: {isActive: boolean; id: string}
): Promise<ApiResponse<Policy>> => {

  const response: AxiosResponse<ApiResponse<Policy>> =
    await api.patch(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CANCELLATION_POLICY}/${payload.id}`, { isActive: payload.isActive });
  return response.data;
};
