import {
  basePackageSchema,
  activitySchema,
  itineraryDaySchema,
  packageImageSchema,
  ACTIVITY_TYPE_ENUM,
  CATEGORY_ENUM,
  DIFFICULTY_ENUM,
} from "./base-package-schema";
import z from "zod";


const createActivitySchema = activitySchema
  .extend({
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:MM format"),

    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "End time must be in HH:MM format"),

    title: z.string().min(2, "Activity title is required"),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be at most 1000 characters"),

    location: z.string().min(2, "Activity location is required"),

    type: z.enum(ACTIVITY_TYPE_ENUM, {
      errorMap: () => ({ message: "Please select a valid activity type" }),
    }),

    included: z.boolean(),
  })
  .superRefine((activity, ctx) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
    const start = toMinutes(activity.startTime);
    const end = toMinutes(activity.endTime);

    if (end < start) {
      ctx.addIssue({
        path: ["endTime"],
        message: "End time must be after start time",
        code: z.ZodIssueCode.custom,
      });
    } else if (end === start) {
      ctx.addIssue({
        path: ["endTime"],
        message: "Start and end time cannot be the same",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const createItinerarySchema = itineraryDaySchema.extend({
  // dayNumber: z.number().int().min(1),

  title: z.string().min(2, "Day title is required"),

  activities: z
    .array(createActivitySchema)
    .min(1, "Each day must have at least one activity"),
});

export const createPackageSchema = basePackageSchema
  .extend({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must be at most 100 characters"),

    location: z
      .string()
      .min(2, "Location must be at least 2 characters")
      .max(100, "Location must be at most 100 characters"),

    category: z.enum(CATEGORY_ENUM, {
      errorMap: () => ({ message: "Please select a valid category" }),
    }),

    difficultyLevel: z.enum(DIFFICULTY_ENUM, {
      errorMap: () => ({ message: "Please select a valid difficulty level" }),
    }),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(1000, "Description must be at most 1000 characters"),

    days: z
      .string()
      .min(1, "Days is required")
      .refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1;
      }, "Days must be at least 1"),

    nights: z.string().min(1, "Nights is required"),

    basePrice: z
      .string()
      .min(1, "Base price is required")
      .refine((val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      }, "Give a valid price"),

    images: z
      .array(packageImageSchema)
      .min(4, "Minimum 4 images required")
      .max(20, "Maximum 20 images allowed"),

    itinerary: z
      .array(createItinerarySchema)
      .min(1, "At least one itinerary day is required"),

    inclusions: z.array(z.string().min(1)),

    exclusions: z.array(z.string().min(1)),

    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (Number(data.days) !== data.itinerary.length) {
      ctx.addIssue({
        path: ["days"],
        code: z.ZodIssueCode.custom,
        message: "",
      });
    }
  })
  .refine(
    (data) => Number(data.nights) === Math.max(Number(data.days) - 1, 0),
    {
      path: ["nights"],
      message: "Nights should be days minus one",
    },
  );
