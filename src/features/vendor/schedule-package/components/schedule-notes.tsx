import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare } from "lucide-react";
import type { ScheduleResponse } from "../types/types";
type ScheduleNotesCardProps = {
    schedule: ScheduleResponse
}
const ScheduleNotesCard = ({ schedule }: ScheduleNotesCardProps) => {
  return (
    <Card className="animate-[fade-in_0.75s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-heading font-bold text-foreground">
            Schedule Notes
          </h3>

          <span className="inline-flex items-center gap-1 text-success text-xs">
            <CheckSquare className="w-3 h-3" />
          </span>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {schedule.notes}
        </p>
      </CardContent>
    </Card>
  );
};

export default ScheduleNotesCard;