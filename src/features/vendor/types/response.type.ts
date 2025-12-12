
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
  status: 'Pending' | 'Approved' | 'Rejected';
  reasonForReject: string;
}

