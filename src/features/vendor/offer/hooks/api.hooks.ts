import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { ApiError } from "@/types/axios";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import {
  createOffer,
  deactivateOffer,
  getOffers,
  getPackagesForOffer,
  type PaginatedOfferResponse,
} from "../services/api.services";
import type { CreateOfferPayload, OfferDTO, OfferQueryParams, PackageForOfferResponseDTO } from "../types/types";


const OFFERS_QUERY_KEY = "vendor-offers";

export const usePackagesForOfferQuery = () => {
  return useQuery<ApiResponse<PackageForOfferResponseDTO[]>, ApiError>({
    queryKey: [OFFERS_QUERY_KEY, "packages"],
    queryFn: () => getPackagesForOffer(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useOffersQuery = (params: OfferQueryParams) => {
  return useQuery<ApiResponse<PaginatedOfferResponse>, ApiError>({
    queryKey: [OFFERS_QUERY_KEY, params],
    queryFn: () => getOffers(params),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });
};


export const useCreateOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<void>, ApiError, CreateOfferPayload>({
    mutationFn: createOffer,
    onSuccess: (res) => {
      toast.success(res.message ?? "Offer created successfully");
      queryClient.invalidateQueries({ queryKey: [OFFERS_QUERY_KEY] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Failed to create offer");
      } else {
        toast.error("Failed to create offer");
      }
    },
  });
};


export const useDeactivateOfferMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<{ message: string }>, ApiError, string>({
    mutationFn: deactivateOffer,
    onSuccess: (res) => {
      toast.success(res.message ?? "Offer deactivated");
      queryClient.invalidateQueries({ queryKey: [OFFERS_QUERY_KEY] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to deactivate offer"
        );
      } else {
        toast.error("Failed to deactivate offer");
      }
    },
  });
};
