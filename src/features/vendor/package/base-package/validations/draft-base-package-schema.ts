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

const draftItineraryDaySchema = itineraryDaySchema.extend({
  title: z.string().optional(),
  dayNumber: z.number().optional(),
  activities: z.array(draftActivitySchema).optional(),
});

export const draftPackageSchema = basePackageSchema.extend({
  title: z.string().optional(),
  location: z.string().optional(),
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
  isActive: z.boolean().optional(),
});

export type BasePackageDraftSchema = z.infer<typeof draftPackageSchema>;