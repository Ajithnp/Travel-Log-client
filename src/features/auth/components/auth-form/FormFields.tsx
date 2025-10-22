import { Input } from "@/components/ui/input";
import { type Path, type FieldValues, type UseFormRegister,type FieldErrors } from "react-hook-form";

export type FormField<T> = {
  label: string;
  name: Path<T>;
  type: string;
  placeholder?: string;
};

interface AuthFieldsProps<T extends FieldValues> {
  fields: FormField<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

export const AuthFields = <T extends FieldValues>({
  fields,
  register,
  errors,
}: AuthFieldsProps<T>) => {
  return (
    <>
      {fields.map((field, index) => (
        <div key={index} className="grid gap-3">
          <Input
            id={String(field.name)}
            type={field.type}
            placeholder={field.placeholder || ""}
            {...register(field.name as Path<T>, {
              required: `${field.label} is required`,
            })}
          />
          {errors[field.name] && (
            <span className="text-sm text-red-500">
              {String(errors[field.name]?.message)}
            </span>
          )}
        </div>
      ))}
    </>
  );
};
