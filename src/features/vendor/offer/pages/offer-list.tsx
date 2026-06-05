import { useState } from "react";
import { Plus, Tag } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { useOffersQuery, useDeactivateOfferMutation, usePackagesForOfferQuery } from "../hooks/api.hooks";
import { OfferCard } from "../components/offer-card";
import { OfferFormDialog } from "../components/offer-form-dialog";
import { OfferFilterBar } from "../components/offer-filter-bar";
import { useDebounce } from "@/hooks/useDebounce";
import TableFooter from "@/components/table/TableFooter";

type FilterType = "all" | boolean;
const LIMIT = 12;

export default function OfferListPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
 

  const debouncedSearch = useDebounce(search);
  const isActive = activeFilter === "all" ? undefined : activeFilter;

  const { data: offersData, isLoading, isError, error, refetch } = useOffersQuery({
    page,
    limit: LIMIT,
    isActive,
    search: debouncedSearch,
  });

  const { data: packagesData } = usePackagesForOfferQuery();
  const { mutateAsync: deactivate } = useDeactivateOfferMutation();

  const offers = offersData?.data?.data ?? [];
  const packages = packagesData?.data ?? [];
  const totalPages = offersData?.data?.totalPages ?? 0;
  const totalDocs = offersData?.data?.totalDocs ?? 0;

  const counts = {
    all: offersData?.data?.totalDocs ?? 0,
    active: offersData?.data?.activeCount ?? 0,
    inactive: offersData?.data?.inactiveCount ?? 0,
  }

  const handleDeactivate = async (offerId: string) => {
    setDeactivatingId(offerId);
    try {
      await deactivate(offerId);
    } finally {
      setDeactivatingId(null);
    }
  };

  if (isError && error)
    return (
      <Error
        message={error.response?.data?.message}
        code={error.response?.status}
        onRetry={refetch}
      />
    );

  if (isLoading) return <Loader message="Loading offers..." />;

  return (
    <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20">
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
        <PageHeader
          title="Offer Management"
          description="Create and manage discount offers on your packages. Offers apply automatically at checkout."
          primaryAction={{
            label: "Create Offer",
            icon: <Plus className="w-4 h-4" />,
            onClick: () => setIsDialogOpen(true),
          }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Total Offers
              </p>
              <p className="text-xl font-bold text-foreground">{counts.all}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Tag className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600">
                Active
              </p>
              <p className="text-xl font-bold text-emerald-700">{counts.active}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center">
              <Tag className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Inactive / Expired
              </p>
              <p className="text-xl font-bold text-slate-600">{counts.inactive}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <OfferFilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
            searchQuery={search}
            onSearchChange={setSearch}
          />
        </div>

        {offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <Tag className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">No offers found</p>
              <p className="text-sm text-muted-foreground mt-1">
                {activeFilter === "all"
                  ? "Create your first offer to attract more bookings."
                  : `No offers match your current filter.`}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onDeactivate={handleDeactivate}
                isDeactivating={deactivatingId}
              />
            ))}
          </div>
        )}
        {totalDocs > LIMIT && (
          <TableFooter
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

      </div>

      <OfferFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        packages={packages}
      />
    </div>
  );
}
