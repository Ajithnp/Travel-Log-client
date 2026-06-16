import { useQuery,keepPreviousData } from "@tanstack/react-query";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { ApiError } from "@/types/axios";
import type { PayoutStatus } from "@/lib/constants/constants";
import type { VendorPayoutsListResponseDto } from "../services/api.services";
import { payouts } from "../services/api.services";

export const useVendorPayoutsQuery = (page:number, limit:number, filter?:PayoutStatus, search?:string) => {
  return useQuery<ApiResponse<Paginated<VendorPayoutsListResponseDto>>, ApiError>({
    queryKey: ["vendor", "payouts", page, limit, filter, search],
    queryFn: () => payouts(page, limit, filter,search),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    
  });
};