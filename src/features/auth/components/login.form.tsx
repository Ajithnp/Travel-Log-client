import { GalleryVerticalEnd } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm, type Path, type FieldValues, type Resolver } from 'react-hook-form';
import { Link } from 'react-router-dom';
import GoogleAuth from "./GoogleAuth"


export type FormField<T> = {
    label: string;
    name: Path<T>;
    type?: string;
    placeholder?: string;
}

interface SharableFormProps<T extends FieldValues> {
    fields: FormField<T>[];
    formType?: string;
    forgotp?: boolean;
    onSubmit: (formData: T) => void;
    buttonText: React.ReactNode;
    resolver?: Resolver<T>;
    footer?: boolean
    role?: 'auth' | 'vendor';

}

export const LoginForm1 = <T extends FieldValues>({
    fields,
    formType,
    onSubmit,
    buttonText,
    footer,
    role,
    forgotp,
    resolver
}: SharableFormProps<T>) => {

    const { register, handleSubmit, formState: { errors } } = useForm<T>({ resolver });

    return (
        <div className={cn("flex flex-col gap-6")} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex size-8 items-center justify-center rounded-md">
                                <GalleryVerticalEnd className="size-6" />
                            </div>
                            <span className="sr-only">Acme Inc.</span>
                        </a>

                        <h1 className="text-xl font-bold">Welcome to TravelLog.</h1>
                        <div className="text-center text-sm">

                            {formType === 'signin' && 'Dont have an account?'}
                            {formType === 'signup' && 'Already have an account? '}


                            {formType === 'signin' && <Link to={`/${role}/register`} className="underline underline-offset-4">
                                {formType === 'signin' && 'Signup'}
                            </Link>}

                            {formType === 'signup' && <Link to={`/${role}/login`} className="underline underline-offset-4">
                                {formType === 'signup' && 'Signin'}
                            </Link>}


                        </div>

                    </div>
                    <div className="flex flex-col gap-6">


                        {fields.map((field, index) => (
                            <div key={index} className="grid gap-3">
                                {/* <Label htmlFor={String(field.name)}>{field.label}</Label> */}
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

                        <Button type="submit" className="w-full" variant={"default"}>
                            {buttonText}
                        </Button>
                        {/* // forgot password */}
                        {forgotp && <div className="flex justify-center">
                            <Link to={`/${role}/forgot-password`}>
                                <Button
                                    className="p-0 text-sm font-medium hover:underline mb-0 mt-0 cursor-pointer"
                                    variant="link"
                                >
                                    forgot password
                                </Button>
                            </Link>
                        </div>
                        }


                    </div>
                    {footer &&
                        <>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-background text-muted-foreground relative z-10 px-2">
                                    Or
                                </span>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-1 justify-items-center">
                                {/* <Button variant="outline" type="button" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Apple
                                </Button> */}
                                {/* <Button variant="outline" type="button" className="w-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button> */}

                                <GoogleAuth />
                            </div>
                        </>
                    }
                </div>
            </form>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}
