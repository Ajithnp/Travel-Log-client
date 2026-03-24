import { Search, Filter, Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { SORT_OPTIONS } from "@/lib/constants/package-listing";
import type { SortOption } from "@/hooks/app/package-listing";

interface PackagesToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  activeFilterCount: number;
  sortBy: SortOption;
  onSortChange: (v: SortOption) => void;
}

export function PackagesToolbar({
  search, onSearchChange, view, onViewChange,
  activeFilterCount, sortBy, onSortChange,
}: PackagesToolbarProps) {
  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3">

          {/* sm+: Search + View toggle in one row | mobile: search full width */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                data-testid="input-search"
                type="search"
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search destinations, tours, operators..."
                className="w-full pl-9 pr-4 h-9 rounded-md bg-background border border-input text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
              />
            </div>

            {/* View toggle — hidden on mobile, inline with search on sm+ */}
            <div className="hidden sm:flex items-center gap-1 border border-border rounded-md p-0.5 shrink-0">
              <Button size="icon" variant={view === "grid" ? "default" : "ghost"}
                onClick={() => onViewChange("grid")} className="h-7 w-7" data-testid="button-view-grid">
                <Grid3X3 className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant={view === "list" ? "default" : "ghost"}
                onClick={() => onViewChange("list")} className="h-7 w-7" data-testid="button-view-list">
                <List className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          {/* Mobile only row: Filter + Sort dropdown */}
          <div className="flex items-center gap-2 sm:hidden">
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="relative shrink-0"
                data-testid="button-mobile-filters">
                <Filter className="w-4 h-4 mr-1.5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>

            <div className="relative flex-1">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="w-full h-9 pl-3 pr-8 rounded-md bg-background border border-input text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/50 appearance-none cursor-pointer transition-all"
                data-testid="select-sort"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}