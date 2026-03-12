import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Handshake , Luggage } from "lucide-react";
import type { PackageScheduleContextResponse } from "../../package/base-package/type/package";
import { capitalize } from "@/utils/capitalize";

type PackageHeaderProps = {
  pkgData: PackageScheduleContextResponse;
};

const PackageHeader = ({ pkgData}:PackageHeaderProps) => {
  return (
    <div className="bg-card rounded-xl border border-border p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shodow-premium">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center shrink-0">
          <Luggage className="w-6 h-6 text-success" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{capitalize(pkgData.title)}</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" /> {pkgData.days} Days · {pkgData.nights} Nights
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-destructive" /> {capitalize(pkgData.category)}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-destructive" /> {capitalize(pkgData.difficultyLevel)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-destructive" /> {capitalize(pkgData.location)}, {capitalize(pkgData.state)}
            </span>
            <span className="flex items-center gap-1">
              <Handshake className="w-3.5 h-3.5 text-warning text-yellow-400" /> 
            </span>
          </div>
        </div>
      </div>
      <Badge className="bg-success/10 text-success font-bold border-success/20 hover:bg-success/20 shrink-0">
        ✓ {pkgData.status}
      </Badge>
    </div>
  );
};

export default PackageHeader;