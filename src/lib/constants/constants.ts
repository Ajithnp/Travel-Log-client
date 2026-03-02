export const PackageStatus =  {
  DRAFT :"DRAFT",
  PUBLISHED: "PUBLISHED",
  SOFT_DELETE: "SOFT_DELETE",
} as const

export type PackageStatus = typeof PackageStatus[keyof typeof PackageStatus];

export const CATEGORY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  REJECTED: 'rejected',
} as const;

export type CategoryStatus = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];