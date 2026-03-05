import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { PageHeader } from "@/components/shared/page-header";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { Plus } from "lucide-react";
import { useMemo } from "react";
import { useRequestedCategoriesPage } from "../hooks/useRequestedCategoriesPage";
import type { VendorRequestedCategoryResponse } from "../types/types";
import { RequestedCalegoryColumns } from "../components/requested-categories-column";
import { CategoryRequestModal } from "../components/request-category-modal";

type FilterTab = "pending" | "active" | "rejected";

export default function RequestedCategoriesListPage() {
  const {
    activeTab, setActiveTab,
    search, setSearch,
    page, setPage,
    requestModalOpen, setRequestModalOpen,
    categories, totalPages,
    isLoading, isError, error, refetch,
    isPending,
    handleSubmit,
    handleModalOpenChange,
  } = useRequestedCategoriesPage();

  const tabs = useMemo(() => [
    { key: "pending" as FilterTab, label: "Pending" },
    { key: "active" as FilterTab,  label: "Approved" },
    { key: "rejected" as FilterTab, label: "Rejected" },
  ], []);

  const columns = useMemo(() => RequestedCalegoryColumns(), []);

  if (isError && error) return (
    <Error
      message={error.response?.data?.message}
      code={error.response?.status}
      onRetry={refetch}
    />
  );
  if (isLoading) return <Loader message="Loading..." />;

  return (
    <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20">
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          title="Category Overview"
          description="Create and manage trip categories. Active categories appear in vendor dropdowns and user filters."
          primaryAction={{
            label: "Request New Category",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => setRequestModalOpen(true),
          }}
        />

        <FilterWithSearch
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search categories by name..."
        />

        <DataTable<VendorRequestedCategoryResponse>
          data={categories}
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

      <CategoryRequestModal
        open={requestModalOpen}
        onOpenChange={handleModalOpenChange}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </div>
  );
}
