import { FilterWithSearch, type TabItem } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useVendorPackageSchedulesStatsQuery, useVendorsPackageSchedulesQuery } from "../hooks/api.hooks";
import type { SchedulesResponseDTO } from "../services/api.services";
import { VendorPackageSchedulesColumns } from "../components/vendor-package-schedules-column";
import StatCard from "../../category-management/components/start-card";

type FilterTab = "all" | "upcoming" | "completed" | "sold_out";
const LIMIT = 10;


export default function VendorsPackageSchedulesPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);
    const filter = activeTab === 'all' ? undefined : activeTab

    const { data: statsData, isLoading: statsLoading } = useVendorPackageSchedulesStatsQuery()
    const { data: res, isLoading, isError, error, refetch } = useVendorsPackageSchedulesQuery(page, LIMIT, debouncedSearch, filter)

    const schedulesData = res?.data?.data || [];
    const totalDocs = res?.data?.totalDocs || 0;
    const totalPages = res?.data?.totalPages || 0;
    const stats = statsData?.data

    const tabs: TabItem<FilterTab>[] = [
        { key: "all", label: "All", count: totalDocs },
        { key: "upcoming", label: "Upcoming", count: stats?.upcomingSchedules },
        { key: "completed", label: "Completed", count: stats?.completedSchedules },
        { key: "sold_out", label: "Sold Out", count: stats?.soldOutSchedules },
    ];

    const columns = useMemo(() => VendorPackageSchedulesColumns(), []);


    if (isError && error)
        return (
            <Error
                message={error.response?.data?.message}
                code={error.response?.status}
                onRetry={refetch}
            />
        );
    if (isLoading || statsLoading) return <Loader message="Loading..." />;

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Package Schedules Oversight"
                    description="Review and monitor all package schedules, including bookings, revenue, and status."
                    primaryAction={{
                        label: "View Packages",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        onClick: () => navigate(-1),
                        variant: "outline",
                    }}
                />

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard
                        label="TOTAL"
                        value={stats?.totalSchedules ?? 0}
                        subtitle="● All schedules"
                        color="text-success"
                        accentColor="bg-success"
                        delay={0.15}
                      

                    />
                    <StatCard
                        label="UPCOMING"
                        value={stats?.upcomingSchedules ?? 0}
                        subtitle="● Accepting bookings"
                        color="text-blue-500"
                        accentColor="bg-blue-500"
                        delay={0.2}
                       
                    />
                    <StatCard
                        label="COMPLETED"
                        value={stats?.completedSchedules ?? 0}
                        subtitle="● Past trips"
                        color="text-yellow-500"
                        accentColor="bg-yellow-500"
                        delay={0.25}
                       
                    />
                    <StatCard
                        label="SOLD OUT"
                        value={stats?.soldOutSchedules ?? 0}
                        subtitle="● No seats left"
                        color="text-orange-400"
                        accentColor="bg-orange-400"
                        delay={0.25}
                        
                    />
                </div>

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search Schedules by name..."
                    gradient="from-indigo-200/60 to-white"
                />

                <DataTable<SchedulesResponseDTO>
                    data={schedulesData}
                    columns={columns}
                    loading={isLoading}
                    rowKey={(row) => row._id}
                />

                <TableFooter
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
}