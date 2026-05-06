import type { DifficultyLevel } from "@/hooks/app/package-listing";
import type { PackageStatus } from "../constants";

export const categoryIcon: Record<string, string> = {
  adventure: "⛰️",
  cultural: "🏛️",
  relaxation: "🌴",
  luxury: "💎",
};

export const difficultyColor: Record<string, string> = {
  easy: "text-success font-medium",
  moderate: "text-secondary font-medium",
  challenging: "text-destructive font-medium",
  extreme: "text-destructive font-medium",
};

export const statusColorMap: Record<PackageStatus, string> = {
  DRAFT: "bg-orange-100 text-orange-800",
  PUBLISHED: "bg-green-100 text-green-800",
  SOFT_DELETE: "bg-gray-100 text-gray-600",
};

export const statusLabelMap: Record<PackageStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  SOFT_DELETE: "Deleted",
};

export const typeLabel: Record<string, string> = {
  tour: "Tour",
  transport: "Travel",
  accommodation: "Stay",
  activity: "Activity",
  meal: "Meal",
};

export const typeBadgeClass: Record<string, string> = {
  tour: "activity-badge-tour",
  transport: "activity-badge-transport",
  accommodation: "activity-badge-accommodation",
  activity: "activity-badge-activity",
  meal: "activity-badge-meal",
};

export const statusStyles: Record<string, string> = {
  pending: "bg-orange-100 text-orange-500 border border-orange-300",
  active: "bg-green-100 text-green-700 border border-green-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
};

export const statusLabel: Record<string, string> = {
  pending: "Pending",
  active: "Active",
  rejected: "Rejected",
};

export const policyUiMap = {
  flexible: {
    accent: "from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-50 text-emerald-600",
  },

  moderate: {
    accent: "from-sky-400 to-blue-500",
    iconBg: "bg-sky-50 text-sky-600",
  },

  strict: {
    accent: "from-amber-400 to-orange-500",
    iconBg: "bg-amber-50 text-amber-600",
  },

  default: {
    accent: "from-slate-400 to-slate-500",
    iconBg: "bg-slate-100 text-slate-600",
  },
};

export const difficultyColors: Record<DifficultyLevel, string> = {
  Easy: "text-green-600 dark:text-emerald-400",
  Moderate: "text-amber-600 dark:text-amber-400",
  Challenging: "text-rose-600 dark:text-rose-400",
  Extreme: "text-red-700 dark:text-red-400",
};

export const categoryColorMap: Record<string, string> = {
  Adventure: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",
  Cultural: "bg-amber-500/20 text-amber-700 dark:text-amber-300",
  Beach: "bg-sky-500/20 text-sky-700 dark:text-sky-300",
  Luxury: "bg-violet-500/20 text-violet-700 dark:text-violet-300",
  Honeymoon: "bg-pink-500/20 text-pink-700 dark:text-pink-300",
  Weekend: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
  Family: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  Wellness: "bg-teal-500/20 text-teal-700 dark:text-teal-300",
};