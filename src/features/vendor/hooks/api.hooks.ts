
import { profile, verification, updateProfileLogo} from "../services/api.services";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type{ IApiResponse, ApiError } from "@/types/axios";
import type { VendorVerificationPayload, UpdateProfilePayload } from "../types/payload.type";
import type { ApiResponse } from "@/types/IApiResponse";
import type { VendorProfileData } from "../types/response.type";

export const useVerificationMutation = () => {
    const queryClient = useQueryClient();
  return useMutation<IApiResponse, AxiosError<{ message: string }>, VendorVerificationPayload>({
      mutationFn: verification,
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['profile']})
      }
  });
};

export const useVendorProfileQuery = () => {
  return useQuery<ApiResponse<VendorProfileData>, AxiosError<{ message: string }>>({
    queryKey: ["profile"],
      queryFn: profile,
      staleTime: 5 * 60 * 10,
      // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfileLogoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse, ApiError, UpdateProfilePayload>({
    mutationFn: updateProfileLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['profile']})
    }
  })
}
// edit profile
