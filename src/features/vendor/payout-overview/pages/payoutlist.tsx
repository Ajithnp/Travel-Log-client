import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { PageHeader } from "@/components/shared/page-header";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { useDebounce } from "@/hooks/useDebounce";
import { LIMIT } from "@/lib/constants/constants";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { VendorPayoutsListResponseDto } from "../services/api.services";
import { PayoutListColumns } from "../components/payout-list-column";
import { useVendorPayoutsQuery } from "../hooks/api.hooks";


type FilterTab = "all" | "completed" | "failed";
export default function VendorPayoutListPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const debouncedSearch = useDebounce(search);
    const filterValue = activeTab === "all" ? undefined : activeTab;

    const tabs = [
        { key: "all" as FilterTab, label: "All" },
        { key: "completed" as FilterTab, label: "Completed" },
        { key: "failed" as FilterTab, label: "Failed" },
    ];

    const payoutsQuery = useVendorPayoutsQuery(page, LIMIT, filterValue, debouncedSearch);
   
    const isLoadingData = payoutsQuery.isLoading 
    const hasError = payoutsQuery.isError 

    const paginatedData = payoutsQuery.data?.data;
    const payoutsData = paginatedData?.data || [];
    const totalPages = paginatedData?.totalPages || 0;
   
    const handleViewDetails = (scheduleId: string) => {
        navigate(`/vendor/payouts/${scheduleId}`)
    };

    const columns = useMemo(() => PayoutListColumns(handleViewDetails), []);
    if (hasError)
        return (
            <Error
                message={"Something went wrong,Please try again."}
                onRetry={() => { payoutsQuery.refetch()}}
            />
        );
    if (isLoadingData) return <Loader message="Loading..." />;


    return (
        <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
                <PageHeader
                    title="Payout History"
                    description="List of all payouts history."
                />

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    gradient="from-indigo-200/60 to-white"
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search by package name..."
                />

                <DataTable<VendorPayoutsListResponseDto>
                    data={payoutsData}
                    columns={columns}
                    loading={payoutsQuery.isLoading}
                    rowKey={(row) => row.payoutId}
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