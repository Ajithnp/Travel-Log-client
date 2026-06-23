import { useState } from "react";
import {
  MapPin, Star, Clock, Share2, Heart,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useParams } from "react-router-dom";
import { usePackageDetailsPage } from "@/hooks/app/package-details";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import ImageGallery from "@/components/app/image-gallery";
import { PackageItinerary } from "@/features/vendor/package/base-package/components/package-details/package-itinerary";
import InclusionsExclusions from "@/components/app/inclusions-exclusions";
import { CancellationPolicyCard } from "@/components/app/cancellation-policy";
import { BookingWizard } from "@/components/app/booking-flow/booking-wizard";
import { TourOperatorCard } from "@/components/app/tour-operator-card";
import { TrustBadges } from "@/components/app/trust-badges";
import { TravellerReviews } from "@/components/app/review-list";
import { usePackageReviewStatsQuery, useReviewDeleteMutation } from "@/hooks/app/api.hooks";
import { usePackageReviews } from "@/hooks/app/package-reviews";
import { EmptyData } from "@/components/common/empty";
import { PackageAboutSection } from "@/components/app/package-about";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";


export default function PackageDetails() {
  const [saved, setSaved] = useState(false);
  const { id } = useParams();

  const {
    package: pkg,
    schedules,
    isLoading,
    error,
  } = usePackageDetailsPage(id);

  const { data: reviewStats, isLoading: isReviewStatsLoading } = usePackageReviewStatsQuery(id || "")
  const { reviews, isLoading: reviewsLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = usePackageReviews(id || "", 5)
  const { mutate: deleteReview, isPending } = useReviewDeleteMutation(id || '');
  const cancellationPolicy = pkg?.cancellationPolicy;


  const reviewStatsData = reviewStats?.data;

  if (isLoading || isReviewStatsLoading || reviewsLoading) return <Loader />
  if (error) return <Error message={error.message} />
  if (!pkg || !schedules) return <EmptyData heading="Package Not Found" />

  const handleDeleteReview = (reviewId: string) => {
    deleteReview(reviewId);

  };
  const operator = {
    id: pkg.vendor.id,
    name: pkg.vendor.name,
    // rating: pkg.vendor.rating,
    // reviews: pkg.vendor.totalReviews,
  };

  return (
    <div className="min-h-screen bg-background mt-20">
      <div className="border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">

          <div className="flex items-center gap-2 flex-wrap flex-1">
            <Button onClick={() => window.history.back()} variant="ghost" size="sm"
              data-testid="btn-back" className="gap-1 text-muted-foreground">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                Packages
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground font-medium">{pkg.title}</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2 sm:ml-auto">
            <Button variant="outline" size="sm" data-testid="btn-share" className="gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button
              variant={saved ? "default" : "outline"}
              size="sm"
              data-testid="btn-save"
              onClick={() => setSaved((s) => !s)}
              className="gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-green-400">{pkg.category}</Badge>
            <Badge className="bg-amber-400">{pkg.difficultyLevel}</Badge>
          </div>

          {pkg.hasOffer && pkg.offerPercentage > 0 && (
            <Badge className="bg-orange-100 text-orange-700 font-semibold text-sm px-3 py-1 rounded-full shadow-sm">{pkg.offerPercentage}% off</Badge>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" data-testid="package-title">
            {pkg?.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold">
              by <Link to={`/packages/vendor/${pkg.vendor.id}/profile`} className="ml-1 text-orange-500 hover:underline">{pkg?.vendor.name}</Link>
            </span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-destructive" /> {pkg?.location}, {pkg?.state}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gray-900" /> {pkg?.days} Days/{pkg?.nights} Nights</span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {reviewStats?.data.average.toFixed(1)} <span className="text-muted-foreground font-normal">({reviewStats?.data.total} reviews)</span>
            </span>
          </div>
        </div>

        <ImageGallery images={pkg?.images ?? []} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            <PackageAboutSection usp={pkg.usp} description={pkg.description} />

            <PackageItinerary itinerary={pkg?.itinerary} totalDays={pkg?.days} />

            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
              <div className="px-5 pt-4 pb-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-rose-50 border border-rose-200">
                  <MapPin className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    Logistics
                  </p>
                  <h2 className="text-sm font-bold text-gray-800 leading-tight">
                    Meeting Point & Time
                  </h2>
                </div>
              </div>

              <div className="border-t border-gray-100 mx-5" />
              <div className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <MapPin className="w-3 h-3 text-slate-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{schedules[0].reportingLocation}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{formatTimeToAMPM(schedules[0].reportingTime)}</p>
                  </div>
                </div>
              </div>
            </Card>

            <InclusionsExclusions inclusions={pkg?.inclusions ?? []} exclusions={pkg?.exclusions ?? []} />

            {/* <PackingList items={pkg?.packingList} /> */}

            <CancellationPolicyCard policy={cancellationPolicy} />

            <TravellerReviews
              rating={reviewStatsData?.average || 0}
              reviewCount={reviewStatsData?.total || 0}
              ratingBreakdown={reviewStatsData?.breakdown || {}}
              reviews={reviews || []}
              hasMore={hasNextPage ?? false}
              isLoadingMore={isFetchingNextPage}
              onLoadMore={fetchNextPage}
              onDelete={handleDeleteReview}
              isPending={isPending}
            />
          </div>
          {/* RIGHT COLUMN — Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <BookingWizard schedules={schedules ?? []} pkg={pkg} />
              {/* Tour Operator card */}
              <TourOperatorCard operator={operator} />
              {/* Trust badges */}
              <TrustBadges />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}