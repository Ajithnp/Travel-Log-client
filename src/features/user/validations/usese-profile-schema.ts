import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
    .optional(),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;