import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  Search,
  MessageSquareText,
} from "lucide-react";
import { usePackagesMetaQuery } from "../../package/base-package/hooks/api.hooks";
import { usePackagesReviewsStatsQuery } from "../hooks/api.hooks";
import { usePackagesReviews } from "../hooks/pacakges-reviews";
import { LIMIT } from "@/lib/constants/constants";
import { useDebounce } from "@/hooks/useDebounce";
import { RatingSummary } from "../components/rating-summary";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { ReviewCard } from "../components/review-card";


import { ReviewsFilter, type RatingFilterTab, type SortFilterTab } from "../components/reviews-filter";
export default function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [ratingFilter, setRatingFilter] = useState<RatingFilterTab>("All ratings");
  const [sort, setSort] = useState<SortFilterTab>("latest");


  const debouncedSearch = useDebounce(search);
  const rating = ratingFilter === "All ratings" ? "" : ratingFilter;

  const metaQuery = usePackagesMetaQuery();
  const statsQuery = usePackagesReviewsStatsQuery();
  const reviewsQuery = usePackagesReviews({ limit: LIMIT, search: debouncedSearch, packageId: selectedPackageId, rating, sortBy: sort });


  const packages = metaQuery.data?.data || [];
  const reviews = reviewsQuery.reviews || [];
  const stats = statsQuery.data?.data;

  const hasNextPage = reviewsQuery.hasNextPage;
  const fetchNextPage = reviewsQuery.fetchNextPage;
  const isFetchingNextPage = reviewsQuery.isFetchingNextPage;
  const totalCount = reviewsQuery.totalCount || 0;
  const isLoading = metaQuery.isLoading || statsQuery.isLoading;
  const isError = metaQuery.isError || statsQuery.isError;
  const error = metaQuery.error || statsQuery.error || reviewsQuery.error;


  if (isLoading) return <Loader message="Loading Reviews.." />;
  if (isError) return <Error message={error?.message} onRetry={() => {
    metaQuery.refetch();
    statsQuery.refetch();
  }} />;


  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <MessageSquareText className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Customer Reviews</h1>
            <p className="text-xs text-gray-400">{stats?.total || 0} verified reviews across all packages</p>
          </div>
        </div>
      </motion.div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <RatingSummary rating={stats?.average || 0} reviewCount={stats?.total || 0} ratingBreakdown={stats?.breakdown || []} />
        </motion.div>

        <ReviewsFilter
          packages={packages}
          selectedPackageId={selectedPackageId}
          setSelectedPackageId={setSelectedPackageId}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
          sort={sort}
          setSort={setSort}
          search={search}
          setSearch={setSearch}
        />

        <AnimatePresence mode="wait">
          {reviews.length > 0 ? (
            <motion.div
              key={`${selectedPackageId}-${ratingFilter}-${sort}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700">No reviews found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search query</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-xs"
                onClick={() => { setSelectedPackageId(""); setRatingFilter("All ratings"); setSearch("") }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {hasNextPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="w-full sm:w-auto border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 text-sm font-medium px-8"
            >
              Load more reviews
              <span className="ml-2 text-xs text-gray-400">
                ({Math.max(0, totalCount - reviews.length)} remaining)
              </span>
            </Button>
          </motion.div>
        )}

        {!hasNextPage && reviews.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-gray-400 py-2"
          >
            You've seen all {reviews.length} reviews
          </motion.p>
        )}
      </main>
    </div>
  );
}