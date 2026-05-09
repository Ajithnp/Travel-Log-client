import type { IVendorVerificationResponse } from "../api.types";
import type { VendorVerificationFormType } from "../validations/vendor.verification.schema";

export const buildVerificationDefaultValues = (
  priorData?: IVendorVerificationResponse
): Partial<VendorVerificationFormType> | undefined => {
  if (!priorData) return undefined;

  return {
    gstin:              priorData.gstin,
    ownerName:          priorData.ownerName,
    businessAddress: priorData.businessAddress,
    bio:               priorData.bio,                
    accountNumber:      priorData.accountNumber,
    ifsc:               priorData.ifsc,
    bankName:           priorData.bankName,
    branch:             priorData.branch,
    accountHolderName:  priorData.accountHolderName,
    businessLicence:    priorData.businessLicence,
    businessPan:        priorData.businessPan,
    companyLogo:        priorData.companyLogo,
    ownerIdentityProof: priorData.ownerIdentityProof,
  };
};