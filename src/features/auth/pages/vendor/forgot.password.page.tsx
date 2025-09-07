import React from 'react'
import { LoginForm1 } from '../../components/login.form';
import { zodResolver } from "@hookform/resolvers/zod";;
import { emailSchema, type EmailSchemaType } from "@/features/auth/validations/email.schema";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { setStorageItem } from '@/utils/utils';
import { emailFields, ROLE } from '../../types/auth.types';



const VendorForgotPasswordPage = () => {

  const navigate = useNavigate();

  const { mutate: forgotPassword, isPending: isLoading } = useForgotPasswordMutation();

  const handleEmailVerify = ({ email }: { email: string }) => {
    forgotPassword({ email },
      {
        onSuccess: (response) => {
          if(response.data.role ! == ROLE.VENDOR){
            toast.error('Account not found')
            return;
          }
          navigate('/vendor/verify-otp')
          // setStorageItem('email',response.data.email);
          setStorageItem('verify-email', { email: response.data.email, role: response.data.role });
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || 'something went wrong')
        }
      }
    )

  }

  return (
    <LoginForm1<EmailSchemaType>
      fields={emailFields}
      onSubmit={handleEmailVerify}
      buttonText={isLoading ? <Loader /> : 'verify-email'}
      footer={false}
      forgotp={false}
      resolver={zodResolver(emailSchema)}
    />
  )
}

export default VendorForgotPasswordPage;
