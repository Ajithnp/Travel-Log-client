import { motion } from "framer-motion";
import {
  AlertCircle,
  ShieldAlert,
  Clock,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { CancellationPolicyDTO } from "../../types";
import { getDaysLabel, getRefundLabel } from "@/utils/cancellation/generate-points.helper";
import { policyColorMap } from "@/lib/constants/ui/mapping-ui";

interface CancellationPolicyProps {
  policy: CancellationPolicyDTO | null;
}

const defaultColors = policyColorMap.moderate;

export default function CancellationPolicy({ policy }: CancellationPolicyProps) {
  if (!policy) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <p className="text-xs font-semibold text-gray-500">
              No cancellation policy available
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const colors = policyColorMap[policy.key] || defaultColors;
  const sortedRules = [...policy.rules].sort(
    (a, b) => b.daysBeforeTrip - a.daysBeforeTrip
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className={`${colors.border} ${colors.bg} shadow-none py-0 gap-0`}>
        <CardHeader className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className={`w-4 h-4 ${colors.icon} flex-shrink-0`} />
              <p className="text-xs font-semibold text-gray-800">
                Cancellation Policy
              </p>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className={`${colors.badgeBg} ${colors.badgeText} border-0 text-[10px] font-semibold uppercase tracking-wider cursor-default`}
                >
                  {policy.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>This booking follows a {policy.label.toLowerCase()} cancellation policy</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>

        <Separator className={`${colors.border} opacity-60`} />

        <CardContent className="px-4 pt-3 pb-4">
          <div className="space-y-2.5">
            {sortedRules.map((rule, index) => {
              const isNoRefund = rule.refundPercent === 0;
              const isFullRefund = rule.refundPercent === 100;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.25 + index * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center mt-0.5">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        isNoRefund
                          ? "bg-rose-400"
                          : isFullRefund
                          ? "bg-emerald-400"
                          : "bg-amber-400"
                      }`}
                    />
                    {index < sortedRules.length - 1 && (
                      <div className="w-px h-5 bg-gray-200 mt-0.5" />
                    )}
                  </div>

                  {/* Rule content */}
                  <div className="flex-1 flex items-center justify-between -mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">
                        {getDaysLabel(rule.daysBeforeTrip)}
                      </span>
                    </div>
                    <Badge
                      className={`text-[10px] font-semibold border-0 ${
                        isNoRefund
                          ? "bg-rose-100 text-rose-600"
                          : isFullRefund
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {getRefundLabel(rule.refundPercent)}
                    </Badge>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-start gap-1.5 mt-3 pt-2.5 border-t border-dashed border-gray-200/80">
            <Info className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Refund percentages are calculated based on the total booking amount.
              Processing may take 5–7 business days.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
