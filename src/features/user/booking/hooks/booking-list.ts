import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserBookingsQuery } from "./api.hooks";
import type { BookingFilterTab } from "../types"; 

const LIMIT = 6;

export function useBookingList() {
  const [activeTab, setActiveTab] = useState<BookingFilterTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const debouncedSearch = useDebounce(search);
  const filterValue = activeTab === "all" ? "" : activeTab;

  const { data, isLoading, isError, error, refetch } = useUserBookingsQuery(
    page,
    LIMIT,
    debouncedSearch,
    filterValue,
  );

  
  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, activeTab]);

  const handleNavigateToDetails = (bookingId: string) => {
    navigate(`/user/bookings/${bookingId}`);
  };

  return {
    
    activeTab,
    search,
    page,
    
    bookings: data?.data?.bookings ?? [],
    total: data?.data?.total ?? 0,
    totalPages: data?.data?.totalPages ?? 1,
    LIMIT,

    isLoading,
    isError,
    error,
    
    setActiveTab,
    setSearch,
    setPage,
    refetch,
    handleNavigateToDetails,
  };
}