import api from "@/config/api/axios";
import type { TravelerDTO } from "@/features/user/booking/types";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export const getScheduleBookingsApi = async (
  page: number,
  limit: number,
  scheduleId: string,
  search?: string,
  filter?: string,
): Promise<ApiResponse<PaginatedData<ScheduleBookingDetailDTO>>> => {
   const response: AxiosResponse<ApiResponse<PaginatedData<ScheduleBookingDetailDTO>>> =
    await api.get(`${API_ENDPOINTS.VENDOR}/schedules/${scheduleId}/bookings`, {
      params: { page, limit, ...(search ? {search} : {}), ...(filter ? {filter}: {})},
    });
  return response.data ;
};


export const getScheduleBookingSummaryApi = async (
 scheduleId: string
): Promise<ApiResponse<VendorScheduleBookingSummaryDTO>> => {
   const response: AxiosResponse<ApiResponse<VendorScheduleBookingSummaryDTO>> =
    await api.get(`${API_ENDPOINTS.VENDOR}/schedules/${scheduleId}/booking-summary`);
  return response.data ;
};

export const getScheduleBookingDetailsApi = async (
 scheduleId: string,
 bookingId:string
): Promise<ApiResponse<ScheduleBookingSingleDetailDTO>> => {
   const response: AxiosResponse<ApiResponse<ScheduleBookingSingleDetailDTO>> =
    await api.get(`${API_ENDPOINTS.VENDOR}/schedules/${scheduleId}/bookings/${bookingId}`);
  return response.data ;
};



export interface ScheduleBookingDetailDTO {
  id: string;
  username: string;
  bookingCode: string;
  groupType: string;
  travallersCount:number;
  finalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  bookedOn:string;
}

export interface VendorScheduleBookingSummaryDTO {
  scheduleId:string;
  packageTitle: string;
  packageLocation: string;
  packageState: string;
  basePrice: string;
  startDate: string;
  endDate: string;
  reportingTime: string;
  reportingLocation: string;
  totalSeats: number;
  // seatsBooked: number;
  scheduleStatus: string;
  totalConfirmedBookings: number;
  totalCancelledBookings: number;
  totalConfirmedAmount: number;
  totalCancelledAmount: number;
  totalVendorEarning: number;
  totalPlatformCommission: number;
}

export interface ScheduleBookingSingleDetailDTO {
  id: string;
  username: string;
  bookingCode: string;
  groupType: string;
  paymentMethod: string | null;
  bookedOn: string;
  finalAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  travelers: TravelerDTO[];
}