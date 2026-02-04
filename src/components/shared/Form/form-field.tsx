import type { ReactNode } from "react";
import {
  useController,
  useFormContext,
  useFormState,
  type FieldValues,
  type RegisterOptions,
  type ControllerRenderProps,
  type UseFormRegisterReturn,
} from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  name: string;
  label?: string;
  required?: boolean;
  rules?: RegisterOptions;
  labelClassName?: string;
  children: (field: ControllerRenderProps<any, string>) => ReactNode;
}

export function FormField({
  name,
  label,
  required = false,
  labelClassName,
  rules,
  children,
}: FormFieldProps) {
  const { register } = useFormContext();
  const { control } = useFormContext();
//=======================================
    const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? "This field is required" : false,
      ...rules,
    },
    
  });

  //==================================
  // const { errors } = useFormState({ name });

  // const error = name.split(".").reduce<any>((acc, key) => acc?.[key], errors);

  return (
    <div className="space-y-1">
      {label && (
        <Label
          className={cn(
            "block text-sm font-medium text-foreground mb-2",

            labelClassName
          )}
        >
          {label}

          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      {/* {children(
        register(name, {
          required: required ? "This field is required" : false,
          ...rules,
        })
      )} */}
           {children(field)}

      {error?.message && (
        <p className="text-xs text-destructive">{error.message as string}</p>
      )}
    </div>
  );
}
