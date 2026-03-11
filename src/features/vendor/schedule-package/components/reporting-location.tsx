import { Card, CardContent } from "@/components/ui/card";
import type { ScheduleResponse } from "../types/types";

type ReportingLocationCardProps = {
    schedule: ScheduleResponse
}
const ReportingLocationCard = ({ schedule }:ReportingLocationCardProps ) => {
  return (
    <Card className="animate-[fade-in_0.65s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6">
        <p className="text-sm font-semibold font-heading uppercase text-blue-500 mb-2">
          REPORTING LOCATION
        </p>

        <p className="text-base sm:text-lg font-heading font-semibold text-foreground">
          {schedule.reportingLocation}
        </p>

      </CardContent>
    </Card>
  );
};

export default ReportingLocationCard;