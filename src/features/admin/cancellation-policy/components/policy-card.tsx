import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Power, PowerOff, Shield, ShieldAlert, ShieldCheck, ShieldOff, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { Policy } from "../types";
import { policyCardVariants, rowVariants } from "@/animation/variants";
import { policyUiMap } from "@/lib/constants/ui/mapping-ui";



function refundColor(p: number) {
  if (p >= 70) return "text-emerald-600 font-bold";
  if (p >= 30) return "text-amber-500 font-bold";
  return "text-red-500 font-bold";
}

function policyIcon(name: string) {
  if (name === "Flexible") return ShieldCheck;
  if (name === "Moderate") return Shield;
  if (name === "Strict") return ShieldAlert;
  return ShieldOff;
}

export default function PolicyCard({ policy, index, onToggleActive }: {
  policy: Policy;
  index: number;
  onToggleActive: (id: string) => void;
}) {
    const Icon = policyIcon(policy.label);
    const ui = policyUiMap[policy.key as keyof typeof policyUiMap] || policyUiMap.default;

  return (
    <motion.div
      layout
      custom={index}
      variants={policyCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -3, transition: { duration: 0.22 } }}
      className={`bg-white rounded-2xl border shadow-[0_2px_16px_0_rgba(0,0,0,0.06)] overflow-hidden flex flex-col transition-shadow hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] ${
        !policy.isActive ? "opacity-60" : ""
      }`}
    >
      {/* Top accent stripe */}
      <div className={`h-1 w-full bg-gradient-to-r ${ui.accent}`} />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${ui.iconBg}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-base leading-tight">{policy.label}</h3>
                {!policy.isActive && (
                  <Badge className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] px-1.5 py-0 font-semibold">
                    DISABLED
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Edit2 className="w-3.5 h-3.5" />
            </button> */}
            <Button
              onClick={() => onToggleActive(policy.id)}
              className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                policy.isActive
                  ? "border-red-200 text-red-500 bg-red-50 hover:bg-red-100"
                  : "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
              }`}
            >
              {policy.isActive ? <PowerOff className="w-3 h-3" /> : <Power className="w-3 h-3" />}
              {policy.isActive ? "Disable" : "Enable"}
            </Button>
          </div>
        </div>

    
        <p className="text-sm text-slate-500 leading-relaxed">{policy.description}</p>

        {/* Refund table */}
        <div className={`rounded-xl overflow-hidden border ${
          policy.isActive
            ? "border-slate-100"
            : "border-slate-100"
        }`}>
          <div className={`grid grid-cols-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${
            policy.isActive ? "bg-slate-50 text-slate-400" : "bg-slate-50 text-slate-400"
          }`}>
            <span>Days Before Trip</span>
            <span>Refund</span>
          </div>
          <Separator />
          <div className="divide-y divide-slate-100">
            {policy.rules.map((tier, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 px-4 py-2.5 text-sm items-center"
              >
                <span className="text-slate-700 font-medium">{tier.daysBeforeTrip}</span>
                <div className="flex items-center gap-1.5">
                  {tier.refundPercent > 0 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  )}
                  <span className={refundColor(tier.refundPercent)}>{tier.refundPercent}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}