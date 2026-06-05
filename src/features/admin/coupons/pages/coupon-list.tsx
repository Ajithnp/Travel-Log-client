import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { PageHeader } from "@/components/shared/page-header";
import TableFooter from "@/components/table/TableFooter";
import { OfferFilterBar } from "@/features/vendor/offer/components/offer-filter-bar";
import { useDebounce } from "@/hooks/useDebounce";
import { Plus, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { useCouponsQuery, useCreateCouponMutation, useDeactivateCouponMutation } from "../hooks/api.hooks";
import DataTable from "@/components/table/DataTable";
import { CouponColumns } from "../components/coupons-columns";
import type { CreateCouponResponse, ICouponTemplateResponse } from "../services/api.services";
import CreateCouponModal, { type Fields } from "../components/create-modal/create-coupon-modal";
import { ConfirmDialog } from "@/components/common/confirm-dialog";



type FilterType = "all" | boolean;
const LIMIT = 12;

export default function CouponListPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [createdCoupon, setCreatedCoupon] = useState<CreateCouponResponse | null>(null);


    const debouncedSearch = useDebounce(search);
    const isActive = activeFilter === "all" ? undefined : activeFilter;

    const handleShowDeactivateDialog = (couponId: string) => {
        setDeactivatingId(couponId);
        if (deactivatingId) {
            setIsDialogOpen(true);
        }
    }

    const columns = useMemo(() => CouponColumns(handleShowDeactivateDialog), []);

    const { data: couponsData, isLoading, isError, error, refetch } = useCouponsQuery({
        page,
        limit: LIMIT,
        isActive,
        search: debouncedSearch,
    });

    const { mutateAsync: create, isPending: isSubmitting } = useCreateCouponMutation();
    const { mutateAsync: deactivate, isPending: isDeactivating } = useDeactivateCouponMutation();

    const coupons = couponsData?.data?.data ?? [];
    const totalPages = couponsData?.data?.totalPages ?? 0;
    const totalDocs = couponsData?.data?.totalDocs ?? 0;

    const counts = {
        all: couponsData?.data?.totalDocs ?? 0,
        active: couponsData?.data?.activeCount ?? 0,
        inactive: couponsData?.data?.inActiveCount ?? 0,
    }

    const createCoupon = (data: Fields) => {
        create({ ...data, rewardValue: Number(data.rewardValue.trim()), probability: Number(data.probability.trim()) }, {
            onSuccess: (res) => {
                setCreatedCoupon(res.data);
                setSubmitted(true);
            },
            onError: () => {
                setSubmitted(false);
            }
        })
    };

    const handleDeactivateCoupon = (id: string) => {
        deactivate(id, {
            onSuccess: () => {
                setDeactivatingId(null);
            }
        })
    }

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
                    title="Coupon Management"
                    description="Create and manage discount offers on your packages. Offers apply automatically at checkout."
                    primaryAction={{
                        label: "Create Coupon",
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


                <DataTable<ICouponTemplateResponse>
                    data={coupons}
                    columns={columns}
                    loading={isLoading}
                    rowKey={(row) => row.id}
                />

                {totalDocs > LIMIT && (
                    <TableFooter
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}

            </div>
            {isDialogOpen && (
                <CreateCouponModal
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSubmit={createCoupon}
                    submitting={isSubmitting}
                    submitted={submitted}
                    createdCoupon={createdCoupon}
                />
            )}

            <ConfirmDialog
                open={!!deactivatingId}
                onOpenChange={() => setDeactivatingId(null)}
                title="Deactivate coupon"
                description={
                    "Are you sure you want to deactivate this coupon? This action can't be undone."
                }
                onConfirm={() => handleDeactivateCoupon(deactivatingId!)}
                loading={isDeactivating}
            />
        </div>
    );
}