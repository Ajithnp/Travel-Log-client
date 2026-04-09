import { Button } from "@/components/ui/button";
import {ChevronRight, Clock, Heart, MapPin } from "lucide-react";
import type { IWishlistItem } from "../types/types";
import WishlistRemoveItemButton from "./wishlist-remove-item.button";
import { difficultyColors } from "@/components/app/package-card";

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
  console.log("WishlistItem rendered with item:", item);
  return (
    <div
      className={`group transition-all duration-300 "opacity-100
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4 py-5">
        <div className="relative w-full sm:w-24 h-44 sm:h-20 md:h-24 lg:h-28 flex-shrink-0 rounded-xl overflow-hidden">
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* {discount && (
            <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
              -{discount}%
            </div>
          )} */}
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold text-orange-600`}
                >
                  {/* <Icon className="w-3 h-3" /> */}
                  {item.category}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${difficultyColors[item.difficultyLevel as keyof typeof difficultyColors]}`}
                >
                  {item.difficultyLevel}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                {item.title}
              </h3>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                  {item.days} Days, {item.nights} Nights
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  {item.location}, {item.state}
                </span>
                {/* <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {item.rating}
                  <span className="text-gray-400">({item.reviews})</span>
                </span> */}
              </div>
              {/* {item.note && (
                <p className="text-xs text-gray-400 italic flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {item.note}
                </p>
              )} */}
            </div>
            <div className="flex sm:flex-col justify-between items-end gap-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <WishlistRemoveItemButton
                  packageId={item.packageId}
                  onOptimisticRemove={onOptimisticRemove}
                  onRevert={onRevert}
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDetailsClick(item.packageId)}
                disabled={!item.hasUpcomingSchedule}
                className={`
                   text-xs px-3 py-1 h-8 rounded-lg
                    transition-all duration-200 ease-out
                     hover:scale-[1.03] hover:shadow-sm
                    active:scale-[0.97]

               ${
                item.hasUpcomingSchedule
                 ? "text-primary hover:bg-primary/10"
                  : "text-red-600 border-gray-300 cursor-not-allowed"
                }
              `}
              >
                {item.hasUpcomingSchedule ? "Book Now" : "Not Available"}

                <ChevronRight
                  className={`
      w-3 h-3 ml-1 transition-all duration-300
      ${item.hasUpcomingSchedule ? "group-hover:translate-x-0.5" : ""}
    `}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100 last:border-0" />
    </div>
  );
}
