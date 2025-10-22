import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSchema,
  type EmailSchemaType,
} from "@/features/auth/validations/email-schema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../hooks/auth.hooks";
import { Loader } from "lucide-react";
import { setStorageItem } from "@/utils/utils";
import { ROLE } from "@/types/Role";
import { emailFields } from "@/features/auth/fields-config/authFields";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { ROUTES } from "@/lib/constants/routes";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { AuthForm } from "../../components/auth-form/AuthForm";

const VendorForgotPasswordPage = () => {
  const navigate = useNavigate();

  const { mutate: forgotPassword, isPending: isLoading } =
    useForgotPasswordMutation();

  const handleEmailVerify = ({ email }: { email: string }) => {
    forgotPassword(
      { email },
      {
        onSuccess: (response) => {
          if (response.data.role! == ROLE.VENDOR) {
            toast.error(ERROR_MESSAGES.USER_NOT_FOUND);
            return;
          }
          navigate(`${BASE_ROUTE.VENDOR}${ROUTES.OTP_VERIFY}`);
          setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
            email: response.data.email,
            role: response.data.role,
          });
        },
        onError: (error) => {
          toast.error(
            error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG
          );
        },
      }
    );
  };

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
