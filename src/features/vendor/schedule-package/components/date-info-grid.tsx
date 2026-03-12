import { CheckSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ScheduleResponse } from "../types/types";
import { format } from "date-fns";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";

type DateInfoGridProps = {
  schedule: ScheduleResponse;
};

const DateInfoGrid = ({ schedule }: DateInfoGridProps) => {
  const startDate = schedule?.startDate ? new Date(schedule.startDate) : null;
  const endDate = schedule?.endDate ? new Date(schedule.endDate) : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-[fade-in_0.6s_ease-out]">
      <InfoCard
        label="START DATE"
        value={startDate ? format(startDate, "dd MMM yyyy") : "-"}
        sub={startDate ? format(startDate, "EEEE") : "-"}
        color="text-blue-500"
      />

      <InfoCard
        label="END DATE"
        value={endDate ? format(endDate, "dd MMM yyyy") : "-"}
        sub={endDate ? format(endDate, "EEEE") : "-"}
        color="text-blue-500"
      />

      <InfoCard
        label="REPORTING TIME"
        value={formatTimeToAMPM(schedule.reportingTime)}
        sub={
          <span className="inline-flex items-center gap-1 text-success text-xs">
            <CheckSquare className="w-3 h-3" />
          </span>
        }
        color="text-blue-500"
      />
    </div>
  );
};

const InfoCard = ({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: React.ReactNode;
  color: string;
}) => (
  <Card>
    <CardContent className="p-4 sm:p-5 shadow-premium">
      <p
        className={`text-sm font-semibold font-heading uppercase ${color} mb-2`}
      >
        {label}
      </p>
      <p className="text-base sm:text-lg font-heading font-bold text-foreground">
        {value}
      </p>
      <div className="text-sm text-muted-foreground mt-1">{sub}</div>
    </CardContent>
  </Card>
);

export default DateInfoGrid;
