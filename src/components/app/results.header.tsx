import { Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { SortOption } from "@/hooks/app/package-listing";
import { DEFAULT_PRICE_MAX, DEFAULT_PRICE_MIN, SORT_OPTIONS } from "@/lib/constants/package-listing";


interface ResultsHeaderProps {
  activeFilterCount: number;
  sortBy: SortOption;
  onSortChange: (v: SortOption) => void;

  selectedCategory: string;
  onRemoveCategory: () => void;

  selectedDifficulty: string;
  onRemoveDifficulty: () => void;

  priceRange: [number, number];
  onResetPrice: () => void;

  minRating: number;
  onResetRating: () => void;

  duration: string;
  onResetDuration: () => void;

  startDate: string;
  endDate: string;
  onResetDateRange: () => void;
}

export function ResultsHeader({
  activeFilterCount,
  sortBy,
  onSortChange,
  selectedCategory,
  onRemoveCategory,
  selectedDifficulty,
  onRemoveDifficulty,
  priceRange,
  onResetPrice,
  minRating,
  onResetRating,
  duration,
  onResetDuration,
  startDate,
  endDate,
  onResetDateRange,
}: ResultsHeaderProps) {
  return (
    <div className="mb-5 space-y-3">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          {activeFilterCount > 0 && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} applied
            </p>
          )}
        </div>

        {/* Sort pills — hidden on mobile, visible sm+ */}
        <div className="hidden sm:flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Sort:</span>
          <div className="flex items-center gap-1 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                data-testid={`button-sort-${opt.value}`}
                onClick={() => onSortChange(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${sortBy === opt.value
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {/* Single category chip */}
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              {selectedCategory}
              <button onClick={onRemoveCategory}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {selectedDifficulty && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              {selectedDifficulty}
              <button onClick={onRemoveDifficulty}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}


          {(priceRange[0] > DEFAULT_PRICE_MIN || priceRange[1] < DEFAULT_PRICE_MAX) && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              ₹{priceRange[0].toLocaleString("en-IN")} – ₹{priceRange[1].toLocaleString("en-IN")}
              <button onClick={onResetPrice}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}


          {minRating > 0 && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {minRating}+
              <button onClick={onResetRating}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}


          {duration !== "any" && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              {duration} days
              <button onClick={onResetDuration}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}

          {(startDate || endDate) && (
            <Badge variant="secondary" className="gap-1 text-xs pr-1">
              {startDate || "…"} → {endDate || "…"}
              <button onClick={onResetDateRange}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}