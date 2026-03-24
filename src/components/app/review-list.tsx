import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  date: string;
  trekDuration: string;
  rating: number;
  text: string;
  avatar: string;
  images: string[];
};

type TravellerReviewsProps = {
  rating: number;
  reviewCount: number;
  ratingBreakdown: Record<number, number>;
  reviews: Review[];
};

export function TravellerReviews({
  rating,
  reviewCount,
  ratingBreakdown,
  reviews,
}: TravellerReviewsProps) {
  const [showMore, setShowMore] = useState(false);

  const totalRatings = Object.values(ratingBreakdown).reduce(
    (acc, curr) => acc + curr,
    0
  );

  const displayedReviews = showMore ? reviews : reviews.slice(0, 2);

  return (
    <Card>
      <CardHeader className="pb-3">
        <h2 className="text-lg font-semibold">Traveller Reviews</h2>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Rating Overview */}
        <div className="flex items-start gap-6 flex-wrap">
          
          <div className="text-center shrink-0">
            <p className="text-5xl font-bold">{rating}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {reviewCount} reviews
            </p>
          </div>

          <div className="flex-1 min-w-[160px] space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingBreakdown[star] ?? 0;

              const pct =
                totalRatings === 0
                  ? 0
                  : Math.round((count / totalRatings) * 100);

              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs w-3 text-right text-muted-foreground">
                    {star}
                  </span>

                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />

                  <Progress value={pct} className="flex-1 h-1.5" />

                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Reviews List */}
        <div className="space-y-5">
          {displayedReviews.map((review) => (
            <div key={review.id} className="space-y-2">
              
              <div className="flex items-start gap-3">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarFallback className="text-xs">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm">
                      {review.name}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      · {review.trekDuration}
                    </span>
                  </div>

                  {/* Replace with your StarRating */}
                  <p className="text-xs">⭐ {review.rating}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                {review.text}
              </p>

              {review.images.length > 0 && (
                <div className="pl-12 flex gap-2 flex-wrap">
                  {review.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Load More */}
        {!showMore && reviews.length > 2 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowMore(true)}
          >
            Load more reviews
          </Button>
        )}
      </CardContent>
    </Card>
  );
}