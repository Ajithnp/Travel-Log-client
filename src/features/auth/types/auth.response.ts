import type { ApiResponse } from "@/types/IApiResponse";
export interface AuthData {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "vendor";
  otpExpiresIn?: number;
  serverTime?: number;

}

export type AuthResponse = ApiResponse<AuthData>;

export interface IOtpResponse {
  otpExpiresIn: number
  serverTime: number
};

export type IChangeEmailResponse = ApiResponse<IOtpResponse>
export type IResendOtpResponse = ApiResponse<IOtpResponse>
