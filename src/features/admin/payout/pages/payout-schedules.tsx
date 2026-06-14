import { AnimatePresence } from 'framer-motion';
import { Error } from '@/components/common/error';
import { PageHeader } from '@/components/shared/page-header';
import { useDebounce } from '@/hooks/useDebounce';
import { LIMIT } from '@/lib/constants/constants';
import { ArrowRight, History } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../category-management/components/start-card';
import { FilterWithSearch } from '@/components/shared/filter-with-search';
import DataTable from '@/components/table/DataTable';
import TableFooter from '@/components/table/TableFooter';
import { usePayoutSchedulesQuery, usePayoutOverviewStatsQuery, useReleasePayoutMutation } from '../hooks/api.hooks';
import { PayoutSchedulesColumns } from '../components/payout-schedules-columns';
import { Loader } from '@/components/common/loader';
import type { PayoutScheduleListResponseDto } from '../services/api.services';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import { PayoutLoadingModal } from '../components/payout-loading-modal';
import { PayoutSuccessModal } from '../components/payout-success';



export default function PayoutSchedulesPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
    const [payoutSuccess, setPayoutSuccess] = useState(false);
    const debouncedSearch = useDebounce(search);

    const payoutsQuery = usePayoutSchedulesQuery(page, LIMIT, debouncedSearch);
    const statsQuery = usePayoutOverviewStatsQuery();
    const payoutReleaseMutation = useReleasePayoutMutation();

    const isLoadingData = payoutsQuery.isLoading || statsQuery.isLoading;
    const hasError = payoutsQuery.isError || statsQuery.isError;

    const paginatedData = payoutsQuery.data?.data;
    const payoutsData = paginatedData?.data || [];
    const totalPages = paginatedData?.totalPages || 0;
    const stats = statsQuery.data?.data;

    const handleTriggerPayout = (scheduleid: string) => {
        setSelectedScheduleId(scheduleid);
        setShowConfirm(true);
    }

    const confirmTriggerPayout = () => {
        if (!selectedScheduleId) return;
        payoutReleaseMutation.mutate(selectedScheduleId, {
            onSuccess: () => {
                setPayoutSuccess(true);
            },
        });
        setShowConfirm(false);

    }


    const handleViewPackageSchedules = () => {
        navigate('/admin/commission-overview/packages')
    };
    const columns = useMemo(() => PayoutSchedulesColumns(handleTriggerPayout), []);


    if (hasError)
        return (
            <Error
                message={"Something went wrong,Please try again."}
                onRetry={() => { payoutsQuery.refetch(); statsQuery.refetch() }}
            />
        );
    if (isLoadingData) return <Loader message="Loading..." />;

    const selectedSchedule = payoutsData.find((s) => s.id === selectedScheduleId);

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Pending Payouts"
                    description="List of all payouts that are pending."
                    primaryAction={{
                        label: "Payout History",
                        icon: <History className="w-4 h-4" />,
                        onClick: handleViewPackageSchedules,
                        variant: "outline",
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                    <StatCard
                        label="Total Pending Payout"
                        value={`${paginatedData?.totalDocs ?? 0}`}
                        subtitle="All Upcoming Payouts"
                        color="text-emerald-600"
                        delay={0.1}
                    />
                    <StatCard
                        label="Total completed payouts"
                        value={`${stats?.completedCount ?? 0}`}
                        subtitle="Total Completed Payouts"
                        color="text-success"
                        delay={0.15}
                    />
                    <StatCard
                        label="Processing Payouts"
                        value={`${stats?.processingCount ?? 0}`}
                        subtitle="Total Processing Payouts"
                        color="text-amber-500"
                        delay={0.2}
                    />
                    <StatCard
                        label="Failed Payouts"
                        value={`${stats?.failedCount ?? 0}`}
                        subtitle="Total Failed Payouts"
                        color="text-red-500"
                        delay={0.2}
                    />

                </div>

                <FilterWithSearch
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search vendors by name..."
                />

                <DataTable<PayoutScheduleListResponseDto>
                    data={payoutsData}
                    columns={columns}
                    loading={payoutsQuery.isLoading}
                    rowKey={(row) => row.id}
                />

                {paginatedData && paginatedData.totalDocs > LIMIT && (
                    <TableFooter
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
            <ConfirmDialog
                open={showConfirm && !!selectedScheduleId}
                onOpenChange={(value) => {
                    setShowConfirm(value); 
                    if (!value && !payoutReleaseMutation.isPending && !payoutSuccess) {
                        setSelectedScheduleId("");
                    }
                }}
                title="Trigger payout"
                description={`Are you sure you want to trigger this payout?`}
                onConfirm={() => {
                    confirmTriggerPayout();
                }}
            />
            
            <AnimatePresence>
                {payoutReleaseMutation.isPending && selectedSchedule && (
                    <PayoutLoadingModal 
                        onComplete={() => {}} 
                        amount={selectedSchedule.netAmount} 
                        vendorName={selectedSchedule.vendorname} 
                    />
                )}
                {payoutSuccess && selectedSchedule && (
                    <PayoutSuccessModal 
                        onReset={() => { 
                            setPayoutSuccess(false); 
                            setSelectedScheduleId(""); 
                        }} 
                        amount={selectedSchedule.netAmount} 
                        vendorName={selectedSchedule.vendorname} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}