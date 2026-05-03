import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";

import type { ApiResponse } from "@/types/IApiResponse";
import type { IPaginatedBookingResponse } from "../types";
import { getBookingsApi } from "../services/api.services";
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

// export const useUpdateProfileMutation = () => {
//    const queryClient = useQueryClient();
//   return useMutation<
//     ApiResponse,
//     AxiosError<ApiResponse>,
//     ProfileSchemaType
//   >({
//     mutationFn: updateProfile,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['profile'] });
//     }
//   });
// };
