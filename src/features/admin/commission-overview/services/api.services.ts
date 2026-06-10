import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export const getCommissionOverviewByVendors = async (
  page: number,
  limit: number,
  search?: string,
): Promise<ApiResponse<PaginatedCommissionOverviewByVendors>> => {
  const response: AxiosResponse<ApiResponse<PaginatedCommissionOverviewByVendors>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.COMMISSION_OVERVIEW_BY_VENDORS}`, {
      params: {page, limit, ...(search ? {search}: {})},
    });
  return response.data;
};

export const getCommissionOverviewStats = async(): Promise<ApiResponse<CommissionOverviewStats>> => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.COMMISSION_OVERVIEW_STATS}`
  );
  return response.data
}

export const getCommissionOverviewByPackages = async (
  page: number,
  limit: number,
  search?: string,
): Promise<ApiResponse<PaginatedCommissionOverviewByPackages>> => {
  const response: AxiosResponse<ApiResponse<PaginatedCommissionOverviewByPackages>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.COMMISSION_OVERVIEW_BY_PACKAGES}`, {
      params: {page, limit, ...(search ? {search}: {})},
    });
  return response.data;
};


export interface CommissionOverviewStats{
    totalGrossAmount: number;
    totalPlatformCommission: number;
    totalVendorEarnings: number;
};


export interface CommissionOverviewByVendors{
    _id:string;
    vendorName:string;
    totalPackages:number;
    totalCompletedSchedules:number;
    totalBookings:number;
    totalGrossAmount:number;
    totalPlatformCommission:number;
    totalVendorEarnings:number;
};

export interface PaginatedCommissionOverviewByVendors{
    data:CommissionOverviewByVendors[];
    page:number;
    limit:number;
    totalPages:number;
    totalDocs:number;
    totalBookings:number;
    totalScedules:number;
};

export interface CommissionOverviewByPackages{
   _id:string;
    vendorName:string;
    packageName:string;
    totalScedule:number;
    totalBookings:number;
    totalGrossAmount:number;
    totalPlatformCommission:number;
    totalVendorEarnings:number;
};

export interface PaginatedCommissionOverviewByPackages{
    data:CommissionOverviewByPackages[];
    page:number;
    limit:number;
    totalPages:number;
    totalDocs:number;
    totalBookings:number;
    totalScedules:number;
    totalPackages:number;
    totalVendorEarnings:number;
    totalPlatformCommission:number;
    totalGrossAmount:number;
};