import z from "zod";

const travellerSchema = z.object({
  fullName:         z.string().min(2, "Full name is required"),
  idType:           z.string().min(1, "ID type is required"),
  idNumber:         z.string().min(4, "ID number is required"),
  phoneNumber:      z.string().min(10, "Valid phone number required"),
  emailAddress:     z.string().email("Valid email required").optional().or(z.literal("")),
  emergencyContact: z.string().optional(),
  relation:         z.string().optional(),
});
 
export const formSchema = z.object({ travellers: z.array(travellerSchema) });
 
export type FormValues = z.infer<typeof formSchema>;