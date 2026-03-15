import type{ VendorStatus } from "@/features/vendor/types/response.type";
export interface IVendorInfo {
  id: string;
  profileLogo?: string;
  isProfileVerified: boolean;
  contactPersonName: string;
  businessAddress: string;
  businessLicence: string;
  businessPan:string;
  ownerIdentity:string;
  GSTIN: string;
  accountNumber:string;
  ifsc:string;
  accountHolderName:string;
  bankName:string;
  branch: string;
  status: VendorStatus;
  reasonForReject?: string;
  userId: string;
  role: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
//   actions?: string;
}
