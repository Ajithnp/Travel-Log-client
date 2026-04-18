import { useState } from "react";
import {
  MapPin, Star, Clock, Share2, Heart,
  Check,
  ChevronRight,
  ArrowLeft,
  StarIcon
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
import { PackingList } from "@/features/vendor/package/base-package/components/package-details/packing-list";
import { CancellationPolicyCard } from "@/components/app/cancellation-policy";
import { policyMap } from "@/utils/policy-mapper";
import { packageData } from "@/mock-data";
import { BookingWizard } from "@/components/app/booking-flow/booking-wizard";
import { TourOperatorCard } from "@/components/app/tour-operator-card";
import { TrustBadges } from "@/components/app/trust-badges";


export default function PackageDetails() {
  const [saved, setSaved] = useState(false);
  const { id } = useParams();

  const {
    package: pkg,
    schedules,
    isLoading,
    error,
  } = usePackageDetailsPage(id);



  const policyKey = pkg?.cancellationPolicy;
  const selectedPolicy = policyKey ? policyMap[policyKey] : undefined;

  if (isLoading) return <Loader />
  if (error) return <Error message={error.message} />
  if (!pkg || !schedules) return null

  const operator = {
    id: pkg.vendor.id,
    name: pkg.vendor.name,
    rating: packageData.operator.rating,
    reviews: packageData.operator.reviews,
  };


  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Top navigation bar */}
      <div className="border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2">

          {/* Back + Breadcrumb */}
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
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-green-400" >
            {pkg.category}
          </Badge>
          <Badge className="bg-amber-400" >
            {pkg.difficultyLevel}
          </Badge>

        </div>

        {/* Title & meta */}
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
              {packageData.rating} <span className="text-muted-foreground font-normal">({packageData.reviewCount} reviews)</span>
            </span>
          </div>
        </div>

        <ImageGallery images={pkg?.images ?? []} />

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
              <div className="px-5 pt-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <StarIcon className="w-3.5 h-3.5 text-yellow-600" />
                </div>
                <h2 className="text-sm font-semibold uppercase text-gray-700">
                  What Makes This Trip Special
                </h2>
              </div>
              <div className="px-5 pb-2">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pkg?.usp}
                </p>
              </div>
            </Card>

            {/* About This Package */}
            <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
              <div className="px-5 pt-5 ">
                <h2 className="text-base font-semibold text-gray-700">
                  ABOUT THIS PACKAGE
                </h2>
              </div>
              <div className="border-t border-gray-100 mx-5" />
              <div className="px-5 py-5 space-y-5">
                {/* DESCRIPTION */}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {pkg?.description}
                </p>

                {/* HIGHLIGHTS BLOCK */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Package Highlights
                  </h3>
                  <ul className="space-y-2">
                    {packageData.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 leading-snug">
                          {h}
                        </span>

                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Day-wise Itinerary */}
            <PackageItinerary itinerary={pkg?.itinerary} totalDays={pkg?.days} />
            {/* Inclusions & Exclusions */}
            <InclusionsExclusions inclusions={pkg?.inclusions ?? []} exclusions={pkg?.exclusions ?? []} />
            {/* Things to Carry */}
            <PackingList items={pkg?.packingList} />
            {/* Cancellation Policy */}
            <CancellationPolicyCard policy={selectedPolicy} />
            {/* Reviews */}
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