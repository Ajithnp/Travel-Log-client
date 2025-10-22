import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  useVendorVerification,
  useVendorVerificationUpdateMutation,
} from "../hooks/api.hooks";
import { vendorsVerificationColumns } from "../../fields-config/tableFields";
import type { IVendorInfo } from "@/types/IVendorInfo";
import { useDebounce } from "@/hooks/useDebounce";
import { VendorDetailsModal } from "../../components/vendor.details.modal";
import { Loading } from "@/components/ui/loading";

const VendorsVerificationList = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [dialog, setDialog] = useState<{
    id: string;
    type: "reject" | "approve";
  } | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<IVendorInfo | null>(
    null
  );
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const debouncedSearch = useDebounce(search);

  const { data, isLoading, isError, error } = useVendorVerification(
    page,
    LIMIT,
    search,
    selectedFilter
  );
  
  const { mutate: updateStatus } = useVendorVerificationUpdateMutation();

  const vendorsDocs = data?.data.data ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleViewVendor = (vendor: IVendorInfo) => {
    setSelectedVendor(vendor);
  };

  const handleConfirmAction = (reason?: string) => {
    if (!dialog) return;

    updateStatus(
      {
        id: dialog.id,
        status: dialog.type === "reject" ? "Rejected" : "Approved",
        reasonForReject: reason,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
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
            title={"Vendors verification"}
            search={search}
            onSearch={setSearch}
            filterOptions={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Blocked", value: "blocked" },
            ]}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <DataTable<IVendorInfo>
            data={vendorsDocs}
            columns={vendorsVerificationColumns(
              (id, type) => setDialog({ id, type }),
              handleViewVendor
            )}
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
        title={
          dialog?.type === "reject"
            ? "Provide the reason for Rejection"
            : "Approve Verification"
        }
        description={
          dialog?.type === "reject"
            ? "Please enter a reason for reject this vendor."
            : "Are you sure you want to arrove this vendor?"
        }
        showReasonInput={dialog?.type === "reject"}
        onConfirm={handleConfirmAction}
      />

      <VendorDetailsModal
        vendor={selectedVendor}
        open={selectedVendor !== null}
        onOpenChange={() => setSelectedVendor(null)}
      />
    </div>
  );
};

export default VendorsVerificationList;
