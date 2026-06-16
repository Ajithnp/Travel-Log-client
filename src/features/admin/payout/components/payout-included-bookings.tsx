import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animation/variants";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface BookingData {
    userName?: string;
    selectedGroupType?: string;
    finalAmount?: number;
    platformCommission?: number;
    vendorEarning?: number;
}

interface OverViewStats {
    totalBookingsCount?: number;
    totalGrossAmount?: number;
    totalPlatformCommission?: number;
    totalVendorEarnings?: number;
}

interface PayoutIncludedBookingsProps {
    bookingsData: BookingData[];
    overViewStats?: OverViewStats;
}

export function PayoutIncludedBookings({ bookingsData, overViewStats }: PayoutIncludedBookingsProps) {
    return (
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
                                    {overViewStats?.totalPlatformCommission?.toLocaleString("en-IN") ?? overViewStats?.totalPlatformCommission}
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
    );
}
