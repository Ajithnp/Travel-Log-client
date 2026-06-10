import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import { getPackagesEarningOverview, type PackagesEarningsByVendor } from "../services/api.services";
import type { ApiError } from "@/types/axios";

export const usePackagesEarningOverviewQuery = (page:number, limit:number, search?:string) => {
  return useQuery<ApiResponse<Paginated<PackagesEarningsByVendor>>, ApiError>({
    queryKey: ["packages-earning-overview", page, limit, search],
    queryFn: () => getPackagesEarningOverview(page, limit, search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};