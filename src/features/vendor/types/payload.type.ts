export type VendorVerificationPayload = {
  gstin: string;
  ownerName: string;
  businessAddress: string;
  files: { fieldName: string; key: string }[];
};

export type UpdateProfilePayload = {
  vendorInfoId: string,
   files: { fieldName: string; key: string }[];
}