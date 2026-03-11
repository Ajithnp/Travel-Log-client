import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { ScheduleFormValues } from "../validations/validation schemas";
import type { PaginatedScheduleResponse } from "../types/types";
import type { AxiosResponse } from "axios";


export const schedulePackage = async (
  packageId:string,
  payload: ScheduleFormValues,
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.SCHEDULE_PACKAGE}${packageId}`,
    payload,
  );
  return response.data;
};

export const getSchedules = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
  startDate?: string,  
  endDate?: string,
): Promise<ApiResponse<PaginatedScheduleResponse>> => {

  const response: AxiosResponse<ApiResponse<PaginatedScheduleResponse>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.SCHEDULES}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(selectedFilter ? {selectedFilter}: {}),...(startDate ? { startDate }: {}),...(endDate ? { endDate }: {}),},
    });

  return response.data;
};

// export const getPackages = async (
//   page: number,
//   limit: number,
//   search?: string,
//   selectedFilter?: string,
// ): Promise<ApiResponse<PaginatedData<IPackage>>> => {
//   const response: AxiosResponse<ApiResponse<PaginatedData<IPackage>>> =
//     await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES}`, {
//       params: {
//         page,
//         limit,
//         ...(search ? { search } : {}),
//         ...(selectedFilter ? { selectedFilter } : {}),
//       },
//     });
//   return response.data;
// };