import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers, updateUserAccess } from "../service/api.services";
import type { ApiResponse, PaginatedData } from "@/types/IApiResponse";
import type { IUser } from "@/types/IUser";
import { AxiosError } from "axios";
import type { UsersStatusPayload } from "../../types/payload.types";
import type { IApiResponse } from "@/types/axios";
import { useQueryClient } from "@tanstack/react-query";

export const useUsersFetch = (
  page: number,
  limit: number,
  search?: string,
  selectedFilter?: string
) => {
  return useQuery<
    ApiResponse<PaginatedData<IUser>>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["users", { page, limit, search, selectedFilter }],
    queryFn: () => getUsers(page, limit, search, selectedFilter),
       placeholderData: keepPreviousData, // avoid flicker when switching pages
    refetchOnWindowFocus: false,
  });
};

export const useUserStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiResponse,
    AxiosError<{ message: string }>,
    UsersStatusPayload
  >({
    mutationFn: updateUserAccess,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
