import { useMemo } from "react";
import { useInfiniteVendorProfile } from "./api.hooks";

import { useInfiniteDataWithSignedUrls } from "../s3/useInfiniteDataWithSignedUrls";
import type { TravelPackage } from "./package-listing";
import type { VendorPublicProfileVendorDTO } from "@/types/types";
import { useGetViewSignedUrlQuery } from "../api.hooks";

export const useVendorProfile = (vendorId: string) => {

  const queryResult = useInfiniteVendorProfile(vendorId);

  const {
    data: packages,
    isLoading: isPackagesLoading,
    error: packagesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalPages,
    totalCount,
  } = useInfiniteDataWithSignedUrls<TravelPackage>(queryResult, {
    userId: "shared", 
    imageFields: ["images"],
    dataKey: "packages",
    enabled: !!vendorId,
  });


  const vendorData: VendorPublicProfileVendorDTO | undefined = useMemo(() => {
    return queryResult.data?.pages?.[0]?.data?.vendor;
  }, [queryResult.data]);

  const profilePhotoKeys = useMemo(() => {
    if (vendorData?.profilePhoto) {
      return [vendorData.profilePhoto];
    }
    return [];
  }, [vendorData]);

  const { data: profilePhotoUrls, isLoading: isProfilePhotoLoading } = useGetViewSignedUrlQuery(
    "shared", // public access
    profilePhotoKeys,
    {
      enabled: profilePhotoKeys.length > 0,
    }
  );


  const hydratedVendor = useMemo(() => {
    if (!vendorData) return undefined;

   
    const merged = { ...vendorData };

    if (vendorData.profilePhoto && profilePhotoUrls?.data) {
      const match = profilePhotoUrls.data.find(r => r.key === vendorData.profilePhoto);
      if (match?.url) {
        merged.profilePhotoUrl = match.url;
      }
    }
    return merged;
  }, [vendorData, profilePhotoUrls]);

  // Combine loading states
  const isLoading = queryResult.isLoading || isPackagesLoading || isProfilePhotoLoading;

  return {
    vendor: hydratedVendor,
    packages: packages ?? [],
    totalCount: totalCount ?? 0,
    totalPages,
    isLoading,
    isFetchingNextPage,
    error: queryResult.error || packagesError,
    fetchNextPage,
    hasNextPage,
  };
};
