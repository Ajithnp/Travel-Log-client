import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/common/start-rating";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type RatingSummaryProps = {
    rating: number;
    reviewCount: number;
    ratingBreakdown: Record<number, number>;
};

export function RatingSummary({ rating, reviewCount, ratingBreakdown }: RatingSummaryProps) {
   
  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
   
          <div className="flex flex-col items-center gap-1 pr-0 sm:pr-6 sm:border-r sm:border-gray-100">
            <span className="text-5xl font-bold text-gray-900">{rating.toFixed(1)}</span>
            <StarRating rating={Math.round(rating)} size="md" />
            <span className="text-xs text-gray-400 mt-1">{reviewCount} reviews</span>
          </div>
      
          <div className="flex-1 w-full space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star];
              const pct = Math.round((count / reviewCount) * 100);
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-3 text-right">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.7, delay: (5 - star) * 0.08, ease: "easeOut" }}
                      className="h-full rounded-full bg-amber-400"
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}