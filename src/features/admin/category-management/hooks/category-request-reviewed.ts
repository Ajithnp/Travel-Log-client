
import {useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useCategoryRequestReviewedFetch,
} from "./api.hooks";


type FilterTab = "all" | "active" | "rejected";
const LIMIT = 10;

export function useCategoriesReviewedPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);
  const filterValue = activeTab === "all" ? "" : activeTab;


  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, activeTab]);

  const { data, isLoading, isError, error, refetch } = useCategoryRequestReviewedFetch(
    page, LIMIT, debouncedSearch, filterValue
  );

  const categories = data?.data?.data ?? [];
  const totalPages = data?.data?.totalPages ?? 0;


  return {
    activeTab, setActiveTab,
    search, setSearch,
    page, setPage,
    categories,
    totalPages,
    isLoading, isError, error, refetch,
  };
}