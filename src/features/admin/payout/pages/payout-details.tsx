import { motion } from "framer-motion";
import {
    ArrowLeft,
    Building2,
    CalendarRange,
    Package,
    TrendingUp,
    IndianRupee,
    Users,
    CircleDot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { fadeUp } from "@/animation/variants";
import { SectionCard } from "../components/section-card";
import { InfoRow } from "../components/payout-info-raw";
import { useSchedulePayoutDetailsQuery } from "../hooks/api.hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { formatDateRange } from "@/utils/combine-date-formater";

const statusConfig = {
    completed: { label: "Completed", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    pending: { label: "Pending", dot: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200" },
    failed: { label: "Failed", dot: "bg-red-400", badge: "bg-red-50 text-red-600 border-red-200" },
};

export default function PayoutDetails() {
   
    const navigate = useNavigate();
    const { scheduleId } = useParams();

    const payoutDetailsQuery = useSchedulePayoutDetailsQuery(scheduleId as string);
    const overViewStats = payoutDetailsQuery.data?.data.bookingOverViewStats;
    const bookingsData = payoutDetailsQuery.data?.data.bookingsData ?? [];
    const bookingStats = payoutDetailsQuery.data?.data.bookingStats;
    
    const getStatusKey = (status?: string): keyof typeof statusConfig => {
        if (status === 'paid') return 'completed';
        if (status === 'pending') return 'pending';
        return 'failed';
    };
    const status = statusConfig[getStatusKey(bookingStats?.schedulePayoutStatus)];


    if (payoutDetailsQuery.isLoading) {
        return <Loader message="Loading payout details..." />
    };
    if (payoutDetailsQuery.isError) {
        return <Error title="Failed to fetch payout details" onRetry={payoutDetailsQuery.refetch} />
    }


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 p-3 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-5">

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Button className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors flex-shrink-0"
                            variant={"outline"}
                            onClick={() => navigate("/admin/payouts/schedules")}>
                            <ArrowLeft className="w-4 h-4 text-slate-500" />
                        </Button>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">Payout Details</h1>
                                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${status.badge}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                    {status.label}
                                </span>
                            </div>
                            {/* <p className="text-xs text-slate-400 font-mono mt-0.5">{payout.id}</p> */}
                        </div>
                    </div>
                </motion.div>

                <SectionCard label="Payout Information" icon={CircleDot} >
                    <div className="divide-y divide-slate-100">

                        <InfoRow icon={Building2} label="Vendor" value={bookingStats?.vendorName ?? ''} />
                        <InfoRow
                            icon={CalendarRange}
                            label="Schedule" value={bookingStats?.scheduleStartDate && bookingStats?.scheduleEndDate
                                ? formatDateRange(bookingStats.scheduleStartDate.toString(), bookingStats.scheduleEndDate.toString())
                                : 'N/A'}
                        />
                        <InfoRow icon={Package} label="Package" value={bookingStats?.packageTitle ?? 'N/A'} />
                        

                    </div>
                </SectionCard>


                <motion.div variants={fadeUp}>
                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100 overflow-hidden">
                        <div className="flex items-center gap-2 px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/60">
                            <IndianRupee className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Financial Breakdown</span>
                        </div>
                        <div className="px-5 sm:px-6 py-4 space-y-2">

                            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50/80 border border-slate-100">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm text-slate-600 font-medium">Total gross</span>
                                    <span className="text-xs text-slate-400">({bookingStats?.totalBookingsCount} bookings)</span>
                                </div>
                                <span className="text-sm font-bold text-slate-800">{bookingStats?.totalBookingGross ?? 0}</span>
                            </div>


                            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-rose-50/60 border border-rose-100/60">
                                <div className="flex items-center gap-2">

                                    <span className="text-sm text-slate-600 font-medium">Platform commission</span>
                                    <span className="text-xs text-slate-400">({15}%)</span>
                                </div>
                                <span className="text-sm font-semibold text-rose-500">− {bookingStats?.totalPlatformCommission}</span>
                            </div>

                            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50/60 border border-slate-100/60">
                                <div className="flex items-center gap-2">

                                    <span className="text-sm text-slate-600 font-medium">Vendor Earnings</span>
                                </div>
                                <span className="text-sm font-semibold text-slate-500">{bookingStats?.totalVendorEarnings}</span>
                            </div>
                            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-green-50/60 border border-rose-100/60">
                                <div className="flex items-center gap-2">

                                    <span className="text-sm text-slate-600 font-medium">Total Amount from Cancellation</span>
                                    <span className="text-xs text-slate-400">({bookingStats?.totalCancellationsCount} bookings)</span>
                                </div>
                                <span className="text-sm font-semibold text-green-500">+ {bookingStats?.totalRefundedAmount}</span>
                            </div>
                          
                            <div className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-800">Net to vendor</span>
                                </div>
                                <span className="text-lg font-black text-indigo-600">{(bookingStats?.totalVendorEarnings ?? 0) + (bookingStats?.totalRefundedAmount ?? 0)}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* ── Included Bookings ── */}
                <motion.div variants={fadeUp}>
                    <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100 overflow-hidden">
                        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/60">
                            <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                                    Included Bookings
                                </span>
                                <span className="text-[11px] font-bold text-slate-400">({overViewStats?.totalBookingsCount})</span>
                            </div>
                        </div>

                        {/* Desktop table */}
                        <div className="hidden sm:block">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/50 border-slate-100 hover:bg-slate-50/50">
                                        <TableHead className="text-[11px] font-bold uppercase tracking-widest text-slate-400 py-3 pl-5 sm:pl-6">User</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase tracking-widest text-slate-400 py-3">Group</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase tracking-widest text-slate-400 py-3 text-right">Gross (₹)</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase tracking-widest text-slate-400 py-3 text-right">Platform Commission (₹)</TableHead>
                                        <TableHead className="text-[11px] font-bold uppercase tracking-widest text-slate-400 py-3 text-right pr-5 sm:pr-6">Vendor Earning (₹)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bookingsData?.map((b, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                                            className="border-slate-100 hover:bg-slate-50/60 transition-colors"
                                        >
                                            <TableCell className="py-3.5 pl-5 sm:pl-6">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-[10px] font-bold text-indigo-600">{b?.userName?.charAt(0).toUpperCase()}</span>
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-800">{b.userName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="py-3.5">
                                                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                                    {b.selectedGroupType}
                                                </span>
                                            </TableCell>
                                            <TableCell className="py-3.5 text-right text-sm text-slate-700 font-medium">
                                                {b.finalAmount?.toLocaleString("en-IN")}
                                            </TableCell>
                                            <TableCell className="py-3.5 text-right text-sm font-bold text-emerald-600 pr-5 sm:pr-6">
                                                {b?.platformCommission?.toLocaleString("en-IN")}
                                            </TableCell>
                                                <TableCell className="py-3.5 text-right text-sm font-bold text-emerald-600 pr-5 sm:pr-6">
                                                {b?.vendorEarning?.toLocaleString("en-IN")}
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                   
                                    <TableRow className="bg-slate-50/80 border-slate-200 hover:bg-slate-50/80">
                                        <TableCell className="py-3.5 pl-5 sm:pl-6 font-bold text-sm text-slate-800">
                                            Total ({overViewStats?.totalBookingsCount} bookings)
                                        </TableCell>
                                        <TableCell />
                                        <TableCell className="py-3.5 text-right text-sm font-bold text-slate-800">
                                            {overViewStats?.totalGrossAmount?.toLocaleString("en-IN")}
                                        </TableCell>
                                        <TableCell className="py-3.5 text-right text-sm font-black text-emerald-600 pr-5 sm:pr-6">
                                            {overViewStats?.totalPlatformCommission.toLocaleString("en-IN")}
                                        </TableCell>
                                          <TableCell className="py-3.5 text-right text-sm font-bold text-slate-800">
                                            {overViewStats?.totalVendorEarnings?.toLocaleString("en-IN")}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        {/* Mobile booking cards */}
                        <div className="sm:hidden divide-y divide-slate-100">
                            {bookingsData?.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    className="flex items-center justify-between px-5 py-3.5"
                                >
                                    <div className="flex items-center gap-2.5 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-[11px] font-bold text-indigo-600">{b?.userName?.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-semibold text-slate-800 truncate">{b?.userName}</p>
                                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                                {b?.selectedGroupType}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0 ml-3">
                                        <p className="text-sm font-bold text-emerald-600">₹{b?.vendorEarning?.toLocaleString("en-IN")}</p>
                                        <p className="text-[11px] text-slate-400">₹{b?.finalAmount?.toLocaleString("en-IN")} gross</p>
                                    </div>
                                </motion.div>
                            ))}
                            {/* Mobile total */}
                            <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50">
                                <span className="text-sm font-bold text-slate-700">Total ({overViewStats?.totalBookingsCount})</span>
                                <div className="text-right">
                                    <p className="text-sm font-black text-emerald-600">₹{overViewStats?.totalVendorEarnings?.toLocaleString("en-IN")}</p>
                                    <p className="text-[11px] text-slate-400">₹{overViewStats?.totalGrossAmount?.toLocaleString("en-IN")} gross</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}