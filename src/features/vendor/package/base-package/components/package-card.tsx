import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, IndianRupee, Calendar, Tag, Mountain, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { IPackage } from "../type/package";
import { PackageStatus } from "@/lib/constants/constants";
import InfoItem from "./info-item";
import { cn } from "@/lib/utils";
import { statusColorMap, statusLabelMap } from "@/lib/constants/ui/mapping-ui";


const PackageCard = ({
  pkg,
  onCardClick,
  onButtonClick,
}: {
  pkg: IPackage;
  onCardClick: (id: string) => void;
  onButtonClick: (id: string, e: React.MouseEvent) => void;
}) => {
  const navigate = useNavigate();

  const handlNavigateDraft = (id: string) => {
    navigate(`/vendor/packages/draft/${id}`);
  };

  console.log(onButtonClick);

  const isSchedulable = pkg.status === PackageStatus.PUBLISHED;
  const thumbnailImage = pkg.imageUrl?.[0];

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => onCardClick(pkg.id)}
      className="group cursor-pointer h-full backdrop-blur-md shadow-premium"
    >
      <Card className={cn(
        "relative h-full flex flex-col overflow-hidden border-border/40 bg-card/50 backdrop-blur-sm transition-all duration-500",
        "hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)]",
        "hover:border-primary/20"
      )}>
        {/* Premium Overlay Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {thumbnailImage?.url ? (
            <motion.img
              src={thumbnailImage.url}
              alt={pkg.title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted">
              <div className="text-muted-foreground/40 text-xs font-medium uppercase tracking-widest">No Preview</div>
            </div>
          )}

          {/* Status Badge Over Image */}
          <div className="absolute top-3 left-3 z-10">
            <Badge
              variant="secondary"
              className={cn(
                "backdrop-blur-md border-0 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm",
                statusColorMap[pkg.status]
              )}
            >
              {statusLabelMap[pkg.status]}
            </Badge>
          </div>

          {/* Price Tag Over Image */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-lg px-3 py-1.5 shadow-lg border border-white/20">
              <div className="flex items-center gap-1 text-primary font-bold">
                <IndianRupee className="h-3.5 w-3.5" />
                <span className="text-sm tracking-tight">{pkg.basePrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-grow relative z-10">
          <div className="mb-4">
            {/* <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
                <span className="text-[10px] font-bold ml-1 text-muted-foreground uppercase tracking-tighter">Premium Choice</span>
             </div> */}
            <h3 className="font-bold text-lg leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {pkg.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-y-3 mb-6">
            <InfoItem icon={MapPin} value={pkg.location} />
            <InfoItem
              icon={Calendar}
              value={
                pkg.durationDays && pkg.durationNights
                  ? `${pkg.durationDays}D / ${pkg.durationNights}N`
                  : null
              }
            />
            <InfoItem icon={Tag} value={pkg.category} />
            <InfoItem icon={Mountain} value={pkg.difficultyLevel} />
          </div>

          {/* Footer Action */}
          <div className="mt-auto pt-4 border-t border-border/40">
            <Button
              size="sm"
              variant={isSchedulable ? "default" : "outline"}
              onClick={(e) => {
                e.stopPropagation();
                handlNavigateDraft(pkg.id);
              }}
              className={cn(
                "w-full font-bold tracking-tight h-10 transition-all duration-300",
                isSchedulable
                  ? "bg-primary shadow-md hover:shadow-primary/20 hover:scale-[1.02]"
                  : "hover:bg-muted/80"
              )}
            >
              {pkg.status === PackageStatus.PUBLISHED
                ? "Schedule Trip"
                : "Complete Listing"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PackageCard;
