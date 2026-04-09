import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlistCountApi, getWishlistedIdsApi } from '../services/api.services';
import { selectWishlistIsInitialised, setWishlistData } from '@/store/slices/wishlist.slice';
import { selectIsAuthenticated } from '@/store/slices/user.slice';
 

export const useInitialiseWishlist = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialised = useSelector(selectWishlistIsInitialised);
 
  useEffect(() => {
 
    // Guard: only fetch if user is logged in and haven't fetched yet
    if (!isAuthenticated || isInitialised) return;

    const initialise = async () => {
      try {
        const [ids, count] = await Promise.all([
          getWishlistedIdsApi(),
          getWishlistCountApi(),
        ]);
        dispatch(setWishlistData({ ids, count }));
      } catch {
        console.warn('Failed to initialise wishlist');
      }
    };
 
    initialise();
 
  }, [isAuthenticated, isInitialised, dispatch]);
};