import { useInfiniteQuery, type InfiniteData, type QueryKey } from "@tanstack/react-query";
import { getWishlistApi } from "../services/api.services";
import type {IWishlistItem } from "../types/types";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { AxiosError } from "axios";


export const useInfiniteWishlist = (limit: number) => {
  return useInfiniteQuery<
    ApiResponse<Paginated<IWishlistItem>>,
    AxiosError<{ message: string }>,
    InfiniteData<ApiResponse<Paginated<IWishlistItem>>>,
    QueryKey,
    number
  >({
    queryKey: ["wishlist", limit],

    queryFn: ({ pageParam = 1 }) =>
      getWishlistApi(pageParam, limit),
    
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
