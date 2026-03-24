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
      <div className="px-5 pt-5">
        <h2 className="text-base font-semibold text-gray-700">
          INCLUSIONS & EXCLUSIONS
        </h2>
      </div>
     <div className="border-t border-gray-100 mx-5" />
      <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* INCLUDED */}
        <div className="bg-green-10 border border-green-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Included
          </h3>
          <ul className="space-y-2">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EXCLUDED */}
        <div className="bg-red-10 border border-red-100 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-red-600 mb-3 flex items-center gap-2">
            <X className="w-4 h-4" />
            Not Included
          </h3>
          <ul className="space-y-2">
            {exclusions.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-gray-600"
              >
                <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}