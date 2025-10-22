import type{ ApiResponse } from "@/types/IApiResponse";

export interface UserProfileData {
    id: string;
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    createdAt: string;

}

export type VendorProfileResponse = ApiResponse<UserProfileData>