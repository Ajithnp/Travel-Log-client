import { AlertTriangle, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { CancellationPolicyType } from "@/types/types";
import { policyColorConfig } from "@/lib/constants/ui/mapping-ui";

type CancellationPolicyCardProps = {
  policy: CancellationPolicyType | null | undefined;
};


const defaultColors = {
  badge: "bg-gray-100 text-gray-700",
  bg: "bg-gray-50",
  border: "border-gray-200",
  dot: "bg-gray-500",
  icon: "text-gray-600",
};

export function CancellationPolicyCard({ policy }: CancellationPolicyCardProps) {
  if (!policy) return null;

  const colors = policyColorConfig[policy.key?.toLowerCase()] ?? defaultColors;

  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">

      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors.bg} border ${colors.border}`}>
          <AlertTriangle className={`w-4 h-4 ${colors.icon}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Cancellation Policy
          </p>
          <h2 className="text-sm font-bold text-gray-800 leading-tight">
            {policy.label} Policy
          </h2>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${colors.badge}`}>
          {policy.key}
        </span>
      </div>

      <div className="border-t border-gray-100 mx-5" />

      <div className="px-5 py-5 space-y-4">
        {/* Description */}
        {policy.description && (
          <div className={`flex items-start gap-3 p-4 rounded-xl ${colors.bg} border ${colors.border}`}>
            <div className={`w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shrink-0 border ${colors.border}`}>
              <AlertTriangle className={`w-4 h-4 ${colors.icon}`} />
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{policy.description}</p>
          </div>
        )}

        {/* Rules */}
        {policy.rules && policy.rules.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Refund Schedule
            </p>
            <div className="space-y-2">
              {policy.rules.map((rule, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${colors.dot}`} />
                    <span className="text-sm text-gray-600">
                      Cancel <span className="font-semibold text-gray-800">{rule.daysBeforeTrip}+ days</span> before trip
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${colors.icon}`}>
                    {rule.refundPercent}% refund
                  </span>
                </div>
              ))}

             
              <div className={`flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50`}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                  <span className="text-sm text-gray-500">
                    Cancel within <span className="font-semibold text-gray-700">
                      {Math.min(...policy.rules.map(r => r.daysBeforeTrip))} days
                    </span> of trip
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-500">No refund</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
