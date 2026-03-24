import { useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usePackageListing } from "@/hooks/app/package-listing";
import { FilterPanel } from "@/components/app/filter-panel";
import { PackagesToolbar } from "@/components/app/packages-toolbar";
import { ResultsHeader } from "@/components/app/results.header";
import { EmptyState, PackagesSkeleton, ErrorState } from "@/components/app/packages-states";
import PackageCard from "@/components/app/package-card";
import { PACKAGES_PER_PAGE } from "@/lib/constants/package-listing";
import { useCategories } from "@/hooks/app/api.hooks";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";



export default function PackageListing() {
  const { data, isLoading: categoryFetching, isError, error: categoryError } = useCategories();

  const {
    packages,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    filters,
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
  } = usePackageListing();


  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
        rootMargin: "5px",
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const selectedCategoryName = useMemo(() => {
    if (!filters.category || !data?.data) return "";
    return data.data.find(cat => cat.id === filters.category)?.name ?? filters.category;
  }, [filters.category, data?.data]);


  const filterPanelProps = {
    categories: data?.data ?? [],
    selectedCategory: filters.category,
    onCategoryChange: setCategory,
    selectedDifficulty: filters.difficulty,
    onDifficultyChange: setDifficulty,
    priceRange: filters.priceRange,
    onPriceRangeChange: setPriceRange,
    minRating: filters.minRating,
    onMinRatingChange: setMinRating,
    duration: filters.duration,
    onDurationChange: setDuration,
    startDate: filters.startDate,
    endDate: filters.endDate,
    onDateRangeChange: setDateRange,
    onClear: clearFilters,
  };

  if (categoryFetching) return <Loader />;
  if (isError || categoryError) return <Error message={categoryError.response?.data.message} />;

  return (
    <div className="min-h-screen bg-background mt-20">
      <Sheet>
        <PackagesToolbar
          search={filters.search}
          onSearchChange={setSearch}
          view={view}
          onViewChange={setView}
          activeFilterCount={activeFilterCount}
          sortBy={filters.sortBy}        
           onSortChange={setSortBy}
        />
        <SheetContent side="left" className="w-72 overflow-y-auto">
          <SheetHeader className="mb-4">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <FilterPanel {...filterPanelProps} />
        </SheetContent>
      </Sheet>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8">
          <aside className="hidden lg:block lg:w-64 xl:w-72 flex-shrink-0">
            <div className="sticky top-[73px] bg-card border border-card-border rounded-xl p-5 max-h-[calc(100vh-100px)] overflow-y-auto">
              <FilterPanel {...filterPanelProps} />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <ResultsHeader
              activeFilterCount={activeFilterCount}
              sortBy={filters.sortBy}
              onSortChange={setSortBy}
              selectedCategory={selectedCategoryName}
              onRemoveCategory={() => setCategory("")}
              selectedDifficulty={filters.difficulty}
              onRemoveDifficulty={() => setDifficulty("")}
              priceRange={filters.priceRange}
              onResetPrice={() => setPriceRange([5000, 120000])}
              minRating={filters.minRating}
              onResetRating={() => setMinRating(0)}
              duration={filters.duration}
              onResetDuration={() => setDuration("any")}
              startDate={filters.startDate}
              endDate={filters.endDate}
              onResetDateRange={() => setDateRange("", "")}
            />

            {/* Initial loading skeleton */}
            {isLoading && <PackagesSkeleton count={PACKAGES_PER_PAGE} />}

            {!isLoading && error && (
              <ErrorState message={error?.response?.data?.message ?? "Something went wrong"} onRetry={clearFilters} />
            )}

            {!isLoading && !error && packages.length === 0 && (
              <EmptyState onClear={clearFilters} />
            )}

            {!isLoading && !error && packages.length > 0 && (
              <>
                {isLoading && !isFetchingNextPage && (
                  <div className="h-0.5 w-full bg-primary/30 rounded mb-4 animate-pulse" />
                )}

                <AnimatePresence mode="popLayout">
                  <motion.div
                    layout
                    className={
                      view === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7"
                        : "flex flex-col gap-4"
                    }
                  >
                    {packages.map((pkg, idx) => (
                      <motion.div
                        key={pkg._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                        className="h-full"
                      >
                        <PackageCard pkg={pkg} view={view} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </>
            )}


            {isFetchingNextPage && (
              <div>Loading.......</div>
            )}

            {!hasNextPage && packages.length > 0 && (
              <p className="text-center text-muted-foreground text-sm py-8">
                {/* You've seen all {totalCount} packages */}
              </p>
            )}

            {/* Sentinel — IntersectionObserver watches this invisible div */}
            <div ref={sentinelRef} className="h-1 w-full" />
          </main>
        </div>
      </div>
    </div>
  );
}

