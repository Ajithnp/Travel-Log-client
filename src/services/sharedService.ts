import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { S3FileUploadPaylod } from "@/types/common/request";
import type { S3FileUploadPaylodResponse, SignedUrlViewResponse } from "@/types/common/response";
import type { ApiResponse } from "@/types/IApiResponse";

export const getUploadSignedUrl = async (
  payload: S3FileUploadPaylod[]
): Promise<ApiResponse<S3FileUploadPaylodResponse[]>> => {
  const response = await api.post<ApiResponse<S3FileUploadPaylodResponse[]>>(
    `${API_ENDPOINTS.S3}${API_ROUTE.GET_SIGNED_URL_UPLOAD_API}`,
      { files: payload }
  );
  return response.data;
};

export const getViweSignedUrl = async (
  userId: string,
  keys: string[]
): Promise<ApiResponse<SignedUrlViewResponse[]>> => {
  const response = await api.get<ApiResponse<SignedUrlViewResponse[]>>(
    `${API_ENDPOINTS.S3}${API_ROUTE.GET_SIGNED_URL_DOWNLOAD_API}`, {
      params:{userId, keys}
    }
  );
  return response.data;
};

export const uploadToS3 = async (
  url: string,
  file: File
): Promise<{ success: boolean; fileName: string }> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload ${file.name}`);
  }

  return { success: true, fileName: file.name };
};

