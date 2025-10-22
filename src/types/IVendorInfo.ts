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
  status: "Pending" | "Approved" | "Rejected";
  reasonForReject?: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
//   actions?: string;
}
