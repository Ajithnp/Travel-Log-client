import { appConfig } from "@/config/config";
import { useInfiniteDataWithSignedUrls } from "../s3/useInfiniteDataWithSignedUrls";
import { usePackageReviewsQuery } from "./api.hooks";
import type { PackageReviewSinglesResponseDto } from "@/services/app-service";


export const usePackageReviews = (packageId?: string, limit: number = 5) => {

  const result = useInfiniteDataWithSignedUrls<PackageReviewSinglesResponseDto>(
    usePackageReviewsQuery(packageId ?? "", limit),
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
  };
};