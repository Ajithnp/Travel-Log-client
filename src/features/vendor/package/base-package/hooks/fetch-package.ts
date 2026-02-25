import { useGetViewSignedUrlQuery } from "@/hooks/api.hooks";
import { usePackagesFetchWithId } from "./api.hooks";
import { useMemo } from "react";

export const useFetchPackage = (packageId: string) => {
  const packageQuery = usePackagesFetchWithId(packageId ?? "", {
    enabled: !!packageId,
  });


  const keys = packageQuery.data?.data.images
    ?.map((img) => img.key)
    .filter((key): key is string => !!key);


  const vendorId = packageQuery.data?.data.vendorId;

  const signedUrlQuery = useGetViewSignedUrlQuery(vendorId, keys, {
    enabled: !!vendorId && !!keys?.length,
  });

  const isLoading = packageQuery.isLoading || signedUrlQuery.isLoading;

  const error = packageQuery.error || signedUrlQuery.error;

  const mergedData = useMemo(() => {
    if (!packageQuery.data || !signedUrlQuery.data) return null;

    const urlMap = new Map(
      signedUrlQuery.data.data.map((item) => [item.key, item.url]),
    );


    return {
      ...packageQuery.data?.data,
      images: packageQuery.data.data.images?.map((img) => ({
        ...img,
        url: urlMap.get(img.key),
      })),
    };
  }, [packageQuery.data, signedUrlQuery.data]);


  return { data: mergedData, isLoading, error };
};
