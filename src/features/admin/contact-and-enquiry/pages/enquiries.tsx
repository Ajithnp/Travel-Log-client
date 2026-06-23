import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { PageHeader } from "@/components/shared/page-header";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { useEffect, useMemo, useState } from "react";
import { useContactEnquiriesQuery, useResolveEnquiryMutation } from "../hooks/api.hooks";
import { LIMIT } from "@/lib/constants/constants";
import { CancellationColumns } from "../components/enquiry-columns";
import type { IContactResponse } from "../services/api.services";
import { useDebounce } from "@/hooks/useDebounce";

type FilterTab = "pending" | "resolved";

export default function EnquiriesPage() {

    const [activeTab, setActiveTab] = useState<FilterTab>("pending");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, activeTab]);
    
    const contactsQuery = useContactEnquiriesQuery(page, LIMIT, activeTab, debouncedSearch);
    const resolveMutation = useResolveEnquiryMutation();

    const enquiries = contactsQuery?.data?.data.data ?? [];
    const totalPages = contactsQuery?.data?.data.totalPages ?? 0;
    const pendingCount = contactsQuery?.data?.data.pendingCount ?? 0;
    const resolvedCount = contactsQuery?.data?.data.resolvedCount ?? 0;

    const tabs = [
        { key: "pending" as FilterTab, label: "Pending" , count : pendingCount },
        { key: "resolved" as FilterTab, label: "Resolved", count : resolvedCount },
    ];

    const handleResolve = (enquiryId: string) => {
        resolveMutation.mutate({ enquiryId })
    };


    const columns = useMemo(() => CancellationColumns(handleResolve, activeTab), [activeTab]);

    if (contactsQuery.isError) return (
        <Error
            message={contactsQuery.error?.response?.data?.message}
            code={contactsQuery.error?.response?.status}
            onRetry={contactsQuery.refetch}
        />
    );
    if (contactsQuery.isLoading) return <Loader message="Loading..." />;

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
                    searchPlaceholder="Search enquiries..."
                />

                <DataTable<IContactResponse>
                    data={enquiries}
                    columns={columns}
                    loading={false}
                    rowKey={(row) => row.id}
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
