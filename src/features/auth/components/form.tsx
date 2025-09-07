import React from 'react'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm, type Path, type FieldValues, type Resolver } from 'react-hook-form';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';


export type FormField<T> ={
    label: string;
    name: Path<T>;
    type?: string;
    placeholder?: string;
}

interface SharableFormProps <T extends FieldValues> {
    fields: FormField<T>[];
    forgotp?: boolean;
    onSubmit: (formData: T) => void;
    buttonText: string;
    resolver?: Resolver<T>;
    footer?: React.ReactNode;
    showGoogleBtn?:boolean
    role?: 'user' | 'vendor';
   
}


const FormComponent = <T extends FieldValues>({
    fields,
     forgotp,
     onSubmit,
     buttonText,
     footer,
     showGoogleBtn,
     role,
     resolver} :SharableFormProps<T>) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<T>({ resolver });

    // const handleFormSubmit = (data: T) => {
    //     onSubmit(data)
    //     console.log('test - data', data)
    // }

  return (
   
        <form onSubmit={handleSubmit(onSubmit)}
          className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
              </div>
                {fields.map((field, index) => (
                    <div key={index} className="grid gap-2">
                    <Label htmlFor={String(field.name)}>{field.label}</Label>
                    <Input
                        id={String(field.name)}
                        type={field.type || 'text'}
                        placeholder={field.placeholder || ''}
                        {...register(field.name as Path<T>, {
                        required: `${field.label} is required`,
                        })}
                    />
                    {errors[field.name] && (
                        <span className="text-sm text-red-500">
                        {String(errors[field.name]?.message as string || '')}
                        </span>
                    )}
                    </div>
                ))}

            
            {forgotp && (
                <div className="grid gap-2">
                  {role === 'user' ? (
                    <Link to='/auth/forgot-password'
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  ) : (
                    <Link to='/vendor/auth/forgot-password'
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                  )}
              </div>
            )}


              <Button type="submit" className="w-full">
                {isSubmitting ? "Loading" : buttonText}
              </Button>


            {showGoogleBtn && (
                <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="flex justify-center">
              
                {/* <Button variant="outline" className="w-full" onClick={()=> <GoogleAuth />}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button> */}
                 <GoogleAuth />
             
              </div>
              </>
            )}


             {footer}


            </div>
          </form>
  )
}

export default FormComponent;
