export const PackageStatus =  {
  DRAFT :"DRAFT",
  PUBLISHED: "PUBLISHED",
  SOFT_DELETE: "SOFT_DELETE",
} as const

export type PackageStatus = typeof PackageStatus[keyof typeof PackageStatus];