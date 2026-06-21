import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PackageMetaData } from "../../package/base-package/services/api.services";


export type RatingFilterTab = "5" | "4" | "3" | "2" | "1" | "All ratings";
export type SortFilterTab = "latest" | "oldest" | "ratingHigh" | "ratingLow";

export const ratingTabs: { key: RatingFilterTab, label: string }[] = [
  { key: "5", label: "5" },
  { key: "4", label: "4" },
  { key: "3", label: "3" },
  { key: "2", label: "2" },
  { key: "1", label: "1" },
  { key: "All ratings", label: "All ratings" },
];

export const sortTabs: { key: SortFilterTab, label: string }[] = [
  { key: "latest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "ratingHigh", label: "Highest" },
  { key: "ratingLow", label: "Lowest" }
];

export interface ReviewsFilterProps {
  packages: PackageMetaData[];
  selectedPackageId: string;
  setSelectedPackageId: (val: string) => void;
  ratingFilter: RatingFilterTab;
  setRatingFilter: (val: RatingFilterTab) => void;
  sort: SortFilterTab;
  setSort: (val: SortFilterTab) => void;
  search: string;
  setSearch: (val: string) => void;
}

export function ReviewsFilter({
  packages,
  selectedPackageId,
  setSelectedPackageId,
  ratingFilter,
  setRatingFilter,
  sort,
  setSort,
  search,
  setSearch,
}: ReviewsFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 }}
      className="flex flex-col sm:flex-row gap-2 flex-wrap"
    >
      <div className="flex items-center gap-1.5 text-gray-400">
        <Filter className="w-3.5 h-3.5" />
        <span className="text-xs font-medium">Filter</span>
      </div>
      <Select value={selectedPackageId || "all"} onValueChange={(v) => { setSelectedPackageId(v === "all" ? "" : v) }}>
        <SelectTrigger className="w-full sm:w-44 h-9 text-xs bg-white border-gray-200">
          <SelectValue placeholder="All Packages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="text-xs">All Packages</SelectItem>
          {packages.map((pkg) => (
            <SelectItem key={pkg.id} value={String(pkg.id)} className="text-xs">{pkg.packageTittle}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={ratingFilter} onValueChange={(v) => { setRatingFilter(v as RatingFilterTab) }}>
        <SelectTrigger className="w-full sm:w-32 h-9 text-xs bg-white border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ratingTabs.map((rating) => (
            <SelectItem key={rating.key} value={rating.key} className="text-xs">{`${rating.label ==='All ratings' ? 'All ratings': rating.label + ' stars'}`}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={(v) => { setSort(v as SortFilterTab); }}>
        <SelectTrigger className="w-full sm:w-36 h-9 text-xs bg-white border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortTabs.map((sort) => (
            <SelectItem key={sort.key} value={sort.key} className="text-xs">{sort.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="relative flex-1 min-w-[160px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
        <Input
          placeholder="Search reviews…"
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
          className="pl-8 h-9 text-xs bg-white border-gray-200 placeholder:text-gray-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

