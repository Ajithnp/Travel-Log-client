import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";;
import { useParams } from "react-router-dom";
import { useVendorProfileQuery, useVendorProfileStatsQuery } from "../hooks/api.hooks";
import VendorProfileHeader from "../components/vendor-profile-header";
import VendorProfileStats from "../components/vendor-profile-stats";
import VendorProfileDetails from "../components/vendor-profile-details";
import { fadeUp } from "@/animation/variants";
import { Loader } from "@/components/common/loader";
import { InvalidState } from "@/components/common/invalidate-state";
import VendorProfileTimeline from "../components/vendor-profile-timeline";
import VendorProfileActions from "../components/vendor-profile-actions";


const payouts = [
    { schedule: "Apr 10 – Apr 15", package: "Jaipur Heritage Walk", gross: "₹5,10,000", commission: "₹76,500", net: "₹4,33,500", status: "Done" },
    { schedule: "Mar 20 – Mar 28", package: "Spiti Valley Trek", gross: "₹8,74,982", commission: "₹1,31,247", net: "₹7,43,735", status: "Done" },
    { schedule: "May 25 – May 27", package: "Jaipur Heritage Walk", gross: "₹3,74,000", commission: "₹56,100", net: "₹3,17,900", status: "Pending" },
];


export default function VendorProfile() {

    const { vendorId } = useParams();

    const { data: vendorProfile, isLoading: vendorProfileLoading } = useVendorProfileQuery(vendorId!);
    const { data: vendorProfileStats, isLoading: vendorProfileStatsLoading } = useVendorProfileStatsQuery(vendorId!);

    const vendorData = vendorProfile?.data;
    const vendorStats = vendorProfileStats?.data;

    if (vendorProfileLoading || vendorProfileStatsLoading) {
        return <Loader />
    }

    if (!vendorData || !vendorStats) {
        return <InvalidState
            title="No Vendor Data Found"
            type="generic"
        />
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            <VendorProfileHeader
                vendor={vendorData}
            />
            <VendorProfileStats stats={vendorStats} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                        <VendorProfileDetails
                            vendor={vendorData}
                        />
                        {/* Payout History */}
                        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                            <Card className="border-0 shadow-sm">
                                <CardHeader className="pb-3 pt-5 px-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
                                        <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Payout History (Last 10)</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-5 pb-5">
                                    {/* Desktop table */}
                                    <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-slate-50">
                                                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Schedule</th>
                                                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Gross</th>
                                                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Commission</th>
                                                    <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Net Paid</th>
                                                    <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-2.5">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {payouts.map((p, i) => (
                                                    <motion.tr
                                                        key={i}
                                                        initial={{ opacity: 0, x: -8 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.4 + i * 0.07 }}
                                                        className="hover:bg-slate-50 transition-colors"
                                                    >
                                                        <td className="px-4 py-3">
                                                            <p className="font-medium text-slate-800">{p.schedule}</p>
                                                            <p className="text-xs text-slate-500">{p.package}</p>
                                                        </td>
                                                        <td className="px-4 py-3 text-right text-slate-700 font-mono text-xs">{p.gross}</td>
                                                        <td className="px-4 py-3 text-right text-slate-500 font-mono text-xs">{p.commission}</td>
                                                        <td className="px-4 py-3 text-right font-bold font-mono text-xs text-emerald-700">{p.net}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "Done"
                                                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                                    : "bg-amber-50 text-amber-700 border border-amber-200"
                                                                }`}>
                                                                {p.status === "Done" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                                {p.status}
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile cards */}
                                    <div className="sm:hidden space-y-3">
                                        {payouts.map((p, i) => (
                                            <div key={i} className="border border-slate-200 rounded-xl p-3.5">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="text-xs font-semibold text-slate-700">{p.schedule}</p>
                                                        <p className="text-xs text-slate-500">{p.package}</p>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "Done"
                                                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                            : "bg-amber-50 text-amber-700 border border-amber-200"
                                                        }`}>
                                                        {p.status === "Done" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                        {p.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div><p className="text-slate-500">Gross</p><p className="font-mono font-medium text-slate-700">{p.gross}</p></div>
                                                    <div><p className="text-slate-500">Commission</p><p className="font-mono font-medium text-slate-500">{p.commission}</p></div>
                                                    <div><p className="text-slate-500">Net</p><p className="font-mono font-bold text-emerald-700">{p.net}</p></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-5">
                        <VendorProfileActions />
                        <VendorProfileTimeline
                            createdAt={vendorData.vendorInfo.createdAt}
                            updatedAt={vendorData.vendorInfo.updatedAt}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}