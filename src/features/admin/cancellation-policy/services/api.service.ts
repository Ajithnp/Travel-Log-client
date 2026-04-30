import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse} from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { Policy } from "../types";


export const createPolicy = async (
payload: Omit<Policy, "id" | "createdAt" | "updatedAt" | "isActive">
): Promise<ApiResponse<Policy>> => {

  const response: AxiosResponse<ApiResponse<Policy>> =
    await api.post(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CANCELLATION_POLICY}`, payload);
  return response.data;
};



// export const toggleCategory = async (
//   payload: CategoryTogglePayload
// ): Promise<IApiResponse> => {
//   const { id, ...body } = payload;
//   const response = await api.patch(
//     `${API_ENDPOINTS.ADMIN}${API_ROUTE.CATEGORY}/${id}/toggle`, body
//   );
//   return response.data;
// }