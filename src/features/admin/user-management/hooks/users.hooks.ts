import type { AuthResponse } from "@/features/auth/types/auth.response";
import api from "@/config/api/axios";

// import type { ILoginPayload, IRegisterPayload } from "../types/auth.types";
import type { AxiosResponse } from "@/types/axios.response";

export const fetchUsers = async ():Promise<AxiosResponse> => {
    const response = await api.post<AxiosResponse>(
        '/login',
    )
    return response.data;  
}