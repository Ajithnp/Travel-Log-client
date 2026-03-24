import { useEffect, useMemo, useState } from 'react';
import type { UseQueryResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { SignedUrlStatus } from '@/types/signed-urls';
import { useGetViewSignedUrlQuery } from '../api.hooks';
import { extractKeysFromMultipleItems, createSignedUrlMap } from '@/utils/s3/extract-keys';
import { mergeSignedUrlsToMultipleItems } from '@/utils/s3/merge-urls';


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedData<T> {
  packages?: T[];
  data?: T[];
  totalPages: number;
  currentPage: number;
  totalCount?: number;
  totalDocs?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}


export interface PaginatedDataWithSignedUrls<T> {
  data: T[] | undefined;
  totalPages: number;
  currentPage: number;
  totalCount?: number;
  totalDocs?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  isLoading: boolean;
  error: Error | AxiosError<{ message: string }> | null;
  signedUrlsStatus: SignedUrlStatus;
  signedUrlsError: Error | null;
  refetchSignedUrls: () => void;
}

export interface PaginatedArrayFieldConfig<T> {
  userId: string;
  imageFields: Array<keyof T>;
  enabled?: boolean;
  dataKey?: 'packages' | 'data';
}


export const usePaginatedDataWithSignedUrls = <T,>(
  queryResult: UseQueryResult<ApiResponse<PaginatedData<T>>, AxiosError<{ message: string }>>,
  config: PaginatedArrayFieldConfig<T>
): PaginatedDataWithSignedUrls<T> => {

  const { userId, imageFields, enabled = true, dataKey = 'packages' } = config;
  const { data: apiResponse, isLoading: isDataLoading, error: dataError } = queryResult;

  const [signedUrlsStatus, setSignedUrlsStatus] = useState<SignedUrlStatus>('idle');

  const itemsArray = useMemo((): T[] => {
    if (!apiResponse?.data) return [];
    
    const paginatedData = apiResponse.data;
    const result = paginatedData[dataKey] || paginatedData.data || paginatedData.packages || [];
    
    return result as T[];
  }, [apiResponse?.data, dataKey]);


  const extractedKeys = useMemo(() => {
    if (!itemsArray.length || !enabled) {
      return { keys: [], fieldMap: new Map<string, string[]>() };
    }

    const recordArray = itemsArray as unknown as Record<string, unknown>[];
    return extractKeysFromMultipleItems(recordArray, imageFields as (keyof Record<string, unknown>)[]);
  }, [itemsArray, imageFields, enabled]);


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
      setSignedUrlsStatus('idle');
    } else if (isSignedUrlsLoading) {
      setSignedUrlsStatus('loading');
    } else if (signedUrlsError) {
      setSignedUrlsStatus('error');
    } else if (signedUrlsResponse?.data) {
      setSignedUrlsStatus('success');
    }
  }, [enabled, extractedKeys.keys.length, isSignedUrlsLoading, signedUrlsError, signedUrlsResponse]);

  // Merge signed URLs into all items
  const mergedPackages = useMemo((): T[] | undefined => {
    if (!itemsArray.length) {
      return undefined;
    }

    if (extractedKeys.keys.length === 0 || !signedUrlsResponse?.data) {
      return itemsArray;
    }

    const urlMap = createSignedUrlMap(signedUrlsResponse.data);
    
    const recordArray = itemsArray as unknown as Record<string, unknown>[];
    const merged = mergeSignedUrlsToMultipleItems(
      recordArray, 
      imageFields as (keyof Record<string, unknown>)[], 
      urlMap
    );
    

    return merged as unknown as T[];
  }, [itemsArray, signedUrlsResponse?.data, imageFields, extractedKeys.keys.length]);

  // Calculate overall loading state
  const isLoading = isDataLoading || (
    extractedKeys.keys.length > 0 && 
    signedUrlsStatus === 'loading'
  );


  return {
    data: mergedPackages,
    totalPages: apiResponse?.data?.totalPages || 0,
    currentPage: apiResponse?.data?.currentPage || 1,
    totalCount: apiResponse?.data?.totalCount,
    totalDocs: apiResponse?.data?.totalDocs,
    hasNextPage: apiResponse?.data?.hasNextPage,
    hasPreviousPage: apiResponse?.data?.hasPreviousPage,
    isLoading,
    error: dataError,
    signedUrlsStatus,
    signedUrlsError: signedUrlsError || null,
    refetchSignedUrls,
  };
};