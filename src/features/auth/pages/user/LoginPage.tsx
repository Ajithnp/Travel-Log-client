import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/features/auth/validations/login-schema";
import { loginFields } from "@/features/auth/fields-config/authFields";
import { Loader } from "lucide-react";
import { AuthForm } from "../../components/auth-form/AuthForm";
import { ROLE } from "@/types/Role";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useLoginLogic from "../../hooks/useLoginLogic";

const LoginPage = () => {
  const { handleLogin, isPending } = useLoginLogic({role:ROLE.USER});

  return (
    <>
      <AuthForm<LoginSchemaType>
        fields={loginFields}
        formType={COMPONENT_TEXT.SIGN_IN}
        onSubmit={handleLogin}
        buttonText={isPending ? <Loader /> : COMPONENT_TEXT.SIGN_IN}
        footer
        forgotp
        role={ROLE.USER}
        resolver={zodResolver(loginSchema)}
      />
    </>
  );
};

export default LoginPage;
