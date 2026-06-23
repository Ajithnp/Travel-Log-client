import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contactEnquiries, resolveEnquiry, type ContactEnquiriesResponse, type EnquiryStatus } from "../services/api.services";
import type { ApiResponse } from "@/types/IApiResponse";
import type { AxiosError } from "axios";
import { toast } from "sonner";


export const useContactEnquiriesQuery = (
    page: number,
    limit: number,
    status: EnquiryStatus,
    search?: string,

) => {
    return useQuery<ApiResponse<ContactEnquiriesResponse>, AxiosError<{ message: string }>>({
        queryKey: ["enquiries", { page, limit, status, search }],
        queryFn: () => contactEnquiries(page, limit, status, search),
        staleTime: 1000 * 60 * 10,
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
};

export const useResolveEnquiryMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<string>, AxiosError<{ message: string }>, { enquiryId: string }>({

        mutationFn: ({ enquiryId }) => resolveEnquiry(enquiryId),
        onSuccess: () => {
            toast.success('Success');
            queryClient.invalidateQueries({ queryKey: ["enquiries"] });
        },
        onError: (error) => toast.error(error.response?.data.message ?? 'Error')
    });
};