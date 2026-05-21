import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { BookingDetailDTO, IPaginatedBookingResponse } from "../types";
import type { AxiosResponse } from "axios";


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


export const getBookingDetailsApi = async (
 bookingId: string
): Promise<ApiResponse<BookingDetailDTO>> => {
   const response: AxiosResponse<ApiResponse<BookingDetailDTO>> =
    await api.get(`${API_ENDPOINTS.BOOKING}/${bookingId}`);
  return response.data ;
};

export const cancelBookingRequestApi = async (
  payload:CancelBookingRequestInput
): Promise<ApiResponse<void>> => {
   const response: AxiosResponse<ApiResponse<void>> =
    await api.patch(`${API_ENDPOINTS.BOOKING}/${payload.bookingId}/cancel`,{reason:payload.reason,details:payload.details});
  return response.data ;
};

export interface CancelBookingRequestInput {
  bookingId: string;
  reason: string;
  details: string;
}
