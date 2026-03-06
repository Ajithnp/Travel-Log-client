import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";
import type { AxiosResponse } from "axios";
import type { PackageDetailReponse , IPackage} from "../type/package";

export const uploadPackage = async (
  payload: BasePackageDraftSchema,
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGE_FORM_UPLOAD}`,
    payload,
  );
  return response.data;
};

export const updatePackage = async (
  id: string,
  payload: BasePackageDraftSchema,
): Promise<ApiResponse> => {
  const response = await api.put<ApiResponse>(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES}/${id}`,
    payload,
  );
  return response.data;
};

export const getPackages = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string,
): Promise<ApiResponse<PaginatedData<IPackage>>> => {
  const response: AxiosResponse<ApiResponse<PaginatedData<IPackage>>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES}`, {
      params: {
        page,
        limit,
        ...(search ? { search } : {}),
        ...(selectedFilter ? { selectedFilter } : {}),
      },
    });
  return response.data;
};

export const getPackagesWithId = async (
  packageId: string,

): Promise<ApiResponse<PackageDetailReponse>> => {
  const response: AxiosResponse<ApiResponse<PackageDetailReponse>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES}/${packageId}`);
  return response.data;
};
