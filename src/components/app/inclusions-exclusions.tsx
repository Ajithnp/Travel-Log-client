import { Check, X } from "lucide-react";
import { Card} from "@/components/ui/card";

type InclusionsExclusionsProps = {
  inclusions: string[];
  exclusions: string[];
};

export default function InclusionsExclusions({
  inclusions,
  exclusions,
}: InclusionsExclusionsProps) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">

      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-orange-50 border border-orange-200">
          <Check className="w-4 h-4 text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
            Package Details
          </p>
          <h2 className="text-sm font-bold text-gray-800 leading-tight">
            Inclusions & Exclusions
          </h2>
        </div>
      </div>

      <div className="border-t border-gray-100 mx-5" />
      <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* INCLUDED */}
        <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/30 border border-green-100/80 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-green-800 mb-4 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center shrink-0 border border-green-200 shadow-sm">
              <Check className="w-3.5 h-3.5 text-green-700" />
            </div>
            What's Included
          </h3>
          <ul className="space-y-3">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700 group">
                <div className="mt-0.5 w-4 h-4 rounded-full bg-green-200/60 flex items-center justify-center shrink-0 group-hover:bg-green-300/80 transition-colors">
                  <Check className="w-2.5 h-2.5 text-green-700" />
                </div>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EXCLUDED */}
        <div className="bg-gradient-to-br from-red-50/80 to-rose-50/30 border border-red-100/80 rounded-xl p-5 shadow-sm">
          <h3 className="text-sm font-bold text-red-800 mb-4 flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center shrink-0 border border-red-200 shadow-sm">
              <X className="w-3.5 h-3.5 text-red-700" />
            </div>
            Not Included
          </h3>
          <ul className="space-y-3">
            {exclusions.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-600 group"
              >
                <div className="mt-0.5 w-4 h-4 rounded-full bg-red-200/60 flex items-center justify-center shrink-0 group-hover:bg-red-300/80 transition-colors">
                  <X className="w-2.5 h-2.5 text-red-700" />
                </div>
                <span className="leading-relaxed font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}