import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { CategoryRequestResponse, PaginatedCategoryResponse, CategoryRequestReviewedResponse } from "../types/response.dtos";
import { createCategory, getCategories, getCategoryRequest, getCategoryReviewdRequest, reviewCategory, toggleCategory } from "../services/api.services";
import type { IApiResponse } from "@/types/axios";
import type { CategoryreviewPayload, CategoryTogglePayload } from "../../types/payload.types";
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

export const useCategoryRequestFetch = (
  page: number,
  limit: number,
  search?: string,
) => {
  return useQuery<
    ApiResponse<PaginatedData<CategoryRequestResponse>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["category-request", { page, limit, search }],
    queryFn: () => getCategoryRequest(page, limit, search),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

export const useCategoryReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    CategoryreviewPayload
  >({
    mutationFn: reviewCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-request"] });
    },
  });
};

export const useCategoryRequestReviewedFetch = (
  page: number,
  limit: number,
  search?: string,
  filter?:string
) => {
  return useQuery<
    ApiResponse<PaginatedData<CategoryRequestReviewedResponse>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["category-request", { page, limit, search, filter }],
    queryFn: () => getCategoryReviewdRequest(page, limit, search, filter),
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};