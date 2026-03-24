import { AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { policies } from "@/lib/constants/cancellation-policies";

type Policy = (typeof policies)[number];

type CancellationPolicyCardProps = {
  policy: Policy | undefined;
};

const colorMap: Record<Policy["color"], string> = {
  green: "text-green-700 dark:text-green-400",
  amber: "text-amber-700 dark:text-amber-400",
  red: "text-red-700 dark:text-red-400",
};

export function CancellationPolicyCard({
  policy,
}: CancellationPolicyCardProps) {
  if (!policy) return null;
  return (
<Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
  <div className="px-5 pt-5">
    <h2 className="text-base font-semibold text-gray-700">
          CANCELLATION POLICY
    </h2>
  </div>
  <div className="border-t border-gray-100 mx-5" />
  <div className="px-5 py-5">
    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-amber-900">
          {policy.label}
        </p>
        <p className={`text-sm font-medium ${colorMap[policy.color]}`}>
          {policy.tagline}
        </p>
        <ul className="space-y-2 pt-1">
          {policy.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-amber-800"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span className="leading-snug">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</Card>
  );
}
