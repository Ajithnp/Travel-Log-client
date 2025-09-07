
import { LoginForm1 } from '../../components/login.form';
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/features/auth/validations/login.schema";
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { setVendor } from '@/store/slices/vendor.slice';
import { loginFields, ROLE } from '../../types/auth.types';


// interface new.login.pageProps {

// }

const VendorLoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginMutation();

  const handleLogin = (data: LoginSchemaType) => {
    loginUser(data,
      {
        onSuccess: (data) => {
          if(data.data.role !== ROLE.VENDOR) return toast.warning('Vendor not found')
          toast.success((data.message));
          dispatch(setVendor(data.data));
          navigate('/vendor/pvt');
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
        role={'vendor'}
        resolver={zodResolver(loginSchema)} />

    </>
  );
};

export default VendorLoginPage;
