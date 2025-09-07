
import type { LoginSchemaType } from "../validations/login.schema";
import type { SignupSchemaType } from "../validations/register.schema";
import type { FormField } from "../components/login.form";
import type { EmailSchemaType } from "../validations/email.schema";
import type { PasswordSchemaType } from "../validations/password.schema";

export const ROLE ={
    USER:"user",
    VENDOR:"vendor",
    ADMIN:"admin"
}as const;

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "vendor";
}

export const loginFields: FormField<LoginSchemaType>[] = [
    {label: "Email",name: "email", type: "email",placeholder: "Enter your email"},
    {label: "Password",name: "password", type: "password",placeholder: "Enter password"}

];

export const signupFields: FormField<SignupSchemaType>[] = [
        { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
        { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
        { label: "Phone", name: "phone", type: "text", placeholder: "Enter your phone number" },
        { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
        { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Re-enter password" },
    ];

export const emailFields: FormField<EmailSchemaType>[] = [
    { label: "Email",  name: "email", type: "email",   placeholder: "Enter your email",}
  ];

export const newPasswordFields: FormField<PasswordSchemaType>[] = [
        { label: "Password",  name: "password", type: "password", placeholder: "Enter new password"},
        { label: "Confirm Password", name: "confirmPassword",   type: "password",   placeholder: "Re-enter password"}
        
    ];



