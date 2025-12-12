import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import type { IUser } from "@/types/IUser";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useVendorsFetch, useVendorsStatusMutation } from "../hooks/api.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { Loading } from "@/components/ui/loading";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { USER_FILTER_OPTIONS as VENDOR_FILTER_OPTIONS } from "@/components/fieldsConfig/fields";
import { VendorColumns } from "../components/VendorTable";
import { useCallback } from "react";


const VendorsListPage = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dialog, setDialog] = useState<{ id: string; type: "block" | "unblock" } | null>(null);
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const debouncedSearch = useDebounce<string>(search);

  const { data, isLoading, isError, error } = useVendorsFetch(
    page,
    LIMIT,
    debouncedSearch,
    selectedFilter
  );
  const { mutate: updateStatus, isPending } = useVendorsStatusMutation();

  const vendors = data?.data.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

    const handleVendorAction = useCallback((id: string, type: "block" | "unblock") => {
      setDialog({ id, type });
    }, []);

  const handleConfirmAction = (reason?: string) => {
    if (!dialog) return;

    updateStatus(
      { id: dialog.id, blockUser: dialog.type === "block", reason },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setDialog(null);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || error?.message);
          setDialog(null);
        },
      }
    );
  };


  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, selectedFilter]);

  if (isLoading)
    return (
      <Loading
        variant="spinner"
        text="Loading content..."
        className="w-full h-full"
      />
    );
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-6">
          <TableHeader
            title={"Vendors"}
            search={search}
            onSearch={setSearch}
            filterOptions={VENDOR_FILTER_OPTIONS}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <DataTable<IUser>
            data={vendors}
            columns={VendorColumns(handleVendorAction)}
            loading={isLoading}
            emptyMessage="No vendors found"
            rowKey={(row) => row.id}
          />

          <TableFooter
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!dialog}
        onClose={() => setDialog(null)}
        title={dialog?.type === "block" ? "Block Vendor" : "Unblock Vendor"}
        description={
          dialog?.type === "block"
            ? "Please enter a reason for blocking this vendor."
            : "Are you sure you want to unblock this vendor?"
        }
        showReasonInput={dialog?.type === "block"}
        onConfirm={handleConfirmAction}
         isConfirming={isPending}
      />
    </div>
  );
};

export default VendorsListPage;
