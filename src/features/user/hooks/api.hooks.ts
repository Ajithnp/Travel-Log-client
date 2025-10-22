
import { profile } from "../services/api.services";
import type { ApiError } from "@/types/axios";
import { useQuery } from "@tanstack/react-query";
import type { UserProfileData } from "../types/response";

export const useUserProfileQuery = () => {
  return useQuery<UserProfileData, ApiError>({
    queryKey: ["profile"],
      queryFn: profile,
      // staleTime: 1000 * 60 * 10,
      // gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};