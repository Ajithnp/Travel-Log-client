
import { changeEmailRequest, profile, changeEmail, changePassword, updateProfile } from "../services/api.services";
import type { ApiError } from "@/types/axios";
import { useQuery , useMutation, useQueryClient} from "@tanstack/react-query";
import type { UserProfileData } from "../types/response";
import type{ ChangeEmailRequestResponse } from "../types/response";
import { AxiosError } from "axios";
import type{ ChangeEmailPayload, ChangeEmailRequestPayload, ChangePasswordPayload } from "../types/request";
import type { ProfileSchemaType } from "../validations/usese-profile-schema";
import type { ApiResponse } from "@/types/IApiResponse";

export const useUserProfileQuery = () => {
  return useQuery<ApiResponse<UserProfileData>, ApiError>({
    queryKey: ["profile"],
    queryFn: profile,
      staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateProfileMutation = () => {
   const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    ProfileSchemaType
  >({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};


export const useChangeEmailRequestMutation = () => {
  return useMutation<
    ApiResponse<ChangeEmailRequestResponse>,
    AxiosError<ApiResponse>,
    ChangeEmailRequestPayload
  >({
    mutationFn: changeEmailRequest
  });
};

export const useChangeEmailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    ChangeEmailPayload
  >({
    mutationFn: changeEmail,
        onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};

export const useChangePasswordMutation = () => {
   const queryClient = useQueryClient();
  return useMutation<
    ApiResponse,
    AxiosError<ApiResponse>,
    ChangePasswordPayload
  >({
    mutationFn: changePassword,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  });
};




