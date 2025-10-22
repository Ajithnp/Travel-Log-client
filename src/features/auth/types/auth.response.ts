import type { ApiResponse } from "@/types/IApiResponse";
export interface AuthData {
  id?: string;
  name: string;
  email: string;
  role: "user" | "admin" | "vendor";
}

export type AuthResponse = ApiResponse<AuthData>;
