import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { type Path, type FieldValues, type UseFormRegister,type FieldErrors } from "react-hook-form";

export type FormField<T> = {
  label: string;
  name: Path<T>;
  type: string;
  placeholder?: string;
  showToggle?: boolean;
};

interface AuthFieldsProps<T extends FieldValues> {
  fields: FormField<T>[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;

}


const PasswordInput = <T extends FieldValues>({
  field,
  register,
  errors,
}: {
  field: FormField<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="grid gap-3">
      <div className="relative">
        <Input
          id={String(field.name)}
          type={show ? "text" : "password"}
          placeholder={field.placeholder || ""}
          className="pr-10 caret-black" 
          {...register(field.name as Path<T>, {
            required: `${field.label} is required`,
          })}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          tabIndex={-1} 
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {errors[field.name] && (
        <span className="text-sm text-red-500">
          {String(errors[field.name]?.message)}
        </span>
      )}
    </div>
  );
};

export const AuthFields = <T extends FieldValues>({
  fields,
  register,
  errors,
}: AuthFieldsProps<T>) => {
  return (
    <>
      {fields.map((field, index) =>
        field.showToggle ? (
          <PasswordInput
            key={index}
            field={field}
            register={register}
            errors={errors}
          />
        ) : (
          <div key={index} className="grid gap-3">
            <Input
              id={String(field.name)}
                type={field.type}
                className="caret-black"
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
        )
      )}
    </>
  );
};
