import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import StatCard from "../../category-management/components/start-card";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Error } from "@/components/common/error";
import ScheduleBookingsHeader from "@/features/vendor/booking-monitoring/components/schedule-bookings-header";
import { Loader } from "@/components/common/loader";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useVendorsPackagesQuery } from "../hooks/api.hooks";
import { VendorsPackagesColumns } from "../components/vendors-packages-column";
import type { VendorsPackagesResponse } from "../services/api.services";

type FilterTab = "all" | "confirmed" | "cancelled";
const LIMIT = 10;


export default function VendorsPackagesPage() {
     const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const debouncedSearch = useDebounce(search);
    const filterValue = activeTab === "all" ? "" : activeTab;

        const { data: res, isLoading, isError, error, refetch } =
        useVendorsPackagesQuery(page, LIMIT, debouncedSearch, filterValue);

    const packagesData = res?.data?.data || [];
 
 const totalDocs = res?.data?.totalDocs || 0;
 const totalPages = res?.data?.totalPages || 0;

     const tabs = [{ key: "all" as FilterTab, label: "All", count: totalDocs },];

 const handleViewPackage = (id: string) => {
   setIsSheetOpen(true);
   setSelectedBookingId(id);
 };

   const handleViewSchedule = (id: string) => {
    navigate(`/admin/packages-oversight/${id}`);
  };

    const columns = useMemo(() => VendorsPackagesColumns(handleViewPackage), []);



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
                    title="Vendor Packages"
                    description="Manage all your packages at one place."
                    primaryAction={{
                        label: "View Schedules",
                        icon: <ArrowLeft className="w-4 h-4" />,
                        onClick: ()=>handleViewSchedule("schedules"),
                        variant: "outline",
                    }}
                />

                <FilterWithSearch
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search bookings by name or booking Id..."
                />

                <DataTable<VendorsPackagesResponse>
                    data={packagesData}
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