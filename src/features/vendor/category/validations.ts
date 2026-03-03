import z from "zod";

export const requestCategorySchema = z.object({
  name: z.string()
    .min(1, "Category name is required")
    .min(4, "Name must be at least 4 characters"),
  vendorNote: z.string()
    .min(1, "Your note  is required")
    .min(10, "Description must be at least 10 characters"),
});

export type RequestCategoryForm = z.infer<typeof requestCategorySchema>;