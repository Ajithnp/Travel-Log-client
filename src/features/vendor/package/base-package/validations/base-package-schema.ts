import { z } from "zod";

export const CATEGORY_ENUM = [
  "adventure",
  "cultural",
  "relaxation",
  "luxury",
] as const;
export const DIFFICULTY_ENUM = [
  "easy",
  "moderate",
  "challenging",
  "extreme",
] as const;
export const ACTIVITY_TYPE_ENUM = [
  "tour",
  "transport",
  "accommodation",
  "activity",
  "meal",
] as const;


export const packageImageSchema = z.object({
  url: z.string().url("Invalid image URL").optional(), // Present for existing images
  key: z.string().optional(), // Present for existing images (S3 Key)
  file: z.instanceof(File).optional(), // Present for new local selections
  status: z.enum(["PENDING_UPLOAD", "UPLOADED", "REMOVED"]).optional(),
});

export const activitySchema = z.object({
  startTime: z.string(),

  endTime: z.string(),

  title: z.string(),

  description: z.string(),

  location: z.string(),

  type: z.enum(["tour", "transport", "accommodation", "activity", "meal"]),

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

  category: z.enum(["adventure", "cultural", "relaxation", "luxury"]),

  difficultyLevel: z.enum(["easy", "moderate", "challenging", "extreme"]),

  description: z.string(),

  days: z.string(),

  nights: z.string(),

  basePrice: z.string(),

  images: z.array(packageImageSchema),

  itinerary: z.array(itineraryDaySchema),

  inclusions: z.array(z.string()),

  exclusions: z.array(z.string()),

  isActive: z.boolean(),
});

export type BasePackageSchema = z.infer<typeof basePackageSchema>;
