import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { BasePackageDraftSchema , BasePackageResponseDTO} from "../validations/draft-base-package-schema";
import type { Package } from "../components/package-list";
import type { AxiosResponse } from "axios";

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
): Promise<ApiResponse<PaginatedData<Package>>> => {
  const response: AxiosResponse<ApiResponse<PaginatedData<Package>>> =
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

): Promise<ApiResponse<BasePackageResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<BasePackageResponseDTO>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.PACKAGES}/${packageId}`);
  return response.data;
};
