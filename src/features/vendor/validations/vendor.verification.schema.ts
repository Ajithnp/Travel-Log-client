
import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/png", "image/jpeg"]

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
  businessLicence: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Business licence is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only PDF, PNG, and JPEG files are accepted"),
  businessPan: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Business PAN is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only PDF, PNG, and JPEG files are accepted"),
  companyLogo: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Company logo is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only PDF, PNG, and JPEG files are accepted"),
  ownerIdentityProof: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "Owner identity proof is required")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
    .refine((files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only PDF, PNG, and JPEG files are accepted"),
})

export type VendorVerificationFormType = z.infer<typeof vendorVerificationSchema>

