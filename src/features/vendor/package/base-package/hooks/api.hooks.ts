import { AxiosError } from "axios";
import {
  getPackages,
  getPackagesWithId,
  updatePackage,
  uploadPackage,
} from "../services/api.services";
import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import type { IApiResponse } from "@/types/axios";
import type {
  BasePackageDraftSchema,
  BasePackageResponseDTO,
} from "../validations/draft-base-package-schema";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { IPackage } from "../type/package";

export const useUploadPackageMutation = () => {
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    BasePackageDraftSchema
  >({
    mutationFn: uploadPackage,
  });
};

export const useUpdatePackageMutation = () => {
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    { packageId: string; payload: BasePackageDraftSchema }
  >({
    mutationFn: ({ packageId, payload }) => updatePackage(packageId, payload),
  });
};



export const usePackagesFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
) => {
  return useQuery<
    ApiResponse<PaginatedData<IPackage>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["packages", { page, limit, search, selectedFilter }],
    queryFn: () => getPackages(page, limit, search, selectedFilter),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const usePackagesFetchWithId = (
  packageId: string,
  options?: { enabled?: boolean },
) => {
  return useQuery<
    ApiResponse<BasePackageResponseDTO>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["package", packageId],
    queryFn: () => getPackagesWithId(packageId),
    enabled: options?.enabled,
    refetchOnWindowFocus: false,
  });
};
