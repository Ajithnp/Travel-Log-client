import type { ApiResponse } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { PaginatedCategoryResponse } from "../types/response.dtos";
import { createCategory, getCategories, toggleCategory } from "../services/api.services";
import type { IApiResponse } from "@/types/axios";
import type { CategoryTogglePayload } from "../../types/payload.types";
import type { CategoryForm } from "../validations";


export const useCategoryFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
) => {
  return useQuery<
    ApiResponse<PaginatedCategoryResponse>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["category", { page, limit, search, selectedFilter }],
    queryFn: () => getCategories(page, limit, search, selectedFilter),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

export const useCategoryToggleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    CategoryTogglePayload
  >({
    mutationFn: toggleCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};

export const useCategoryCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    CategoryForm
  >({
    mutationFn:createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });
};