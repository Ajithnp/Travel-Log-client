import { PageHeader } from "@/components/shared/page-header";
import { ArrowLeft } from "lucide-react";
import React, { useMemo } from "react";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { useNavigate } from "react-router-dom";
import { useCategoriesReviewedPage } from "../hooks/category-request-reviewed";
import { CategoryRequestReviewedColumns } from "../components/category-reviewed-columns";
import type { CategoryRequestReviewedResponse } from "../types/response.dtos";

type FilterTab = "all" | "active" | "rejected";

const VendorRequestReviewedCategoryPage = () => {
  const navigate = useNavigate();
  const {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    page,
    setPage,
    categories,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
  } = useCategoriesReviewedPage();

  const columns = useMemo(() => CategoryRequestReviewedColumns(), []);

  const tabs = useMemo(
    () => [
      { key: "all" as FilterTab, label: "All" },
      {
        key: "active" as FilterTab,
        label: "Approved",
      },
      {
        key: "rejected" as FilterTab,
        label: "Rejected",
      },
    ],
    [],
  );

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
          title="Vendor Category Resolved Requests"
          description="Previously reviewed requests"
          secondaryAction={{
            label: "Back",
            icon: <ArrowLeft className="w-4 h-4" />,
            onClick: () => navigate(-1),
          }}
        />

        <FilterWithSearch
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={"Search categories by name..."}
        />

        <DataTable<CategoryRequestReviewedResponse>
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
    </div>
  );
};

export default VendorRequestReviewedCategoryPage;
