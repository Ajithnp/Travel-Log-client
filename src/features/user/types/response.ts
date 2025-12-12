import type{ ApiResponse } from "@/types/IApiResponse";

export interface UserProfileData {
    id: string;
    role: 'user' | 'vendor' | 'admin';
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    createdAt: string;

}

export type VendorProfileResponse = ApiResponse<UserProfileData>;

export type ChangeEmailRequestResponse = {
    otpExpiresIn: number;
    serverTime: number;
    email: string;
  
};