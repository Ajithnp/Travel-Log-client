import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ScheduleResponse } from "../types/types";

type CancelledCardProps = {
  schedule: ScheduleResponse;
};

const CancelledCard = ({ schedule }: CancelledCardProps) => {
  return (
    <Card className="mt-6 border-destructive/30 animate-[fade-in_0.8s_ease-out]">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="p-2 bg-destructive/10 rounded-sm shrink-0">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold text-destructive">
              Schedule Cancelled
            </h3>

            <p className="text-sm text-foreground">
              This schedule has been cancelled and all bookings have been
              processed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CancellationInfoCard
            label="Cancellation Reason"
            value={schedule.cancellationReason ?? ""}
            fullWidth
          />

          {schedule.cancelledAt && (
            <CancellationInfoCard
              label="Cancelled On"
              value={new Date(schedule.cancelledAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              )}
              isAmount
            />
          )}

          {schedule.cancelledBookings !== null && (
            <CancellationInfoCard
              label="Cancelled Bookings"
              value={`${schedule.cancelledBookings} bookings`}
              isAmount
            />
          )}

          {schedule.totalRefunded !== null && (
            <CancellationInfoCard
              label="Total Refunded"
              value={`₹${schedule.totalRefunded.toLocaleString("en-IN")}`}
              isAmount
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CancelledCard;

const CancellationInfoCard = ({
  label,
  value,
  fullWidth,
  isAmount,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
  isAmount?: boolean;
}) => (
  <div
    className={`${fullWidth ? "sm:col-span-2 lg:col-span-4" : ""} p-4 bg-muted rounded-sm`}
  >
    <p className="text-xs font-heading uppercase text-muted-foreground mb-1">
      {label}
    </p>
    <p
      className={`text-sm sm:text-base font-heading font-semibold ${isAmount ? "text-destructive" : "text-foreground"}`}
    >
      {value}
    </p>
  </div>
);
