import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { PackageStatus } from "../../package/base-package/type/package";
import type { AxiosResponse } from "axios";
import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";



export const getPackagesEarningOverview = async (
  page: number,
  limit: number,
  search?: string,
): Promise<ApiResponse<Paginated<PackagesEarningsByVendor>>> => {
  const response: AxiosResponse<ApiResponse<Paginated<PackagesEarningsByVendor>>> =
    await api.get(`${API_ENDPOINTS.VENDOR}${API_ROUTE.REVENUE_PACKAGES_EARNINGS}`, {
      params: {page, limit, ...(search ? {search}: {})},
    });
  return response.data;
};

export interface PackagesEarningsByVendor {
    _id:string;
    title:string;
    status:PackageStatus;
    location:string;
    totalScheduled:number;
    totalBookings:number;
    totalRevenue:number;
    totalCommission:number;
    netEarnings:number;
};