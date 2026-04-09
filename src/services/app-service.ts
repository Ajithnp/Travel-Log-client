import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type {
  PackageFilters,
  TravelPackage,
} from "@/hooks/app/package-listing";

import {
  DEFAULT_PRICE_MIN,
  DEFAULT_PRICE_MAX,
  DURATION_MAP,
} from "@/lib/constants/package-listing";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { CategoryResponse } from "@/types/common/response";
import type { PublicPackageDetailDTO, PublicScheduleDTO } from "@/types/types";

export const buildPackageQueryParams = (
  f: Omit<PackageFilters, "page">,
  page: number,
): Record<string, string> => {
  const params: Record<string, string> = {};

  if (f.search.trim()) params.search = f.search.trim();
  if (f.category) params.category = f.category;
  if (f.difficulty) params.difficulty = f.difficulty;
  if (f.priceRange[0] > DEFAULT_PRICE_MIN)
    params.minPrice = String(f.priceRange[0]);
  if (f.priceRange[1] < DEFAULT_PRICE_MAX)
    params.maxPrice = String(f.priceRange[1]);
  if (f.minRating > 0) params.minRating = String(f.minRating);
  if (f.startDate) params.startDate = f.startDate;
  if (f.endDate) params.endDate = f.endDate;
  if (f.sortBy !== "newest") params.sort = f.sortBy;

  const duration = DURATION_MAP[f.duration] ?? {};
  if (duration.min !== undefined) params.minDuration = String(duration.min);
  if (duration.max !== undefined) params.maxDuration = String(duration.max);

  params.page = String(page);
  params.limit = String(f.limit);

  return params;
};

export const fetchPublicPackages = async (
  filters: PackageFilters,
  page: number,
  signal?: AbortSignal,
): Promise<ApiResponse<Paginated<TravelPackage>>> => {
  const params = buildPackageQueryParams(filters, page);
  const response: AxiosResponse<ApiResponse<Paginated<TravelPackage>>> =
  await api.get(`${API_ENDPOINTS.USER}/packages/public`, { params, signal });
  return response.data;
};

export const fetchCategories = async (): Promise<
  ApiResponse<CategoryResponse[]>
> => {
  const response: AxiosResponse<ApiResponse<CategoryResponse[]>> =
    await api.get(`${API_ENDPOINTS.USER}/packages/categories`);
  return response.data;
};

export const fetchPackageDetails = async (packageId: string): Promise<
  ApiResponse<PublicPackageDetailDTO>
  > => {
  
  const response: AxiosResponse<ApiResponse<PublicPackageDetailDTO>> =
    await api.get(`${API_ENDPOINTS.USER}/packages/${packageId}`);
  return response.data;
};

export const fetchPackageSchedules = async (packageId: string): Promise<
  ApiResponse<PublicScheduleDTO[]>
  > => {
  const response: AxiosResponse<ApiResponse<PublicScheduleDTO[]>> =
    await api.get(`${API_ENDPOINTS.USER}/packages/${packageId}/schedules`);
  return response.data;
};