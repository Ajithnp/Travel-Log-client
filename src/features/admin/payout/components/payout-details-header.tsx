import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp } from "@/animation/variants";

interface PayoutDetailsHeaderProps {
    onBack: () => void;
    status: {
        label: string;
        dot: string;
        badge: string;
    };
}

export function PayoutDetailsHeader({ onBack, status }: PayoutDetailsHeaderProps) {
    return (
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Button className="w-8 h-8 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-slate-50 transition-colors flex-shrink-0"
                    variant={"outline"}
                    onClick={onBack}>
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
                </div>
            </div>
        </motion.div>
    );
}
