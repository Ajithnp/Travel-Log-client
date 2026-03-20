import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import type{ DifficultyLevel } from "@/hooks/app/package-listing";
import { DEFAULT_PRICE_MAX, DEFAULT_PRICE_MIN, DURATION_OPTIONS, RATING_OPTIONS } from "@/lib/constants/package-listing";
import type { CategoryResponse } from "@/types/common/response";

export const DIFFICULTIES: DifficultyLevel[] = ["Easy", "Moderate", "Challenging", "Extreme"];




export interface FilterPanelProps {
  categories:CategoryResponse[]
  selectedCategory: string;
  onCategoryChange: (v: string) => void;

  selectedDifficulty: string;
  onDifficultyChange: (v: string) => void;

  priceRange: [number, number];
  onPriceRangeChange: (v: [number, number]) => void;

  minRating: number;
  onMinRatingChange: (v: number) => void;

  duration: string;
  onDurationChange: (v: string) => void;

  startDate: string;
  endDate: string;
  onDateRangeChange: (start: string, end: string) => void;

  onClear: () => void;
}

function SectionHeader({
  title,
  sectionKey,
  expanded,
  onToggle,
}: {
  title: string;
  sectionKey: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left group"
      data-testid={`button-toggle-${sectionKey}`}
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </span>
      {expanded ? (
        <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
      ) : (
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </button>
  );
}


export function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  duration,
  onDurationChange,
  startDate,
  endDate,
  onDateRangeChange,
  onClear,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    category: true,
    difficulty: true,
    duration: true,
    price: true,
    rating: true,
    date: true,
  });

  const toggle = (key: string) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const hasActiveFilters =
    !!selectedCategory ||
    !!selectedDifficulty ||
    priceRange[0] > DEFAULT_PRICE_MIN ||
    priceRange[1] < DEFAULT_PRICE_MAX ||
    minRating > 0 ||
    duration !== "any" ||
    !!startDate ||
    !!endDate;

  const collapseVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <div className="space-y-5 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm text-foreground">Filters</h2>
        {hasActiveFilters && (
          <button
            data-testid="button-clear-filters"
            onClick={onClear}
            className="text-xs text-primary font-medium hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <Separator />

      <div className="space-y-2.5">
        <SectionHeader
          title="Category"
          sectionKey="category"
          expanded={expanded.category}
          onToggle={() => toggle("category")}
        />
        <AnimatePresence>
          {expanded.category && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {/* "All" clears the selection */}
                <button
                  data-testid="button-category-all"
                  onClick={() => onCategoryChange("")}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                    selectedCategory === ""
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  All
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    data-testid={`button-category-${cat.name.toLowerCase()}`}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                      selectedCategory === cat.name
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      {/* ── Difficulty (single-select) ────────────────────────────────────── */}
      <div className="space-y-2.5">
        <SectionHeader
          title="Difficulty"
          sectionKey="difficulty"
          expanded={expanded.difficulty}
          onToggle={() => toggle("difficulty")}
        />
        <AnimatePresence>
          {expanded.difficulty && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-1">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff}
                    data-testid={`button-difficulty-${diff.toLowerCase()}`}
                    onClick={() => onDifficultyChange(diff)}
                    className={`flex items-center gap-2 text-sm transition-colors text-left px-1 hover:bg-foreground/10 ${
                      selectedDifficulty === diff
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        diff === "Easy"
                          ? "bg-emerald-500"
                          : diff === "Moderate"
                          ? "bg-amber-500"
                          :diff === 'Challenging'
                          ? "bg-rose-500" : "bg-red-600"
                      } ${
                        selectedDifficulty === diff
                          ? "ring-2 ring-offset-1 ring-offset-background ring-primary/50"
                          : ""
                      }`}
                    />
                    {diff}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      {/* ── Duration ─────────────────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <SectionHeader
          title="Duration"
          sectionKey="duration"
          expanded={expanded.duration}
          onToggle={() => toggle("duration")}
        />
        <AnimatePresence>
          {expanded.duration && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    data-testid={`button-duration-${opt.value}`}
                    onClick={() => onDurationChange(opt.value)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
                      duration === opt.value
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      {/* ── Price Range ───────────────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <SectionHeader
          title="Price Range (Solo)"
          sectionKey="price"
          expanded={expanded.price}
          onToggle={() => toggle("price")}
        />
        <AnimatePresence>
          {expanded.price && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 px-1 space-y-3">
                <Slider
                  data-testid="slider-price"
                  min={DEFAULT_PRICE_MIN}
                  max={DEFAULT_PRICE_MAX}
                  step={1000}
                  value={priceRange}
                  onValueChange={(v) => onPriceRangeChange(v as [number, number])}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                  <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      {/* ── Minimum Rating ────────────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <SectionHeader
          title="Minimum Rating"
          sectionKey="rating"
          expanded={expanded.rating}
          onToggle={() => toggle("rating")}
        />
        <AnimatePresence>
          {expanded.rating && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-1">
                {RATING_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    data-testid={`button-rating-${opt.value}`}
                    onClick={() => onMinRatingChange(opt.value)}
                    className={`flex items-center gap-2 text-sm transition-colors text-left px-1 ${
                      minRating === opt.value
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                        minRating === opt.value
                          ? "bg-primary border-primary"
                          : "border-border"
                      }`}
                    />
                    {opt.value > 0 ? (
                      <div className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{opt.label}</span>
                      </div>
                    ) : (
                      <span>{opt.label}</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Separator />

      {/* ── Date Range ───────────────────────────────────────────────────── */}
      <div className="space-y-2.5">
        <SectionHeader
          title="Travel Dates"
          sectionKey="date"
          expanded={expanded.date}
          onToggle={() => toggle("date")}
        />
        <AnimatePresence>
          {expanded.date && (
            <motion.div
              {...collapseVariants}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">From</label>
                  <input
                    type="date"
                    data-testid="input-start-date"
                    value={startDate}
                    onChange={(e) => onDateRangeChange(e.target.value, endDate)}
                    className="w-full text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-muted-foreground">To</label>
                  <input
                    type="date"
                    data-testid="input-end-date"
                    value={endDate}
                    onChange={(e) => onDateRangeChange(startDate, e.target.value)}
                    className="w-full text-xs border border-border rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}