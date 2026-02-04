
import { AxiosError } from "axios";
import { uploadPackage } from "../services/api.services";
import { useMutation } from "@tanstack/react-query";
import type{ IApiResponse} from "@/types/axios";
import type { BasePackageDraftSchema } from "../validations/draft-base-package-schema";

export const useUploadPackageMutation = () => {
    return useMutation<IApiResponse, AxiosError<{ message: string }>, BasePackageDraftSchema>({
      mutationFn: uploadPackage,
  });
};

// export const useVendorProfileQuery = () => {
//   return useQuery<ApiResponse<VendorProfileData>, AxiosError<{ message: string }>>({
//     queryKey: ["profile"],
//       queryFn: profile,
//       staleTime: 5 * 60 * 10,
//       // gcTime: 1000 * 60 * 10,
//     refetchOnWindowFocus: false,
//   });
// };