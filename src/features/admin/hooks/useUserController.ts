import { useState, useEffect, useCallback } from "react";
import { useUsersFetch, useUserStatusMutation } from "../user-management/hooks/api.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

export type UserFilter = "all" | "active" | "blocked";

export const useUsersController = () => {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<UserFilter>("all");
  const [page, setPage] = useState<number>(1);
    
  const LIMIT = 5;

  const debouncedSearch = useDebounce(search);

    const {
        data,
        isLoading,
        isError,
        error
     } = useUsersFetch(page,LIMIT,debouncedSearch,filter);
  
    
    
    
  

  const { mutate: updateStatus, isPending } = useUserStatusMutation();

  const users = data?.data.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const confirmAction = (dialog: { id: string, type: "block" | "unblock" }, reason?: string) => {
    updateStatus(
      { id: dialog.id, blockUser: dialog.type === "block", reason },
      {
        onSuccess: (res) => toast.success(res.message),
        onError: (err) => toast.error(err?.response?.data?.message || err.message),
      }
    );
    };
    
  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filter]);

  return {
    search, setSearch,
    filter, setFilter,
    page, setPage,
    users, totalPages,
    isLoading, isError, error,
    confirmAction,
    isConfirming: isPending,
  };
};
