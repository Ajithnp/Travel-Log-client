import { fetchCategories, fetchPublicPackages } from "@/services/app-service";
import { useQuery, useInfiniteQuery, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { PackageFilters, TravelPackage } from "./package-listing";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { CategoryResponse } from "@/types/common/response";

export const useCategories = () => {
  return useQuery<
   ApiResponse<CategoryResponse[]>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["public-categories"],

    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 2, 
    refetchOnWindowFocus: false,
  });
};



export const useInfinitePackages = (filters: PackageFilters) => {
  return useInfiniteQuery<ApiResponse<Paginated<TravelPackage>>, AxiosError<{ message: string }>, InfiniteData<ApiResponse<Paginated<TravelPackage>>>, QueryKey, number>({
    queryKey: ["publicPackages", filters],

    queryFn: ({ pageParam }) => {
      return fetchPublicPackages(filters, pageParam);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {

      if (lastPage.data?.hasNextPage) {
        const currentPage = Number(lastPage.data.currentPage);
        return currentPage + 1;
      }
      return undefined;
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};