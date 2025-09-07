
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { getStorageitem, removeStorageItem } from '@/utils/utils';
import { toast } from 'sonner';
import OtpForm from '../../components/otp.form';
import { useVerifyEmailMutation } from '../../hooks/auth.hooks';
import { setVendor } from '@/store/slices/vendor.slice';



const VendorEmailverifyPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = getStorageitem('verify-email')

  const { mutate: verifyEmail, isPending: isLoading } = useVerifyEmailMutation();
  // if(!data.email || !data.role){
  //   toast.error('Invalid email')
  //   return null;
  // }

  const otpReceiverHandler = (otp: string) => {

    verifyEmail({ email: data.email, otp },
      {
        onSuccess(response) {

          dispatch(setVendor(response.data))
          removeStorageItem('verify-email')
          removeStorageItem('otpTimer')
          removeStorageItem('otpExpiry')
          navigate('/vendor/pvt')

        },

        onError(error) {
          toast.error(error.response?.data?.message || "Something went wrong")
        }

      }
    )

  }

  return (
    <OtpForm
      otpReceiver={otpReceiverHandler}
      buttonText={isLoading ? <Loader /> : 'Verify Email'}
    />
  )
};

export default VendorEmailverifyPage;