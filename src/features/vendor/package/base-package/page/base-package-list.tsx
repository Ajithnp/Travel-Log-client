import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePackagesFetch } from "../hooks/api.hooks";
import { PACKAGE_FILTER_OPTIONS } from "@/components/fieldsConfig/fields";
import { usePaginatedDataWithSignedUrls } from "@/hooks/s3/paginated-data-with-signed-urls";
import { useVendorId } from "@/features/vendor/hooks/vendor-id";
import { useNavigate } from "react-router-dom";
import { Plus, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TableHeader from "@/components/table/TableHeader";
import TableFooter from "@/components/table/TableFooter";
import PackageCard from "../components/package-card";
import { EmptyData } from "@/components/common/empty";
import type { IPackage } from "../type/package";
import { Loader } from "@/components/common/loader";

const BasePackageListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [page, setPage] = useState(1);
  const LIMIT = 10;

  const debouncedSearch = useDebounce(search);
  const vendorId = useVendorId();

  const { data: packages, currentPage, totalPages, isLoading, error } =
    usePaginatedDataWithSignedUrls<IPackage>(
      usePackagesFetch(page, LIMIT, debouncedSearch, selectedFilter),
      {
        userId: vendorId ?? "",
        imageFields: ["imageUrl"],
        dataKey: "data",
        enabled: !!vendorId,
      }
    );

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, selectedFilter]);

  if (isLoading || !vendorId) return <Loader />;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <main className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold">Packages</h1>
            <p className="text-muted-foreground">Manage and schedule your travel packages</p>
          </div>
          <Button onClick={() => navigate("/vendor/packages/add")} className="gap-2 sm:w-auto w-full">
            <Plus className="w-4 h-4" />
            Create New
          </Button>

        </div>

        {/* Search & Filters */}
        <TableHeader
          search={search}
          onSearch={setSearch}
          filterOptions={PACKAGE_FILTER_OPTIONS}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Package Grid or Empty State */}
        {!packages || packages.length === 0 ? (
          <EmptyData
            heading="No packages found"
            description={`No packages match "${search}" with filter "${selectedFilter}". Try adjusting your search.`}
            icon={<File className="w-12 h-12 text-muted-foreground" />}
            footer={
              <Button onClick={() => navigate("/vendor/packages/add")} className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Package
              </Button>
            }
          />
        ) : (
          <motion.div
            // layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {/* <AnimatePresence> */}
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onCardClick={(id) => navigate(`/vendor/packages/details/${id}`)}
                onButtonClick={(id, e) => e.stopPropagation()}
              />
            ))}
            {/* </AnimatePresence> */}
          </motion.div>
        )}

        {/* Pagination */}
        <TableFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
};

export default BasePackageListPage;