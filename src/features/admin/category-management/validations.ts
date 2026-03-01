import z from "zod";

export const categorySchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .min(4, "Name must be at least 4 characters"),
  description: z.string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
});

export type CategoryForm = z.infer<typeof categorySchema>;