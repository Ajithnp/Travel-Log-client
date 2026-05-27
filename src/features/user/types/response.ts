import type{ ApiResponse } from "@/types/IApiResponse";

export interface UserProfileData {
    id: string;
    role: 'user' | 'vendor' | 'admin';
    name: string;
    phone: string;
    email: string;
    authProvider: 'google' | 'local'
    isBlocked: boolean;
    createdAt: string;

}

export interface UserDashboardResponse {
  reviewsCount: number;
  walletBalance: number;
  upcomingTrips: number;
  pastTrips: number;
};

export type VendorProfileResponse = ApiResponse<UserProfileData>;

export type ChangeEmailRequestResponse = {
    otpExpiresIn: number;
    serverTime: number;
    email: string;
  
};