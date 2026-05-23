import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Star} from "lucide-react";
import { Button } from "../ui/button";
import type { TravelPackage } from "@/hooks/app/package-listing";
import { useNavigate } from "react-router-dom";
import WishlistButton from "@/features/user/wishlist/components/wishlist.button";
import { categoryColorMap, difficultyColors } from "@/lib/constants/ui/mapping-ui";


export default function PackageCard({
  pkg,
  view,
}: {
  pkg: TravelPackage;
  view: "grid" | "list";
}) {
  const imageUrl = pkg.images?.[0]?.url;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/packages/${pkg._id}`);
  };

  const categoryName = pkg.category?.name ?? "";
  const vendorName = pkg.vendor?.name ?? "";
  const difficulty = pkg.difficultyLevel;
  const duration = `${pkg.days}D / ${pkg.nights}N`;
  const rating = pkg.averageRating;
  const reviewCount = pkg.totalReviews;
  const price = pkg.startingFromPrice;
  const isSoldOut = pkg.isSoldOut;
  const startDate = pkg.earliestDate
    ? new Date(pkg.earliestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : null;
  const endDate = pkg.earliestEndDate
    ? new Date(pkg.earliestEndDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : null;

  // ── List view 
 if (view === "list") {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-package-${pkg._id}`}
      onClick={handleCardClick}
      className="bg-card border border-card-border rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex h-44">

        <div className="relative w-44 md:w-56 h-full flex-shrink-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <MapPin className="w-10 h-10 text-white/60" />
            </div>
          )}

          {categoryName && (
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm bg-foreground/50 ${categoryColorMap[categoryName] ?? "text-white"}`}>
                {categoryName}
              </span>
            </div>
          )}

          {/* <button
            onClick={handleFavorite}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? "fill-rose-500 text-rose-500" : "text-white"}`} />
          </button> */}
          <WishlistButton
            packageId={pkg._id}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
          />

          {startDate && endDate && (
            <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium bg-black/25 backdrop-blur-sm px-2 py-0.5 rounded-full whitespace-nowrap">
              {startDate} – {endDate}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between p-4 min-w-0 overflow-hidden">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-1">
              {pkg.title}
            </h3>
            <p className="text-xs font-semibold text-yellow-600 min-h-[1rem]">
              {vendorName ? `by: ${vendorName}` : ""}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 flex-shrink-0 text-destructive" />
              <span className="line-clamp-1">{pkg.location}, {pkg.state}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground pt-0.5">
              <div className="flex items-center gap-1 shrink-0">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-foreground">{duration}</span>
              </div>
              <div className={`font-medium shrink-0 ${difficultyColors[difficulty]}`}>
                {difficulty}
              </div>
              {pkg.scheduleCount > 0 && !isSoldOut && (
                <div className="flex items-center gap-1 ml-auto shrink-0">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-emerald-500/10 text-emerald-600">
                    {pkg.scheduleCount} schedule{pkg.scheduleCount !== 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-end justify-between pt-2 border-t border-border">
            <div>
              <div className="flex items-center gap-1">
                <StarRating rating={rating} />
                <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">({reviewCount})</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold">₹{price.toLocaleString("en-IN")}</span>
                <span className="text-xs text-muted-foreground">/person</span>
              </div>
            </div>
              <Button size="sm" data-testid={`button-book-${pkg._id}`}>
                Book Now
              </Button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

  // ── Grid view
  return (

    <motion.div
      onClick={handleCardClick}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      data-testid={`card-package-${pkg._id}`}
      className="bg-card border border-card-border flex flex-col h-full transition-all rounded-xl overflow-hidden group cursor-pointer duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl"    >
      {/* Image Section */}
      <div className="relative h-44 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-white/60" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {categoryName && (
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-sm bg-foreground/50 ${categoryColorMap[categoryName] ?? "text-white"
                }`}
            >
              {categoryName}
            </span>
          )}
        </div>
        <WishlistButton
          packageId={pkg._id}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
        />

        {startDate && endDate && (
          <div className="absolute bottom-3 left-3 text-white/90 text-xs font-medium bg-black/25 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            {startDate} – {endDate}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-medium font-semibold text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
            {pkg.title}
          </h3>

        </div>

        <p className="text-xs font-semibold text-yellow-600 mt-0.5 min-h-[1rem]">
          {vendorName ? `by: ${vendorName}` : ""}
        </p>

        <div className="flex items-center gap-1 mt-1.5 text-xs font-bold text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0 text-destructive" />
          <span className="line-clamp-1">{pkg.location},</span>
          <span className="line-clamp-1">{pkg.state}</span>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1 shrink-0">
            <Clock className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-foreground">{duration}</span>
          </div>

          <div className={`font-medium shrink-0 ${difficultyColors[difficulty]}`}>
            {difficulty}
          </div>

          <div className="flex items-center gap-1 ml-auto shrink-0">
            <CalendarDays className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap bg-emerald-500/10 text-emerald-600">
              {pkg.scheduleCount} schedules
            </span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <StarRating rating={rating} />
              <span className="text-xs font-semibold">
                {rating.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({reviewCount})
              </span>
            </div>

          </div>

          <div className="flex items-end justify-between mt-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <div className="flex items-baseline gap-1">
                <span className="text-base font-bold">
                  ₹{price.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">/person</p>
            </div>
              <Button
                size="sm"
                className="flex-shrink-0 "
                data-testid={`button-book-${pkg._id}`}
              >
                Book Now
              </Button>

          </div>
        </div>
      </div>
    </motion.div>

  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "text-muted-foreground/30"
            }`}
        />
      ))}
    </div>
  );
}