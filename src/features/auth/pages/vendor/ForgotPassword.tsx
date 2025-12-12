import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  type EmailSchemaType,
} from "@/features/auth/validations/email-schema";
import { Loader } from "lucide-react";
import { emailFields } from "@/features/auth/fields-config/authFields";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { AuthForm } from "../../components/auth-form/AuthForm";
import useForgotPasswordLogic from "../../hooks/useForgotPasswordLogic";

const VendorForgotPasswordPage = () => {
  const {handleEmailVerify, isLoading } = useForgotPasswordLogic();

  return (
    <AuthForm<EmailSchemaType>
      fields={emailFields}
      onSubmit={handleEmailVerify}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.VERIFY_EMAIL}
      footer={false}
      forgotp={false}
      resolver={zodResolver(emailSchema)}
    />
  );
};

export default VendorForgotPasswordPage;
