import React from 'react'
import OtpForm from '../../components/otp.form'
import { useNavigate } from 'react-router-dom';
import { getStorageitem, removeStorageItem } from '@/utils/utils';
import { useVerifyOtpMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';



const VerifyOtp = () => {

    const navigate = useNavigate();

    const { mutate: verifyEmail, isPending: isLoading } = useVerifyOtpMutation()

    const data = getStorageitem('verify-email')
    if (!data.email) return

    const otpReceiverHandler = (otp: string) => {

        verifyEmail({ email: data.email, otp },
            {
                onSuccess(response) {
                    toast.success(response.message)
                    removeStorageItem('otpTimer')
                    removeStorageItem('otpExpiry')
                  navigate('/vendor/new-password', { replace: true });


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
            buttonText={isLoading ? <Loader /> : 'verify-otp'}
        />
    )
}

export default VerifyOtp