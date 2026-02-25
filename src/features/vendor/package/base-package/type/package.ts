// Package form types - maps 1:1 with backend schema
import type{ BasePackageSchema } from "../validations/base-package-schema";
export const PACKAGE_CATEGORIES = [
  "Adventure",
  "Beach",
  "Cultural",
  "Honeymoon",
  "Family",
  "Wildlife",
  "Pilgrimage",
  "Cruise",
  "Mountain",
  "Desert",
] as const;

export const DIFFICULTY_LEVELS = [
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
] as const;

export const ACTIVITY_TYPES = [
  "Sightseeing",
  "Adventure",
  "Relaxation",
  "Dining",
  "Transportation",
  "Accommodation",
  "Shopping",
  "Entertainment",
  "Wellness",
  "Cultural",
] as const;

export type PackageCategory = (typeof PACKAGE_CATEGORIES)[number];
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export type PackageFormPayload = BasePackageSchema;

export type PackageStatus = "DRAFT" | "PUBLISHED";
export interface IPackage {
  id: string;
  title: string;
  location: string;
  durationDays: number;
  durationNights: number;
  imageUrl?: { key: string, url?:string }[];
  status: PackageStatus;
  category?: PackageCategory;
  difficultyLevel?: DifficultyLevel;
  basePrice: number;
}
