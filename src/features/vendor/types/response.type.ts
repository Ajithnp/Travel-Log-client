export type VendorStatus =
  | 'Pending'
  | 'UnderReview'
  | 'Approved'
  | 'Rejected'
  | 'Suspended';

export interface VendorProfileData {
  id: string;
  role: string;
  userId?: string;
  profileLogo: string;
  name: string;
  email: string;
  phone?: string;
  businessAddress: string;
  isProfileVerified: boolean;
  status: VendorStatus;
  reasonForReject: string;
}

