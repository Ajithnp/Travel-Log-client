import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string()
      .min(2, "Name must be at least 2 characters")
     .max(25, "Name cannot exceed 25 characters")
    ,
    email: z.string().email("Invalid email address"),
     phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password cannot exceed 15 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase and number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
