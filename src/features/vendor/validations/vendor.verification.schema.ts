import { z } from "zod";
export const vendorVerificationSchema = z.object({
  gstin: z.string().min(1, "GSTIN is required"),
  ownerName: z.string().min(1, "Owner name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessLicence: z
    .any()
    .refine((f) => f?.length === 1, "Business Licence is required"),
  businessPan: z
    .any()
    .refine((f) => f?.length === 1, "Business PAN is required"),
  companyLogo: z
    .any()
    .refine((f) => f?.length === 1, "Company Logo is required"),
  ownerIdentityProof: z
    .any()
    .refine((f) => f?.length === 1, "Owner Identity Proof is required"),
});

export type VendorVerificationFormType = z.infer<
  typeof vendorVerificationSchema
>;
