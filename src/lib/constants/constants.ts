export const PackageStatus =  {
  DRAFT :"DRAFT",
  PUBLISHED: "PUBLISHED",
  DELETED: "DELETED",
} as const

export type PackageStatus = typeof PackageStatus[keyof typeof PackageStatus];

export const CATEGORY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

export type CategoryStatus = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];

export const PRICE_TIERS = {
  SOLO: "SOLO",
  DUO: "DUO",
  GROUP: "GROUP"
} as const;

export const VENDOR_TABS = {
  CHAT: "Chats",
  ACCOUNT: "ACCOUNT",
} as const;

export type VendorTab = (typeof VENDOR_TABS)[keyof typeof VENDOR_TABS];

export const ADMIN_TABS = {
  BOOKINGS: "BOOKINGS",
  VENDOR_VERIFICATION:"Vendors Verification Requests",
  CANCEL_BOOKINGS:"Cancel Bookings",
  REVENUE: "REVENUE",
} as const;

export type AdminTab = (typeof ADMIN_TABS)[keyof typeof ADMIN_TABS];