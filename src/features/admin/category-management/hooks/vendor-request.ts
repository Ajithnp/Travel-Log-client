import { useCallback, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useCategoryRequestFetch, useCategoryReviewMutation } from "./api.hooks";
import { toast } from "sonner";

export type ReviewType = "approve" | "rejected";
const LIMIT = 10;

export function useVendorRequestPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<{ id: string; name: string; type: ReviewType } | null>(null);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, error, refetch } = useCategoryRequestFetch(page, LIMIT, debouncedSearch);
  const { mutate: updateReview, isPending } = useCategoryReviewMutation();

  const categories = data?.data.data;
  const totalPages = data?.data.totalPages ?? 0;

  const handleUserAction = useCallback((id: string, name: string, type: ReviewType) => {
    setDialog({ id, name, type });
  }, []);

  const handleConfirmAction = useCallback((reason?: string) => {
    if (!dialog) return;

    updateReview(
      { id: dialog.id, action: dialog.type, rejectionReason: reason },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setDialog(null);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
        },
      }
    );
  }, [dialog, updateReview]);

  const closeDialog = useCallback(() => {
    if (isPending) return; 
    setDialog(null);
  }, [isPending]);

  return {
    search, setSearch,
    page, setPage,
    dialog, closeDialog,
   
    categories,
    totalPages,
  
    isLoading, isError, error, refetch,
   
    isPending,

    handleUserAction,
    handleConfirmAction,
  };
}