import { Error } from '@/components/common/error';
import { Loader } from '@/components/common/loader';
import { FilterWithSearch } from '@/components/shared/filter-with-search';
import { PageHeader } from '@/components/shared/page-header';
import DataTable from '@/components/table/DataTable';
import TableFooter from '@/components/table/TableFooter';
import TableSummaryFooter from '@/components/table/TableSummaryFooter';
import { useDebounce } from '@/hooks/useDebounce';
import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { CommissionOverviewByVendors } from '../services/api.services';
import { useCommissionOverviewByVendorsQuery, useCommissionOverviewStatsQuery } from '../hooks/api.hooks';
import { VendorsCommissionColumns } from '../components/vendors-commission-column';
import StatCard from '../../category-management/components/start-card';

const LIMIT = 10;
export default function VendorsCommissionListPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search);

    const vendorsQuery = useCommissionOverviewByVendorsQuery(page, LIMIT, debouncedSearch);
    const statsQuery = useCommissionOverviewStatsQuery();

    const isLoadingData = vendorsQuery.isLoading || statsQuery.isLoading;
    const hasError = vendorsQuery.isError || statsQuery.isError;

    const paginatedData = vendorsQuery.data?.data;
    const vendorsData = paginatedData?.data || [];
    const totalPages = paginatedData?.totalPages || 0;
    const stats = statsQuery.data?.data;


    const handleViewPackageSchedules = () => {
        navigate('/admin/packages-oversight/schedules')
    };
    const columns = useMemo(() => VendorsCommissionColumns(), []);


    if (hasError)
        return (
            <Error
                message={"Something went wrong,Please try again."}
                onRetry={() => { vendorsQuery.refetch(); statsQuery.refetch() }}
            />
        );
    if (isLoadingData) return <Loader message="Loading..." />;

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Vendor Packages Oversight"
                    description="Manage all packages across all vendors at one place."
                    primaryAction={{
                        label: "View Packages Commission",
                        icon: <ArrowRight className="w-4 h-4" />,
                        onClick: handleViewPackageSchedules,
                        variant: "outline",
                    }}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    <StatCard
                        label="Total Groass Amount"
                        value={`₹${stats?.totalGrossAmount ?? 0}`}
                        subtitle="All Schedules"
                        color="text-emerald-600"
                        delay={0.1}
                    />
                    <StatCard
                        label="Total Platform Commission"
                        value={`₹${stats?.totalPlatformCommission ?? 0}`}
                        subtitle="15% of total gross amount"
                        color="text-success"
                        delay={0.15}
                    />
                    <StatCard
                        label="Total Vendor Earnings"
                        value={`₹${stats?.totalVendorEarnings ?? 0}`}
                        subtitle="85% of total gross amount"
                        color="text-amber-500"
                        delay={0.2}
                    />

                </div>

                <FilterWithSearch
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search vendors by name..."
                />



                <DataTable<CommissionOverviewByVendors>
                    data={vendorsData}
                    columns={columns}
                    loading={vendorsQuery.isLoading}
                    rowKey={(row) => row._id}
                />
            
                <TableSummaryFooter 
                    data={[
                        { label: "Total Vendors", value: paginatedData?.totalDocs ?? 0 },
                        { label: "Total Schedules", value: paginatedData?.totalScedules ?? 0 },
                        { label: "Total Bookings", value: paginatedData?.totalBookings ?? 0 },
                        { label: "Total Groass Amount", value: vendorsData.reduce((acc, vendor) => acc + vendor.totalGrossAmount, 0) ?? 0 },
                        { label: "Total Platform Commission", value: vendorsData.reduce((acc, vendor) => acc + vendor.totalPlatformCommission, 0) ?? 0 },
                        { label: "Total Vendor Earnings", value: vendorsData.reduce((acc, vendor) => acc + vendor.totalVendorEarnings, 0) ?? 0 },
                    ]} 
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


