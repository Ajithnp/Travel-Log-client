import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, Heart, MapPin } from "lucide-react";
import type { IWishlistItem } from "../types/types";
import WishlistRemoveItemButton from "./wishlist-remove-item.button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { difficultyConfig } from "@/lib/constants/ui/mapping-ui";
import { StarRating } from "@/components/common/start-rating";



export function WishlistItem({
  item,
  onDetailsClick,
  onOptimisticRemove,
  onRevert,
}: {
  item: IWishlistItem;
  onDetailsClick: (packageId: string) => void;
  onOptimisticRemove: (packageId: string) => void;
  onRevert: (packageId: string) => void;
}) {
  const diff = difficultyConfig[item.difficultyLevel] ?? difficultyConfig["Easy"];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40, scale: 0.96 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="group border-0 bg-white shadow-md hover:shadow-md transition-shadow duration-300 rounded-none sm:rounded-2xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 p-4 sm:p-5">
            <div className="relative w-full sm:w-28 h-48 sm:h-24 flex-shrink-0 rounded-xl overflow-hidden mb-3 sm:mb-0">
              <motion.img
                src={item.images[0].url}
                alt={item.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
                <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 h-full">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200">
                      {item.category}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${diff.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
                      {item.difficultyLevel}
                    </span>
                  </div>

                  <h3 className="font-semibold text-gray-900 text-sm sm:text-[15px] leading-snug tracking-tight line-clamp-2">
                    {item.title} <div className="flex items-center gap-1"> <StarRating rating={item.averageRating} size={"sm"} /> <span className="text-xs text-gray-400">{item.totalReviews} reviews</span></div>
                  </h3>


                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.days}D / {item.nights}N
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.location}, {item.state}
                    </span>
                  </div>

                  {item.basePrice && (
                    <p className="text-sm font-semibold text-gray-900">
                      ₹{item.basePrice.toLocaleString()}
                      <span className="text-xs font-normal text-gray-400 ml-1">
                        / person
                      </span>
                    </p>
                  )}
                </div>
                <div className="flex sm:flex-col flex-row-reverse sm:flex-row items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-3 pt-1">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="sm"
                      onClick={() => onDetailsClick(item.packageId)}
                      disabled={!item.hasUpcomingSchedule}
                      className={`
                        text-xs h-9 px-4 rounded-xl font-semibold shadow-sm transition-all duration-200
                        ${item.hasUpcomingSchedule
                          ? "bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white border-0"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed border-0"
                        }
                      `}
                    >
                      {item.hasUpcomingSchedule ? (
                        <>
                          Book Now
                          <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      ) : (
                        "Unavailable"
                      )}
                    </Button>
                  </motion.div>
                  <WishlistRemoveItemButton
                    packageId={item.packageId}
                    onOptimisticRemove={onOptimisticRemove}
                    onRevert={onRevert}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
