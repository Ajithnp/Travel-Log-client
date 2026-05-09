import type { VendorStatus } from "../types/response.type";

export interface IFiles {
  key: string;
  fieldName: string;
}

export interface IVendorVerificationResponse {
  id: string;
  gstin: string;
  ownerName: string;
  businessAddress: string;
  bio: string;
  
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
  accountHolderName: string;

  businessLicence?: IFiles;
  businessPan?: IFiles;
  companyLogo?: IFiles;
  ownerIdentityProof?: IFiles;
    
  status: VendorStatus;
  rejectedReason: string;
}