import z from "zod";


const ruleSchema = z.object({
  daysBeforeTrip: z
    .number({ invalid_type_error: "Required" })
    .int("Must be a whole number")
    .min(0, "Cannot be negative"),
  refundPercent: z
    .number({ invalid_type_error: "Required" })
    .int("Must be a whole number")
    .min(0, "Min 0%")
    .max(100, "Max 100%"),
});

export const policySchema = z.object({
  label: z
    .string()
    .min(2, "Label must be at least 2 characters")
    .max(50, "Label must be at most 50 characters"),
  key: z
    .string()
    .min(2, "Key must be at least 2 characters")
    .max(30, "Key must be at most 30 characters")
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, digits, and underscores"),
  description: z.string().max(300, "Max 300 characters").optional(),
  rules: z
    .array(ruleSchema)
    .min(1, "Add at least one refund rule")
    .refine(
      (rules) => {
        const days = rules.map((r) => r.daysBeforeTrip);
        return new Set(days).size === days.length;
      },
      { message: "Each 'days before trip' value must be unique" }
    ),
});

export const defaultValues = {
  label: "",
  key: "",
  description: "",
  rules: [{ daysBeforeTrip: 0, refundPercent: 100 }],
};