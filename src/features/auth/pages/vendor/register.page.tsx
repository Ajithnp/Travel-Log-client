import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchemaType } from "@/features/auth/validations/register.schema";
import { useNavigate } from 'react-router-dom';
import { LoginForm1 } from '../../components/login.form';
import { useRegisterMutation } from '../../hooks/auth.hooks';
import { toast } from 'sonner';
import { setStorageItem } from '@/utils/utils';
import { Loader } from "lucide-react";
import { ROLE, signupFields } from "../../types/auth.types";

const VendorRegisterPage = () => {

  const navigate = useNavigate();
  const { mutate: registerUser, isPending: isLoading } = useRegisterMutation();

  const handleRegister = (data: SignupSchemaType) => {
    registerUser({ ...data, role: ROLE.VENDOR },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setStorageItem('verify-email', { email: response.data.email, role: response.data.role });
          navigate('/vendor/verify-email')
        },

        onError: (error) => {
          toast.error(error.response?.data?.message)
        }

      }
    );
  };

  return (
    <>
      <LoginForm1<SignupSchemaType>
        fields={signupFields}
        formType='signup'
        onSubmit={handleRegister}
        buttonText={isLoading ? <Loader /> : "Register"}
        footer={true}
        role={'vendor'}
        resolver={zodResolver(signupSchema)}

      />
    </>
  );
};

export default VendorRegisterPage;