import type { AuthResponse } from "../types/auth.response";
import { login, register, emailVerify, resetPassword, updatePassword, resendOtp, verifyOtp, logout, googleSign } from "../services/authService";
import { type IRegisterPayload, type ILoginPayload } from "../types/auth.types"; 
import { useMutation } from "@tanstack/react-query";
// import {type Role } from "../types/role";
import { AxiosError } from "axios";
import type { AxiosResponse } from "@/types/axios.response";


export const useLoginMutation = () => {
    return useMutation<AuthResponse, AxiosError<{ message: string }>, ILoginPayload >({
        mutationFn: login
    });
};

export const useRegisterMutation = () => {
    return useMutation<AuthResponse, AxiosError<{message: string}>, IRegisterPayload>({
        mutationFn: register
    });
};

export const  useGoogleSignMutation = () => {
   return useMutation<AuthResponse, AxiosError<{ message: string }>,{token:string,clientId:string}>({
     mutationFn: googleSign
   });
};

export const useVerifyEmailMutation = () => {
    return useMutation<AuthResponse, AxiosError<{ message: string }>,{email:string,otp:string}>({
        mutationFn: emailVerify
    });
};

export const useForgotPasswordMutation = () => {
    return useMutation<AuthResponse, AxiosError<{ message: string }>, {email: string}>({
        mutationFn: resetPassword
    });
};

export const useUpdatePasswordMutation = () => {
    return useMutation<AxiosResponse, AxiosError<{ message: string }>, {email:string,password:string}>({
        mutationFn: updatePassword
    })
};

export const useResendOtpMutation = () => {
    return useMutation<AxiosResponse , AxiosError<{ message : string}>, {email:string}>({
        mutationFn: resendOtp
    })
};

export const useVerifyOtpMutation = () => {
    return useMutation<AxiosResponse , AxiosError<{ message : string}>, {email:string, otp:string}>({
        mutationFn: verifyOtp
    })
};

export const useLogoutMutation = () => {
    return useMutation<AxiosResponse, AxiosError<{ message: string }>>({
        mutationFn: logout
    });
};





