export interface AuthResponse {
    success: boolean,
    message: string,
    user:{
        id: string,
        name: string,
        email: string,
        role: "user" | "admin" | "vendor"
    }
}