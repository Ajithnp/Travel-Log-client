import { useInfiniteDataWithSignedUrls } from "@/hooks/s3/useInfiniteDataWithSignedUrls";
import { useInfiniteWishlist } from "./api.hooks";
import type { IWishlistItem } from "../types/types";
import { appConfig } from "@/config/config";

export const useWishlistData = (limit: number) => {
  const query = useInfiniteDataWithSignedUrls<IWishlistItem>(
    useInfiniteWishlist(limit),
    {
      userId: appConfig.publicId ?? "",
      imageFields: ["images"],
      dataKey: "data",
      enabled: !!appConfig.publicId,
    }
  );

  const items = query.data ?? [];

  return {
    ...query,
    items,
    isEmpty: items.length === 0,
  };
};