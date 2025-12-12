import DataTable from "@/components/table/DataTable";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import { toast } from "sonner";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  useVendorVerification,
  useVendorVerificationUpdateMutation,
} from "../hooks/api.hooks";
import { useGetViewSignedUrlQuery } from "@/hooks/api.hooks";
import type { IVendorInfo } from "@/types/IVendorInfo";
import { useDebounce } from "@/hooks/useDebounce";
import VendorDetailsModal from "../components/VendorDetailsModal";
import { Loading } from "@/components/ui/loading";
import ConfirmDialog from "@/components/shared/modal/ConfirmDialog";
import { VendorVerificationColumns } from "../components/VerificationTable";
import { VENDOR_VERIFICATION_FILTER_OPTIONS } from "@/components/fieldsConfig/fields";
import { AnimatePresence } from 'framer-motion'


const VendorsVerificationList = () => {

  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState("Pending");
  const [dialog, setDialog] = useState<{
    id: string;
    type: "reject" | "approve";
  } | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<IVendorInfo | null>(
    null
  );
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const vendorRef = useRef<IVendorInfo|null>(null)

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (vendorRef.current) {
      setSelectedVendor(vendorRef.current)
    }
  }, []);

  const { data, isLoading, isError, error } = useVendorVerification(
    page,
    LIMIT,
    debouncedSearch,
    selectedFilter
  );
  

  const fileKeys = selectedVendor
    ? [
      selectedVendor.businessLicence,
      selectedVendor.businessPan,
      selectedVendor.ownerIdentity,
      selectedVendor.profileLogo ?? "",
    ].filter(Boolean) 
    : [];
  
  
    const {
    data: signedUrls,
    isLoading: isViewing,
    // isError: viewError,
  } = useGetViewSignedUrlQuery(selectedVendor?.userId, fileKeys, {
    enabled: !!selectedVendor && fileKeys.length > 0, // only run when valid vendor selected
  });

  
  const { mutate: updateStatus } = useVendorVerificationUpdateMutation();


  const handleVendorAction = useCallback((id: string, type: "reject" | "approve") => {
    setDialog({ id, type });
  }, []);


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

  const handleOpenChange = () => {
    setSelectedVendor(null);
  }

  const handleViewVendor = useCallback((vendor: IVendorInfo) => {
    console.log('Vendor selected,,', vendor);
    setSelectedVendor(vendor);
    vendorRef.current = vendor

  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setSelectedFilter(value);
  }, []);


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
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-gradient-premium">
      <div className="container mx-auto px-4 py-8">
        <div className="w-full space-y-6">
          <TableHeader
            title={"Vendors verification"}
            search={search}
            onSearch={handleSearch}
            filterOptions={VENDOR_VERIFICATION_FILTER_OPTIONS}
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
          />

          <DataTable<IVendorInfo>
            data={data?.data.data ?? []}
            columns={VendorVerificationColumns(handleVendorAction, handleViewVendor)}
            loading={isLoading}
            emptyMessage="No vendors found"
            rowKey={(row) => row.id}
          />

          <TableFooter
            currentPage={page}
            totalPages={ data?.data?.totalPages ?? 1}
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

      <VendorDetailsModal
        open={!!selectedVendor}
        vendor={vendorRef.current}
        signedUrls={signedUrls?.data ?? []}
        onOpenChange={handleOpenChange}
        isLoading={isLoading || isViewing}
      />


    </div>
  );
};

export default VendorsVerificationList;
