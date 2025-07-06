import FormComponent from "@/features/auth/components/FormComponent";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layouts/AuthLayout";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/features/auth/validations/login.schema";
import type { FormField } from "@/features/auth/components/FormComponent";
// import type { LoginFormInputs } from "@/components/FormComponent";



const Signin = () => {
  const fields: FormField<LoginSchemaType>[] = [
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

  const handleLogin = (data: LoginSchemaType) => {
    console.log("login data", data);
    // Api call
  };


  return (
    <AuthLayout
      cardTitle={"Login to your account"}
      cardDescription={"Enter your email below to login to your account"}
      cardAction={<Button variant={"link"}>Sign Up</Button>}
      footer={
        <>
          <Button variant={"outline"} className="w-full">
            Login with google
          </Button>
        </>
      }
    >
      <FormComponent<LoginSchemaType> fields={fields} forgotp={true} onSubmit={handleLogin} buttonText={"Login"}  resolver={zodResolver(loginSchema)} />
    </AuthLayout>
  );
};

export default Signin;