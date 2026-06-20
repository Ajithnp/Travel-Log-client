import type { ChartFilters } from "@/features/vendor/hooks/api.hooks";
import type { ApiResponse } from "@/types/IApiResponse";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { dashboardActionRequired, dashboardRevanueTrend, dashboardSummaryStats, dashboardTopperformers, type AdminDashboardStatsResponse, type DashboardActionsRequiredResponse, type DashboardTopPerformersResponse, type PlatformRevanueTrendResponse } from "../services/api.service";

export const useAdminDashboardSummaryQuery = () => {
  return useQuery<ApiResponse<AdminDashboardStatsResponse>, AxiosError<{ message: string }>>(
    {
      queryKey: ["admin", "dashboard", "summary"],
      queryFn: dashboardSummaryStats,
      // staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );
};

export const useAdminDashboardRevanueTrendQuery = (filters: ChartFilters) => {
  const { period, customStart, customEnd } = filters;

  return useQuery<ApiResponse<PlatformRevanueTrendResponse>, AxiosError<{ message: string }>>({

    queryKey: ['admin', 'dashboard', 'analytics', period, customStart, customEnd],
    queryFn: () =>
      dashboardRevanueTrend({
        period,
        ...(period === 'custom' && customStart && customEnd
          ? { start: customStart.toISOString(), end: customEnd.toISOString() }
          : {}),
      }),
    enabled: period !== 'custom' || (!!customStart && !!customEnd), 
    refetchOnWindowFocus: false,
  });
};

export const useAdminDashboardTopPerformersQuery = () => {
  return useQuery<ApiResponse<DashboardTopPerformersResponse>, AxiosError<{ message: string }>>(
    {
      queryKey: ["admin", "dashboard", "top-performers"],
      queryFn: dashboardTopperformers,
      refetchOnWindowFocus: false,
    }
  );
};

export const useAdminDashboardActionsRequiredQuery = () => {
  return useQuery<ApiResponse<DashboardActionsRequiredResponse>, AxiosError<{ message: string }>>(
    {
      queryKey: ["admin", "dashboard", "actions-required"],
      queryFn: dashboardActionRequired,
      refetchOnWindowFocus: false,
    }
  );
};