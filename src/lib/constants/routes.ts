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
  S3: "/s3"
} as const;

export const API_ROUTE = {
  //auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  GOOGLE_CALLBACK: '/google/callback',
  VERIFY_EMAIL: '/verify-email',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_PASSWORD: '/change-password',
  VERIFY_OTP: '/otp-verify',
  RESEND_OTP: '/resend-otp',
  LOGOUT: '/logout',

  //user
  EDIT_PROFILE: '/me/edit',
  CHANGE_EMAIL_REQUEST: '/me/change-email',
  UPDATE_EMAIL: '/me/email',
  RESET_PASSWORD: '/me/password',

  // VENDOR
  VERIFICATION_FORM: '/verification',
  PROFILE: '/me',
  UPDATE_PROFILE_LOGO: '/me/profileLogo',

  // ADMIN
  USERS: '/users',
  VENDORS: '/vendors',
  VENDORS_VERIFICATION_REQUESTS: '/vendor/verification-requests',

  //S3
  GET_SIGNED_URL_UPLOAD_API: '/upload-url',
  GET_SIGNED_URL_DOWNLOAD_API: '/file-url'




} as const;

