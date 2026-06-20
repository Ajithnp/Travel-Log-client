import api from "@/config/api/axios";
import type { Granularity } from "@/features/vendor/components/dashboard-revenue-chart";
import type { ChartQueryParams } from "@/features/vendor/services/api.services";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";

export const dashboardSummaryStats = async (): Promise<ApiResponse<AdminDashboardStatsResponse>> => {
  const response = await api.get<ApiResponse<AdminDashboardStatsResponse>>(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.DASHBOARD_SUMMARY_STATS}`
  );
  return response.data;
};

export const dashboardRevanueTrend = async (params: ChartQueryParams): Promise<ApiResponse<PlatformRevanueTrendResponse>> => {
  const response = await api.get<ApiResponse<PlatformRevanueTrendResponse>>(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.DASHBOARD_REVENUE_TREND}`,{
      params
    }
  );
  return response.data;
};

export const dashboardTopperformers = async (): Promise<ApiResponse<DashboardTopPerformersResponse>> => {
  const response = await api.get<ApiResponse<DashboardTopPerformersResponse>>(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.DASHBOARD_TOP_PERFORMERS}`
  );
  return response.data;
};

export const dashboardActionRequired = async (): Promise<ApiResponse<DashboardActionsRequiredResponse>> => {
  const response = await api.get<ApiResponse<DashboardActionsRequiredResponse>>(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.DASHBOARD_ACTIONS_REQUIRED}`
  );
  return response.data;
};

export interface AdminDashboardStatsResponse {
    totalUsers:number;
    totalVendors:number;
    totalBookings:number;
    totalRevenue:number;
    totalVendorEarnings:number;
    activePackages:number;
    activeSchedules:number;
    totalScheduleCompleted:number;
};

export interface TopPerformingVendorsResult {
  vendorId:string;  
  vendorName:string;
  totalRevenue:number;
};

export interface TopPerfomingPackagesResult {
  packageId:string;  
  packageTitle: string;
  revanueGenerate:number;
  totalScheduleCompleted:number;
}


export interface DashboardTopPerformersResponse {
    top5Vendors:TopPerformingVendorsResult[],
    top5Packages:TopPerfomingPackagesResult[]
}

export interface DashboardActionsRequiredResponse {
    pendingVendorVerifications:number,
    pendingCancellationRequests:number,
    pendingPayouts:number,
    failedPayouts:number,
    
}

export interface TrendChartDataPoint {
  date: string;
  totalRevanue: number;
  totalCommission:number;
  totalVendorEarnings:number;
}

export interface PlatformRevanueTrendResponse {
    granularity: Granularity;
    trend:TrendChartDataPoint[]
}