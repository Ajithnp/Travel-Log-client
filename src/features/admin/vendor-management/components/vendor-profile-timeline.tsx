import { fadeUp } from "@/animation/variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/iso-date-format";

interface VendorProfileTimelineProps{
    createdAt:string;
    updatedAt:string;
}

export default function VendorProfileTimeline({createdAt,updatedAt}: VendorProfileTimelineProps) {

    const timeline = [
        { event: "Verified & Approved", date: formatDate(updatedAt), active: true },
        { event: "Registered", date: formatDate(createdAt), active: false },
    ];
    return (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
            <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3 pt-5 px-5">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <CardTitle className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Timeline</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="px-5 pb-5">
                    <div className="relative pl-5 space-y-4">
                        <div className="absolute left-1.5 top-1 bottom-1 w-0.5 bg-gradient-to-b from-emerald-500 to-slate-200 rounded-full" />
                        {timeline.map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="relative"
                            >
                                <div className={`absolute -left-3.5 w-3 h-3 rounded-full border-2 ${event.active
                                        ? "bg-emerald-500 border-emerald-500 shadow-emerald-200 shadow-sm"
                                        : "bg-white border-slate-300"
                                    }`} />
                                <p className="text-xs font-semibold text-slate-800">{event.event}</p>
                                <p className="text-xs text-slate-500">{event.date}</p>
                            </motion.div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}