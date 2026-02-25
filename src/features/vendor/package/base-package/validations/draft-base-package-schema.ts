import z from "zod";
import {
    basePackageSchema,
  activitySchema,
    packageImageSchema,
    itineraryDaySchema,
    ACTIVITY_TYPE_ENUM,
    DIFFICULTY_ENUM,
    CATEGORY_ENUM
} from "./base-package-schema";

const draftActivitySchema = activitySchema.extend({
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(), 
  type: z.enum(ACTIVITY_TYPE_ENUM).optional(),
  included: z.boolean().optional(),
});

export const draftItineraryDaySchema = itineraryDaySchema.extend({
  title: z.string().optional(),
  dayNumber: z.number().optional(),
  activities: z.array(draftActivitySchema).optional(),
});

export const draftPackageSchema = basePackageSchema.extend({
  title: z.string().optional(),
  location: z.string().optional(),
  pickupLocation: z.string().optional(),
  usp:z.string().optional(),
  category: z.enum(CATEGORY_ENUM).optional(),
  difficultyLevel: z.enum(DIFFICULTY_ENUM).optional(),
  description: z.string().optional(),
  days: z.string().optional(),
  nights: z.string().optional(),
  basePrice: z.string().optional(),
  images: z.array(packageImageSchema).optional(),
  itinerary: z.array(draftItineraryDaySchema).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  packingList:z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
cancellationPolicy: z.enum(["Flexible", "Moderate", "Strict","Non-Refundable",]).optional(),
});

export type BasePackageDraftSchema = z.infer<typeof draftPackageSchema>;

export const packageResponseSchema = draftPackageSchema.extend({
  packageId: z.string(),
  vendorId: z.string(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

export type BasePackageResponseDTO = z.infer<typeof packageResponseSchema>;