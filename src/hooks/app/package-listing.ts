import { useState, useCallback, useMemo } from "react";
import { useInfinitePackages } from "./api.hooks";
import {
  DEFAULT_PRICE_MIN,
  DEFAULT_PRICE_MAX,
  PACKAGES_PER_PAGE,
} from "@/lib/constants/package-listing";
import { useDebounce } from "../useDebounce";
import { useInfiniteDataWithSignedUrls } from "../s3/useInfiniteDataWithSignedUrls";
import type { AxiosError } from "axios";

export type SortOption =
  | "newest"
  | "price_low_high"
  | "price_high_low"
  | "top_rated";
export type DifficultyLevel = "Easy" | "Moderate" | "Challenging" | "Extreme";
export type ScheduleStatus = "upcoming" | "sold_out";
export type ViewType = "grid" | "list";

export interface PackageCategoryDTO {
  _id: string;
  name: string;
}
export interface PackageVendorDTO {
  _id: string;
  name: string;
}
export interface PackageImageDTO {
  key: string;
  url?: string;
}

export interface TravelPackage {
  _id: string;
  title: string;
  description: string;
  location: string;
  state: string;
  difficultyLevel: DifficultyLevel;
  days: number;
  nights: number;
  usp: string;
  images: PackageImageDTO[];
  category: PackageCategoryDTO;
  vendor: PackageVendorDTO;
  startingFromPrice: number;
  earliestDate: string;
  earliestEndDate: string;
  earliestScheduleStatus: ScheduleStatus;
  scheduleCount: number;
  isSoldOut: boolean;
  averageRating: number;
  totalReviews: number;
}

export interface PackageListResponse {
  packages: TravelPackage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PackageFilters {
  search: string;
  category: string;
  difficulty: string;
  priceRange: [number, number];
  minRating: number;
  duration: string; // "any" | "1-3" | "4-7" | "8+"
  startDate: string;
  endDate: string;
  sortBy: SortOption;
  limit: number;
}

const DEFAULT_FILTERS: PackageFilters = {
  search: "",
  category: "",
  difficulty: "",
  priceRange: [DEFAULT_PRICE_MIN, DEFAULT_PRICE_MAX],
  minRating: 0,
  duration: "any",
  startDate: "",
  endDate: "",
  sortBy: "newest",
  limit: PACKAGES_PER_PAGE,
};

export interface UsePackageListingReturn {
  packages: TravelPackage[];
  totalCount: number;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
  isFetchingNextPage: boolean;
  totalPages: number;
  isLoading: boolean;
  // isFetching: boolean;
  error: AxiosError<{ message: string }> | null;
  filters: PackageFilters;

  setSearch: (v: string) => void;
  setSortBy: (v: SortOption) => void;
  setCategory: (v: string) => void;
  setDifficulty: (v: string) => void;
  setPriceRange: (v: [number, number]) => void;
  setMinRating: (v: number) => void;
  setDuration: (v: string) => void;
  setDateRange: (start: string, end: string) => void;
  clearFilters: () => void;

  activeFilterCount: number;
  view: ViewType;
  setView: (v: ViewType) => void;
}

export function usePackageListing(): UsePackageListingReturn {
  const [filters, setFilters] = useState<PackageFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewType>("grid");
  const id = '12345'

  const debouncedSearch = useDebounce(filters.search, filters.search ? 500 : 0);
  const debouncedPriceRange = useDebounce(filters.priceRange, 400);

  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
      priceRange: debouncedPriceRange,
    }),
    [filters, debouncedSearch, debouncedPriceRange],
  );

  const {
    data: packages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalCount,
    totalPages,
  } = useInfiniteDataWithSignedUrls<TravelPackage>(
    useInfinitePackages(debouncedFilters),
    {
      userId: id,
      imageFields: ["images"],
      dataKey: "packages",
      enabled: true,
    },
  );


  const updateFilter = useCallback(
    <K extends keyof PackageFilters>(key: K, value: PackageFilters[K]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const setSearch = useCallback(
    (v: string) => updateFilter("search", v),
    [updateFilter],
  );
  const setSortBy = useCallback(
    (v: SortOption) => updateFilter("sortBy", v),
    [updateFilter],
  );
  const setCategory = useCallback(
    (v: string) => updateFilter("category", v),
    [updateFilter],
  );
  const setDifficulty = useCallback(
    (v: string) => updateFilter("difficulty", v),
    [updateFilter],
  );
  const setPriceRange = useCallback(
    (v: [number, number]) => {
      if (v[0] === v[1]) return;
      updateFilter("priceRange", v);
    },
    [updateFilter],
  );
  const setMinRating = useCallback(
    (v: number) => updateFilter("minRating", v),
    [updateFilter],
  );
  const setDuration = useCallback(
    (v: string) => updateFilter("duration", v),
    [updateFilter],
  );


  const setDateRange = useCallback((start: string, end: string) => {
    setFilters((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
      page: 1,
    }));
  }, []);

  const clearFilters = useCallback(
    () => setFilters({ ...DEFAULT_FILTERS }),
    [],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category) count++;
    if (filters.difficulty) count++;
    if (
      filters.priceRange[0] > DEFAULT_PRICE_MIN ||
      filters.priceRange[1] < DEFAULT_PRICE_MAX
    )
      count++;
    if (filters.minRating > 0) count++;
    if (filters.duration !== "any") count++;
    if (filters.startDate || filters.endDate) count++;
    return count;
  }, [filters]);



  return {
    packages: packages ?? [],
    totalCount: totalCount ?? 0,
    totalPages,
    isLoading,
    // isFetching: isFetchingNextPage,
    isFetchingNextPage,
    error,
    filters,
    fetchNextPage,
    hasNextPage,
    setSearch,
    setSortBy,
    setCategory,
    setDifficulty,
    setPriceRange,
    setMinRating,
    setDuration,
    setDateRange,
    clearFilters,
    activeFilterCount,
    view,
    setView,
  };
}
