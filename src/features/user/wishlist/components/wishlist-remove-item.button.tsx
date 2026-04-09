import { Trash2 } from "lucide-react";
import { useWishlist } from "../hooks/wishlist";

interface WishlistButtonProps {
    packageId: string;
    onOptimisticRemove: (packageId: string) => void;
    onRevert: (packageId: string) => void;
    
}

const WishlistRemoveItemButton = ({ packageId, onOptimisticRemove, onRevert }: WishlistButtonProps) => {
  const { toggle, isLoading } = useWishlist(packageId,{ onOptimisticRemove, onRevert });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    toggle();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      aria-label={"Remove from wishlist"}
      className="p-1.5 rounded-lg hover:bg-gray-100 transition"
    >
      <Trash2 className="w-4 h-4 text-gray-400" />
    </button>
  );
};

export default WishlistRemoveItemButton;
