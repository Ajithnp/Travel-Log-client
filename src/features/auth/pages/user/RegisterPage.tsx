import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupSchema,
  type SignupSchemaType,
} from "@/features/auth/validations/register-schema";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../hooks/auth.hooks";
import { toast } from "sonner";
import { setStorageItem } from "@/utils/utils";
import { Loader } from "lucide-react";
import { signupFields } from "@/features/auth/fields-config/authFields";
import { AuthForm } from "../../components/auth-form/AuthForm";
import { ROLE } from "@/types/Role";
import { ROUTES } from "@/lib/constants/routes";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

  const handleRegister = (data: SignupSchemaType) => {
    registerUser(
      { ...data, role: ROLE.USER },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, {
            email: response.data.email,
            role: response.data.role,
          });
          navigate(`${BASE_ROUTE.USER}${ROUTES.VERIFY_EMAIL}`);
        },

        onError: (error) => {
          toast.error(error.response?.data?.message);
        },
      }
    );
  };

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
