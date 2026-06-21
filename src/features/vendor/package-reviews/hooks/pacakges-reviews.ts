import { useInfiniteDataWithSignedUrls } from "@/hooks/s3/useInfiniteDataWithSignedUrls";
import type { PackagesreviewsQuery, VendorPackageReviewResponseDto } from "../services/api.services";
import { usePackagesReviewsQuery } from "./api.hooks";
import { appConfig } from "@/config/config";


export const usePackagesReviews = (params: PackagesreviewsQuery) => {

  const result = useInfiniteDataWithSignedUrls<VendorPackageReviewResponseDto>(
    usePackagesReviewsQuery(params),
    {
      userId: appConfig.publicId,
      imageFields: ['images'],
      dataKey: 'data'
    }
  );

  return {
    reviews: result.data,
    isLoading: result.isLoading,
    error: result.error,
    fetchNextPage: result.fetchNextPage,
    hasNextPage: result.hasNextPage,
    isFetchingNextPage: result.isFetchingNextPage,
    totalCount: result.totalCount,
  };
};