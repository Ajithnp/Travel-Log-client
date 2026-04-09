import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { toggleWishlistApi } from "../services/api.services";
import { toast } from "sonner";
import {
  revertWishlistState,
  selectIsWishlisted,
  selectWishlistCount,
  selectWishlistedIds,
  toggleWishlistId,
} from "@/store/slices/wishlist.slice";
import { useQueryClient } from "@tanstack/react-query";

/**
 * useWishlist(packageId)
 * The single interface for all wishlist interactions.
 * Components never touch Redux or axios directly — only this hook.
 
 * Returns:
 *   isWishlisted  → boolean  — reads Redux, instant, no API call
 *   toggle()      → void     — full optimistic update flow
 *   isLoading     → boolean  — true while API call is in flight
 */
interface WishlistCallbacks {
  onOptimisticRemove?: (packageId: string) => void;
  onRevert?: (packageId: string) => void;
}

export const useWishlist = (packageId: string,callbacks?: WishlistCallbacks) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isWishlisted = useSelector(selectIsWishlisted(packageId));

  const wishlistedIds = useSelector(selectWishlistedIds);
  const count = useSelector(selectWishlistCount);

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleWishlistApi(packageId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      /**
       * API call failed after optimistic update.
       * Revert Redux to the snapshot captured before the toggle.
       */
      dispatch(
        revertWishlistState({
          ids: snapshotRef.ids,
          count: snapshotRef.count,
        }),
      );

      callbacks?.onRevert?.(packageId);


      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  // ── Snapshot ref — holds pre-toggle state for rollback
  const snapshotRef = { ids: wishlistedIds, count };

  const toggle = useCallback(() => {
    // Step 1 — capture snapshot synchronously
    snapshotRef.ids = wishlistedIds;
    snapshotRef.count = count;

        callbacks?.onOptimisticRemove?.(packageId);

    // Step 2 — optimistic update: update Redux immediately
    // Heart turns red/outline instantly, count updates instantly
    dispatch(toggleWishlistId(packageId));

    // Step 3 — fire API call in background
    // onError above handles the revert if this fails
    mutate();
  }, [dispatch, mutate, packageId, wishlistedIds, count, callbacks]);

  return {
    isWishlisted,
    toggle,
    isLoading: isPending,
  };
};
