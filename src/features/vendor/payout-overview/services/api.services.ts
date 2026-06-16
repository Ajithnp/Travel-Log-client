import api from "@/config/api/axios";
import type { PayoutStatus } from "@/lib/constants/constants";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export const payouts = async (
  page: number,
  limit: number,
  filter?:PayoutStatus,
  search?: string,
): Promise<ApiResponse<Paginated<VendorPayoutsListResponseDto>>> => {
  const response: AxiosResponse<ApiResponse<Paginated<VendorPayoutsListResponseDto>>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PAYOUTS}`, {
      params: {page, limit, filter, ...(search ? {search}: {})},
    });
  return response.data;
};

export interface VendorPayoutsListResponseDto {
    payoutId:string;
    scheduleId:string;  
    scheduleStartDate:string;
    scheduleEndDate:string;
    packageTittle:string;
    grossAmount:number;
    commissionAmount:number;
    netAmount:number;
    status:PayoutStatus;
    scheduledAt:Date;
};