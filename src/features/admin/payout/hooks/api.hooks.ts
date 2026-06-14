import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { ApiError } from "@/types/axios";
import { getPayoutOverviewStats, getPayoutSchedules, releasePayout } from "../services/api.services";
import type { PayoutOverviewResponseDto, PayoutScheduleListResponseDto, ReleasePayoutResponseDto } from "../services/api.services";
import { toast } from "sonner";

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

