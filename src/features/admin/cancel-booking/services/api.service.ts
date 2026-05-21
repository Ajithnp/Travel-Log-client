import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ApiResponse, PaginatedData} from "@/types/IApiResponse";
import type { AxiosResponse } from "axios";
import type { CancelationStatus } from "../types/constants";

export const getCancellationRequests = async (
  page: number,
  limit: number,
  status:CancelationStatus,
): Promise<ApiResponse<PaginatedData<CancellationRequestRsponse>> > => {

  const response: AxiosResponse<ApiResponse<PaginatedData<CancellationRequestRsponse>>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_CANCELLATION_REQUESTS}`, {
     params: { page, limit, status},
    });
    return response.data;
};

export const getCancellationRequestDetails = async (bookingId:string): Promise<ApiResponse<DetailedCancellationRequestResponse>> => {
  const response: AxiosResponse<ApiResponse<DetailedCancellationRequestResponse>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_CANCELLATION_REQUESTS}/${bookingId}`);
  return response.data;
};


export const approveCancellationRequest = async ({bookingId}: {bookingId: string}) => {
  const response: AxiosResponse<ApiResponse<void>> =
    await api.patch(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_CANCELLATION_REQUESTS}/${bookingId}/approve`);
  return response.data;
};


export const rejectCancellationRequest = async ({bookingId,reason}: {bookingId: string, reason: string}) => {
  const response: AxiosResponse<ApiResponse<void>> =
    await api.patch(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_CANCELLATION_REQUESTS}/${bookingId}/reject`, { reason });
  return response.data;
};

export interface CancellationRequestRsponse {
  _id: string;
  bookingCode: string;
  updatedAt: Date;
  finalAmount: number;
  cancelationRefundAmount: number;
  cancellationStatus: CancelationStatus;
  packageTittle: string;
  userName: string;
}

export interface CancellationRule {
  daysBeforeTrip: number;
  refundPercent: number;
}

export interface RefundBreakdown {
  originalAmount: number;
  refundPercent: number;
  refundAmount: number;
  deductionAmount: number;
  daysUntilTrip: number;
  appliedRule: CancellationRule;
  policyKey: string;
  policyLabel: string;
  calculatedAt: Date;           
}

export interface DetailedCancellationRequestResponse {
  bookingId: string;
  userName: string;
  bookingCode:string;
  email: string;
  phoneNo: string;
  vendorName: string;
  startDate: Date;
  packageName: string;
  cancellationPolicyLabel: string;
  rules: { daysBeforeTrip: number; refundPercent: number }[];
  travelersCount: number;
  groupType: string;
  cancellationReason: string | null;
  cancellationStatus: CancelationStatus;
  updatedAt: Date;
  finalAmount: number;
  cancellationRefundAmount: number | null;
  cancellationRejectedReason: string | null;
  calculation: RefundBreakdown | null; 
}

