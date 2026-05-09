import type { ApiResponse } from "@/types/IApiResponse";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { rejectedVendor } from "../services/api.services";
import type { IVendorVerificationResponse } from "../api.types";

export const useRejectedVericationQuery = (vendorId:string) => {
  return useQuery<ApiResponse<IVendorVerificationResponse>, AxiosError<{ message: string }>>({
    queryKey: ["verification",vendorId],
    queryFn: () => rejectedVendor(vendorId),
      enabled: !!vendorId,
      staleTime: 5 * 60 * 10,
      // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};