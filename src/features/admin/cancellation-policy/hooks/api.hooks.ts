import type { ApiResponse} from "@/types/IApiResponse";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Policy } from "../types";
import { createPolicy } from "../services/api.service";



export const usePolicyCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<Policy>,
    AxiosError<{ message: string }>,
    Omit<Policy, "id" | "createdAt" | "updatedAt" | "isActive">
  >({
    mutationFn: (payload) => createPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policy"] });
    },
  });
};


