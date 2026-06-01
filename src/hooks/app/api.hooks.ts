import { confirmBookingWalletApi, deleteReview, downloadBookingTicket, fetchCategories, fetchPackageDetails, fetchPackageSchedules, fetchPublicPackages, fetchVendorPublicProfile, packageReviews, packageReviewStats, submitReview, verifyBookingPayment, type PackageRatingStatsResponseDto, type PackageReviewsResponseDto, type SubmitReviewRequestDTO } from "@/services/app-service";
import {
  useQuery,
  useInfiniteQuery,
  type InfiniteData,
  type QueryKey,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import type { PackageFilters, TravelPackage } from "./package-listing";
import type { ApiResponse, Paginated } from "@/types/IApiResponse";
import type { CategoryResponse } from "@/types/common/response";
import type { PublicPackageDetailDTO, PublicScheduleDTO, VendorPublicProfileResponseDTO } from "@/types/types";
import type { ConfirmBookingResponseDTO, VerifyPaymentResponseDTO } from "@/types/api/booking-api.types";
import { toast } from "sonner";
import type { ApiError } from "@/types/axios";

export const useCategories = () => {
  return useQuery<
    ApiResponse<CategoryResponse[]>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["public-categories"],

    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useInfinitePackages = (filters: PackageFilters) => {
  return useInfiniteQuery<
    ApiResponse<Paginated<TravelPackage>>,
    AxiosError<{ message: string }>,
    InfiniteData<ApiResponse<Paginated<TravelPackage>>>,
    QueryKey,
    number
  >({
    queryKey: ["publicPackages", filters],

    queryFn: ({ pageParam }) => {
      return fetchPublicPackages(filters, pageParam);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.data?.hasNextPage) {
        const currentPage = Number(lastPage.data.currentPage);
        return currentPage + 1;
      }
      return undefined;
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};


export const usePackagesDetailsQuery = (packageId:string, options?: { enabled?: boolean },) => {
  return useQuery<
    ApiResponse<PublicPackageDetailDTO>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["package",packageId],
    queryFn: () => fetchPackageDetails(packageId),
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const usePackageSchedulesQuery = (packageId:string, options?: { enabled?: boolean },) => {
  return useQuery<
    ApiResponse<PublicScheduleDTO[]>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["package-schedules",packageId],
    queryFn: () => fetchPackageSchedules(packageId),
      enabled: options?.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useInfiniteVendorProfile = (vendorId: string, limit: number = 8) => {
  return useInfiniteQuery<
    ApiResponse<VendorPublicProfileResponseDTO>,
    AxiosError<{ message: string }>,
    InfiniteData<ApiResponse<VendorPublicProfileResponseDTO>>,
    QueryKey,
    number
  >({
    queryKey: ["vendorProfile", vendorId],

    queryFn: ({ pageParam }) => {
      return fetchVendorPublicProfile(vendorId, pageParam, limit);
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.data?.hasNextPage) {
        const currentPage = Number(lastPage.data.currentPage);
        return currentPage + 1;
      }
      return undefined;
    },

    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    enabled: !!vendorId,
  });
};

export const useConfirmBookingWalletMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<ConfirmBookingResponseDTO>, AxiosError<{message:string}>, string>({
    mutationFn: (bookingId) => confirmBookingWalletApi(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings","wallet-balance"] });
    },
  });
};

export const useBookingVerifyPaymentQuery = (sessionId: string, options?: { enabled?: boolean }) => {
  return useQuery<
    ApiResponse<VerifyPaymentResponseDTO>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["verifyPayment", sessionId],
    queryFn: () => verifyBookingPayment(sessionId),
    enabled: options?.enabled,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}

export const useDownloadTicketMutation = () => {
  return useMutation({
    mutationFn: (bookingId: string) => downloadBookingTicket(bookingId),
    onSuccess: () => {
      toast.success('Ticket downloaded successfully');
    },
    onError: (error: unknown) => {
      const parseErrorBlob = async () => {
        if (isAxiosError(error) && error.response?.data instanceof Blob) {
          const text = await error.response.data.text();
          const json = JSON.parse(text);
          toast.error(json.message ?? 'Failed to download ticket');
        } else {
          toast.error('Failed to download ticket');
        }
      };
      parseErrorBlob();
    },
  });
};

// REVIEWS
export const useReviewSubmitMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (review: SubmitReviewRequestDTO) => submitReview(review),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(
        ["bookings", variables.bookingId],
        (old: { data?: { hasReviewed?: boolean } } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              hasReviewed: true,
            },
          };
        }
      );
      toast.success('Review submitted successfully');
    },
    onError: (error: unknown) => {
      toast.error(error instanceof AxiosError ? error.response?.data.message : 'Failed to submit review');
    },
  });
};

export const useReviewDeleteMutation = (packageId:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["package-reviews", packageId] });
      queryClient.invalidateQueries({ queryKey: ["package-review-stats", packageId] });
      toast.success('Review deleted successfully');
    },
    onError: (error: unknown) => {
      toast.error(error instanceof AxiosError ? error.response?.data.message : 'Failed to delete review');
    },
  });
};

export const usePackageReviewStatsQuery = (packageId:string) => {
  return useQuery<ApiResponse<PackageRatingStatsResponseDto>, ApiError>({
    queryKey: ["package-review-stats",packageId],
    queryFn: () => packageReviewStats(packageId),
    enabled: !!packageId,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const usePackageReviewsQuery = (packageId: string, limit: number = 5) => {
  return useInfiniteQuery<ApiResponse<PackageReviewsResponseDto>, AxiosError<{ message: string }>>({
    queryKey: ["package-reviews", packageId, limit],
    queryFn: ({ pageParam = 1 }) => packageReviews(packageId, pageParam as number, limit),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.data;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: !!packageId,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};