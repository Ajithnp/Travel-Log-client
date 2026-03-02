import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useCategoryFetch,
  useCategoryToggleMutation,
  useCategoryCreateMutation,
} from "./api.hooks";
import type { CategoryStats } from "../types/response.dtos";
import type { CategoryForm } from "../validations";

type FilterTab = "all" | "active" | "inactive";
type DialogState = { id: string; name: string; type: "activate" | "inactivate" } | null;

const LIMIT = 10;

export function useCategoriesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);
  const filterValue = activeTab === "all" ? "" : activeTab;


  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, activeTab]);

  // --- queries ---
  const { data, isLoading, isError, error, refetch } = useCategoryFetch(
    page, LIMIT, debouncedSearch, filterValue
  );
  const { mutate: toggleStatus, isPending } = useCategoryToggleMutation();
  const { mutate: createCategory, isPending: isCreating } = useCategoryCreateMutation();

  // --- derived data ---
  const categories = data?.data?.data ?? [];
  const states = data?.data?.stats?.[0] as CategoryStats;
  const totalPages = data?.data?.totalPages ?? 0;

  // --- handlers ---
  const handleAction = useCallback((id: string, name: string, type: "activate" | "inactivate") => {
    setDialog({ id, name, type });
  }, []);

  const handleConfirmAction = useCallback(() => {
    if (!dialog) return;
    toggleStatus(
      { id: dialog.id, action: dialog.type === "activate" ? "approve" : "reject" },
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
  }, [dialog, toggleStatus]);

  const handleCreation = useCallback((data: CategoryForm) => {
    createCategory(data, {
      onSuccess: (response) => {
        toast.success(response.message);
        setCreateModalOpen(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    });
  }, [createCategory]);

  const handleVendorRequests = useCallback(() => {
    navigate("/admin/categories/vendor-request");
  }, [navigate]);

  return {

    activeTab, setActiveTab,
    search, setSearch,
    page, setPage,
    dialog, setDialog,
    createModalOpen, setCreateModalOpen,

    categories,
    states,
    totalPages,
    
    isLoading, isError, error, refetch,
  
    isPending, isCreating,
  
    handleAction,
    handleConfirmAction,
    handleCreation,
    handleVendorRequests,
  };
}