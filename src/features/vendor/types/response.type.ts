import type{ ApiResponse } from "@/types/IApiResponse";

export interface VendorProfileData {
  id: string;
  profileLogo: string;
  name: string;
  email: string;
  phone?: string;
  businessAddress: string;
  isProfileVerified: boolean;
  status: 'Pending' | 'Approved' | 'Rejected';
  reasonForReject: string;
}

export type VendorProfileResponse = ApiResponse<VendorProfileData>