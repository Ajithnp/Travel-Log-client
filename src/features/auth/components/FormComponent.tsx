
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// form hook:
import {useForm, type Path} from 'react-hook-form';
import type { Resolver } from "react-hook-form";
import type { FieldValues } from "react-hook-form";

export type FormField<T> = {
    label:string;
    name: Path<T>;
    type?:string;
    placeholder?:string;
}

interface FormComponentProps <T extends FieldValues>{
    fields: FormField<T>[];
    forgotp?: boolean;
    onSubmit:(formData: T)=> void;
    buttonText:string;
    resolver?: Resolver<T>;
}


const FormComponent = <T extends FieldValues>({ fields, forgotp, onSubmit, buttonText, resolver}:FormComponentProps<T>) => {
  const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<T>({ resolver })
  
   const handleFormSubmit = (data:T) => {
    onSubmit(data);
    console.log("data",data);
    
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="flex flex-col gap-6">
        {fields.map((field, index) => {
          return (
            <div key={index} className="grid gap-2">
              <Label htmlFor={String(field.name)}>{field.label}</Label>
              <Input
                id={String(field.name)}
                type={field.type || "text"}
                placeholder={field.placeholder || ""}
                {...register(field.name as Path<T>, {
                  required: `${field.label} is required`,
                })}
              />
              {errors[field.name] && (
                <p className="text-sm text-red-600">
                   {errors[field.name]?.message as string || ""}
                </p>
              )}
            </div>
          );
        })}

        <div className="grid gap-2">
          {forgotp && (
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          )}

        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full" variant={"destructive"}> 
          {isSubmitting ? "Loading" : buttonText}
           </Button>
      </div>
    </form>
  );
};

export default FormComponent;
