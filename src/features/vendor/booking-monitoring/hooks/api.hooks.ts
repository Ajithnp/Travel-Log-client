import type { ApiError } from "@/types/axios";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { downloadScheduleBookingsCSV, getScheduleBookingDetailsApi, getScheduleBookingsApi, getScheduleBookingSummaryApi, type ScheduleBookingDetailDTO, type ScheduleBookingSingleDetailDTO, type VendorScheduleBookingSummaryDTO } from "../services/api.services";
import { toast } from "sonner";
import { isAxiosError } from "axios";


export const useScheduleBookingsQuery = (page:number, limit:number, scheduleId:string, search?:string, filter?:string) => {
  return useQuery<ApiResponse<PaginatedData<ScheduleBookingDetailDTO>>, ApiError>({
    queryKey: ["schedule-bookings", scheduleId, page, limit, search, filter],
    queryFn: () => getScheduleBookingsApi(page, limit, scheduleId, search, filter),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled:!!scheduleId,
    
  });
};

export const useScheduleBookingSummaryQuery = (scheduleId:string) => {
  return useQuery<ApiResponse<VendorScheduleBookingSummaryDTO>, ApiError>({
    queryKey: ["schedule-booking-summary", scheduleId],
    queryFn: () => getScheduleBookingSummaryApi(scheduleId),
    refetchOnWindowFocus: false,
    enabled:!!scheduleId,
    
  });
};

export const useScheduleBookingDetailsQuery = (scheduleId:string, bookingId:string) => {
  return useQuery<ApiResponse<ScheduleBookingSingleDetailDTO>, ApiError>({
    queryKey: ["schedule-booking-details", scheduleId, bookingId],
    queryFn: () => getScheduleBookingDetailsApi(scheduleId, bookingId),
    refetchOnWindowFocus: false,
    enabled:!!scheduleId && !!bookingId,
    
  });
};

export const useDownloadScheduleCSV = () => {
  return useMutation({
    mutationFn: (scheduleId: string) => downloadScheduleBookingsCSV(scheduleId),
    onSuccess: () => {
      toast.success('CSV exported successfully');
    },
    onError: async (error: unknown) => {
      if (isAxiosError(error) && error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        const json = JSON.parse(text);
        toast.error(json.message ?? 'Failed to export CSV');
      } else {
        toast.error('Failed to export CSV');
      }
    },
  });
};
