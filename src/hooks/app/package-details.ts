import { appConfig } from "@/config/config";
import { useDataWithSignedUrls } from "../s3/data-with-signed-urls";
import { usePackageSchedulesQuery, usePackagesDetailsQuery } from "./api.hooks";
import type { PublicPackageDetailDTO } from "@/types/types";

export const usePackageDetailsPage = (packageId?: string) => {
    
  const { data, isLoading:isFetchingPackage, error:packageError } =
    useDataWithSignedUrls<PublicPackageDetailDTO>(
      usePackagesDetailsQuery(packageId ?? "", { enabled: !!packageId }),
      {
        userId: appConfig.publicId,
        imageFields: ['images'],

      }
    );
    
  const schedulesQuery = usePackageSchedulesQuery(packageId ?? "", { enabled: !!packageId });

  const isLoading =
    isFetchingPackage ||
    schedulesQuery.isLoading
   
  const error =
    packageError ||
    schedulesQuery.error

  return {
    package: data,
    schedules: schedulesQuery.data?.data,


    isLoading,
    error,
  };
};