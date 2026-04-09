export interface IWishlistToggleResponse {
  wishlisted: boolean;   // true = added, false = removed
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
}
 
export interface IWishlistResponse {
  wishlist: IWishlistItem[];
  page: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
}