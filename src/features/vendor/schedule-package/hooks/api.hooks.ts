import type { IApiResponse } from "@/types/axios";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getSchedules, scheduleDetails, schedulePackage, updateScheduleStatus, type ScheduleStatusResponseDTO } from "../services/api.services";
import type { ScheduleFormValues } from "../validations/validation schemas";
import type { ApiResponse } from "@/types/IApiResponse";
import type { PaginatedScheduleResponse, ScheduleResponse, ScheduleStatusType } from "../types/types";
import { toast } from "sonner";


export const scheduleKeys = {
  detail: (scheduleId: string) => ["schedule", { scheduleId }] as const,
}

export const useSchedulePackageMutation = (packageId: string) => {
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    ScheduleFormValues
  >({
    mutationFn: (payload) => schedulePackage(packageId, payload),
  });
};

export const useScedulesFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
  startDate?: string,
  endDate?: string,
) => {
  return useQuery<
    ApiResponse<PaginatedScheduleResponse>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["schedules", { page, limit, search, selectedFilter, startDate, endDate }],
    queryFn: () => getSchedules(page, limit, search, selectedFilter, startDate, endDate),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const useSheduleFetch = (sheduleId: string, options?: { enabled?: boolean }) => {
  return useQuery<
    ApiResponse<ScheduleResponse>,
    AxiosError<{ message: string }>
  >({
    queryKey: scheduleKeys.detail(sheduleId),
    queryFn: () => scheduleDetails(sheduleId),
    enabled: options?.enabled,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateScheduleStatusMutation = (scheduleId: string) => {
  const queryClient = useQueryClient();
  const queryKey = scheduleKeys.detail(scheduleId);
  return useMutation<
    ApiResponse<ScheduleStatusResponseDTO>,
    AxiosError<{ message: string }>,
    ScheduleStatusType,
    { previousData: ApiResponse<ScheduleResponse> | undefined }
  >({
    mutationFn: (status) => updateScheduleStatus(scheduleId, status),

    onSuccess: (responseData) => {
      queryClient.setQueryData<ApiResponse<ScheduleResponse>>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: { ...old.data, status: responseData.data.status },
        };
      });
      toast.success(responseData.message);
    },
    onError: (err, _newStatus, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      toast.error(err.response?.data?.message || "Failed to update schedule status");
    },
  });
};