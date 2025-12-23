import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupSchemaType,
} from "@/features/auth/validations/register-schema";
import { Loader } from "lucide-react";
import { signupFields } from "@/features/auth/fields-config/authFields";
import { AuthForm } from "../../components/auth-form/AuthForm";
import { ROLE } from "@/types/Role";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useRegisterLogic from "../../hooks/useRegisterLogic";

const RegisterPage = () => {
  const { handleRegister, isLoading } = useRegisterLogic({role:ROLE.USER});

  return (
    <>
      <AuthForm<SignupSchemaType>
        fields={signupFields()}
        formType={COMPONENT_TEXT.SIGN_UP}
        onSubmit={handleRegister}
        buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.SIGN_UP}
        footer
        role={ROLE.USER}
        resolver={zodResolver(signupSchema)}
      />
    </>
  );
};

export default RegisterPage;
