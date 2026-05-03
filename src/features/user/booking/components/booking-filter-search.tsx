import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { BookingFilterTab } from "../types";


export type FilterTab = BookingFilterTab ;

export interface TabItem<T extends string> {
  key: T;
  label: string;
  count?: number;
}

interface BookingFilterWithSearchProps<T extends string> {
    tab: T;
    tabs:TabItem<T>[];
  onTabChange?: (tab: T) => void;
   search: string;
  onSearchChange: (value: string) => void;
}

function BookingFilterWithSearch<T extends string>({ tab, tabs, search,onSearchChange ,onTabChange }: BookingFilterWithSearchProps<T>) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
      {/* Tabs */}
      <div className="flex items-center gap-1 bg-gray-100/70 rounded-lg p-1 overflow-x-auto flex-shrink-0">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
             onClick={() => onTabChange?.(key)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-md  font-semibold whitespace-nowrap transition-colors ${
              tab === key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <Input
          placeholder="Search destination or booking ID…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 h-8 text-xs border-gray-200 bg-gray-50/60 focus-visible:ring-indigo-300 focus-visible:border-indigo-300"
        />
      </div>
    </div>
  );
}

export default BookingFilterWithSearch;
