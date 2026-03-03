import { useCallback, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRequestedCategoryFetch, useRequestCategory } from "./api.hooks";
import { toast } from "sonner";
import type { RequestCategoryForm } from "../validations";

type FilterTab = "pending" | "active" | "rejected";
const LIMIT = 10;

export function useRequestedCategoriesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("pending");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, error, refetch } = useRequestedCategoryFetch(
    page, LIMIT, debouncedSearch, activeTab
  );
  const { mutate: requestCategory, isPending } = useRequestCategory();

  const categories = data?.data.data ?? [];
  const totalPages = data?.data.totalPages ?? 0;

  const handleSubmit = useCallback((formData: RequestCategoryForm) => {
    requestCategory(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        setRequestModalOpen(false);
      },
      onError: (error) => {
        toast.error(error.response?.data.message);
      },
    });
  }, [requestCategory]);

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (isPending) return;
    if (!open) setRequestModalOpen(false);
  }, [isPending]);

  return {

    activeTab, setActiveTab,
    search, setSearch,
    page, setPage,
    requestModalOpen, setRequestModalOpen,
    categories,
    totalPages,
    isLoading, isError, error, refetch,
    isPending,
    handleSubmit,
    handleModalOpenChange,
  };
}