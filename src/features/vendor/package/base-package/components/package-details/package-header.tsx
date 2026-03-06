import { MapPin, Calendar, Shield, Copy, Trash2, Map } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryIcon, difficultyColor, statusColorMap } from "@/lib/constants/ui/mapping-ui";
import { PackageStatus } from "@/lib/constants/constants";
import type { PackageDetailReponse } from "../../type/package";

interface PackageHeaderProps {
  pkg: Partial<PackageDetailReponse>;
}

export function PackageHeader({ pkg }: PackageHeaderProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-base shadow-premium">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="default" className={`${pkg.status ? statusColorMap[pkg.status] : ""}`}>
              {pkg.status}
            </Badge>
            {pkg.category && (
              <span className="flex items-center gap-1">
                <span className="flex text-xs text-foreground/50 items-center gap-1">Category</span>
                <Badge variant="secondary" className="border-muted bg-amber-100 text-sm">
                  {categoryIcon[pkg.category]}{" "}
                  {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                </Badge>
              </span>
            )}
            {pkg.difficultyLevel && (
              <span className="flex items-center gap-1">
                <span className="flex text-xs text-foreground/50 items-center gap-1">Difficulty Level</span>
                <Badge
                  variant="outline"
                  className={`border-muted ${difficultyColor[pkg.difficultyLevel]} bg-amber-100 text-sm"`}
                >
                  ●{" "}
                  {pkg.difficultyLevel.charAt(0).toUpperCase() +
                    pkg.difficultyLevel.slice(1)}
                </Badge>
              </span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-foreground mb-2 font-medium">
            {pkg.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {pkg.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-destructive" />
                {pkg.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Map className="h-3.5 w-3.5 text-amber-400" />
              {pkg.state}
            </span>

            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-pink-400" />
              {pkg.days} Days · {pkg.nights} Nights
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-green-400" />
              {pkg.cancellationPolicy ?? "N/A"} cancellation
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {pkg.status === PackageStatus.PUBLISHED && (
            <Button variant="outline" size="sm" className="gap-1.5">
              <Copy className="h-3.5 w-3.5" /> Duplicate
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
