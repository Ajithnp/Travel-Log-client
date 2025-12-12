import { useMutation, useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "@/types/IApiResponse";
import type { S3FileUploadPaylod, S3UploadParams } from "@/types/common/request";
import type { S3FileUploadPaylodResponse, SignedUrlViewResponse } from "@/types/common/response";
import { getUploadSignedUrl, getViweSignedUrl, uploadToS3 } from "@/services/sharedService";
import { AxiosError } from "axios";


export const useGetUploadUrlMutation = () => {
  return useMutation<
    ApiResponse<S3FileUploadPaylodResponse[]>,
    AxiosError<ApiResponse>,
    S3FileUploadPaylod[]
  >({
    mutationFn: getUploadSignedUrl,
  });
};

export const useGetViewSignedUrlQuery = (
  userId?: string,
  keys?: string[],
 options?: { enabled?: boolean }
) => {
  return useQuery<
    ApiResponse<SignedUrlViewResponse[]>,
    AxiosError<ApiResponse>
  >({
    queryKey: ["vendorViewUrls", userId, keys],
    queryFn: () => getViweSignedUrl(userId!, keys!),
    enabled:  !!userId && !!keys?.length && (options?.enabled ?? true),
    staleTime: 4 * 60 * 1000,
    refetchOnWindowFocus: false,
    // retry: false, 
  });
};

export const useUploadToS3Mutation = () => {
  return useMutation<
    { success: boolean; fileName: string }, 
    AxiosError,                             
    S3UploadParams                          
  >({
    mutationFn: ({ url, file }) => uploadToS3(url, file),
  });
};