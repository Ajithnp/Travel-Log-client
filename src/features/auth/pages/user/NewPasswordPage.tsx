import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import {
  passwordSchema,
  type NewPasswordSchemaType,
} from "@/features/auth/validations/password-schema";
import { newPasswordFields } from "@/features/auth/fields-config/authFields";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { AuthForm } from "../../components/auth-form/AuthForm";
import useNewPasswordLogic from "../../hooks/useNewPasswordLogic";

const UserNewPasswordPage = () => {

  const {handlePasswordUpdate, isLoading } = useNewPasswordLogic();

  return (
    <AuthForm<NewPasswordSchemaType>
      fields={newPasswordFields}
      onSubmit={handlePasswordUpdate}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.UPDATE_PASSWORD}
      footer={false}
      forgotp={false}
      resolver={zodResolver(passwordSchema)}
    />
  );
};

export default UserNewPasswordPage;
