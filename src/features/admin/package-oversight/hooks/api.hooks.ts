import type { ApiError } from "@/types/axios";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { VendorsPackagesResponse } from "../services/api.services";
import { getVendorsPackages } from "../services/api.services";

export const useVendorsPackagesQuery = (page:number, limit:number, search?:string, filter?:string) => {
  return useQuery<ApiResponse<PaginatedData<VendorsPackagesResponse>>, ApiError>({
    queryKey: ["vendors-packages", page, limit, search, filter],
    queryFn: () => getVendorsPackages(page, limit, search, filter),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};

// export const useScheduleBookingSummaryQuery = (scheduleId:string) => {
//   return useQuery<ApiResponse<>, ApiError>({
//     queryKey: ["schedule-booking-summary", scheduleId],
//     queryFn: () => getScheduleBookingSummaryApi(scheduleId),
//     refetchOnWindowFocus: false,
//     enabled:!!scheduleId,
    
//   });
// };