import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, IndianRupee, Package, Star } from "lucide-react";
import type { VendorProfileStatsResponse } from "../services/api.services";
import { scaleIn, staggerContainer } from "@/animation/variants";


interface VendorProfileStatsProps {
    stats: VendorProfileStatsResponse;
}


export default function VendorProfileStats({ stats }: VendorProfileStatsProps) {
    const statsData = [
        { label: "Total Packages", value: stats.totalPackages, icon: Package, color: "text-violet-600", bg: "bg-violet-50" },
        { label: "Total Bookings", value: stats.totalScheduleCompleted, icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Total Revenue", value: stats.totalEarnings, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Avg Rating", value: stats.averageRating, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
    ];
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
                {statsData.map((s, i) => (
                    <motion.div key={s.label} variants={scaleIn} custom={i}>
                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                                    </div>
                                    <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                                        <s.icon className={`w-4 h-4 ${s.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
