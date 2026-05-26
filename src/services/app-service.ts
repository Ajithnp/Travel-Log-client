import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type {
  PackageFilters,
  TravelPackage,
} from "@/hooks/app/package-listing";

import {
  DEFAULT_PRICE_MIN,
  DEFAULT_PRICE_MAX,
  DURATION_MAP,
} from "@/lib/constants/package-listing";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type {AxiosResponse } from "axios";
import type { CategoryResponse } from "@/types/common/response";
import type {
  PublicPackageDetailDTO,
  PublicScheduleDTO,
  VendorPublicProfileResponseDTO,
} from "@/types/types";
import type {
  ConfirmBookingRequestDTO,
  ConfirmBookingResponseDTO,
 InitiateBookingRequestDTO,
  InitiateBookingResponseDTO,
  VerifyPaymentResponseDTO,
} from "@/types/api/booking-api.types";

export const buildPackageQueryParams = (
  f: Omit<PackageFilters, "page">,
  page: number,
): Record<string, string> => {
  const params: Record<string, string> = {};

  if (f.search.trim()) params.search = f.search.trim();
  if (f.category) params.category = f.category;
  if (f.difficulty) params.difficulty = f.difficulty;
  if (f.priceRange[0] > DEFAULT_PRICE_MIN)
    params.minPrice = String(f.priceRange[0]);
  if (f.priceRange[1] < DEFAULT_PRICE_MAX)
    params.maxPrice = String(f.priceRange[1]);
  if (f.minRating > 0) params.minRating = String(f.minRating);
  if (f.startDate) params.startDate = f.startDate;
  if (f.endDate) params.endDate = f.endDate;
  if (f.sortBy !== "newest") params.sort = f.sortBy;

  const duration = DURATION_MAP[f.duration] ?? {};
  if (duration.min !== undefined) params.minDuration = String(duration.min);
  if (duration.max !== undefined) params.maxDuration = String(duration.max);

  params.page = String(page);
  params.limit = String(f.limit);

  return params;
};

export const fetchPublicPackages = async (
  filters: PackageFilters,
  page: number,
  signal?: AbortSignal,
): Promise<ApiResponse<Paginated<TravelPackage>>> => {
  const params = buildPackageQueryParams(filters, page);
  const response: AxiosResponse<ApiResponse<Paginated<TravelPackage>>> =
    await api.get(`${API_ENDPOINTS.USER}${API_ROUTE.PUBLIC_PACKAGES}`, { params, signal });
  return response.data;
};

export const fetchCategories = async (): Promise<
  ApiResponse<CategoryResponse[]>
> => {
  const response: AxiosResponse<ApiResponse<CategoryResponse[]>> =
    await api.get(`${API_ENDPOINTS.USER}${API_ROUTE.PUBLIC_CATEGORIES}`);
  return response.data;
};

export const fetchPackageDetails = async (
  packageId: string,
): Promise<ApiResponse<PublicPackageDetailDTO>> => {
  const response: AxiosResponse<ApiResponse<PublicPackageDetailDTO>> =
    await api.get(`${API_ENDPOINTS.USER}${API_ROUTE.PACKAGE_DETAIL(packageId)}`);
  return response.data;
};

export const fetchPackageSchedules = async (
  packageId: string,
): Promise<ApiResponse<PublicScheduleDTO[]>> => {
  const response: AxiosResponse<ApiResponse<PublicScheduleDTO[]>> =
    await api.get(`${API_ENDPOINTS.USER}${API_ROUTE.PACKAGE_DETAIL(packageId)}/schedules`);
  return response.data;
};

export const fetchVendorPublicProfile = async (
  vendorId: string,
  page: number,
  limit: number,
): Promise<ApiResponse<VendorPublicProfileResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<VendorPublicProfileResponseDTO>> =
    await api.get(
      `${API_ENDPOINTS.USER}${API_ROUTE.VENDOR_PUBLIC_PROFILE(vendorId)}`,
      {
        params: { page, limit },
      },
    );
  return response.data;
};

// ─── Booking API ────────

export const initiateBooking = async (
  payload: InitiateBookingRequestDTO,
): Promise<ApiResponse<InitiateBookingResponseDTO>> => {
  
  const response: AxiosResponse<ApiResponse<InitiateBookingResponseDTO>> =
    await api.post(`${API_ENDPOINTS.BOOKING}${API_ROUTE.INITIATE_BOOKING}`, payload);
  return response.data;
};


export const confirmBookingWalletApi = async (
  bookingId:string
): Promise<ApiResponse<ConfirmBookingResponseDTO>> => {
   const response: AxiosResponse<ApiResponse<ConfirmBookingResponseDTO>> =
    await api.post(`${API_ENDPOINTS.BOOKING}/${bookingId}/confirm-wallet`);
  return response.data ;
};


export const confirmBooking = async (
  payload: ConfirmBookingRequestDTO,
): Promise<ApiResponse<ConfirmBookingResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<ConfirmBookingResponseDTO>> =
    await api.post(
      `${API_ENDPOINTS.BOOKING}${API_ROUTE.CONFIRM_BOOKING}`,
      payload,
    );
  return response.data;
};

export const verifyBookingPayment = async (sessionId: string): Promise<ApiResponse<VerifyPaymentResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<VerifyPaymentResponseDTO>> =
    await api.get(`${API_ENDPOINTS.BOOKING}${API_ROUTE.VERIFY_PAYMENT}`, {
      params: { session_id: sessionId },
    });
  return response.data;
};


export const retryBooking = async (bookingId: string): Promise<ApiResponse<InitiateBookingResponseDTO>> => {
  const response: AxiosResponse<ApiResponse<InitiateBookingResponseDTO>> =
    await api.post(`${API_ENDPOINTS.BOOKING}/${bookingId}/retry`);
  return response.data;
};

export const downloadBookingTicket = async (bookingId: string): Promise<void> => {
  const response = await api.get(`${API_ENDPOINTS.BOOKING}/${bookingId}/ticket`, {
    responseType: 'blob', 
  });

  const disposition = response.headers['content-disposition'];
  let filename = `Ticket-${bookingId}.pdf`; 
  if (disposition) {
    const match = disposition.match(/filename="(.+)"/);
    if (match) filename = match[1];
  }

  // Create a temporary object URL and trigger browser download
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url); // clean up memory
};