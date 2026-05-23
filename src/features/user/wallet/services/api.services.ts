import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { WalletDetailsResponse, WalletFilter } from "../types/types";


export const getUserWalletApi = async (
  page: number,
  limit: number,
  filter: WalletFilter,
): Promise<ApiResponse<WalletDetailsResponse>> => {
   const response: AxiosResponse<ApiResponse<WalletDetailsResponse>> =
    await api.get(`${API_ENDPOINTS.USER_WALLET}`, {
      params: { page, limit,filter },
    });
  return response.data ;
};

export const getWalletBalanceApi = async (): Promise<ApiResponse<{balance:number}>> => {
  const response: AxiosResponse<ApiResponse<{balance:number}>> = 
    await api.get(`${API_ENDPOINTS.USER_WALLET}/balance`);
  return response.data;
};

