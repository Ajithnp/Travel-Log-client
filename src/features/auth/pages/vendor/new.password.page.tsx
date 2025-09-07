import React, { useRef, useEffect } from "react";
import { LoginForm1 } from '../../components/login.form';
import { zodResolver } from "@hookform/resolvers/zod";;

import { useNavigate } from 'react-router-dom';
import { useUpdatePasswordMutation } from '../../hooks/auth.hooks';
import { Loader } from 'lucide-react';
import {
    passwordSchema,
    type PasswordSchemaType,
} from "@/features/auth/validations/password.schema";
import { getStorageitem, removeStorageItem } from '@/utils/utils';
import { toast } from 'sonner';
import { newPasswordFields } from "../../types/auth.types";


const VendorNewPasswordPage = () => {

    const navigate = useNavigate();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null); //to store timeOut Id

    const data = getStorageitem('verify-email');

    const { mutate: forgotPassword, isPending: isLoading } = useUpdatePasswordMutation();

    const handleEmailVerify = ({ password }: { password: string }) => {

        forgotPassword({ email: data.email, password },
            {
                onSuccess: (response) => {
                    toast.success(response.message)
                    console.log('response from back-end', response);
                    timeoutRef.current = setTimeout(() => {
                        navigate('/vendor/login')
                    }, 2000)

                    removeStorageItem('verify-email')
                },
                onError: (error) => {
                    toast.error(error.response?.data?.message || 'something went wrong')
                }
            }
        )

    }

    useEffect(() => {
        // cleanup when component unmounts
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <LoginForm1<PasswordSchemaType>
            fields={newPasswordFields}
            onSubmit={handleEmailVerify}
            buttonText={isLoading ? <Loader /> : 'Update password'}
            footer={false}
            forgotp={false}
            resolver={zodResolver(passwordSchema)}
        />
    )
}

export default VendorNewPasswordPage;
