import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { IApiResponse } from "@/types/axios";
import type {
  RequestCategoryPayload,
  VendorRequestedCategoryResponse,
} from "../types/types";

export const getRequestedCategories = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<PaginatedData<VendorRequestedCategoryResponse>>> => {
  const response: AxiosResponse<
    ApiResponse<PaginatedData<VendorRequestedCategoryResponse>>
  > = await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.CATEGORIES}/request`, {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(selectedFilter ? { selectedFilter } : {}),
    },
  });

  return response.data;
};

export const requestCategory = async (
  payload: RequestCategoryPayload,
): Promise<IApiResponse> => {
  const response = await api.post(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.CATEGORIES}`,
    payload,
  );
  return response.data;
};

export const getCategories = async (): Promise<ApiResponse<string[]>> => {
  const response = await api.get<ApiResponse<string[]>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.CATEGORIES}`,
  );

  return response.data;
};
