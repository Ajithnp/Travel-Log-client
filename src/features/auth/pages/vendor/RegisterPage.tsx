import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupSchemaType,
} from "@/features/auth/validations/register-schema";
import { Loader } from "lucide-react";
import { ROLE } from "@/types/Role";
import { signupFields } from "@/features/auth/fields-config/authFields";
import { AuthForm } from "../../components/auth-form/AuthForm";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import useRegisterLogic from "../../hooks/useRegisterLogic";

const VendorRegisterPage = () => {
  const { handleRegister, isLoading } = useRegisterLogic();

  return (
    <>
      <AuthForm<SignupSchemaType>
        fields={signupFields(true)}
        formType={COMPONENT_TEXT.SIGN_UP}
        onSubmit={handleRegister}
        buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.SIGN_UP}
        footer={true}
        role={ROLE.VENDOR}
        resolver={zodResolver(signupSchema)}
      />
    </>
  );
};

export default VendorRegisterPage;
