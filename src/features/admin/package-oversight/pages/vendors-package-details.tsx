import { motion } from "framer-motion";
import {
    MapPin,
    Clock,
    Tag,
    Shield,
    CalendarDays,
    Building2,
    Star,
    LuggageIcon,
    User,
    Users,
    UsersRound,
    ArrowLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FilterWithSearch } from "@/components/shared/filter-with-search";
import DataTable from "@/components/table/DataTable";
import type { PackageScheduleResponseDTO } from "../services/api.services";
import TableFooter from "@/components/table/TableFooter";
import { useMemo, useState } from "react";
import { VendorsPackageDetailsColumns } from "../components/vendors-package-details-column";
import { useVendorPackageSchedulesQuery, useVendorsPackagesByIdQuery } from "../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { fadeUpBox, staggerContainer } from "@/animation/variants";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { Button } from "@/components/ui/button";

const LIMIT = 10;
type FilterTab = "all" | "upcoming" | "completed";
export default function VendorPackageDetailsPage() {

    const { packageId } = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<FilterTab>("all");
    const [page, setPage] = useState(1);

    const filterValue = activeTab === "all" ? undefined : activeTab;

    const tabs = [
        { key: "all" as FilterTab, label: "All" },
        { key: "upcoming" as FilterTab, label: "Upcoming" },
        { key: "completed" as FilterTab, label: "Completed" },
    ];

    const columns = useMemo(() => VendorsPackageDetailsColumns(), []);

    const { data: packageDetailsData, isLoading: packageDetailsLoading, isError: packageDetailsError, error: packageDetailsErrorDetails,
        refetch: refetchPackageDetails } = useVendorsPackagesByIdQuery(packageId || '')
    const { data: scheduleData, isLoading: scheduleLoading, isError: scheduleError, error: scheduleErrorDetails,
        refetch: refetchScheduleData } = useVendorPackageSchedulesQuery(packageId || '', page, LIMIT, filterValue)

    const packageDetails = packageDetailsData?.data;
    const scheduleList = scheduleData?.data?.data || [];
    const totalPages = scheduleData?.data?.totalPages || 1
    const priceTiers = packageDetailsData?.data?.pricing || [];

    if (packageDetailsLoading || scheduleLoading) return <Loader message="Loading..." />

    if (packageDetailsError) return <Error message={packageDetailsErrorDetails?.response?.data.message || 'Failed to load package details'} onRetry={refetchPackageDetails} />
    if (scheduleError) return <Error message={scheduleErrorDetails?.response?.data.message || 'Failed to load schedule'} onRetry={refetchScheduleData} />


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 p-3 sm:p-6 lg:p-8">
            <div className="max-w-[97rem] mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <Card className="border border-slate-200/80 bg-white shadow-xl shadow-slate-200/60 overflow-hidden rounded-2xl">
                        <CardHeader className="p-4 sm:p-6 pb-0 sm:pb-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                    <motion.div
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                                        className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg shadow-emerald-200`}
                                    >
                                        <LuggageIcon className="w-6 h-6" />
                                    </motion.div>

                                    <div className="min-w-0 flex-1">
                                        <motion.h1
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2, duration: 0.35 }}
                                            className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-tight truncate"
                                        >
                                            {packageDetails?.packageName}
                                        </motion.h1>
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-wrap items-center gap-1.5 mt-1.5"
                                        >
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                {packageDetails?.status}
                                            </span>

                                            <span className="hidden sm:inline text-slate-300 text-xs">•</span>
                                            <span className="hidden sm:inline text-xs text-slate-400 font-mono">
                                                ID: {packageDetails?.packageName.slice(0, 12)}…
                                            </span>
                                        </motion.div>
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.35 }}
                                            className="sm:hidden text-[10px] text-slate-400 font-mono mt-1"
                                        >
                                            ID: {packageDetails?.packageName.slice(0, 16)}…
                                        </motion.p>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 }}
                                    className="flex items-center gap-1.5 flex-shrink-0"
                                >
                                    <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5 text-slate-600 border-slate-200 hover:bg-slate-50 text-xs h-8"
                                    onClick={() => navigate(-1)}
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        Back
                                    </Button>
                                </motion.div>
                            </div>

                            <Separator className="mt-5 sm:mt-6" />
                        </CardHeader>

                        <CardContent className="p-4 sm:p-6 space-y-5 sm:space-y-6">

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                            >
                                <InfoCard
                                    icon={Building2}
                                    label="Vendor"
                                    primary={packageDetails?.vendorName || ''}
                                    secondary={`Verified`}
                                    index={0}
                                    accent
                                />
                                <InfoCard
                                    icon={MapPin}
                                    label="Location"
                                    primary={packageDetails?.location || ''}
                                    secondary={packageDetails?.state || ''}
                                    index={1}
                                    accent
                                />
                                <InfoCard
                                    icon={Clock}
                                    label="Duration"
                                    primary={`${packageDetails?.days} Days ${packageDetails?.nights} Nights`}
                                    secondary={`${packageDetails?.difficultylevel} difficulty`}
                                    index={2}
                                    accent
                                />
                                <InfoCard
                                    icon={Shield}
                                    label="Cancellation Policy"
                                    primary={packageDetails?.cancellationPolicyLabel || ''}
                                    index={3}
                                    accent
                                />
                                <InfoCard
                                    icon={CalendarDays}
                                    label="Total Schedules"
                                    primary={`${packageDetails?.totalScedule} schedules`}
                                    index={4}
                                    accent
                                />
                                <InfoCard
                                    icon={Tag}
                                    label="Category"
                                    primary={packageDetails?.categoryName || ''}
                                    secondary={packageDetails?.categoryIsActive ? 'Active category' : 'Inactive category'}
                                    index={5}
                                    accent
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.62, duration: 0.4 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm sm:text-base font-semibold text-slate-800">Pricing Tiers</h2>
                                    <span className="text-xs text-slate-400">{priceTiers.length} tiers available</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {priceTiers.map((tier, i) => {
                                        const getTierConfig = (tierType: string) => {
                                            switch (tierType) {
                                                case 'SOLO':
                                                    return { name: 'Solo', tagline: 'Perfect for solo explorers', icon: User, color: "text-slate-600", iconBg: "bg-slate-100", border: "border-slate-200", gradient: "from-slate-50 to-white" };
                                                case 'DUO':
                                                    return { name: 'Duo', tagline: 'Best value for couples', icon: Users, color: "text-indigo-600", iconBg: "bg-indigo-50", border: "border-indigo-200", gradient: "from-indigo-50/60 to-white" };
                                                case 'GROUP':
                                                    return { name: 'Group', tagline: 'Ultimate experience for groups', icon: UsersRound, color: "text-amber-600", iconBg: "bg-amber-50", border: "border-amber-200", gradient: "from-amber-50/50 to-white" };
                                                default:
                                                    return { name: tierType, tagline: '', icon: Star, color: "text-slate-600", iconBg: "bg-slate-100", border: "border-slate-200", gradient: "from-slate-50 to-white" };
                                            }
                                        };
                                        const config = getTierConfig(tier.priceTier);
                                        const Icon = config.icon;
                                        return (
                                            <motion.div
                                                key={tier.priceTier}
                                                custom={i}
                                                variants={fadeUpBox}
                                                initial="hidden"
                                                animate="show"
                                                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                                                className={`relative rounded-xl border-2 ${config.border} bg-gradient-to-b ${config.gradient} p-4 sm:p-5 flex flex-col gap-3 cursor-pointer group overflow-hidden`}
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <div className={`w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
                                                        <Icon className={`w-4 h-4 ${config.color}`} />
                                                    </div>
                                                    <div>
                                                        <p className={`text-sm font-bold ${config.color}`}>{config.name}</p>
                                                        <p className="text-[10px] text-slate-400 leading-tight">{config.tagline}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900">
                                                        ₹{(tier.price / tier.peopleCount).toLocaleString("en-IN")}
                                                    </span>
                                                    <span className="text-xs text-slate-400 font-medium">/ person</span>
                                                </div>

                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65, duration: 0.4 }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm sm:text-base font-semibold text-slate-800"> Schedules</h2>
                                </div>

                                <div className="hidden sm:block rounded-xl border border-slate-100 overflow-hidden">
                                    <FilterWithSearch
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        onTabChange={setActiveTab}
                                        gradient="from-indigo-200/60 to-white"
                                    />

                                    <DataTable<PackageScheduleResponseDTO>
                                        data={scheduleList}
                                        columns={columns}
                                        loading={false}
                                        rowKey={(row) => row._id}
                                    />

                                    <TableFooter
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={setPage}
                                    />

                                </div>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}

function InfoCard({
    icon: Icon,
    label,
    primary,
    secondary,
    index,
    accent = false,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    primary: string;
    secondary?: string;
    index: number;
    accent?: boolean;
}) {
    return (
        <motion.div custom={index} variants={fadeUpBox} initial="hidden" animate="show">
            <Card className="h-full border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 group">
                <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${accent ? "bg-violet-50" : "bg-slate-50"} group-hover:scale-105 transition-transform`}>
                            <Icon className={`w-4 h-4 ${accent ? "text-violet-500" : "text-slate-500"}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                            <p className="text-sm sm:text-[15px] font-semibold text-slate-800 leading-tight">{primary}</p>
                            {secondary && <p className="text-xs text-slate-500 mt-0.5">{secondary}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}