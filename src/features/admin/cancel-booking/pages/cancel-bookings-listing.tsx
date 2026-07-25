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
import { ConfirmModal } from "@/components/common/confirm-modal";


type FilterTab = "pending" | "approved" | "rejected";
const LIMIT = 10

export default function CancelBookingsListPage() {

    const [activeTab, setActiveTab] = useState<FilterTab>("pending");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState<{
        type: "approve" | "reject";
        bookingId: string;
        reason?: string;
    } | null>(null);


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
        setConfirmAction({ type: "reject", bookingId, reason });
    };

    const handleApproveCancelBooking = (bookingId: string) => {
        setConfirmAction({ type: "approve", bookingId });
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
                isApproving={approveMutation.isPending || confirmAction?.type === "approve"}
                isRejecting={rejectMutation.isPending || confirmAction?.type === "reject"}
            />
            }

            {confirmAction && (
                <ConfirmModal
                    icon={confirmAction.type === "approve" ? "shield" : "warning"}
                    title={confirmAction.type === "approve" ? "Approve Cancellation" : "Reject Cancellation"}
                    description={
                        confirmAction.type === "approve"
                            ? "Are you sure you want to approve this cancellation request? This will refund the calculated amount to the user's wallet."
                            : `Are you sure you want to reject this cancellation request with reason: "${confirmAction.reason}"?`
                    }
                    confirmLabel={confirmAction.type === "approve" ? "Approve" : "Reject"}
                    cancelLabel="Cancel"
                    danger={confirmAction.type === "reject"}
                    loading={approveMutation.isPending || rejectMutation.isPending}
                    onClose={() => setConfirmAction(null)}
                    onConfirm={() => {
                        if (confirmAction.type === "approve") {
                            approveMutation.mutate({ bookingId: confirmAction.bookingId }, {
                                onSuccess: () => {
                                    setOpenDetailsModal(false);
                                    setConfirmAction(null);
                                }
                            });
                        } else {
                            rejectMutation.mutate(
                                { bookingId: confirmAction.bookingId, reason: confirmAction.reason || "" },
                                {
                                    onSuccess: () => {
                                        setOpenDetailsModal(false);
                                        setConfirmAction(null);
                                    }
                                }
                            );
                        }
                    }}
                />
            )}
        </div>
    );
}
