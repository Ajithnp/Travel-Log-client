import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePackagesFetch } from "../hooks/api.hooks";
import { usePaginatedDataWithSignedUrls } from "@/hooks/s3/paginated-data-with-signed-urls";
import { useVendorId } from "@/features/vendor/hooks/vendor-id";
import { useNavigate } from "react-router-dom";
import { Plus, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TableFooter from "@/components/table/TableFooter";
import PackageCard from "../components/package-card";
import { EmptyData } from "@/components/common/empty";
import type { IPackage } from "../type/package";
import { Loader } from "@/components/common/loader";
import { PageHeader } from "@/components/shared/page-header";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import { Error } from "@/components/common/error";

type FilterTab = "all" | "DRAFT" | "PUBLISHED";
const LIMIT = 10;

const BasePackageListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [page, setPage] = useState(1);

  const filterValue = activeTab === "all" ? "" : activeTab;
  const debouncedSearch = useDebounce(search);
  const vendorId = useVendorId();

  const {
    data: packages,
    currentPage,
    totalPages,
    isLoading,
    error,
  } = usePaginatedDataWithSignedUrls<IPackage>(
    usePackagesFetch(page, LIMIT, debouncedSearch, filterValue),
    {
      userId: vendorId ?? "",
      imageFields: ["imageUrl"],
      dataKey: "data",
      enabled: !!vendorId,
    },
  );

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [debouncedSearch, activeTab]);

  const tabs = useMemo(
    () => [
      { key: "all" as FilterTab, label: "All" },
      { key: "DRAFT" as FilterTab, label: "Draft" },
      { key: "PUBLISHED" as FilterTab, label: "Published" },
    ],
    [],
  );

  if (isLoading || !vendorId) return <Loader />;
  if (error) {
    return <Error message={error.message} />;
  } 

  return (
    <main className="min-h-screen w-full bg-background p-4 sm:p-6 lg:p-8">
      <div className="space-y-6">
        {/* Page Header */}
        <PageHeader
          title={"Packages"}
          description={"Manage and schedule your travel packages"}
          primaryAction={{
            label: "Create New Package",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate("/vendor/packages/add"),
          }}
        />
        <FilterWithSearch
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder={"Search packages by location and state..."}
        />

        {/* Package Grid or Empty State */}
        {!packages || packages.length === 0 ? (
          <EmptyData
            heading="No packages found"
            description={`No packages match "${search}" with filter "${activeTab}". Try adjusting your search.`}
            icon={<File className="w-12 h-12 text-muted-foreground" />}
            footer={
              <Button
                onClick={() => navigate("/vendor/packages/add")}
                className="gap-2"
              >
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
