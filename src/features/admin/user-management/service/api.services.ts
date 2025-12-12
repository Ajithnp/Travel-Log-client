import api from "@/config/api/axios";
import type { AxiosResponse } from "axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { IApiResponse } from "@/types/axios";
import type { IUser } from "@/types/IUser";
import type { UsersStatusPayload } from "../../types/payload.types";

export const getUsers = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<PaginatedData<IUser>>> => {
  const response: AxiosResponse<ApiResponse<PaginatedData<IUser>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.USERS}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(selectedFilter ? {selectedFilter}: {})},
    });
  return response.data;
};

export const updateUserAccess = async (
  payload: UsersStatusPayload
): Promise<IApiResponse> => {
  const { id, ...body } = payload;
  const response = await api.patch(
    `${API_ENDPOINTS.ADMIN}/users/${id}/status`, body
  );
  return response.data;
}
