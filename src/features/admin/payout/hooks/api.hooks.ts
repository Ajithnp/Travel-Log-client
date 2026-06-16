import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { ApiError } from "@/types/axios";
import { getPayoutOverviewStats, getPayoutSchedules, getPayoutStats, payouts, releasePayout, retryPayout, schedulePayoutDetails } from "../services/api.services";
import type { FindAllPayoutsResponseDto, PayoutOverviewResponseDto, PayoutScheduleListResponseDto, PayoutStatsResponseDto, ReleasePayoutResponseDto, SchedulePayoutDetailsResponseDTO } from "../services/api.services";
import { toast } from "sonner";
import type { PayoutStatus } from "@/lib/constants/constants";

export const usePayoutSchedulesQuery = (page:number, limit:number, search?:string) => {
  return useQuery<ApiResponse<Paginated<PayoutScheduleListResponseDto>>, ApiError>({
    queryKey: ["payout-schedules", page, limit, search],
    queryFn: () => getPayoutSchedules(page, limit, search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};

export const usePayoutOverviewStatsQuery = () => {
  return useQuery<ApiResponse<PayoutOverviewResponseDto>, ApiError>({
    queryKey: ["payout-overview-stats"],
    queryFn: getPayoutOverviewStats,
    refetchOnWindowFocus: false,
  });
};

export const useSchedulePayoutDetailsQuery = (scheduleId: string) => {
  return useQuery<ApiResponse<SchedulePayoutDetailsResponseDTO>, ApiError>({
    queryKey: ["schedule-payout-details", scheduleId],
    queryFn: () => schedulePayoutDetails(scheduleId),
    refetchOnWindowFocus: false,
    enabled:!!scheduleId
  });
};

export const useReleasePayoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<ReleasePayoutResponseDto>, ApiError, string>({
    mutationFn: (scheduleId: string) => releasePayout(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts', 'history'] });
    },
    onError:(err: ApiError)=>{
      toast.error(err?.response?.data?.message || "Something went wrong")
    }
  });
};

export const useRetryPayoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<ReleasePayoutResponseDto>, ApiError, string>({
    mutationFn: (payoutId: string) => retryPayout(payoutId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts', 'pending'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'payouts', 'history']});
      queryClient.invalidateQueries({ queryKey: ['payout-schedules'] });
    },
    onError:(err: ApiError)=>{
      toast.error(err?.response?.data?.message || "Something went wrong")
    }
  });
};

export const usePayoutsQuery = (page:number, limit:number, filter?:PayoutStatus, search?:string) => {
  return useQuery<ApiResponse<Paginated<FindAllPayoutsResponseDto>>, ApiError>({
    queryKey: ["payout-schedules", page, limit, filter, search],
    queryFn: () => payouts(page, limit, filter,search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};

export const usePayoutStatsQuery = () => {
  return useQuery<ApiResponse<PayoutStatsResponseDto>, ApiError>({
    queryKey: ["payout-stats"],
    queryFn: getPayoutStats,
    refetchOnWindowFocus: false,
  });
};