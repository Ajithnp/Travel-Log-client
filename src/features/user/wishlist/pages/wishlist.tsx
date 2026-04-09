import { Heart } from "lucide-react";
import { ItemSkeleton } from "../components/item-skeleton";
import { useWishlistData } from "../hooks/wishlist-data";
import { WishlistItem } from "../components/wishlist-item";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";

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
    <div className="min-h-screen bg-white mt-20">
      {/* Header */}
      <div className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                  Wishlist
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Saved Trips
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* List */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {isLoading ? (
          <div>
            {Array.from({ length: 5 }).map((_, i) => (
              <ItemSkeleton key={i} />
            ))}
          </div>
        ) : items?.length === 0 ? (
          <div className="py-24 text-center">
            <Heart className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <h3 className="text-gray-500 font-medium">
              Nothing in this category
            </h3>
          </div>
        ) : (
          <div>
            {visibleItems.map((item) => (
              <WishlistItem
                key={item.packageId}
                item={item}
                onDetailsClick={detailsPageNavigation}
                onOptimisticRemove={handleOptimisticRemove}
                onRevert={handleRevert}
              />
            ))}
          </div>
        )}

        {/* Footer summary */}
        {!isLoading && items?.length && (
          <div className="mt-8 flex items-center justify-between py-5 border-t border-gray-100"></div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
