import { ItemSkeleton } from "../components/item-skeleton";
import { useWishlistData } from "../hooks/wishlist-data";
import { WishlistItem } from "../components/wishlist-item";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import { EmptyState } from "../components/wishlist-empty";

export function Wishlist() {
  const LIMIT = 6;
  const { items, isLoading } = useWishlistData(LIMIT);
  const navigate = useNavigate();

  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const handleOptimisticRemove = useCallback((packageId: string) => {
    setRemovedIds((prev) => new Set(prev).add(packageId));
  }, []);

  const handleRevert = useCallback((packageId: string) => {
    setRemovedIds((prev) => {
      const next = new Set(prev);
      next.delete(packageId);
      return next;
    });
  }, []);

  const visibleItems = [...(items ?? [])]
    .reverse()
    .filter((item) => !removedIds.has(item.packageId));


  const detailsPageNavigation = (packageId: string) => {
    navigate(`/packages/${packageId}`);
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 bg-[#f7f7fb] font-['Inter'] sm:py-8 mt-13">
      <div className="sticky top-0 z-20 bg-[#f7f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                  Wishlist
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                Saved Trips
              </h1>
            </div>

            {visibleItems.length > 0 && (
              <motion.div
                key={visibleItems.length}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md shadow-violet-200"
              >
                <Bookmark className="w-3 h-3" />
                {visibleItems.length} saved
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5">
        {isLoading ? (
          <div className="space-y-px">
            {Array.from({ length: LIMIT }).map((_, i) => (
              <ItemSkeleton key={i} />
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          <EmptyState />
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="flex flex-col gap-3">
              {visibleItems.map((item, index) => (
                <motion.div
                  key={item.packageId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07, duration: 0.35, ease: "easeOut" }}
                >
                  <WishlistItem
                    item={item}
                    onDetailsClick={detailsPageNavigation}
                    onOptimisticRemove={handleOptimisticRemove}
                    onRevert={handleRevert}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && visibleItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400"
          >
            <span>
              Showing {visibleItems.length}  saved trips
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
