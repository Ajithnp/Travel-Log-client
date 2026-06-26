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
  PROFILE: "/profile",
  VERIFY_EMAIL: "/verify-email",
  RESET_PASSWORD: "/reset-password",
  OTP_VERIFY: "/verify-otp",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

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
  S3: "/s3",
  STRIPE: "/stripe",
  BOOKING: "/bookings",
  REVIEWS:"/reviews",
  NOTIFICATION: "/notifications",
  USER_CHATS: "/user/chats",
  USER_WALLET: "/user/wallet",
  VENDOR_CHATS: "/vendor/chats",
} as const;

export const API_ROUTE = {
  //auth
  LOGIN: "/login",
  SIGNUP: "/signup",
  GOOGLE_CALLBACK: "/google/callback",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  VERIFY_OTP: "/otp-verify",
  RESEND_OTP: "/resend-otp",
  LOGOUT: "/logout",

  //user
  PROFILE: "/me",
  CHANGE_EMAIL_REQUEST: "/me/change-email",
  UPDATE_EMAIL: "/me/email",
  RESET_PASSWORD: "/me/password",
  DASHBOARD: "/dashboard",
  GET_REWARD: "/reward/unrevealed",
  REVEAL_REWARD:(id:string) => `/reward/${id}/reveal`,
  VENDOR_PUBLIC_PROFILE: (id: string) => `/packages/vendors/${id}/profile`,
  CONTACT:"/contacts-enquiry",
  POPULAR_PACKAGES: "/packages/popular",
  RECOMMENDED_PACKAGES: "/packages/recommended",
   
  //packages
  PACKAGE_DETAIL: (id: string) => `/packages/${id}`,
  PUBLIC_PACKAGES: "/packages/public",
  PUBLIC_CATEGORIES: "/packages/categories",
  //wishlist
  WISHLIST: "/wishlist",

  // bookings
  INITIATE_BOOKING: "/initiate",
  CONFIRM_BOOKING: "/confirm",
  RELEASE_HOLD: (id: string) => `/bookings/hold/${id}`,
  VERIFY_PAYMENT: "/verify-payment",
  
  //notifications
  NOTIFICATIONS: "/notifications",
  NOTIFICATIONS_UNREAD_COUNT: "/unread-count",
  NOTIFICATIONS_MARK_ALL_READ: "/mark-all-read",
  NOTIFICATIONS_MARK_ONE_READ: (id: string) => `/${id}/mark-read`,
  NOTIFICATIONS_MARK_TABS_READ: "/mark-tabs-read",

  // messages
  GET_MESSAGES: (chatId: string) => `/${chatId}/messages`,
  POST_MESSAGE: (chatId: string) => `/${chatId}/messages`,

  // VENDOR
  VERIFICATION_FORM: "/verification",
  REJECTED_VENDOR: (id: string) => `/verification/${id}/rejected`,
  VERIFICATION_REAPPLY: (id: string) => `/verification/${id}`,
  UPDATE_PROFILE_LOGO: "/me/profileLogo",
  PACKAGE_FORM_UPLOAD: "/packages",
  PACKAGES: "/packages",
  PACAGES_OFFERS_CONTEXT: "/packages/offers-context",
  CATEGORIES: "/categories",
  SCHEDULE_PACKAGE: "/schedules/packages/",
  SCHEDULES: "/schedules",
  REVENUE_PACKAGES_EARNINGS: "/revenue/packages-earnings",
  DASHBOARD_SUMMARY: "/dashboard/summary",
  DASHBOARD_CHARTS: "/dashboard/charts",
  DASHBOARD_RECENT_ACTIVITY: "/dashboard/recent-activity",
  PACKAGES_REVIEW_STATS: "/packages/reviews/stats",
  PACKAGES_REVIEWS: "/packages/reviews",


  // ADMIN

  USERS: '/users',
  UPDATE_USER_STATUS: (id: string) => `/users/${id}/status`,

  VENDORS: '/vendors',
  VENDORS_VERIFICATION_REQUESTS: '/vendor/verification-requests',
  UPDATE_VENDOR_VERIFICATION: (id: string) => `/update-vendor-verification/${id}`,
  CATEGORY: '/category',
  CATEGORY_REQUESTS: '/category/requests',
  REVIEW_CATEGORY: (id: string) => `/category/requests/${id}/review`,
  REQUEST_REVIEWED_CATEGORY: '/category/requests/reviewed',
  CANCELLATION_POLICY: '/cancellation-policies',
  GET_CANCELLATION_REQUESTS: '/users/cancellation-requests',
  GET_VENDORS_PACKAGES:'/vendor/packages',
  GET_VENDORS_PACKAGE_SCHEDULE_STATS: '/vendor/schedules/stats',
  GET_VENDORS_PACKAGE_SCHEDULES: '/vendor/schedules',
  COMMISSION_OVERVIEW_STATS: '/commissions/summary',
  COMMISSION_OVERVIEW_BY_VENDORS: '/commissions/vendors',
  COMMISSION_OVERVIEW_BY_PACKAGES: '/commissions/packages',
  PAYOUT_SCHEDULES: '/payouts/schedules',
  PAYOUT_OVERVIEW: '/payouts/overview',
  PAYOUT_RELEASE: (scheduleId: string) => `/payouts/${scheduleId}/release`,
  PAYOUT_RETRY: (payoutId: string) => `/payouts/${payoutId}/retry`,
  SCHEDULE_PAYOUT_DETAILS: (scheduleId: string) => `/payouts/${scheduleId}/details`,
  PAYOUTS: "/payouts",
  PAYOUT_STATS: "/payouts/stats",
  DASHBOARD_SUMMARY_STATS: "/dashboard/stats",
  DASHBOARD_REVENUE_TREND: "/dashboard/revenue-trend",
  DASHBOARD_TOP_PERFORMERS: "/dashboard/top-performers",
  DASHBOARD_ACTIONS_REQUIRED: "/dashboard/actions-required",


  //S3
  GET_SIGNED_URL_UPLOAD_API: "/upload-url",
  GET_SIGNED_URL_DOWNLOAD_API: "/file-url",
} as const;

export const BASE_ROUTE_BY_ROLE: Record<string, string> = {
  user: BASE_ROUTE.USER,
  admin: BASE_ROUTE.ADMIN,
  vendor: BASE_ROUTE.VENDOR,
};
