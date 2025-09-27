import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { getVendors, updateVendorAccess } from "../services/api.services";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { ApiError, IApiResponse } from "@/types/axios";
import type { UsersStatusPayload } from "../../types/payload.types";
import type { IUser } from "@/types/IUser";
import { useQueryClient } from "@tanstack/react-query";

export const useVendorsFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
) => {
  return useQuery<ApiResponse<PaginatedData<IUser>>, ApiError>({
    queryKey: ["vendors", page, limit, search, selectedFilter],
    queryFn: () => getVendors(page, limit, search, selectedFilter),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const useVendorsStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiResponse, ApiError, UsersStatusPayload>({
    mutationFn: updateVendorAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
};
