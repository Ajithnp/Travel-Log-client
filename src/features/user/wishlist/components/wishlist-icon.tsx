import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import {selectWishlistCount, selectWishlistIsInitialised } from '@/store/slices/wishlist.slice';
import { selectIsAuthenticated } from '@/store/slices/user.slice';


interface Props {
  hasBackground: boolean;
}

export const NavbarWishlistIcon = ({ hasBackground }: Props) => {
  const count = useSelector(selectWishlistCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isInitialised = useSelector(selectWishlistIsInitialised);

    
  if (!isAuthenticated) return null;

  return (
    <Link to="/user/wishlist" aria-label={`Wishlist${count > 0 ? `, ${count} items` : ''}`}
      className="relative inline-flex items-center"
    >
      <Heart
        size={24}
        strokeWidth={2}
        className={`transition-colors duration-300 ${
          hasBackground ? 'text-gray-600 hover:text-orange-500' : 'text-white/90 hover:text-white'
        }`}
      />

      {isInitialised && count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1 leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
};