import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { PageHeader } from "@/components/shared/page-header";
import DataTable from "@/components/table/DataTable";
import { useMemo, useState } from "react";
import type { CancellationRequestRsponse } from "../services/api.service";
import TableFooter from "@/components/table/TableFooter";
import { CancellationColumns } from "../components/cancellation-columns";
import { useCancelBookingApproveMutation, useCancelBookingRejectMutation, useCancellationRequestDetailsQuery, useCancelRequestsQuery } from "../hooks/api.hooks";
import BookingCancellationDetails from "../components/details-modal";

type FilterTab = "pending" | "approved" | "rejected";
const LIMIT = 10

export default function CancelBookingsListPage() {

    const [activeTab, setActiveTab] = useState<FilterTab>("pending");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);

    const { data, isLoading, isError, error, refetch } = useCancelRequestsQuery(
        page, LIMIT, activeTab
    );

    const { data: cancelRequestDetailsData, isLoading: isCancelRequestDetailsLoading, error: cancelRequestDetailsError } = useCancellationRequestDetailsQuery(selectedBookingId ?? "");
    const approveMutation = useCancelBookingApproveMutation();
    const rejectMutation = useCancelBookingRejectMutation();
    const cancelBookings = data?.data.data ?? [];
    const totalPages = data?.data.totalPages ?? 0;

    const tabs = useMemo(() => [
        { key: "pending" as FilterTab, label: "Pending" },
        { key: "approved" as FilterTab, label: "Approved" },
        { key: "rejected" as FilterTab, label: "Rejected" },
    ], []);

    const handleRejectCancelBooking = (bookingId: string, reason: string) => {
        rejectMutation.mutate({ bookingId, reason }, {
            onSuccess: () => {
                setOpenDetailsModal(false);
            }
        });
    };

    const handleApproveCancelBooking = (bookingId: string) => {
        approveMutation.mutate({ bookingId }, {
            onSuccess: () => {
                setOpenDetailsModal(false);
            }
        });
    };

    const handleViewAction = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setOpenDetailsModal(true);
    };

    const columns = useMemo(() => CancellationColumns(
        handleViewAction,
    ), []);

    if (isError || cancelRequestDetailsError) return (
        <Error
            message={cancelRequestDetailsError?.response?.data?.message || error?.response?.data?.message}
            code={cancelRequestDetailsError?.response?.status || error?.response?.status}
            onRetry={refetch}
        />
    );
    if (isLoading) return <Loader message="Loading..." />;

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Cancellation Requests"
                    description="View and manage cancellation requests."
                />

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search categories by name..."
                />

                <DataTable<CancellationRequestRsponse>
                    data={cancelBookings}
                    columns={columns}
                    loading={false}
                    rowKey={(row) => row._id}
                />

                <TableFooter
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>

            {openDetailsModal && selectedBookingId && <BookingCancellationDetails
                open={openDetailsModal}
                data={cancelRequestDetailsData?.data}
                isLoading={isCancelRequestDetailsLoading}
                onOpenChange={setOpenDetailsModal}
                bookingId={selectedBookingId}
                onApprove={handleApproveCancelBooking}
                onReject={handleRejectCancelBooking}
                isApproving={approveMutation.isPending}
                isRejecting={rejectMutation.isPending}
            />
            }
        </div>
    );
}
