//Custom hook for handling data with multiple object image fields (profileLogo: {key}, ownerIdentity: {key}, etc.)
import { useEffect, useMemo, useState } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type {
  ObjectFieldsConfig,
  DataWithSignedUrls,
  SignedUrlStatus,
} from "@/types/signed-urls";
import { useGetViewSignedUrlQuery } from "../api.hooks";
import {
  extractKeysFromObjectFields,
  createSignedUrlMap,
} from "@/utils/s3/extract-keys";
import { mergeSignedUrlsToObjectFields } from "@/utils/s3/merge-urls";


export const useDataWithSignedUrlFields = <T extends Record<string, unknown>>(
  queryResult: UseQueryResult<{ data: T }, Error>,
  config: ObjectFieldsConfig<T>,
): DataWithSignedUrls<T> => {
  const { userId, imageFields, enabled = true } = config;
  const {
    data: apiResponse,
    isLoading: isDataLoading,
    error: dataError,
  } = queryResult;

  // Track signed URLs status separately
  const [signedUrlsStatus, setSignedUrlsStatus] = useState<SignedUrlStatus>("idle");

  const extractedKeys = useMemo(() => {
    if (!apiResponse?.data || !enabled) {
      return { keys: [], fieldMap: new Map() };
    }
    return extractKeysFromObjectFields(apiResponse.data, imageFields);
  }, [apiResponse?.data, imageFields, enabled]);

  const {
    data: signedUrlsResponse,
    isLoading: isSignedUrlsLoading,
    error: signedUrlsError,
    refetch: refetchSignedUrls,
  } = useGetViewSignedUrlQuery(userId, extractedKeys.keys, {
    enabled: enabled && extractedKeys.keys.length > 0 && !isDataLoading,
  });

  useEffect(() => {
    if (!enabled || extractedKeys.keys.length === 0) {
      setSignedUrlsStatus("idle");
    } else if (isSignedUrlsLoading) {
      setSignedUrlsStatus("loading");
    } else if (signedUrlsError) {
      setSignedUrlsStatus("error");
    } else if (signedUrlsResponse?.data) {
      setSignedUrlsStatus("success");
    }
  }, [
    enabled,
    extractedKeys.keys.length,
    isSignedUrlsLoading,
    signedUrlsError,
    signedUrlsResponse,
  ]);

  const mergedData = useMemo(() => {
    if (!apiResponse?.data) {
      return undefined;
    }

    if (extractedKeys.keys.length === 0 || !signedUrlsResponse?.data) {
      return apiResponse.data;
    }

    const urlMap = createSignedUrlMap(signedUrlsResponse.data);
    return mergeSignedUrlsToObjectFields(apiResponse.data, imageFields, urlMap);
  }, [
    apiResponse?.data,
    signedUrlsResponse?.data,
    imageFields,
    extractedKeys.keys.length,
  ]);

  const isLoading = isDataLoading || (extractedKeys.keys.length > 0 && signedUrlsStatus === "loading");
  return {
    data: mergedData,
    isLoading,
    error: dataError,
    signedUrlsStatus,
    signedUrlsError: signedUrlsError || null,
    refetchSignedUrls,
  };
};
