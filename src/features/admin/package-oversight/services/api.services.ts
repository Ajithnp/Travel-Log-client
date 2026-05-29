import api from "@/config/api/axios";
import type { PackageStatus } from "@/features/vendor/package/base-package/type/package";
import type { DifficultyLevel } from "@/hooks/app/package-listing";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export const getVendorsPackages = async (
  page: number,
  limit: number,
  search?: string,
  filter?: string,
  
): Promise<ApiResponse<PackagesOversightResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<PackagesOversightResponseDTO>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_VENDORS_PACKAGES}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(filter ? {filter}: {})},
    });
  return response.data;
};

// export const getVendorProfileStats = async(
//   vendorId:string
// ): Promise<ApiResponse<VendorProfileStatsResponse>> => {
//   const response = await api.get(
//     `${API_ENDPOINTS.ADMIN}${API_ROUTE.VENDORS}/${vendorId}/stats`
//   );
//   return response.data
// }

export interface PackagesOversightResponseDTO extends PaginatedData<VendorsPackagesResponse> {
  totalPublished: number;
}

export interface VendorsPackagesResponse {
  _id: string;
  packageName: string;
  location: string;
  state: string;
  status:PackageStatus;
  totalDays: number;
  difficultylevel: DifficultyLevel;
  vendorName: string;
  categoryName: string;
  scheduleCount: number;
}
