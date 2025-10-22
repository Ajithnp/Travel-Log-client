import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type EmailSchemaType = z.infer<typeof emailSchema>;