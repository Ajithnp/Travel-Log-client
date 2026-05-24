import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import StatCard from "@/features/admin/category-management/components/start-card";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import type { ScheduleBookingDetailDTO } from "../services/api.services";
import { PageHeader } from "@/components/shared/page-header";
import ScheduleBookingsHeader from "../components/schedule-bookings-header";
import { ArrowLeft } from "lucide-react";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { BookingDetailSheet } from "../components/booking-detail-sheet";
import { useScheduleBookingList } from "../hooks/useScheduleBookingList";

export default function ScheduleBookingListPage() {
    const {
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
    } = useScheduleBookingList();

    if (isError && error)
        return (
            <Error
                message={error.response?.data?.message}
                code={error.response?.status}
                onRetry={refetch}
            />
        );
    if (isLoading) return <Loader message="Loading..." />;

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Booking List"
                    description="Manage all your trip bookings at one place."
                    primaryAction={{
                        label: "Back to Schedule",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        onClick: handleBack,
                        variant: "outline",
                    }}
                />
                <ScheduleBookingsHeader
                    bookingData={scheduleBookingSummaryData}
                />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard
                        label="CONFIRMED BOOKINGS"
                        value={scheduleBookingSummaryData?.totalConfirmedBookings ?? 0}
                        subtitle="● Accepting bookings"
                        color="text-success"
                        accentColor="bg-success"
                        delay={0.15}
                    />
                    <StatCard
                        label="CANCELLED BOOKINGS"
                        value={scheduleBookingSummaryData?.totalCancelledBookings ?? 0}
                        subtitle="○ Cancelled"
                        color="text-blue-500"
                        accentColor="bg-blue-500"
                        delay={0.2}
                    />
                    <StatCard
                        label="TOTAL EARNINGS"
                        value={scheduleBookingSummaryData?.totalVendorEarning ?? 0}
                        subtitle="● Your earnings"
                        color="text-yellow-500"
                        accentColor="bg-yellow-500"
                        delay={0.25}
                    />
                    <StatCard
                        label="TOTAL REVANUE"
                        value={scheduleBookingSummaryData?.totalConfirmedAmount ?? 0}
                        subtitle="● Total amount"
                        color="text-green-500"
                        accentColor="bg-green-500"
                        delay={0.25}
                    />
                </div>

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search bookings by name or booking Id..."
                />

                <DataTable<ScheduleBookingDetailDTO>
                    data={bookingsData}
                    columns={columns}
                    loading={isLoading}
                    rowKey={(row) => row.id}
                />

                <TableFooter
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />

                <BookingDetailSheet
                    open={isSheetOpen}
                    onOpenChange={handleSheetOpenChange}
                    bookingDetail={bookingDetailsData?.data}
                    isLoading={isDetailsLoading}
                />
            </div>
        </div>
    );
}