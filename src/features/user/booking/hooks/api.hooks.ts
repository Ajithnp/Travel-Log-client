import { useQuery, keepPreviousData, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/IApiResponse";
import type { BookingDetailDTO, IPaginatedBookingResponse } from "../types";
import { cancelBookingRequestApi, getBookingDetailsApi, getBookingsApi, type CancelBookingRequestInput } from "../services/api.services";
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

export const useCancelBookingRequestMutation = (bookingId: string | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, AxiosError<{message:string}>, CancelBookingRequestInput>({
    mutationFn: cancelBookingRequestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings",bookingId] });
    },
  });
};


