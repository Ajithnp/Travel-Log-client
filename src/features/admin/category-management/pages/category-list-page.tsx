import { Bell, Plus } from "lucide-react";
import { useMemo } from "react";
import StatCard from "../components/start-card";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import type { ICategory } from "../types/ICategory";
import { CategoryColumns } from "../components/category-columns";
import { PageHeader } from "@/components/shared/page-header";
import TableFooter from "@/components/table/TableFooter";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import GlacierModal from "@/components/shared/modal/glacier-modal";
import { CreateCategoryModal } from "../components/create-category-modal";
import { useCategoriesPage } from "../hooks/categories-page";

type FilterTab = "all" | "active" | "inactive";

export default function CategoriesListPage() {
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    page,
    setPage,
    dialog,
    setDialog,
    createModalOpen,
    setCreateModalOpen,
    categories,
    states,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
    isPending,
    isCreating,
    handleAction,
    handleConfirmAction,
    handleCreation,
    handleVendorRequests,
  } = useCategoriesPage();

  const tabs = useMemo(
    () => [
      { key: "all" as FilterTab, label: "All", count: states?.total ?? 0 },
      {
        key: "active" as FilterTab,
        label: "Active",
        count: states?.active ?? 0,
      },
      {
        key: "inactive" as FilterTab,
        label: "Inactive",
        count: states?.inactive ?? 0,
      },
    ],
    [states],
  );

  const columns = useMemo(() => CategoryColumns(handleAction), [handleAction]);

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
        {/* Page Header */}
        <PageHeader
          title="Category Management"
          description="Create and manage trip categories. Active categories appear in vendor dropdowns and user filters."
          secondaryAction={{
            label: "Vendor Requests",
            icon: <Bell className="h-4 w-4" />,
            // badgeCount: 5,
            onClick: handleVendorRequests,
          }}
          primaryAction={{
            label: "Create Category",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => setCreateModalOpen(true),
          }}
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Categories"
            value={states?.total ?? 0}
            subtitle="All statuses"
            delay={0.1}
          />
          <StatCard
            label="Active"
            value={states?.active ?? 0}
            subtitle="● Live in dropdowns"
            color="text-success"
            delay={0.15}
          />
          <StatCard
            label="Inactive"
            value={states?.inactive ?? 0}
            subtitle="○ Hidden from vendors"
            color="text-muted-foreground"
            delay={0.2}
          />
          <StatCard
            label="Vendor Requests"
            value={states?.pendingApproval ?? 0}
            subtitle="● Awaiting review"
            color="text-warning"
            delay={0.25}
          />
        </div>

        {/* Filters */}
        <FilterWithSearch
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={"Search categories by name..."}
        />

        <DataTable<ICategory>
          data={categories ?? []}
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
      <GlacierModal
        open={!!dialog}
        onOpenChange={(open) => {
          if (isPending) return;
          if (!open) setDialog(null);
        }}
        type="warning"
        title={
          dialog?.type === "activate"
            ? "Activate Category"
            : "Inactivate Category"
        }
        description={
          dialog
            ? ` Are you sure you want to ${dialog.type === "activate" ? "activated" : "inactivated"} the category "${dialog.name}".`
            : ""
        }
        primaryAction={{
          label: isPending
            ? "Processing..."
            : dialog?.type === "activate"
              ? "Activate"
              : "Inactivate",
          onClick: handleConfirmAction,
          disabled: isPending,
        }}
      />

      {/* createModal */}
      <CreateCategoryModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onCreation={handleCreation}
        isLoading={isCreating}
      />
    </div>
  );
}
