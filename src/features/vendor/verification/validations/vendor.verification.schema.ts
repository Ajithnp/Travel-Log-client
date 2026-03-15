
import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"]
const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg"];

const fileField = (requiredMsg: string, acceptedTypes = ACCEPTED_FILE_TYPES) =>
  z
    .instanceof(File, { message: requiredMsg })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine(
      (file) => acceptedTypes.includes(file.type),
      acceptedTypes.includes("application/pdf")
        ? "Only PDF, PNG, and JPEG files are accepted"
        : "Only PNG and JPEG files are accepted"
    );

export const vendorVerificationSchema = z.object({
  gstin: z
    .string()
    .min(1, "GSTIN is required")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  ownerName:
    z.string().min(1, "Owner name is required")
      .min(2, "Owner name must be at least 2 characters")
      .max(15, "Owner name cannot exceed 15 characters"),
  businessAddress: z
    .string()
    .min(1, "Business address is required")
    .min(5, "Business address must be at least 5 characters"),
  
  accountNumber: z
  .string()
  .min(9, "Account number must be at least 9 digits")
  .max(18, "Account number cannot exceed 18 digits")
  .regex(/^[0-9]+$/, "Account number must contain only digits")
  .transform((val) => val.replace(/\s+/g, "")),

  ifsc: z
  .string()
  .min(11, "IFSC must be 11 characters")
  .max(11, "IFSC must be exactly 11 characters")
  .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format")
  .transform((val) => val.toUpperCase()),

  accountHolderName: z
  .string()
  .min(2, "Account holder name must be at least 2 characters")
  .max(50, "Account holder name cannot exceed 50 characters")
  .regex(/^[A-Za-z.\s]+$/, "Name can only contain letters and spaces"),
  
bankName: z.string().min(1, "Bank name is required (enter a valid IFSC)"),
branch: z.string().min(1, "Branch is required (enter a valid IFSC)"),
  
    businessLicence: fileField("Business licence is required"),
  businessPan: fileField("Business PAN is required"),
  companyLogo: fileField("Company logo is required", ACCEPTED_LOGO_TYPES),
  ownerIdentityProof: fileField("Owner identity proof is required"),
})

export type VendorVerificationFormType = z.infer<typeof vendorVerificationSchema>

