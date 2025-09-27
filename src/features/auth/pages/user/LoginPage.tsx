
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/features/auth/validations/login-schema";
import { loginFields } from '@/features/auth/fields-config/authFields';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/store/slices/user.slice';
import { useLoginMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { AuthForm } from '../../components/auth-form/AuthForm';
import { ROUTES } from "@/lib/constants/routes";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { ROLE } from "@/types/Role";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginMutation();

  const handleLogin = (data: LoginSchemaType) => {
    loginUser(data,
      {
        onSuccess: (data) => {
          if (data.data.role !== ROLE.USER) return toast.warning(ERROR_MESSAGES.USER_NOT_FOUND);
          toast.success((data.message));
          dispatch(setUser(data.data));
          navigate(ROUTES.HOME);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
        }
      }
    )
  };

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
        resolver={zodResolver(loginSchema)} />
    </>
  );
};

export default LoginPage;