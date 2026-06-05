import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError } from "@/types/axios";
import type { ApiResponse } from "@/types/IApiResponse";
import {
  createCoupon,
  deactivateCoupon,
  getCoupons,
  type PaginatedCouponResponse,
} from "../services/api.services";
import type { CouponQueryParams, CreateCouponPayload, CreateCouponResponse } from "../services/api.services";

const COUPONS_QUERY_KEY = "admin-coupons";

export const useCouponsQuery = (params: CouponQueryParams) => {
  return useQuery<ApiResponse<PaginatedCouponResponse>, ApiError>({
    queryKey: [COUPONS_QUERY_KEY, params],
    queryFn: () => getCoupons(params),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};


export const useCreateCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<CreateCouponResponse>, ApiError, CreateCouponPayload>({
    mutationFn: createCoupon,
    onSuccess: (res) => {
      toast.success(res.message ?? "Coupon created successfully");
      queryClient.invalidateQueries({ queryKey: [COUPONS_QUERY_KEY] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to create coupon");
      } else {
        toast.error("Failed to create coupon");
      }
    },
  });
};


export const useDeactivateCouponMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ message: string }>, ApiError, string>({
    mutationFn: deactivateCoupon,
    onSuccess: (res) => {
      toast.success(res.message ?? "Coupon deactivated");
      queryClient.invalidateQueries({ queryKey: [COUPONS_QUERY_KEY] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to deactivate coupon"
        );
      } else {
        toast.error("Failed to deactivate coupon");
      }
    },
  });
};
