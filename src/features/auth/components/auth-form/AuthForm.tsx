import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";
import AuthHeader from "./AuthFormHeader";
import { AuthFields, type FormField } from "./FormFields";
import ForgotPasswordLink from "./ForgotPasswordLink";
import AuthFooter from "./AuthFormFooter";

interface AuthFormProps<T extends FieldValues> {
    fields: FormField<T>[];
    formType?: "Sign In" | "Sign Up";
    forgotp?: boolean;
    onSubmit: (formData: T) => void;
    buttonText: React.ReactNode;
    resolver?: Resolver<T>;
    footer?: boolean;
    role?: "user" | "vendor";
}

export const AuthForm = <T extends FieldValues>({
    fields,
    formType,
    onSubmit,
    buttonText,
    footer,
    role,
    forgotp,
    resolver,
}: AuthFormProps<T>) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<T>({ resolver });

    return (
        <div className={cn("flex flex-col gap-6")}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <AuthHeader formType={formType} role={role} />
                    <div className="flex flex-col gap-6">
                        <AuthFields fields={fields} register={register} errors={errors} />

                        <Button type="submit" className="w-full cursor-pointer">
                            {buttonText}
                        </Button>

                        {forgotp && <ForgotPasswordLink role={role} />}
                    </div>
                    <AuthFooter showSocial={footer} />
                </div>
            </form>
        </div>
    );
};
