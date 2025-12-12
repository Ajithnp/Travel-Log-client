import { AuthForm } from "../../components/auth-form/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginSchemaType,
} from "@/features/auth/validations/login-schema";
import { Loader } from "lucide-react";
import { ROLE } from "@/types/Role";
import { loginFields } from "@/features/auth/fields-config/authFields";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useLoginLogic from "../../hooks/useLoginLogic";

const VendorLoginPage = () => {
  const { handleLogin, isPending } = useLoginLogic({role:ROLE.VENDOR});

  return (
    <>
      <AuthForm<LoginSchemaType>
        fields={loginFields}
        formType={COMPONENT_TEXT.SIGN_IN}
        onSubmit={handleLogin}
        buttonText={isPending ? <Loader /> : COMPONENT_TEXT.SIGN_IN}
        footer
        forgotp
        role={ROLE.VENDOR}
        resolver={zodResolver(loginSchema)}
      />
    </>
  );
};

export default VendorLoginPage;
