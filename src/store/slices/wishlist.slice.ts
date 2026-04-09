import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type{ RootState } from '../store';


interface WishlistState {
  wishlistedIds: string[];   // packageIds the user has wishlisted
  count: number;             // navbar badge reads this
  isInitialised: boolean;    // true after first fetch — prevents duplicate API calls
}

const initialState: WishlistState = {
  wishlistedIds: [],
  count: 0,
  isInitialised: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
 
    /**
     * Called ONCE on login after fetching /wishlist/ids and /wishlist/count.
     * Also sets isInitialised = true to prevent re-fetching.
     */
    setWishlistData: (
      state,
      action: PayloadAction<{ ids: string[]; count: number }>,
    ) => {
      state.wishlistedIds = action.payload.ids;
      state.count = action.payload.count;
      state.isInitialised = true;
    },
 
    /**
     * Called BEFORE the API call (optimistic update).
     * If packageId is in the array → remove it, decrement count.
     * If packageId is not in the array → add it, increment count.
     */
    toggleWishlistId: (state, action: PayloadAction<string>) => {
      const packageId = action.payload;
      const index = state.wishlistedIds.indexOf(packageId);
 
      if (index !== -1) {
        // Already wishlisted → remove
        state.wishlistedIds.splice(index, 1);
        state.count = Math.max(0, state.count - 1); 
      } else {
        // Not wishlisted → add
        state.wishlistedIds.push(packageId);
        state.count += 1;
      }
    },
 
    /**
     * Called when the API call fails after an optimistic update.
     */
    revertWishlistState: (
      state,
      action: PayloadAction<{ ids: string[]; count: number }>,
    ) => {
      state.wishlistedIds = action.payload.ids;
      state.count = action.payload.count;
    },
 
    /**
     * Clears all wishlist state — prevents stale data showing
     */
    resetWishlist: () => initialState,
  },
});

export const {
  setWishlistData,
  toggleWishlistId,
  revertWishlistState,
  resetWishlist,
} = wishlistSlice.actions;



export const selectWishlistedIds = (state: RootState) =>
  state.wishlist.wishlistedIds;
 
export const selectWishlistCount = (state: RootState) => state.wishlist.count;
 

export const selectWishlistIsInitialised = (state: RootState) =>
  state.wishlist.isInitialised;
 

export const selectIsWishlisted = (packageId: string) => (state: RootState) =>
  state.wishlist.wishlistedIds.includes(packageId);
 
export default wishlistSlice.reducer;