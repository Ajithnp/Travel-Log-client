import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { ProfileSchemaType } from "../validations/usese-profile-schema";

import type {
  ChangeEmailRequestResponse,
  UserProfileData,

} from "../types/response";
import type{
  ChangeEmailPayload,
  ChangeEmailRequestPayload,
  ChangePasswordPayload,
  
 } from "../types/request";

export const profile = async (): Promise<ApiResponse<UserProfileData>> => {
  const response = await api.get<ApiResponse<UserProfileData>>(
    `${API_ENDPOINTS.USER}/me`
  );
  return response.data;
};


export const updateProfile = async (
  payload: ProfileSchemaType
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(
    `${API_ENDPOINTS.USER}${API_ROUTE.EDIT_PROFILE}`,
    payload
  )
  return response.data;
};

export const changeEmailRequest = async (
  payload: ChangeEmailRequestPayload
): Promise<ApiResponse<ChangeEmailRequestResponse>> => {
  const response = await api.post<ApiResponse<ChangeEmailRequestResponse>>(
    `${API_ENDPOINTS.USER}${API_ROUTE.CHANGE_EMAIL_REQUEST}`,
    payload
  );
  return response.data
}

export const changeEmail = async (
  payload: ChangeEmailPayload
): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(
    `${API_ENDPOINTS.USER}${API_ROUTE.UPDATE_EMAIL}`,
    payload
  );
  return response.data
}

export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(
    `${API_ENDPOINTS.USER}${API_ROUTE.RESET_PASSWORD}`,
    payload
  );
  return response.data;
}
