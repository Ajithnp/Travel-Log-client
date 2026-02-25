import { useVendorProfileQuery } from "./api.hooks";

export const useVendorId = () => {
  const { data } = useVendorProfileQuery();
  return data?.data?.userId;
};