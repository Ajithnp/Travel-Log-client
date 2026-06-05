import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

const COUPONS_BASE = `${API_ENDPOINTS.ADMIN}/coupons`;

export const createCoupon = async (
  payload: CreateCouponPayload
): Promise<ApiResponse<CreateCouponResponse>> => {
  const response: AxiosResponse<ApiResponse<CreateCouponResponse>> = await api.post(
    COUPONS_BASE,
    payload
  );
  return response.data;
};

export const getCoupons = async (
  params: CouponQueryParams
): Promise<ApiResponse<PaginatedCouponResponse>> => {
  const response: AxiosResponse<ApiResponse<PaginatedCouponResponse>> =
    await api.get(COUPONS_BASE, {
      params: {
        page: params.page,
        limit: params.limit,
        ...(params.search ? { search: params.search } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
    });
  return response.data;
};

export const deactivateCoupon = async (
  couponId: string
): Promise<ApiResponse<{ message: string }>> => {
  const response: AxiosResponse<ApiResponse<{ message: string }>> =
    await api.patch(`${COUPONS_BASE}/${couponId}/deactivate`);
  return response.data;
};

export interface CreateCouponPayload {
 title :string;
 rewardValue:number;
 probability:number;
}

export type  CreateCouponResponse = CreateCouponPayload;

export interface CouponQueryParams {
  page: number;
  limit: number;
  search?: string;
  isActive?: boolean;
}

export interface ICouponTemplateResponse { 
  id: string;
  title: string;
  rewardValue: number;
  probability: number;
  isActive: boolean;
}

export interface PaginatedCouponResponse {
  data: ICouponTemplateResponse[];
  totalDocs: number;
  currentPage: number;
  totalPages: number;
  activeCount:number;
  inActiveCount:number;
}