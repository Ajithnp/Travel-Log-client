import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useScedulesFetch } from "./api.hooks";

type FilterTab =
  | "all"
  | "upcomming"
  | "completed"
  | "ongoing"
  | "cancelled"
  | "sold_out";

const LIMIT = 10;

export function useScheduleList() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [createModalOpen, setCreateModalOpen] = useState(false);
    
  const debouncedSearch = useDebounce(search);
  const filterValue = activeTab === "all" ? "" : activeTab;

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, activeTab, startDate, endDate]);

  const { data, isLoading, isError, error, refetch } = useScedulesFetch(
    page,
    LIMIT,
    debouncedSearch,
    filterValue,
    startDate ? startDate.toISOString() : undefined,
    endDate ? endDate.toISOString() : undefined,
    );

  const schedules = data?.data?.data ?? [];
  const states = data?.data?.statusCounts;
  const totalPages = data?.data?.totalPages ?? 0;
  const totalDocs = data?.data?.totalDocs ?? 0;

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    page,
    setPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    createModalOpen,
    setCreateModalOpen,
    schedules,
    states,
    totalPages,
    totalDocs,
    isLoading,
    isError,
    error,
    refetch,
  };
}
