import { Calendar, Clock, PinIcon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatusBadge from "../components/status-badge";
import { SCHEDULE_STATUS, type ScheduleResponse, type ScheduleStatusType } from "../types/types";
import type { PackageScheduleContextResponse } from "../../package/base-package/type/package";
import { format } from "date-fns";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
    schedule: ScheduleResponse;
    pkg: PackageScheduleContextResponse
    onUpdateStatus: (status: ScheduleStatusType) => void;
};

const STATUS_TRANSITIONS : Record<ScheduleStatusType, ScheduleStatusType[]> = {
  [SCHEDULE_STATUS.UPCOMING]: [SCHEDULE_STATUS.ONGOING],
  [SCHEDULE_STATUS.ONGOING]: [SCHEDULE_STATUS.COMPLETED],
  [SCHEDULE_STATUS.COMPLETED]: [],
  [SCHEDULE_STATUS.SOLD_OUT]: [],
  [SCHEDULE_STATUS.CANCELLED]: [],
};

const ScheduleHero = ({ schedule, pkg, onUpdateStatus }: Props) => {
    const isUpdateable = schedule.status !== SCHEDULE_STATUS.COMPLETED && schedule.status !== SCHEDULE_STATUS.CANCELLED; 
    const availableStatuses = STATUS_TRANSITIONS[schedule.status] || [];
    const [selectedStatus, setSelectedStatus] = useState<ScheduleStatusType | "">("");
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
            {isUpdateable && availableStatuses.length > 0 && (
              <>
                <Select
                  value={selectedStatus}
                  onValueChange={(val) => setSelectedStatus(val as ScheduleStatusType)}
                >
                  <SelectTrigger className="w-[140px] h-9 text-sm">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStatuses.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="default"
                  size="sm"
                  className="rounded-sm text-sm h-9 px-4"
                  disabled={!selectedStatus}
                  onClick={() => {
                    if (selectedStatus) {
                      onUpdateStatus(selectedStatus as ScheduleStatusType);
                      setSelectedStatus("");
                    }
                  }}
                >
                  Update Status
                </Button>
              </>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default ScheduleHero;