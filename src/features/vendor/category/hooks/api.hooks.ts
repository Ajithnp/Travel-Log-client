import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { VendorRequestedCategoryResponse, RequestCategoryPayload } from "../types/types";
import { getRequestedCategories, requestCategory , getCategories} from "../services/api.service";
import type{ ApiError, IApiResponse } from "@/types/axios";

export const useRequestedCategoryFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
) => {
  return useQuery<
    ApiResponse<PaginatedData<VendorRequestedCategoryResponse>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["category-vendor", { page, limit, search, selectedFilter }],
    queryFn: () => getRequestedCategories(page, limit, search, selectedFilter),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

export const useRequestCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<
      IApiResponse,
      ApiError,
    RequestCategoryPayload
  >({
    mutationFn: requestCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-vendor"] });
    },
  });
};


export const useFetchCategories= (
) => {
  return useQuery<
    ApiResponse<string[]>,
    ApiError
  >({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

