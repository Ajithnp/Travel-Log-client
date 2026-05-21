import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CancelationStatus } from "../types/constants";
import { approveCancellationRequest, getCancellationRequestDetails, getCancellationRequests, rejectCancellationRequest, type CancellationRequestRsponse, type DetailedCancellationRequestResponse  } from "../services/api.service";
import type { AxiosError } from "axios";

export const useCancelRequestsQuery = (
  page: number,
  limit: number,
  status:CancelationStatus,
) => {
  return useQuery<ApiResponse<PaginatedData<CancellationRequestRsponse>>,AxiosError<{ message: string }>>({
    queryKey: ["cancel-bookings",{ page, limit, status }],
    queryFn:()=> getCancellationRequests(page, limit,status),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

export const useCancellationRequestDetailsQuery = (
bookingId: string | undefined
) => {
  return useQuery<ApiResponse<DetailedCancellationRequestResponse>, AxiosError<{ message: string }>>({
    queryKey: ["cancel-booking-details",bookingId],
    queryFn:()=> getCancellationRequestDetails(bookingId!),
    staleTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false,
     enabled: !!bookingId,
  });
};

export const useCancelBookingApproveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, AxiosError<{message:string}>, {bookingId:string}>({
    mutationFn: approveCancellationRequest,
    onSuccess: () => 
      queryClient.invalidateQueries({ queryKey: ["cancel-bookings"] }),
  });
};

export const useCancelBookingRejectMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, AxiosError<{message:string}>, {bookingId:string, reason:string}>({
    mutationFn: rejectCancellationRequest,
    onSuccess: () => 
      queryClient.invalidateQueries({ queryKey: ["cancel-bookings"] }),
  });
};