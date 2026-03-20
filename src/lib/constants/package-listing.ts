import type { SortOption } from "@/hooks/app/package-listing";

export const DEFAULT_PRICE_MIN = 1000;
export const DEFAULT_PRICE_MAX = 35000;

export const PACKAGES_PER_PAGE = 12;

export const DURATION_OPTIONS = [
  { value: "any",   label: "Any" },
  { value: "1-3",   label: "1–3 days" },
  { value: "4-7",   label: "4–7 days" },
  { value: "8-14",  label: "8–14 days" },
  { value: "15+",   label: "15+ days" },
] as const;

export const DURATION_MAP: Record<string, { min?: number; max?: number }> = {
  any:    {},
  "1-3":  { min: 1,  max: 3  },
  "4-7":  { min: 4,  max: 7  },
  "8-14": { min: 8,  max: 14 },
  "15+":  { min: 15 },
};

export const RATING_OPTIONS = [
  { value: 0, label: "Any" },
  { value: 4.5, label: "4.5+ stars" },
  { value: 4.0, label: "4.0+ stars" },
  { value: 3.5, label: "3.5+ stars" },
] as const;


export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest",         label: "Newest" },
  { value: "price_low_high", label: "Price ↑" },
  { value: "price_high_low", label: "Price ↓" },
  { value: "top_rated",      label: "Highest Rated" },
];