import type { IApiResponse } from "@/types/axios";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getSchedules, schedulePackage } from "../services/api.services";
import type { ScheduleFormValues } from "../validations/validation schemas";
import type { ApiResponse } from "@/types/IApiResponse";
import type { PaginatedScheduleResponse } from "../types/types";

export const useSchedulePackageMutation = (packageId: string) => {
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    ScheduleFormValues
  >({
    mutationFn:(payload) => schedulePackage(packageId, payload),
  });
};

export const useScedulesFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
  startDate?: string,   
  endDate?:   string,
) => {
  return useQuery<
    ApiResponse<PaginatedScheduleResponse>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["category", { page, limit, search, selectedFilter, startDate, endDate }],
    queryFn: () => getSchedules(page, limit, search, selectedFilter, startDate, endDate),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

// export const usePackagesFetch = (
//   page: number,
//   limit: number,
//   search?: string,
//   selectedFilter?: string,
// ) => {
//   return useQuery<
//     ApiResponse<PaginatedData<IPackage>>,
//     AxiosError<{ message: string }>
//   >({
//     queryKey: ["packages", { page, limit, search, selectedFilter }],
//     queryFn: () => getPackages(page, limit, search, selectedFilter),
//     placeholderData: keepPreviousData,
//     refetchOnWindowFocus: false,
//   });
// };