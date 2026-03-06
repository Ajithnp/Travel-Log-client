import { z } from "zod";

export const DIFFICULTY_ENUM = [
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
] as const;


export const packageImageSchema = z.object({
  url: z.string().url("Invalid image URL").optional(), // Present for existing images
  key: z.string(), // Present for existing images (S3 Key)
  file: z.instanceof(File).optional(), // Present for new local selections
  status: z.enum(["PENDING_UPLOAD", "UPLOADED", "REMOVED"]).optional(),
});

export const activitySchema = z.object({
  startTime: z.string(),

  endTime: z.string(),

  title: z.string(),

  description: z.string(),

  location: z.string(),

  specials: z.array(z.string()).transform(arr => arr.filter(s => s.trim() !== "")),

  included: z.boolean(),
});

export const itineraryDaySchema = z.object({
  title: z.string(),

  dayNumber: z.number(),

  activities: z.array(activitySchema),
});

export const basePackageSchema = z.object({
  title: z.string(),

  location: z.string(),

  state: z.string(),

  usp: z.string(),

  categoryId:z.string(),

  difficultyLevel: z.enum(DIFFICULTY_ENUM).optional(),

  description: z.string(),

  days: z.string(),

  nights: z.string(),

  basePrice: z.string(),

  images: z.array(packageImageSchema),

  itinerary: z.array(itineraryDaySchema),

  inclusions: z.array(z.string()),

  exclusions: z.array(z.string()),

  packingList: z.array(z.string()),

  cancellationPolicy: z.enum(["Flexible", "Moderate", "Strict", "Non-Refundable"]).optional(),
 
  isActive: z.boolean(),
});

export type BasePackageSchema = z.infer<typeof basePackageSchema>;
