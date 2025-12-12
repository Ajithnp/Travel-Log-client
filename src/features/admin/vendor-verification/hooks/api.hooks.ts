import {
  vendorVerification,
  vendorVerificatiuonUpdate,
} from "../services/api.services";
import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery,  keepPreviousData  } from "@tanstack/react-query";
import type { IVendorInfo } from "@/types/IVendorInfo";
import type { ApiResponse } from "@/types/IApiResponse";
import type { VendorVerificationUpdatePayload } from "../../types/payload.types";
import type { PaginatedData } from "@/types/IApiResponse";
import type { IApiResponse } from "@/types/axios";


export const useVendorVerification = (page: number, limit: number, search?: string, selectedFilter?: string) => {
  
  return useQuery<
    ApiResponse<PaginatedData<IVendorInfo>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["vendorVerification", { page, limit, search, selectedFilter }],
    queryFn: () => vendorVerification(page, limit, search, selectedFilter),
    refetchOnWindowFocus: false,
   placeholderData: keepPreviousData, // avoid flicker when switching pages
  });
};

export const useVendorVerificationUpdateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    VendorVerificationUpdatePayload
  >({
    mutationFn: vendorVerificatiuonUpdate,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendorVerification"] });
      queryClient.invalidateQueries({queryKey: ['profile'] ,refetchType: "active"})
    }
  });
};
