import api from "@/config/api/axios";
import type { AxiosResponse } from "axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { IUser } from "@/types/IUser";
import type { UsersStatusPayload } from "../../types/payload.types";
import type { IApiResponse } from "@/types/axios";
import type { VendorStatus } from "@/features/vendor/types/response.type";

export const getVendors = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<PaginatedData<IUser>>> => {
  const response: AxiosResponse<ApiResponse<PaginatedData<IUser>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.VENDORS}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(selectedFilter ? {selectedFilter}: {})},
    });
  return response.data;
};

export const updateVendorAccess = async(
  payload: UsersStatusPayload
): Promise<IApiResponse> => {
  const { id, ...body } = payload;
  const response = await api.patch(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.UPDATE_USER_STATUS(id)}`, body
  );
  return response.data
}

export const getVendorProfile = async(
  vendorId:string
): Promise<ApiResponse<VendorProfileResponse>> => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.VENDORS}/${vendorId}`
  );
  return response.data
}

export const getVendorProfileStats = async(
  vendorId:string
): Promise<ApiResponse<VendorProfileStatsResponse>> => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.VENDORS}/${vendorId}/stats`
  );
  return response.data
}

export interface VendorProfileStatsResponse {
  totalPackages: number;
  totalScheduleCompleted: number;
  totalEarnings: number;
  averageRating: number;
};

export interface VendorProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  isBlocked:boolean;
  blockedReason:string|null;
  vendorInfo: {
    contactPersonName:string;
    businessAddress: string;
    bio:string;
    status:VendorStatus
    isProfileVerified: boolean;
    profileLogo:string;
    createdAt: string;
    updatedAt: string;
  };
  bankDetails: {
    accountNumber: string;
    ifsc: string;
    accountHolderName: string;
    bankName: string;
    branch: string;
  };
  createdAt: string;
  updatedAt: string;
}