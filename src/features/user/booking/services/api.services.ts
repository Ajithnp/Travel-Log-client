import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { IPaginatedBookingResponse } from "../types";
import type { AxiosResponse } from "axios";

// export const toggleWishlistApi = async (
//   packageId: string,
// ): Promise<IWishlistToggleResponse> => {
//   const { data } = await api.post<ApiResponse<IWishlistToggleResponse>>(
//     `${API_ENDPOINTS.USER}${API_ROUTE.WISHLIST}/${packageId}`,
//   );
//   return data.data;
// };

export const getBookingsApi = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<IPaginatedBookingResponse>> => {
   const response: AxiosResponse<ApiResponse<IPaginatedBookingResponse>> =
    await api.get(`${API_ENDPOINTS.BOOKING}/`, {
      params: { page, limit, ...(search ? {search} : {}), ...(selectedFilter ? {selectedFilter}: {})},
    });
  return response.data ;
};
