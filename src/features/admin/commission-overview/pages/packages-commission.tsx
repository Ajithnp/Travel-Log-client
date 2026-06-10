import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import { useCommissionOverviewByPackagesQuery } from "../hooks/api.hooks";
import { LIMIT } from "@/lib/constants/constants";
import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { PageHeader } from "@/components/shared/page-header";
import { ArrowLeft } from "lucide-react";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import TableSummaryFooter from "@/components/table/TableSummaryFooter";
import TableFooter from "@/components/table/TableFooter";
import type { CommissionOverviewByPackages } from "../services/api.services";
import { PackagesCommissionColumns } from "../components/packages-commission-column";

export default function PackagesCommissionListPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search);

    const packagesQuery = useCommissionOverviewByPackagesQuery(page, LIMIT, debouncedSearch);

    const isLoadingData = packagesQuery.isLoading;
    const hasError = packagesQuery.isError;

    const paginatedData = packagesQuery.data?.data;
    const packagesData = paginatedData?.data || [];
    const totalPages = paginatedData?.totalPages || 0;

    const columns = useMemo(() => PackagesCommissionColumns(), []);


    if (hasError)
        return (
            <Error
                message={"Something went wrong,Please try again."}
                onRetry={() => { packagesQuery.refetch() }}
            />
        );
    if (isLoadingData) return <Loader message="Loading..." />;

    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Packages Commission Overview"
                    description="Manage all packages commission at one place."
                    primaryAction={{
                        label: "View Vendors Commission",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        onClick: () => navigate(-1),
                        variant: "outline",
                    }}
                />

                <FilterWithSearch
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search packages by name..."
                />


                <DataTable<CommissionOverviewByPackages>
                    data={packagesData}
                    columns={columns}
                    loading={packagesQuery.isLoading}
                    rowKey={(row) => row._id}
                />

                <TableSummaryFooter
                    data={[
                        { label: "Total Packages", value: paginatedData?.totalPackages ?? 0 },
                        { label: "Total Schedules", value: paginatedData?.totalScedules ?? 0 },
                        { label: "Total Bookings", value: paginatedData?.totalBookings ?? 0 },
                        { label: "Total Groass Amount", value: packagesData.reduce((acc, vendor) => acc + vendor.totalGrossAmount, 0) ?? 0 },
                        { label: "Total Platform Commission", value: packagesData.reduce((acc, vendor) => acc + vendor.totalPlatformCommission, 0) ?? 0 },
                        { label: "Total Vendor Earnings", value: packagesData.reduce((acc, vendor) => acc + vendor.totalVendorEarnings, 0) ?? 0 },
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