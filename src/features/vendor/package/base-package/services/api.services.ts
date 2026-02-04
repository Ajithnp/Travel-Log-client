import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";

export const uploadPackage = async (
  payload: BasePackageDraftSchema
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGE_FORM_UPLOAD}`,
    payload
  );
  return response.data;
};