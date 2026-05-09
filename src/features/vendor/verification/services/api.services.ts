import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse } from "@/types/IApiResponse";
import type { IVendorVerificationResponse } from "../api.types";
import type { VendorVerificationPayload } from "../../types/payload.type";


export const rejectedVendor = async (
  vendorId:string
): Promise<ApiResponse<IVendorVerificationResponse>> => {
  const response = await api.get<ApiResponse<IVendorVerificationResponse>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.REJECTED_VENDOR(vendorId)}`,
  );
  return response.data;
};

export const verificationReapply = async (vendorInfoId:string, payload: VendorVerificationPayload): Promise<ApiResponse> => {
  const response = await api.put(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.VERIFICATION_REAPPLY(vendorInfoId)}`,payload
  );
  return response.data;
};