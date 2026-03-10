import type { IApiResponse } from "@/types/axios";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { schedulePackage } from "../services/api.services";
import type { ScheduleFormValues } from "../validations/validation schemas";

export const useSchedulePackageMutation = (packageId: string) => {
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    ScheduleFormValues
  >({
    mutationFn:(payload) => schedulePackage(packageId, payload),
  });
};

// export const usePackagesFetch = (
//   page: number,
//   limit: number,
//   search?: string,
//   selectedFilter?: string,
// ) => {
//   return useQuery<
//     ApiResponse<PaginatedData<IPackage>>,
//     AxiosError<{ message: string }>
//   >({
//     queryKey: ["packages", { page, limit, search, selectedFilter }],
//     queryFn: () => getPackages(page, limit, search, selectedFilter),
//     placeholderData: keepPreviousData,
//     refetchOnWindowFocus: false,
//   });
// };