import { Calendar, Clock, X, PinIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/status-badge";
import type { ScheduleResponse } from "../types/types";
import type { PackageScheduleContextResponse } from "../../package/base-package/type/package";
import { format } from "date-fns";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";

type Props = {
    schedule: ScheduleResponse;
    pkg: PackageScheduleContextResponse
};

const ScheduleHero = ({ schedule, pkg }: Props) => {
    const isCancellable = schedule.status === "upcoming" 
  return (
    <Card className="mb-6 animate-[fade-in_0.5s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={schedule.status} />
              <span className="text-sm text-muted-foreground">
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
              {pkg.title} —{" "}
              {format(new Date(schedule.startDate), "dd MMM")}
            </h1>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-info text-blue-600" />
                {format(schedule.startDate, "dd MMM yyyy")} – {format(schedule.endDate, "dd MMM yyyy")}
              </span>

              <span className="hidden sm:inline text-muted-foreground/30">·</span>

              <span className="inline-flex items-center gap-1.5">
                <PinIcon className="w-4 h-4 text-destructive" />
                {schedule.reportingLocation.split(",")[0]}
              </span>

              <span className="hidden sm:inline text-muted-foreground/30">·</span>

              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-500" />
                {formatTimeToAMPM(schedule.reportingTime)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isCancellable && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-sm text-sm h-9 px-4 border-destructive/30 text-destructive hover:bg-destructive/10 gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Cancel Schedule
              </Button>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default ScheduleHero;