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

export interface IWishlistItem {
  packageId: string;
  title: string;
  location: string;
  state: string;
  category: string;
  difficultyLevel: string;
  days: string;
  nights: string;
  basePrice: string;
  image: string;   // first image key only
}
 
export interface IWishlistResponse {
  wishlist: IWishlistItem[];
  count: number;
}