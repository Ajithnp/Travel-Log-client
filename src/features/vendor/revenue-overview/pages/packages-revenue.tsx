import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import type { PackagesEarningsByVendor } from "../services/api.services";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { PageHeader } from "@/components/shared/page-header";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { useMemo, useState } from "react";
import { usePackagesEarningOverviewQuery } from "../hooks/api.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { LIMIT } from "@/lib/constants/constants";
import { PackagesCommissionColumns } from "../components/packages-commission-column";


export default function PackagesRevenuePage() {
  
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search);

    const packagesQuery = usePackagesEarningOverviewQuery(page, LIMIT, debouncedSearch);

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
                />

                <FilterWithSearch
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search packages by name..."
                />


                <DataTable<PackagesEarningsByVendor>
                    data={packagesData}
                    columns={columns}
                    loading={packagesQuery.isLoading}
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