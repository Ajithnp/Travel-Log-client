import type { ApiResponse } from "@/types/IApiResponse";
import { useQuery } from "@tanstack/react-query";
import type { WalletDetailsResponse } from "../types/types";
import type { AxiosError } from "axios";
import { keepPreviousData } from "@tanstack/react-query";
import { getUserWalletApi, getWalletBalanceApi } from "../services/api.services";
import type { WalletFilter } from "../types/types";

export const useUserWalletQuery = (
  page: number,
  limit: number,
  filter: WalletFilter,
) => {
  return useQuery<ApiResponse<WalletDetailsResponse>,AxiosError<{ message: string }>>({
    queryKey: ["wallet",{ page, limit, filter }],
    queryFn:()=> getUserWalletApi(page, limit,filter),
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData, 
    refetchOnWindowFocus: false,
  });
};

 
export const useWalletBalanceQuery = () => {
  return useQuery<ApiResponse<{balance:number}>>({
    queryKey: ["wallet-balance"],
    queryFn:()=> getWalletBalanceApi(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};