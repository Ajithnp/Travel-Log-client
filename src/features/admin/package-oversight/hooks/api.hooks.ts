import type { ApiError } from "@/types/axios";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PackageDetailsResult, PackageScheduleResponse, SchedulesResponse, ScheduleStatsResponseDTO, VendorsPackagesResponse } from "../services/api.services";
import { getVendorPackageSchedules, getVendorPackageSchedulesStats, getVendorsPackages, getVendorsPackagesById, getVendorsPackageSchedules } from "../services/api.services";

export const useVendorsPackagesQuery = (page:number, limit:number, search?:string, filter?:string) => {
  return useQuery<ApiResponse<PaginatedData<VendorsPackagesResponse>>, ApiError>({
    queryKey: ["vendors-packages", page, limit, search, filter],
    queryFn: () => getVendorsPackages(page, limit, search, filter),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};

export const useVendorsPackagesByIdQuery = (packageId:string) => {
  return useQuery<ApiResponse<PackageDetailsResult>, ApiError>({
    queryKey: ["vendors-packages-by-id", packageId],
    queryFn: () => getVendorsPackagesById(packageId),
    refetchOnWindowFocus: false,
    enabled:!!packageId,
  });
};

export const useVendorPackageSchedulesQuery = (packageId:string,page:number, limit:number, filter?:string) => {
  return useQuery<ApiResponse<PackageScheduleResponse>, ApiError>({
    queryKey: ["vendor-package-schedules", packageId,page,limit,filter],
    queryFn: () => getVendorPackageSchedules(packageId,page,limit,filter),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled:!!packageId,
  });
};

export const useVendorPackageSchedulesStatsQuery = () => {
  return useQuery<ApiResponse<ScheduleStatsResponseDTO>, ApiError>({
    queryKey: ["vendor-package-schedules-stats"],
    queryFn: () => getVendorPackageSchedulesStats(),
    refetchOnWindowFocus: false,
  });
};

export const useVendorsPackageSchedulesQuery = (page:number, limit:number, search?:string, filter?:string) => {
  return useQuery<ApiResponse<SchedulesResponse>, ApiError>({
    queryKey: ["vendors-package-schedules", page,limit,search,filter],
    queryFn: () => getVendorsPackageSchedules(page,limit,search,filter),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};