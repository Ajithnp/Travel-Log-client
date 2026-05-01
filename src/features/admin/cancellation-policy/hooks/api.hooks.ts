import type { ApiResponse} from "@/types/IApiResponse";
import {useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { Policy } from "../types";
import { createPolicy, getPolicies, togglePolicyActive } from "../services/api.service";



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

export const usePoliciesQuery = ( includeInactive: boolean) => {
  return useQuery<ApiResponse<Policy[]>, AxiosError>({
    queryKey: ["policy",includeInactive],
    queryFn: async () => {
      return getPolicies(includeInactive);
    }
  });
}

export const useTogglePolicyActiveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ApiResponse<Policy>,
    AxiosError<{ message: string }>,
    { isActive: boolean; id: string }
  >({
    mutationFn: (payload) => togglePolicyActive(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policy"] });
    },
  });
};
