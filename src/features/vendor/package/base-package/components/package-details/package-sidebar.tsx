import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categoryIcon, difficultyColor } from "@/lib/constants/ui/mapping-ui";
import { PackageStatus } from "@/lib/constants/constants";
import type { PackageDetailReponse } from "../../type/package";
import { useNavigate } from "react-router-dom";

interface PackageSidebarProps {
  pkg: PackageDetailReponse;
}

export function PackageSidebar({ pkg }: PackageSidebarProps) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      {/* Summary Card */}
      <div className="bg-card rounded-xl border p-6 shadow-premium">
        <h3 className="section-title mb-4 font-semibold">Package Summary</h3>
        <dl className="space-y-3 text-sm">
          <SummaryRow label="Category">
            <span className="font-medium">
              {pkg.category ? (
                <>
                  {categoryIcon[pkg.category]}{" "}
                  {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                </>
              ) : "N/A"}

            </span>
          </SummaryRow>
          <SummaryRow label="Difficulty">
            <span className={pkg.difficultyLevel ? difficultyColor[pkg.difficultyLevel] : ""}>
              {pkg.difficultyLevel
                ? `● ${pkg.difficultyLevel.charAt(0).toUpperCase() + pkg.difficultyLevel.slice(1)}`
                : "● N/A"}
            </span>
          </SummaryRow>
          <SummaryRow label="Duration">
            <span className="font-medium">{pkg.days} Days · {pkg.nights} Nights</span>
          </SummaryRow>
          <SummaryRow label="Cancellation">
            <span className="text font-medium">
              🟡 {pkg.cancellationPolicy || "N/A"} Policy
            </span>
          </SummaryRow>
          <SummaryRow label="Base Price">
            <span className="font-bold text-foreground text-base">
              ₹{Number(pkg.basePrice).toLocaleString("en-IN")}
            </span>
          </SummaryRow>
        </dl>
      </div>

      {/* USP Card */}
      <div className="rounded-xl bg-primary p-5 text-primary-foreground shadow-premium">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-2 text-secondary">
          <Sparkles className="h-3.5 w-3.5" />
          What makes it special
        </p>
        <p className="text-sm leading-relaxed opacity-90 italic">
          "{pkg.usp}"
        </p>
      </div>

      {/* Schedules Card */}
      <div className="bg-card rounded-xl border p-6 shadow-premium">
        <h3 className="section-title mb-5 font-semibold">Schedules</h3>
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mb-3">
            <Calendar className="h-6 w-6 text-primary/40" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">
            No schedules created yet.
            <br />
            Add a schedule to open this package for booking.
          </p>
          {pkg.status === PackageStatus.PUBLISHED && (
            <Button
              className="mt-4 w-full py-2.5 rounded-full bg-orange-200 text-secondary-foreground font-semibold text-sm hover:bg-orange-500 transition-opacity"
             onClick={() => navigate(`/vendor/schedule-package/${pkg.packageId}`)}
            >
              + Add Schedule
            </Button>
          )}

        </div>
      </div>
    </div>
  );
}

export function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-foreground/60 font-medium shrink-0">{label}</dt>
      <dd className="text-right text-foreground">{children}</dd>
    </div>
  );
}
