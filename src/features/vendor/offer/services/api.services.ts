import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { CreateOfferPayload, OfferDTO, OfferQueryParams, PackageForOfferResponseDTO } from "../types/types";

const OFFERS_BASE = `${API_ENDPOINTS.VENDOR}/offers`;

export const getPackagesForOffer = async (

): Promise<ApiResponse<PackageForOfferResponseDTO[]>> => {
  const response: AxiosResponse<ApiResponse<PackageForOfferResponseDTO[]>> = await api.get(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PACAGES_OFFERS_CONTEXT}`
  );
  return response.data;
};


export const createOffer = async (
  payload: CreateOfferPayload
): Promise<ApiResponse<void>> => {
  const response: AxiosResponse<ApiResponse<void>> = await api.post(
    OFFERS_BASE,
    payload
  );
  return response.data;
};


export const getOffers = async (params: OfferQueryParams): Promise<ApiResponse<PaginatedOfferResponse>> => {
  const response: AxiosResponse<ApiResponse<PaginatedOfferResponse>> =
    await api.get(OFFERS_BASE, {
      params: {
        page: params.page,
        limit: params.limit,
        ...(params.search ? { search: params.search } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
    });
  return response.data;
};


export const deactivateOffer = async (
  offerId: string
): Promise<ApiResponse<{ message: string }>> => {
  const response: AxiosResponse<ApiResponse<{ message: string }>> =
    await api.patch(`${OFFERS_BASE}/${offerId}/deactivate`);
  return response.data;
};

export interface PaginatedOfferResponse {
  data: OfferDTO[];
  totalDocs: number;
  currentPage: number;
  totalPages: number;
  activeCount: number;
  inactiveCount: number;
}