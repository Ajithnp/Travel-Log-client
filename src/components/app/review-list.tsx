import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, ImageIcon, Loader2, MessageSquare, Trash2 } from "lucide-react";
import type { PackageReviewSinglesResponseDto } from "@/services/app-service";
import { format } from "date-fns";
import { useAuthUser } from "@/hooks/useAuthUser";

type TravellerReviewsProps = {
  rating: number;
  reviewCount: number;
  ratingBreakdown: Record<number, number>;
  reviews: PackageReviewSinglesResponseDto[];
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  onDelete: (reviewId: string) => void;
  isPending: boolean;
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${cls} ${
            star <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-100 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export function TravellerReviews({
  rating,
  reviewCount,
  ratingBreakdown,
  reviews,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onDelete,
  isPending,
}: TravellerReviewsProps) {
  const [expandedImages, setExpandedImages] = useState<string | null>(null);
  const totalRatings = Object.values(ratingBreakdown).reduce((acc, curr) => acc + curr, 0);
  
  const { user } = useAuthUser();

  return (
    <Card className="border border-gray-100 shadow-sm rounded-2xl overflow-hidden">

      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 border border-amber-200">
          <MessageSquare className="w-4 h-4 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Customer Feedback
          </p>
          <h2 className="text-sm font-bold text-gray-800 leading-tight">
            Traveller Reviews
          </h2>
        </div>
        {reviewCount > 0 && (
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 bg-amber-100 text-amber-700">
            {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
          </span>
        )}
      </div>

      <div className="mx-5 h-px bg-gray-100" />
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <p className="text-4xl font-bold text-gray-900 leading-none">{rating.toFixed(1)}</p>
            <StarRating rating={rating} size="md" />
            <p className="text-xs text-gray-400 mt-0.5">{reviewCount} {reviewCount === 1 ? "review" : "reviews"}</p>
          </div>

          <div className="flex-1 min-w-[180px] space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star] ?? 0;
              const pct = totalRatings === 0 ? 0 : Math.round((count / totalRatings) * 100);
              return (
                <div key={star} className="flex items-center gap-2.5">
                  <span className="text-xs font-medium text-gray-500 w-2 text-right">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-5 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="mx-5 h-px bg-gray-100" />

      <CardContent className="px-6 py-5 space-y-0">
        {reviews.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
            <MessageSquare className="w-8 h-8 opacity-30" />
            <p className="text-sm">No reviews yet. Be the first to review!</p>
          </div>
        )}

        {/* Reviews list */}
        <div className="space-y-0 divide-y divide-gray-100">
          {reviews.map((review) => {
            const isMyReview = user?.id === review.userId;
            
            return (
              <div 
                key={review.id} 
                className={`py-5 ${isMyReview ? "bg-amber-50/30 -mx-6 px-6" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-9 h-9 shrink-0 ring-2 ring-gray-100">
                      <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                        {review.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1">
                        <p className="text-sm font-semibold text-gray-800">{review.userName}</p>
                        {isMyReview && (
                          <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                            You
                          </span>
                        )}
                        <span className="text-gray-300 text-xs">·</span>
                        <span className="text-xs text-gray-400">
                          {format(new Date(review.createdAt), "dd MMM yyyy")}
                        </span>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  {isMyReview && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                      onClick={() => onDelete(review.id)}
                      disabled={isPending}
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              <p className="mt-3 pl-12 text-sm text-gray-600 leading-relaxed">
                {review.text}
              </p>

              {/* Images */}
              {review.images && review.images.length > 0 && (
                <div className="pl-12 mt-3 flex gap-2 flex-wrap">
                  {review.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setExpandedImages(expandedImages === `${review.id}-${i}` ? null : `${review.id}-${i}`)
                      }
                      className="relative group overflow-hidden rounded-xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <img
                        src={img.url}
                        alt={`Review photo ${i + 1}`}
                        className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                          expandedImages === `${review.id}-${i}`
                            ? "w-58h-58"
                            : "w-16 h-16"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl" />
                      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/80 rounded-md p-0.5">
                          <ImageIcon className="w-3 h-3 text-gray-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
        </div>

        {/* Load More */}
        {(hasMore || isLoadingMore) && (
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full h-9 rounded-xl text-sm border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800 gap-2 transition-all"
              onClick={onLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Loading reviews…
                </>
              ) : (
                <>
                  <MessageSquare className="w-3.5 h-3.5" />
                  Load more reviews
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}