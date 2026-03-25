import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { IWishlistCountResponse, IWishlistIdsResponse, IWishlistItem, IWishlistResponse, IWishlistToggleResponse } from "../types/types";



export const toggleWishlistApi = async (
  packageId: string,
): Promise<IWishlistToggleResponse> => {
  const { data } = await api.post<ApiResponse<IWishlistToggleResponse>>(
    `${API_ENDPOINTS.USER}${API_ROUTE.WISHLIST}/${packageId}`,
  );
  return data.data;
};


export const getWishlistedIdsApi = async (): Promise<string[]> => {
  const { data } = await api.get<ApiResponse<IWishlistIdsResponse>>(
    `${API_ENDPOINTS.USER}${API_ROUTE.WISHLIST}/ids`,
  );
  return data.data.wishlistedPackageIds;
};

export const getWishlistCountApi = async (): Promise<number> => {
  const { data } = await api.get<ApiResponse<IWishlistCountResponse>>(
    `${API_ENDPOINTS.USER}${API_ROUTE.WISHLIST}/count`,
  );
  return data.data.count;
};

export const getWishlistApi = async (): Promise<IWishlistItem[]> => {
  const { data } = await api.get<ApiResponse<IWishlistResponse>>(
    `${API_ENDPOINTS.USER}${API_ROUTE.WISHLIST}`,
  );
  return data.data.wishlist;
}

