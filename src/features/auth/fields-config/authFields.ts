import type { LoginSchemaType } from "@/features/auth/validations/login-schema";
import type { FormField } from "../components/auth-form/FormFields";
import type { SignupSchemaType } from "@/features/auth/validations/register-schema";
import type { EmailSchemaType } from "@/features/auth/validations/email-schema";
import type { NewPasswordSchemaType } from "@/features/auth/validations/password-schema";

export const loginFields: FormField<LoginSchemaType>[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter password",
  },
];

export const signupFields = (isVendor?: boolean): FormField<SignupSchemaType>[] => [
  {
    label: isVendor ? "Business Name" : "Name",
    name: "name",
    type: "text",
    placeholder: isVendor ? "Enter your business name" : "Enter your name",
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Phone",
    name: "phone",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Re-enter password",
  },
];

export const emailFields: FormField<EmailSchemaType>[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "Enter your email",
  },
];

export const newPasswordFields: FormField<NewPasswordSchemaType>[] = [
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter new password",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "Re-enter password",
  },
];

