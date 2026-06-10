import type {  ApiResponse } from "@/types/IApiResponse";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { getCommissionOverviewByPackages, getCommissionOverviewByVendors, getCommissionOverviewStats, type CommissionOverviewStats, type PaginatedCommissionOverviewByPackages, type PaginatedCommissionOverviewByVendors } from "../services/api.services";
import type { ApiError } from "@/types/axios";


export const useCommissionOverviewByVendorsQuery = (page:number, limit:number, search?:string) => {
  return useQuery<ApiResponse<PaginatedCommissionOverviewByVendors>, ApiError>({
    queryKey: ["commission-overview-by-vendors", page, limit, search],
    queryFn: () => getCommissionOverviewByVendors(page, limit, search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};

export const useCommissionOverviewStatsQuery = () => {
  return useQuery<ApiResponse<CommissionOverviewStats>, ApiError>({
    queryKey: ["commission-overview-stats"],
    queryFn: () => getCommissionOverviewStats(),
    refetchOnWindowFocus: false,
    
  });
};

export const useCommissionOverviewByPackagesQuery = (page:number, limit:number, search?:string) => {
  return useQuery<ApiResponse<PaginatedCommissionOverviewByPackages>, ApiError>({
    queryKey: ["commission-overview-by-packages", page, limit, search],
    queryFn: () => getCommissionOverviewByPackages(page, limit, search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
    
  });
};