export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  COURSES: "/courses",
  PAYMENT: "/payment",
  MENTOR: "/mentor",
  USER: "/user",
  COURSE: "/course",
  PROFILE:"/profile",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",
  OTP_VERIFY: '/verify-otp',
  FORGOT_PASSWORD: '/forgot-password',
}as const;

export const BASE_ROUTE = {
  USER: "/user",
  VENDOR: "/vendor",
  ADMIN: "/admin",
} as const;

export const API_ENDPOINTS = {
  AUTH: "/auth",
  USER: "/user",
  VENDOR: "/vendor",
  ADMIN: "/admin",
} as const;

