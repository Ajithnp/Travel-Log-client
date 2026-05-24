import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useScheduleBookingsQuery, useScheduleBookingDetailsQuery, useScheduleBookingSummaryQuery } from "./api.hooks";
import { ScheduleBookingColumns } from "../components/schedule-booking-columns";

type FilterTab = "all" | "confirmed" | "cancelled";
const LIMIT = 10;

export const useScheduleBookingList = () => {
    const { scheduleId } = useParams();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const debouncedSearch = useDebounce(search);
    const filterValue = activeTab === "all" ? "" : activeTab;

    const { data: bookingList, isLoading, isError, error, refetch } = useScheduleBookingsQuery(page, LIMIT, scheduleId || '', debouncedSearch, filterValue);
    const bookingsData = bookingList?.data.data || [];
    const totalPages = bookingList?.data?.totalPages ?? 0;

    const { data: bookingSummary } = useScheduleBookingSummaryQuery(scheduleId || '');
    const scheduleBookingSummaryData = bookingSummary?.data;

    const { data: bookingDetailsData, isLoading: isDetailsLoading } = useScheduleBookingDetailsQuery(scheduleId || '', selectedBookingId || '');

    const tabs = useMemo(() => [
            { key: "all" as FilterTab, label: "All" },
            {
                key: "confirmed" as FilterTab,
                label: "Confirmed",
            },
            {
                key: "cancelled_by_user" as FilterTab,
                label: "Cancelled",
            },
        ],
        [scheduleBookingSummaryData],
    );

    useEffect(() => {
        if (page !== 1) setPage(1);
    }, [debouncedSearch, activeTab]);

    const handleViewSchedule = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsSheetOpen(true);
    };

    const columns = useMemo(() => ScheduleBookingColumns(handleViewSchedule), []);

    const handleSheetOpenChange = (open: boolean) => {
        setIsSheetOpen(open);
        if (!open) {
            setTimeout(() => setSelectedBookingId(null), 300);
        }
    };

    const handleBack = () => navigate(-1);

    return {
        activeTab,
        setActiveTab,
        search,
        setSearch,
        page,
        setPage,
        isSheetOpen,
        tabs,
        handleSheetOpenChange,
        handleBack,
        bookingsData,
        totalPages,
        columns,
        isLoading,
        isError,
        error,
        refetch,
        scheduleBookingSummaryData,
        bookingDetailsData,
        isDetailsLoading
    };
};
