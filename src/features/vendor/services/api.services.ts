import api from "@/config/api/axios";
import { API_ENDPOINTS, API_ROUTE } from "@/lib/constants/routes";
import type { VendorVerificationPayload, UpdateProfilePayload } from "../types/payload.type";
import type { ApiResponse } from "@/types/IApiResponse";
import type { VendorProfileData } from "../types/response.type";
import type { AxiosResponse } from "axios";
import type { GroupType } from "@/mock-data";
import type { BookingStatus } from "@/features/user/booking/types";
import type { ScheduleStatus } from "@/types/booking.types";
import type { Granularity, PeriodKey } from "../components/dashboard-revenue-chart";


export interface ChartQueryParams {
  period: PeriodKey;
  start?: string; // ISO string, only for 'custom'
  end?: string;
}

export const verification = async (
  payload: VendorVerificationPayload
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.VERIFICATION_FORM}`,
    payload
  );
  return response.data;
};

export const profile = async (): Promise<ApiResponse<VendorProfileData>> => {
  const response = await api.get<ApiResponse<VendorProfileData>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.PROFILE}`
  );
  return response.data;
};

export const updateProfileLogo = async (payload:UpdateProfilePayload): Promise<ApiResponse> => {
  const response = await api.patch<ApiResponse>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.UPDATE_PROFILE_LOGO}`,
    payload
  );
  return response.data;
};

export const initiateStripeOnboarding = async (): Promise<ApiResponse<{ onboardingUrl: string }>> => {
  const response: AxiosResponse<ApiResponse<{ onboardingUrl: string }>> =
    await api.post(`${API_ENDPOINTS.STRIPE}/onboard`);
  return response.data;
};

export const getStripeOnboardingStatus = async (): Promise<ApiResponse<IStripeOnboardingStatusDTO>> => {
  const response: AxiosResponse<ApiResponse<IStripeOnboardingStatusDTO>> =
    await api.get(`${API_ENDPOINTS.STRIPE}/onboard/status`);
  return response.data;
};

export const dashboardSummary = async (): Promise<ApiResponse<VendorDashBoardStatsResponse>> => {
  const response = await api.get<ApiResponse<VendorDashBoardStatsResponse>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.DASHBOARD_SUMMARY}`
  );
  return response.data;
};

export const dashboardAnalytics = async (params: ChartQueryParams): Promise<ApiResponse<DashboardAnalyticsResponse>> => {
  const response = await api.get<ApiResponse<DashboardAnalyticsResponse>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.DASHBOARD_CHARTS}`,{
      params
    }
  );
  return response.data;
};

export const dashboardRecentActivity = async (): Promise<ApiResponse<RecentBookingActivityResponse>> => {
  const response = await api.get<ApiResponse<RecentBookingActivityResponse>>(
    `${API_ENDPOINTS.VENDOR}${API_ROUTE.DASHBOARD_RECENT_ACTIVITY}`
  );
  return response.data;
};

export interface IStripeOnboardingStatusDTO {
  hasStripeAccount: boolean;
  onboardingComplete: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
}

export interface VendorDashBoardStatsResponse {
 revanueStats : VendorRevenueStats,
 totalBookings:number;
 totalPackages:number;
 scheduleStats : ScheduledStatsResult;
}

export interface VendorRevenueStats {
    totalRevanue : number;
    currentMonthRevanue: number;
    previousMonthRevanue: number;
    hasGrowth: boolean;
}

export interface ScheduledStatsResult{
  totalSchedule:number;
  currentMonthSchedule:number;
  hasGrowth:boolean;
  activeSchedule:number;
  ongoingSchedule:number;
}

export interface ChartDataPoint {
  date: string;
  bookings: number;
  revenue: number;
}
 
export interface DashboardAnalyticsResponse {
  granularity: Granularity;
  trend: ChartDataPoint[];
  bookingsByPackage: Array<{ packageTitle: string; bookingCount: number }>;
}

export interface RecentBookingActivityResponse {
  bookings: RecentBookingActivityResult[];
  schedules: UpcomingScheduleResult[];
}

export interface RecentBookingActivityResult {
  id:string;
  userName: string;
  packageTitle: string;
  startDate: Date;
  endDate: Date;
  groupType: GroupType;
  travellerCount:number;
  finalAmount: number;
  status: BookingStatus;
  createdAt: Date;
}

export interface UpcomingScheduleResult {
  _id: string;
  startDate: Date;
  endDate: Date;
  packageTitle: string;
  status: ScheduleStatus | 'ongoing';
  bookedCount: number;
  totalSeats: number;
}

