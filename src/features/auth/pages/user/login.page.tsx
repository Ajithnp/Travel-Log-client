
import { LoginForm1 } from '../../components/login.form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/features/auth/validations/login.schema";
import { loginFields, ROLE } from '../../types/auth.types';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '@/store/slices/user.slice';
import { useLoginMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';

const LoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginMutation();

  const handleLogin = (data: LoginSchemaType) => {
    loginUser(data,
      {
        onSuccess: (data) => {
          if(data.data.role !== ROLE.USER) return toast.warning('User not found');
          toast.success((data.message));
          dispatch(setUser(data.data));
          navigate('/');
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
        }
      }
    )
  };

  return (
    <>
      <LoginForm1<LoginSchemaType>
        fields={loginFields}
        formType='signin'
        onSubmit={handleLogin}
        buttonText={isPending ? <Loader /> : 'Signin'}
        footer={true}
        forgotp={true}
        role={'auth'}
        resolver={zodResolver(loginSchema)} />
    </>
  );
};

export default LoginPage;