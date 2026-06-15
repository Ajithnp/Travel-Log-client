import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { PageHeader } from "@/components/shared/page-header";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../category-management/components/start-card";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { LIMIT } from "@/lib/constants/constants";
import type { FindAllPayoutsResponseDto } from "../services/api.services";
import { ArrowLeft } from "lucide-react";
import { PayoutHistoryColumns } from "../components/payout-history-columns";
import { usePayoutsQuery, usePayoutStatsQuery } from "../hooks/api.hooks";

type FilterTab = "all" | "completed" | "failed";
export default function PayoutHistoryPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedScheduleId, setSelectedScheduleId] = useState<string>("");
    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const debouncedSearch = useDebounce(search);
    const filterValue = activeTab === "all" ? undefined : activeTab;

    const tabs = [
        { key: "all" as FilterTab, label: "All" },
        { key: "completed" as FilterTab, label: "Completed" },
        { key: "failed" as FilterTab, label: "Failed" },
    ];

    const payoutsQuery = usePayoutsQuery(page, LIMIT, filterValue, debouncedSearch);
    const statsQuery = usePayoutStatsQuery();


    const isLoadingData = payoutsQuery.isLoading || statsQuery.isLoading;
    const hasError = payoutsQuery.isError || statsQuery.isError;

    const paginatedData = payoutsQuery.data?.data;
    const payoutsData = paginatedData?.data || [];
    const totalPages = paginatedData?.totalPages || 0;
    const stats = statsQuery.data?.data;

    const handleTriggerPayoutView = (scheduleid: string) => {
        setSelectedScheduleId(scheduleid);
        setShowConfirm(true);
    }

    const handleBackToPending = () => {
        navigate('/admin/payouts/schedules')
    };
    const columns = useMemo(() => PayoutHistoryColumns(handleTriggerPayoutView), []);

    if (hasError)
        return (
            <Error
                message={"Something went wrong,Please try again."}
                onRetry={() => { payoutsQuery.refetch(); statsQuery.refetch() }}
            />
        );
    if (isLoadingData) return <Loader message="Loading..." />;


    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Payout History"
                    description="List of all payouts history."
                    primaryAction={{
                        label: "Back to Pending Payouts",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        onClick: handleBackToPending,
                        variant: "outline",
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    <StatCard
                        label="Total Payouts"
                        value={`₹ ${stats?.totalRevanue ?? 0}`}
                        subtitle={`Total Payouts Completed ${stats?.totalPayouts}`}
                        color="text-emerald-600"
                        delay={0.1}
                    />
                    <StatCard
                        label="Total Commission Earned"
                        value={`₹ ${stats?.commissionEarned ?? 0}`}
                        subtitle="Total Commission Earned"
                        color="text-success"
                        delay={0.15}
                    />
                    <StatCard
                        label="Vendors Payment"
                        value={`₹ ${stats?.netAmount ?? 0}`}
                        subtitle="Total Vendor Payment"
                        color="text-amber-500"
                        delay={0.2}
                    />
                    {/* <StatCard
                        label="Failed Payouts"
                        value={`${stats?.failedCount ?? 0}`}
                        subtitle="Total Failed Payouts"
                        color="text-red-500"
                        delay={0.2}
                    /> */}

                </div>

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    gradient="from-indigo-200/60 to-white"
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search vendors by name..."
                />

                <DataTable<FindAllPayoutsResponseDto>
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

        </div>
    );
}