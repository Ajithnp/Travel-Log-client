import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchemaType } from "@/features/auth/validations/register-schema";
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../hooks/auth.hooks';
import { toast } from 'sonner';
import { setStorageItem } from '@/utils/utils';
import { Loader } from "lucide-react";
import { ROLE } from "@/types/Role";
import { signupFields } from "@/features/auth/fields-config/authFields";
import { AuthForm } from "../../components/auth-form/AuthForm";
import { BASE_ROUTE, ROUTES } from "@/lib/constants/routes";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";
import { LOCAL_STORAGE_KEY } from "@/lib/constants/storageIdentifier";

const VendorRegisterPage = () => {

  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

  const handleRegister = (data: SignupSchemaType) => {
    registerUser({ ...data, role: ROLE.VENDOR },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setStorageItem(LOCAL_STORAGE_KEY.VERIFY_EMAIL, { email: response.data.email, role: response.data.role });
          navigate(`${BASE_ROUTE.VENDOR}${ROUTES.VERIFY_EMAIL}`)
        },

        onError: (error) => {
          toast.error(error.response?.data?.message)
        }

      }
    );
  };

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