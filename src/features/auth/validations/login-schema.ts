import { z } from "zod";

export const loginSchema = z.object({
  email: z
  .string()
  .min(1, "Provide the details")
  .email("Please enter a valid email"),

  password: z
  .string({ required_error: "Provide the details" })
  .min(1, "Provide the details")
  .min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;