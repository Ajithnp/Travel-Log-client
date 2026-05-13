import { useQuery, keepPreviousData } from "@tanstack/react-query";

import type { ApiResponse } from "@/types/IApiResponse";
import type { BookingDetailDTO, IPaginatedBookingResponse } from "../types";
import { getBookingDetailsApi, getBookingsApi } from "../services/api.services";
import { AxiosError } from "axios";

export const useUserBookingsQuery = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
) => {
  return useQuery<ApiResponse<IPaginatedBookingResponse>,AxiosError<{ message: string }>>({
    queryKey: ["bookings",{ page, limit, search, selectedFilter }],
    queryFn:()=> getBookingsApi(page, limit, search, selectedFilter),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

export const useUserBookingDeatailsQuery = (
bookingId: string | undefined
) => {
  return useQuery<ApiResponse<BookingDetailDTO>, AxiosError<{ message: string }>>({
    queryKey: ["bookings",bookingId],
    queryFn:()=> getBookingDetailsApi(bookingId!),
    staleTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false,
     enabled: !!bookingId,
  });
};


