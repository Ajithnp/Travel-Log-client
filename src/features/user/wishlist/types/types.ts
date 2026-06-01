export interface IWishlistToggleResponse {
  wishlisted: boolean;  
  packageId: string;
}

export interface IWishlistIdsResponse {
  wishlistedPackageIds: string[];
}

export interface IWishlistCountResponse {
  count: number;
}

export interface WishlistImageDTO {
  key: string;
  url?: string;
}

export interface IWishlistItem {
  packageId: string;
  title: string;
  location: string;
  state: string;
  category: string;
  difficultyLevel: string;
  days: string;
  hasUpcomingSchedule: boolean;
  nights: string;
  basePrice: string;
  images: WishlistImageDTO[];  
  averageRating: number;
  totalReviews: number;
}
 
export interface IWishlistResponse {
  wishlist: IWishlistItem[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
}