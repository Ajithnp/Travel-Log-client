

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "vendor";
}

export interface IGoogleSignPayload {
  token: string,
  clientId: string
}

export interface IEmailVerifyPayload {
  email: string,
  otp: string
}

export interface IForgotPasswordPayload {
  email : string
}

export interface IUpdatePasswordPayload {
  email: string,
  password: string
}

export interface IVerifyOtpPayload {
  email: string,
  otp: string
}

export interface IResendOtpPayload {
  email: string
}

export interface IChangeEmailPayload {
  email : string
}

export interface IUpdateEmailPayload {
  otp : string
}







