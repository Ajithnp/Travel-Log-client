import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { PaginatedCategoryResponse } from "../types/response.dtos";
import type { AxiosResponse } from "axios";
import type { CategoryTogglePayload } from "../../types/payload.types";
import type { IApiResponse } from "@/types/axios";
import type { CategoryForm } from "../validations";

export const getCategories = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<PaginatedCategoryResponse>> => {

  const response: AxiosResponse<ApiResponse<PaginatedCategoryResponse>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CATEGORY}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(selectedFilter ? {selectedFilter}: {})},
    });

  return response.data;
};

export const toggleCategory = async (
  payload: CategoryTogglePayload
): Promise<IApiResponse> => {
  const { id, ...body } = payload;
  const response = await api.patch(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.CATEGORY}/${id}/toggle`, body
  );
  return response.data;
}

export const createCategory = async (
  payload: CategoryForm
): Promise<IApiResponse> => {
  const response = await api.post(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.CATEGORY}`, payload
  );
  return response.data;
}
