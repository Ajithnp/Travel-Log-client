
import { profile, verification } from "../services/api.services";
import type { VendorVerificationFormType } from "../validations/vendor.verification.schema";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { VendorProfileResponse } from "../types/response.type";
import type{ IApiResponse } from "@/types/axios";



export const useVerificationMutation = () => {
    const queryClient = useQueryClient();
  return useMutation<IApiResponse, AxiosError<{ message: string }>, FormData>({
      mutationFn: verification,
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['profile']})
      }
  });
};

export const useVendorProfileQuery = () => {
  return useQuery<VendorProfileResponse, AxiosError<{ message: string }>>({
    queryKey: ["profile"],
      queryFn: profile,
      // staleTime: 1000 * 60 * 10,
      // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
