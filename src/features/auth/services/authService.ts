import type { AuthResponse } from "@/features/auth/types/auth.response";
import api from "@/config/api/axios";
import type { ILoginPayload, IRegisterPayload } from "../types/auth.types";
import type { AxiosResponse } from "@/types/axios.response";

export const login = async (payload:ILoginPayload):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        '/login', payload
    )
    return response.data;  
}

export const register = async (payload:IRegisterPayload):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        '/signup', payload
    )
    return response.data;
}

export const googleSign = async (payload: {token:string, clientId: string}):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        '/google/callback', payload
    )

    return response.data
}

export const emailVerify = async (payload: {email:string,otp:string}):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        `/verify-email`,{email:payload.email,otp:payload.otp}
    );
    return response.data;
}

// export const resendMail = async (payload: {email:string}):Promise<AxiosResponse> => {
//      const response = await api.post<AxiosResponse>(`/verify-email`,{otp});
//      return response.data;

// }

export const resetPassword = async (payload:{email:string}):Promise<AuthResponse> =>{
    const response = await api.post<AuthResponse>('/forgot-password',payload);
    return response.data;
}

export const updatePassword = async (payload:{email:string,password:string}):Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse>('/change-password',payload);
    return response.data
}

// export const verifyResetToen = async (payload: {token:string}):Promise<AxiosResponse> => {
//     const response = await api.post<AxiosResponse>(``)
// }

export const sendOtp = async (email: string): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse> (
        '/send-otp', {email}
    )
    return response.data;
}

export const verifyOtp = async (data: { email: string, otp: string}): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse> (
        '/otp-verify', data
    )
    return response.data;
}

export const resendOtp = async (data: {email:string}): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse> (
        '/resend-otp', data
    )
    return response.data;
}

// logout function
export const logout = async (): Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse>('/logout');
    return response.data
}
