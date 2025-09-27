import api from "@/config/api/axios";
import type { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "@/lib/constants/routes";
import type { VendorVerificationUpdatePayload } from "../../types/payload.types";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { IVendorInfo } from "@/types/IVendorInfo";
import type { IApiResponse } from "@/types/axios";


export const vendorVerification = async (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
): Promise<ApiResponse<PaginatedData<IVendorInfo>>> => {
  console.log('seleceted filter from api', selectedFilter);
  
  const response: AxiosResponse<ApiResponse<PaginatedData<IVendorInfo>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}/vendor/verification-requests`, {
      params: { page, limit, search, selectedFilter },
    });
  return response.data;
};

export const vendorVerificatiuonUpdate = async (
  payload: VendorVerificationUpdatePayload
):Promise<IApiResponse> => {
  const { id, ...body } = payload;
  const response = await api.patch(
    `${API_ENDPOINTS.ADMIN}/update-vendor-verification/${id}`,
    body
  );
  return response.data;
};
