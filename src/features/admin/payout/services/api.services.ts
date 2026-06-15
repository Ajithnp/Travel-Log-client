import api from "@/config/api/axios";
import type { PayoutStatus } from "@/lib/constants/constants";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export const getPayoutSchedules = async (
  page: number,
  limit: number,
  search?: string,
): Promise<ApiResponse<Paginated<PayoutScheduleListResponseDto>>> => {
  const response: AxiosResponse<ApiResponse<Paginated<PayoutScheduleListResponseDto>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.PAYOUT_SCHEDULES}`, {
      params: {page, limit, ...(search ? {search}: {})},
    });
  return response.data;
};

export const getPayoutOverviewStats = async(): Promise<ApiResponse<PayoutOverviewResponseDto>> => {
  const response: AxiosResponse<ApiResponse<PayoutOverviewResponseDto>> = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.PAYOUT_OVERVIEW}`
  );
  return response.data
}

export const releasePayout = async (scheduleId: string): Promise<ApiResponse<ReleasePayoutResponseDto>> => {
  const res = await api.post(`${API_ENDPOINTS.ADMIN}${API_ROUTE.PAYOUT_RELEASE(scheduleId)}`);
  return res.data;
};

export const payouts = async (
  page: number,
  limit: number,
  filter?:PayoutStatus,
  search?: string,
): Promise<ApiResponse<Paginated<FindAllPayoutsResponseDto>>> => {
  const response: AxiosResponse<ApiResponse<Paginated<FindAllPayoutsResponseDto>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.PAYOUTS}`, {
      params: {page, limit, filter, ...(search ? {search}: {})},
    });
  return response.data;
};

export const getPayoutStats = async(): Promise<ApiResponse<PayoutStatsResponseDto>> => {
  const response: AxiosResponse<ApiResponse<PayoutStatsResponseDto>> = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.PAYOUT_STATS}`
  );
  return response.data
}




export interface PayoutScheduleListResponseDto {
    id:string;
    vendorId:string;
    vendorname:string;    
    scheduleId:string;
    scheduleStartDate:string;
    scheduleEndDate:string;
    packageTittle:string;
    grossAmount:number;
    commissionAmount:number;
    netAmount:number;
    status:string;
    scheduledAt:string;
    payoutsEnabled:boolean;
    transactionConnectId:string;
    readyToPayout:boolean;
}

export interface PayoutOverviewResponseDto {
    completedCount:number;
    failedCount:number;
    processingCount:number;
};

export interface ReleasePayoutResponseDto {
    payoutId: string;
    netAmount: number;
    transferId: string;
    bookingCount: number;
}

export interface FindAllPayoutsResponseDto {
    id:string;
    vendorname:string;    
    scheduleStartDate:string;
    scheduleEndDate:string;
    packageTittle:string;
    grossAmount:number;
    commissionAmount:number;
    netAmount:number;
    status:PayoutStatus;
    scheduledAt:Date;
};

export interface PayoutStatsResponseDto {
    totalPayouts:number;
    totalReleased:number;
    totalFailed:number;
    totalRevanue:number;
    commissionEarned:number;
    netAmount:number;
}