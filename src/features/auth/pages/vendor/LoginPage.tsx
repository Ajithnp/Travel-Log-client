import { AuthForm } from "../../components/auth-form/AuthForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/features/auth/validations/login-schema";
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { setVendor } from '@/store/slices/vendor.slice';
import { ROLE } from "@/types/Role";
import { loginFields } from '@/features/auth/fields-config/authFields';
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { SUCCESS_MESSAGES } from "@/lib/constants/messages";
import { BASE_ROUTE } from "@/lib/constants/routes";
import { ROUTES } from "@/lib/constants/routes";
import { COMPONENT_TEXT } from "@/lib/constants/componentsText";

const VendorLoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLoginMutation();

  const handleLogin = (data: LoginSchemaType) => {
    loginUser(data,
      {
        onSuccess: (data) => {
          if (data.data.role !== ROLE.VENDOR) return toast.warning(ERROR_MESSAGES.USER_NOT_FOUND)
          toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS);
          dispatch(setVendor(data.data));
          navigate(`${BASE_ROUTE.VENDOR}${ROUTES.PROFILE}`);
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
        role={ROLE.VENDOR}
        resolver={zodResolver(loginSchema)} />

    </>
  );
};

export default VendorLoginPage;
