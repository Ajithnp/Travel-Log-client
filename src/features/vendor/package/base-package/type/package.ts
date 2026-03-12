
import type{ BasePackageSchema } from "../validations/base-package-schema";


export const DIFFICULTY_LEVELS = [
  "Easy",
  "Moderate",
  "Challenging",
  "Extreme",
] as const;

export type CancellationPolicyTypes = "Flexible" | "Moderate" | "Strict" | "Non-Refundable";
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];
export type PackageFormPayload = BasePackageSchema;

export type PackageStatus = "DRAFT" | "PUBLISHED" ;
export interface IPackage {
  id: string;
  title: string;
  location: string;
  state: string;
  durationDays: number;
  durationNights: number;
  imageUrl?: { key: string, url?:string }[];
  status: PackageStatus;
  category?: string;
  difficultyLevel?: DifficultyLevel;
  basePrice: number;
}

export interface ActivityDTO {
  startTime: string;
  endTime: string;
  title: string;
  description: string;
  location: string;
  specials: string[];
  included: boolean;
}

export interface ItineraryDayDTO {
  dayNumber: number;
  title: string;
  activities: ActivityDTO[];
}

export interface PackageDetailReponse {
  packageId: string;        
  vendorId: string;         
  title: string;
  location: string;
  state: string;
  usp: string;
  category: string | null; 
  difficultyLevel: DifficultyLevel | undefined;
  description: string;
  days: string;
  nights: string;
  basePrice: string;
  images: { key: string }[];
  itinerary: ItineraryDayDTO[];
  inclusions: string[];
  exclusions: string[];
  packingList: string[];
  cancellationPolicy: CancellationPolicyTypes| undefined;
  status: PackageStatus;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageScheduleContextResponse {
  PackageId: string;
  title: string;
  location: string;
  state: string;
  days: number;
  nights: number;
  status: PackageStatus;
  category: string;
  difficultyLevel: string;
}