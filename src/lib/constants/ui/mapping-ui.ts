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
  DELETED: "bg-rose-100 text-rose-600",
};

export const statusLabelMap: Record<PackageStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  DELETED: "Deleted",
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

export const cancellationPolicyColorMap = {
  green: {
    selected: "border-green-500 bg-green-50",
    hover: "hover:border-green-400",
    dot: "bg-green-500",
    text: "text-green-700",
    border: "border-green-200",
    bullet: "text-green-600",
  },

  amber: {
    selected: "border-amber-500 bg-amber-50",
    hover: "hover:border-amber-400",
    dot: "bg-amber-500",
    text: "text-amber-700",
    border: "border-amber-200",
    bullet: "text-amber-600",
  },

  red: {
    selected: "border-red-400 bg-red-50",
    hover: "hover:border-red-400",
    dot: "bg-red-500",
    text: "text-red-700",
    border: "border-red-200",
    bullet: "text-red-600",
  },

  crimson: {
    selected: "border-rose-600 bg-rose-100",
    hover: "hover:border-rose-500",
    dot: "bg-rose-600",
    text: "text-rose-800",
    border: "border-rose-300",
    bullet: "text-rose-700",
  },
};

export const policyColorMap: Record<string, { bg: string; border: string; text: string; badgeBg: string; badgeText: string; icon: string }> = {
  flexible: {
    bg: "bg-emerald-50/60",
    border: "border-emerald-100",
    text: "text-emerald-700",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-700",
    icon: "text-emerald-500",
  },
  moderate: {
    bg: "bg-amber-50/60",
    border: "border-amber-100",
    text: "text-amber-700",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    icon: "text-amber-500",
  },
  strict: {
    bg: "bg-rose-50/60",
    border: "border-rose-100",
    text: "text-rose-700",
    badgeBg: "bg-rose-100",
    badgeText: "text-rose-700",
    icon: "text-rose-500",
  },
  nonRefundable: {
    bg: "bg-gray-100/60",
    border: "border-gray-200",
    text: "text-gray-700",
    badgeBg: "bg-gray-200",
    badgeText: "text-red-700",
    icon: "text-red-500",
  }
};


export const difficultyConfig: Record<
  string,
  { label: string; className: string; dot: string }
> = {
  Easy: {
    label: "Easy",
    className: "text-emerald-700 bg-emerald-50 border-emerald-200",
    dot: "bg-emerald-500",
  },
  Moderate: {
    label: "Moderate",
    className: "text-amber-700 bg-amber-50 border-amber-200",
    dot: "bg-amber-500",
  },
  Challenging: {
    label: "Challenging",
    className: "text-rose-700 bg-rose-50 border-rose-200",
    dot: "bg-rose-500",
  },
  Extreme: {
    label: "Extreme",
    className: "text-red-700 bg-red-50 border-red-200",
    dot: "bg-red-500",
  },
};

export const RATING_COLORS = [
  "text-red-500",
  "text-orange-500",
  "text-amber-500",
  "text-lime-500",
  "text-emerald-500",
];
export const STAR_FILL = [
  "fill-red-400 text-red-400",
  "fill-orange-400 text-orange-400",
  "fill-amber-400 text-amber-400",
  "fill-lime-400 text-lime-400",
  "fill-emerald-400 text-emerald-400",
];

export const policyColorConfig: Record<string, { badge: string; bg: string; border: string; dot: string; icon: string }> = {
  flexible: {
    badge: "bg-green-100 text-green-700",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-green-500",
    icon: "text-green-600",
  },
  moderate: {
    badge: "bg-amber-100 text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-amber-500",
    icon: "text-amber-600",
  },
  strict: {
    badge: "bg-red-100 text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-red-500",
    icon: "text-red-600",
  },
};