import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type {
  PaginatedArrayFieldConfig,
  PaginatedData,
} from "./paginated-data-with-signed-urls";
import { useMemo, useRef } from "react";
import {
  createSignedUrlMap,
  extractKeysFromMultipleItems,
} from "@/utils/s3/extract-keys";
import { useGetViewSignedUrlQuery } from "../api.hooks";
import { mergeSignedUrlsToMultipleItems } from "@/utils/s3/merge-urls";

export const useInfiniteDataWithSignedUrls = <T>(
  queryResult: UseInfiniteQueryResult<
    InfiniteData<ApiResponse<PaginatedData<T>>>,
    AxiosError<{ message: string }>
  >,
  config: PaginatedArrayFieldConfig<T>,
) => {
  const { userId, imageFields, enabled = true, dataKey = "packages" } = config;

  const {
    data: infiniteData,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = queryResult;

  // ── Cache: tracks ALL signed URLs fetched so far across all pages
  // useRef because we don't want changes to trigger re-renders
  const signedUrlCacheRef = useRef<Map<string, string>>(new Map());

  //  flatten all pages into one array
  // infiniteData.pages = [ page1Response, page2Response, page3Response, ... ]
  const itemsArray = useMemo((): T[] => {
    if (!infiniteData?.pages) return [];

    return infiniteData.pages.flatMap((page) => {
      const paginatedData = page.data;
      const result =
        paginatedData?.[dataKey as keyof Paginated<T>] ||
        paginatedData?.data ||
        [];
      return result as T[];
    });
  }, [infiniteData?.pages, dataKey]);

  // Extract ALL keys from current items
  const allExtractedKeys = useMemo(() => {
    if (!itemsArray.length || !enabled) {
      return { keys: [], fieldMap: new Map<string, string[]>() };
    }
    const recordArray = itemsArray as unknown as Record<string, unknown>[];
    return extractKeysFromMultipleItems(
      recordArray,
      imageFields as (keyof Record<string, unknown>)[],
    );
  }, [itemsArray, imageFields, enabled]);

  // ── Only pass NEW keys to the signed URL query ──
  const newKeys = useMemo(() => {
    return allExtractedKeys.keys.filter(
      (key) => !signedUrlCacheRef.current.has(key),
    );
  }, [allExtractedKeys.keys]);

  const {
    data: signedUrlsResponse,
    isLoading: isSignedUrlsLoading,
    error: signedUrlsError,
    refetch: refetchSignedUrls,
  } = useGetViewSignedUrlQuery(userId, newKeys, {
    enabled: enabled && newKeys.length > 0 && !isLoading,
  });

  useMemo(() => {
    if (!signedUrlsResponse?.data) return;
    const newUrlMap = createSignedUrlMap(signedUrlsResponse.data);
    newUrlMap.forEach((url, key) => {
      signedUrlCacheRef.current.set(key, url);
    });
  }, [signedUrlsResponse?.data]);

  const mergedPackages = useMemo((): T[] => {
    if (!itemsArray.length) return [];

    if (signedUrlCacheRef.current.size === 0) return itemsArray;

    const recordArray = itemsArray as unknown as Record<string, unknown>[];
    const merged = mergeSignedUrlsToMultipleItems(
      recordArray,
      imageFields as (keyof Record<string, unknown>)[],
      signedUrlCacheRef.current  
    );
    return merged as unknown as T[];
  }, [itemsArray, imageFields, signedUrlsResponse?.data])

  const overallLoading =
    isLoading || (newKeys.keys.length > 0 && isSignedUrlsLoading);

  // Get last page metadata for current page info
  const lastPage = infiniteData?.pages[infiniteData.pages.length - 1];

  return {
    data: mergedPackages,
    isLoading: overallLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    totalPages: lastPage?.data?.totalPages || 0,
    currentPage: lastPage?.data?.currentPage || 1,
    totalCount: lastPage?.data?.totalDocs,
    signedUrlsError: signedUrlsError || null,
    refetchSignedUrls,
  };
};
