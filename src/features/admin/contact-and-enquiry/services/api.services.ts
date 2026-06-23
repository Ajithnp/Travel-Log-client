import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";

export type EnquiryStatus = 'pending' | 'resolved';

export const contactEnquiries = async (
  page: number,
  limit: number,
  status: EnquiryStatus,
  search?: string,
): Promise<ApiResponse<ContactEnquiriesResponse>> => {

  const response: AxiosResponse<ApiResponse<ContactEnquiriesResponse>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.CONTACT}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(status ? {status}: {})},
    });

  return response.data;
};

export const resolveEnquiry = async (
  id:string
): Promise<ApiResponse<string>> => {
  const response: AxiosResponse<ApiResponse<string>> = await api.patch(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.CONTACT}/${id}`
  );
  return response.data;
}

export interface IContactResponse {
  id:string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isGuest:boolean;
  status:EnquiryStatus;
  createdAt:Date;
  updatedAt:Date;
};


export interface ContactEnquiriesResponse extends PaginatedData<IContactResponse> {
    pendingCount:number;
    resolvedCount:number;
}