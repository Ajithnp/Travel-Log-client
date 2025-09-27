import api from "@/config/api/axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";

import type { UserProfileData } from "../types/response";

export const profile = async (): Promise<UserProfileData> => {
  const response = await api.get<UserProfileData>(
    `${API_ENDPOINTS.USER}/me`
  );
  return response.data;
};