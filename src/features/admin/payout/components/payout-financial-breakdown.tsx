import { TrendingUp, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animation/variants";

interface PayoutFinancialBreakdownProps {
    totalBookingsCount?: number;
    totalBookingGross?: number;
    totalPlatformCommission?: number;
    totalVendorEarnings?: number;
    totalCancellationsCount?: number;
    totalRefundedAmount?: number;
}

export function PayoutFinancialBreakdown({
    totalBookingsCount,
    totalBookingGross,
    totalPlatformCommission,
    totalVendorEarnings,
    totalCancellationsCount,
    totalRefundedAmount
}: PayoutFinancialBreakdownProps) {
    return (
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
                            <span className="text-xs text-slate-400">({totalBookingsCount} bookings)</span>
                        </div>
                        <span className="text-sm font-bold text-slate-800">{totalBookingGross ?? 0}</span>
                    </div>

                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-rose-50/60 border border-rose-100/60">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Platform commission</span>
                            <span className="text-xs text-slate-400">({15}%)</span>
                        </div>
                        <span className="text-sm font-semibold text-rose-500">− {totalPlatformCommission}</span>
                    </div>

                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-slate-50/60 border border-slate-100/60">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Vendor Earnings</span>
                        </div>
                        <span className="text-sm font-semibold text-slate-500">{totalVendorEarnings}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-green-50/60 border border-rose-100/60">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600 font-medium">Total Amount from Cancellation</span>
                            <span className="text-xs text-slate-400">({totalCancellationsCount} bookings)</span>
                        </div>
                        <span className="text-sm font-semibold text-green-500">+ {totalRefundedAmount}</span>
                    </div>
                  
                    <div className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center">
                                <IndianRupee className="w-3.5 h-3.5 text-indigo-600" />
                            </div>
                            <span className="text-sm font-bold text-slate-800">Net to vendor</span>
                        </div>
                        <span className="text-lg font-black text-indigo-600">{(totalVendorEarnings ?? 0) + (totalRefundedAmount ?? 0)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
