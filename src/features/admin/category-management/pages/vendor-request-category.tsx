import { PageHeader } from "@/components/shared/page-header";
import React, { useMemo } from "react";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import type { CategoryRequestResponse } from "../types/response.dtos";
import { categoryRequestColumns } from "../components/category-request-columns";
import TableFooter from "@/components/table/TableFooter";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { useVendorRequestPage } from "../hooks/vendor-request";
import { useNavigate } from "react-router-dom";

export type ReviewType = "approve" | "rejected";
const VendorRequestCategoryPage = () => {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    page,
    setPage,
    dialog,
    closeDialog,
    categories,
    totalPages,
    isLoading,
    isError,
    error,
    refetch,
    isPending,
    handleUserAction,
    handleConfirmAction,
  } = useVendorRequestPage();

  const columns = useMemo(
    () => categoryRequestColumns(handleUserAction),
    [handleUserAction],
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
          title="Vendor Category Requests"
          description="Vendors have suggested these categories. Approve to create, or reject with a reason."
          secondaryAction={{
            label: "Resolved Requests",
            onClick: () => navigate("/admin/categories/vendor-request/reviewed"),
          }}
          primaryAction={{
            label: "Back to Category",
            onClick: () => navigate("/admin/categories"),
          }}
        />

        <FilterWithSearch
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={"Search categories by name..."}
        />

        <DataTable<CategoryRequestResponse>
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
      <ConfirmDialog
        isOpen={!!dialog}
        onClose={closeDialog}
        title={
          dialog?.type === "approve" ? "Approve Category" : "Reject Category"
        }
        description={
          dialog?.type === "rejected"
            ? "Please enter a reason for rejecting this category"
            : "Are you sure you want to Approve this category?"
        }
        showReasonInput={dialog?.type === "rejected"}
        onConfirm={handleConfirmAction}
        isConfirming={isPending}
      />
    </div>
  );
};

export default VendorRequestCategoryPage;
