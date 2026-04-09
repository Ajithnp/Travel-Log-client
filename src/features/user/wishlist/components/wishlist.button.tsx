import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react'; 
import { selectIsAuthenticated } from '@/store/slices/user.slice';
import { useWishlist } from '../hooks/wishlist';



interface WishlistButtonProps {
  packageId: string;
  className?: string;   
  size?: number;    
}

/**
 * Reusable heart toggle button.
 * Used inside PackageCard (listing page) and PackageDetailPage.
 *
 * Behaviour:
 *   - Authenticated user  → toggles wishlist, optimistic update
 *   - Unauthenticated user → redirects to login
 *   - Loading state        → button disabled, prevents double-click
 */
const WishlistButton = ({
  packageId,
  className = '',
  size = 20,
}: WishlistButtonProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { isWishlisted, toggle, isLoading } = useWishlist(packageId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/user/login');
      return;
    }

    if (isLoading) return; // prevent double-click during API call

    toggle();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={isWishlisted}
      className={`
        wishlist-btn
        transition-transform duration-150
        hover:scale-110
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      <Heart
        size={size}
        fill={isWishlisted ? '#ef4444' : 'none'}
        stroke={isWishlisted ? '#ef4444' : 'currentColor'}
        strokeWidth={2}
        className="transition-colors duration-200"
      />
    </button>
  );
};

export default WishlistButton;