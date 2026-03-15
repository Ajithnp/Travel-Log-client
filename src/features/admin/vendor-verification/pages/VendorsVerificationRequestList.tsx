import DataTable from "@/components/table/DataTable";
import TableFooter from "@/components/table/TableFooter";
import { toast } from "sonner";
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import {
  useVendorVerification,
  useVendorVerificationUpdateMutation,
} from "../hooks/api.hooks";
import { useGetViewSignedUrlQuery } from "@/hooks/api.hooks";
import type { IVendorInfo } from "@/types/IVendorInfo";
import { useDebounce } from "@/hooks/useDebounce";
import { Loading } from "@/components/ui/loading";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { VendorVerificationColumns } from "../components/VerificationTable";
import { AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/shared/page-header";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { VendorVerificationModal } from "../components/VendorDetailsModal";
import { Error } from "@/components/common/error";

type FilterTab = "UnderReview" | "Approved" | "Rejected";

const VendorsVerificationList = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("UnderReview");
  const [dialog, setDialog] = useState<{
    id: string;
    type: "reject" | "approve";
  } | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<IVendorInfo | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const vendorRef = useRef<IVendorInfo | null>(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (vendorRef.current) {
      setSelectedVendor(vendorRef.current);
    }
  }, []);

  const { data, isLoading, isError, error } = useVendorVerification(
    page,
    LIMIT,
    debouncedSearch,
    selectedFilter,
  );

  const fileKeys = selectedVendor
    ? [
        selectedVendor.businessLicence,
        selectedVendor.businessPan,
        selectedVendor.ownerIdentity,
        selectedVendor.profileLogo ?? "",
      ].filter(Boolean)
    : [];

  const { data: signedUrls, isLoading: isViewing } = useGetViewSignedUrlQuery(
    selectedVendor?.userId,
    fileKeys,
    {
      enabled: !!selectedVendor && fileKeys.length > 0,
    },
  );

  const { mutate: updateStatus } = useVendorVerificationUpdateMutation();

  const handleVendorAction = useCallback(
    (id: string, type: "reject" | "approve") => {
      setDialog({ id, type });
    },
    [],
  );

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
      },
    );
  };

  const handleOpenChange = () => {
    setSelectedVendor(null);
  };

  const handleViewVendor = useCallback((vendor: IVendorInfo) => {
    console.log("Vendor selected,,", vendor);
    setSelectedVendor(vendor);
    vendorRef.current = vendor;
  }, []);

  const tabs = useMemo(
    () => [
      { key: "UnderReview" as FilterTab, label: "Under Review" },
      { key: "Approved" as FilterTab, label: "Approved" },
      { key: "Rejected" as FilterTab, label: "Rejected" },
    ],
    [],
  );

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, selectedFilter, page]);

  if (isLoading)
    return (
      <Loading
        variant="spinner"
        text="Loading content..."
        className="w-full h-full"
      />
    );
  if (isError || error) return <Error message={error.response?.data.message } />

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-6">
          <PageHeader
            title="Vendor Verification"
            description="Review vendor applications and verify submitted business and identity documents before granting platform access."
          />

          <FilterWithSearch
            tabs={tabs}
            activeTab={selectedFilter}
            onTabChange={setSelectedFilter}
            search={search}
            onSearchChange={setSearch}
              gradient="from-violet-600 to-blue-600"
            searchPlaceholder={"Search vendors by name"}
          />

          <DataTable<IVendorInfo>
            data={data?.data.data ?? []}
            columns={VendorVerificationColumns(
              handleVendorAction,
              handleViewVendor,
            )}
            loading={isLoading}
            emptyMessage="No vendors found"
            rowKey={(row) => row.id}
          />

          <TableFooter
            currentPage={page}
            totalPages={data?.data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
      </div>
      <AnimatePresence>
        {dialog && (
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
        )}
      </AnimatePresence>

      {selectedVendor && (
        <VendorVerificationModal
          open={!!selectedVendor}
          vendor={vendorRef.current}
          signedUrls={signedUrls?.data ?? []}
          onOpenChange={handleOpenChange}
          isLoading={isLoading || isViewing}
        />
      )}
    </div>
  );
};

export default VendorsVerificationList;
