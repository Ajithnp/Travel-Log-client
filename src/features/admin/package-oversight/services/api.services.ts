import api from "@/config/api/axios";
import type { PackageStatus } from "@/features/vendor/package/base-package/type/package";
import type { DifficultyLevel } from "@/hooks/app/package-listing";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { ScheduleStatus } from "@/types/booking.types";
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

export const getVendorsPackagesById = async(
  packageId:string
): Promise<ApiResponse<PackageDetailsResult>> => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_VENDORS_PACKAGES}/${packageId}`
  );
  return response.data
}

export const getVendorPackageSchedules = async (
  packageId:string,
  page: number,
  limit: number,
  filter?: string,
  
): Promise<ApiResponse<PackageScheduleResponse>> => {
  const response: AxiosResponse<ApiResponse<PackageScheduleResponse>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_VENDORS_PACKAGES}/${packageId}/schedules`, {
      params: {packageId, page, limit, ...(filter ? {filter}: {})},
    });
  return response.data;
};

export const getVendorPackageSchedulesStats = async(): Promise<ApiResponse<ScheduleStatsResponseDTO>> => {
  const response = await api.get(
    `${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_VENDORS_PACKAGE_SCHEDULE_STATS}`
  );
  return response.data
}

export const getVendorsPackageSchedules = async (
  page: number,
  limit: number,
  search?: string,
  filter?: string,
  
): Promise<ApiResponse<SchedulesResponse>> => {
  const response: AxiosResponse<ApiResponse<SchedulesResponse>> =
    await api.get(`${API_ENDPOINTS.ADMIN}${API_ROUTE.GET_VENDORS_PACKAGE_SCHEDULES}`, {
      params: { page, limit, ...(search ? {search} : {}), ...(filter ? {filter}: {})},
    });
  return response.data;
};

export type SchedulesResponse = PaginatedData<SchedulesResponseDTO>

export interface SchedulesResponseDTO {
  _id:string;
  packageTittle: string;
  packageLocation: string;
  totalDays: number;
  vendorName: string;
  startDate: Date;
  endDate: Date;
  totalSeats: number;
  totalBooked: number;
  totalRevanue: number;
  status: ScheduleStatus;
}

export interface ScheduleStatsResponseDTO {
  totalSchedules: number;
  upcomingSchedules: number;
  completedSchedules: number;
  soldOutSchedules: number;
}

export type PackageScheduleResponse = PaginatedData<PackageScheduleResponseDTO>;

export interface PackageScheduleResponseDTO {
  _id: string;
  startDate: Date;
  endDate: Date;
  totalSeats: number;
  totalRevanue: number;
  bookingsCount: number;
  soldSeats: number;
  status: string;
}


export interface PackageDetailsResult {
  _id: string;
  packageName: string;
  location: string;
  state:string;
  days: number;
  nights: number;
  difficultylevel: DifficultyLevel;
  vendorName: string;
  categoryName: string;
  categoryIsActive: boolean;
  totalScedule: number;
  cancellationPolicyLabel: string;
  status: PackageStatus;
  pricing: {
    priceTier: string;
    peopleCount:number;
    price: number;
  }[];
}

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
