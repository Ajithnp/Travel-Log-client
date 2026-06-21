import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { PackageRatingStatsResponseDto } from "@/services/app-service";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export type ReviewSortBy = 'latest' | 'oldest' | 'ratingHigh' | 'ratingLow';
export interface PackagesreviewsQuery{
  page?: number;
  limit: number;
  search?: string;
  packageId?: string;
  rating?: string;
  sortBy: ReviewSortBy;
}

export const packagesReviews = async (params: PackagesreviewsQuery): Promise<ApiResponse<PackagesReviewsResponseDto>> => {
  const response: AxiosResponse<ApiResponse<PackagesReviewsResponseDto>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES_REVIEWS}`, {
      params,
    });
  return response.data;
};

export const packagesReviewsStats = async (): Promise<ApiResponse<PackageRatingStatsResponseDto>> => {

  const response = await api.get<ApiResponse<PackageRatingStatsResponseDto>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES_REVIEW_STATS}`
  );
  return response.data;
};

export interface VendorPackageReviewResponseDto {
  id: string;
  packageName: string;
  userName: string;
  createdAt: Date;
  rating: number;
  text: string;
  images: {key:string, url?:string}[];
}

export type PackagesReviewsResponseDto = Paginated<VendorPackageReviewResponseDto> 