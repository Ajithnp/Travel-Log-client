import { Check, X } from "lucide-react";

interface PackageInclusionsProps {
  inclusions: string[] | undefined;
  exclusions: string[] | undefined;
}

export function PackageInclusions({ inclusions = [], exclusions = [] }: PackageInclusionsProps) {

  return (
    <div className="bg-card rounded-xl border animate-fade-up p-6 shadow-premium" style={{ animationDelay: "0.2s" }}>
      <h2 className="section-title mb-5 font-semibold text-lg">Inclusions & Exclusions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-success mb-3">
            Included ✓
          </p>
          <ul className="space-y-2">
            {inclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-medium text-foreground">
                <Check className="h-4 w-4 text-success mt-0.5 shrink-0 font-semibold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-destructive mb-3">
            Excluded ✗
          </p>
          <ul className="space-y-2">
            {exclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-medium text-foreground ">
                <X className="h-4 w-4 text-destructive mt-0.5 shrink-0 font-semibold"/>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
