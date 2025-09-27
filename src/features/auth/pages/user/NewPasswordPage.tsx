import React, { useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../../hooks/auth.hooks";
import { Loader } from "lucide-react";
import {
  passwordSchema,
  type NewPasswordSchemaType,
} from "@/features/auth/validations/password-schema";
import { getStorageitem, removeStorageItem } from "@/utils/utils";
import { toast } from "sonner";
import { newPasswordFields } from "@/features/auth/fields-config/authFields";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { AuthForm } from "../../components/auth-form/AuthForm";

const UserNewPasswordPage = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const data = getStorageitem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);

  const { mutate: forgotPassword, isPending: isLoading } =
    useUpdatePasswordMutation();

  const handleEmailVerify = ({ password }: { password: string }) => {
    forgotPassword(
      { email: data.email, password },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          timeoutRef.current = setTimeout(() => {
            navigate(`${BASE_ROUTE.USER}${ROUTES.LOGIN}`);
          }, 2000);

          removeStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || ERROR_MESSAGES.SOMETHING_WENT_WRONG);
        },
      }
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AuthForm<NewPasswordSchemaType>
      fields={newPasswordFields}
      onSubmit={handleEmailVerify}
      buttonText={isLoading ? <Loader /> : COMPONENT_TEXT.UPDATE_PASSWORD}
      footer={false}
      forgotp={false}
      resolver={zodResolver(passwordSchema)}
    />
  );
};

export default UserNewPasswordPage;
