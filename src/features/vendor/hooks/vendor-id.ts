import { useVendorProfileQuery } from "./api.hooks";

export const useVendorId = () => {
  const { data } = useVendorProfileQuery();
  console.log('vendor data hook', data)
  return data?.data?.userId;
};