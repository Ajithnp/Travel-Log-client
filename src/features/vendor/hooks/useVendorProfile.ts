import { extractFileKeys } from "@/utils/extractFileKeys";
import { useVendorProfileQuery } from "./api.hooks";
import { useGetViewSignedUrlQuery } from "@/hooks/api.hooks";
import type { IVendorInfo } from "@/types/IVendorInfo";

interface UseVendorProfileReturn {
  vendor: Partial<IVendorInfo> | undefined;
  vendorQuery: ReturnType<typeof useVendorProfileQuery>;
  profileLogoUrl: string | undefined
  logoQuery: ReturnType<typeof useGetViewSignedUrlQuery>;
}

const useVendorProfile = ():UseVendorProfileReturn => {
  const vendorQuery = useVendorProfileQuery();
  const vendor = vendorQuery.data?.data;
  const userId = vendor?.userId ?? undefined;

  const fileKeys = extractFileKeys(vendor?.profileLogo);

  const logoQuery = useGetViewSignedUrlQuery(userId, fileKeys, {
    enabled: !!userId && fileKeys.length > 0,
  });

  return {
    vendor,
    vendorQuery,
    profileLogoUrl:logoQuery.data?.data[0],
    logoQuery,
  };
};

export default useVendorProfile;
