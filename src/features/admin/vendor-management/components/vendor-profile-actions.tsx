import { fadeUp } from "@/animation/variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Package, FileText } from "lucide-react";
import { motion } from "framer-motion";


export default function VendorProfileActions() {

    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-5 bg-blue-500 rounded-full" />
                        <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Admin Actions</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 space-y-2">
                    {[
                        { icon: FileText, label: "View Verification Docs", color: "text-blue-600 bg-blue-50 hover:bg-blue-100" },
                        { icon: Package, label: "View All Packages", color: "text-violet-600 bg-violet-50 hover:bg-violet-100" },
                        { icon: IndianRupee, label: "View Payouts", color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100" },
                    ].map((action) => (
                        <motion.button
                            key={action.label}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${action.color}`}
                        >
                            <action.icon className="w-4 h-4 flex-shrink-0" />
                            {action.label}
                        </motion.button>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}