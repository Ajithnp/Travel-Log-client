import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";
import FormComponent from "@/features/auth/components/FormComponent";
import type { FormField } from "@/features/auth/components/FormComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchemaType } from "@/features/auth/validations/register.schema";


const Signup = () => {

    const fields: FormField<SignupSchemaType>[] = [
        { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
        { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
         { label: "Phone", name: "phone", type: "text", placeholder: "Enter your phone number" },
        { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
        { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Re-enter password" },
    ]

    const handleSignup = (data:SignupSchemaType) =>{
        console.log("login data",data);
        // api call
        
    }
  return (
    <AuthLayout
      cardTitle={"Register your account"}
      cardDescription={"Enter your details below the Signup account"}
      cardAction={<Button variant={"link"}>Sign In</Button>}
      footer={
        <>
          <Button variant={"outline"} className="w-full">
            Login with google
          </Button>
        </>
      }
    >
      <FormComponent<SignupSchemaType> fields={fields} onSubmit={handleSignup} buttonText={"Signup"}  resolver={zodResolver(signupSchema)} />
    </AuthLayout>
  );

}

export default Signup





