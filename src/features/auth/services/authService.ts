import type { AuthResponse } from "@/features/auth/types/auth.response";
import api from "@/config/api/axios";
import type { ILoginPayload } from "../types/auth.types";

export const login = async (user:ILoginPayload):Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
        '/signin', user
    )
    return response.data;  
}