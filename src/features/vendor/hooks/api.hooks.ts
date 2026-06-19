
import { profile, verification, updateProfileLogo, initiateStripeOnboarding, type IStripeOnboardingStatusDTO, getStripeOnboardingStatus, dashboardSummary, dashboardRecentActivity, type VendorDashBoardStatsResponse, type RecentBookingActivityResponse, dashboardAnalytics, type DashboardAnalyticsResponse } from "../services/api.services";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IApiResponse, ApiError } from "@/types/axios";
import type { VendorVerificationPayload, UpdateProfilePayload } from "../types/payload.type";
import type { ApiResponse } from "@/types/IApiResponse";
import type { VendorProfileData } from "../types/response.type";
import { verificationReapply } from "../verification/services/api.services";
import type { PeriodKey } from "../components/dashboard-revenue-chart";


export interface ChartFilters {
  period: PeriodKey;
  customStart?: Date;
  customEnd?: Date;
}

export const useVerificationMutation = (isReapply: boolean, vendorId?: string) => {
  const queryClient = useQueryClient();

  return useMutation<IApiResponse, AxiosError<{ message: string }>, VendorVerificationPayload>({
    mutationFn: (payload) => {
      if (isReapply) {
        if (!vendorId) throw new Error("Vendor ID is required for re-apply");
        return verificationReapply(vendorId, payload);
      }
      return verification(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useVendorProfileQuery = () => {
  return useQuery<ApiResponse<VendorProfileData>, AxiosError<{ message: string }>>({
    queryKey: ["profile"],
    queryFn: profile,
    staleTime: 5 * 60 * 10,
    // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfileLogoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiError, UpdateProfilePayload>({
    mutationFn: updateProfileLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })
}

export const useStripeOnboardingMutation = () => {
  return useMutation<
    ApiResponse<{ onboardingUrl: string }>,
    AxiosError<{ message: string }>
  >({
    mutationFn: initiateStripeOnboarding,
    onSuccess: (data) => {
      window.location.href = data.data.onboardingUrl;
    },
  });
};

export const useStripeOnboardingStatusQuery = () => {
  return useQuery<
    ApiResponse<IStripeOnboardingStatusDTO>,
    AxiosError<{ message: string }>
  >({
    queryKey: ['stripe', 'onboarding', 'status'],
    queryFn: getStripeOnboardingStatus,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useVendorDashboardSummaryQuery = () => {
  return useQuery<ApiResponse<VendorDashBoardStatsResponse>, AxiosError<{ message: string }>>(
    {
      queryKey: ["vendor", "dashboard", "summary"],
      queryFn: dashboardSummary,
      // staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    }
  );
};

export const useVendorDashboardAnalyticsQuery = (filters: ChartFilters) => {
  const { period, customStart, customEnd } = filters;

  return useQuery<ApiResponse<DashboardAnalyticsResponse>, AxiosError<{ message: string }>>({

    queryKey: ['vendor', 'dashboard', 'analytics', period, customStart, customEnd],
    queryFn: () =>
      dashboardAnalytics({
        period,
        ...(period === 'custom' && customStart && customEnd
          ? { start: customStart.toISOString(), end: customEnd.toISOString() }
          : {}),
      }),
    enabled: period !== 'custom' || (!!customStart && !!customEnd), 
    refetchOnWindowFocus: false,
  });
};

export const useVendorDashboardRecentActivityQuery = () => {
  return useQuery<ApiResponse<RecentBookingActivityResponse>, AxiosError<{ message: string }>>(
    {
      queryKey: ["vendor", "dashboard", "recent-activity"],
      queryFn: dashboardRecentActivity,
      refetchOnWindowFocus: false,
    }
  );
};
