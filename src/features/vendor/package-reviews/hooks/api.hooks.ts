import type { PackageRatingStatsResponseDto } from "@/services/app-service";
import type { ApiResponse } from "@/types/IApiResponse";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { packagesReviews, packagesReviewsStats, type PackagesreviewsQuery, type PackagesReviewsResponseDto } from "../services/api.services";

export const usePackagesReviewsStatsQuery = () => {
  return useQuery<
    ApiResponse<PackageRatingStatsResponseDto>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["packages-reviews-stats"],
    queryFn: packagesReviewsStats,
    refetchOnWindowFocus: false,
  });
};

export const usePackagesReviewsQuery = (params:PackagesreviewsQuery) => {
  return useInfiniteQuery<ApiResponse<PackagesReviewsResponseDto>, AxiosError<{ message: string }>>({
    queryKey: ["packages-reviews", params],
    queryFn: ({ pageParam = 1 }) => packagesReviews({...params, page: pageParam as number}),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};