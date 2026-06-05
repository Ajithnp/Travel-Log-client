import { Button } from "@/components/ui/button";
import {motion} from 'framer-motion';
import { successV } from "@/animation/variants";
import { Ticket } from "lucide-react";
import type { CreateCouponResponse } from "../../services/api.services";



export function toPercent(raw: string) {
  const n = parseFloat(raw);
  if (isNaN(n)) return null;
  return Math.round(n * 100);
}

export function SuccessState({
  fields,
  onClose,
}: {
  fields: CreateCouponResponse | null;
  onClose: () => void;
}) {

    if(!fields){
        return null;
    }
  const pct = toPercent(fields.probability.toString());
  return (
    <motion.div
      variants={successV}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center py-10 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center mb-5 ring-4 ring-violet-100"
      >
        <Ticket className="w-8 h-8 text-violet-500" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        className="text-lg font-bold text-slate-900 mb-1"
      >
        Coupon Created!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-slate-500 mb-6"
      >
        Your scratch coupon is ready to go.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="w-full max-w-xs rounded-2xl border border-violet-100 bg-gradient-to-b from-violet-50 to-white p-4 mb-6 text-left space-y-2.5"
      >
        {[
          { label: "Title", value: fields.title },
          { label: "Reward Value", value: `₹${Number(fields.rewardValue).toLocaleString("en-IN")}` },
          { label: "Win Chance", value: pct !== null ? `${pct}%` : "—" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{row.label}</span>
            <span className="text-xs font-bold text-slate-800">{row.value}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46 }}
        className="flex gap-2 w-full max-w-xs"
      >
        <Button
          onClick={onClose}
          className="flex-1 h-9 text-sm rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold"
        >
          Done
        </Button>
      </motion.div>
    </motion.div>
  );
}
