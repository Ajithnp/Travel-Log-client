import { Card, CardContent } from "@/components/ui/card";
import type { ScheduleResponse } from "../types/types";


interface SeatAvailabilityCardProps {
    schedule: ScheduleResponse;
}
const SeatAvailabilityCard = ({
  schedule,
}: SeatAvailabilityCardProps) => {

  const seatPercent = Math.round((schedule?.seatsBooked / schedule?.totalSeats) * 100);
  const seatsRemaining = schedule?.totalSeats - schedule?.seatsBooked;
  return (
    <Card className="animate-[fade-in_0.6s_ease-out] shadow-premium">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-heading font-bold text-foreground">
            Seats OverView
          </h3>

          <span
            className={`text-sm font-heading font-semibold ${
              seatPercent >= 80 ? "text-destructive" : "text-success"
            }`}
          >
            {seatPercent}% filled
          </span>
        </div>

        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-5">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              seatPercent >= 100
                ? "bg-destructive"
                : seatPercent >= 80
                ? "bg-gradient-to-r from-success to-warning"
                : "bg-success"
            }`}
            style={{ width: `${seatPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {schedule.totalSeats}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>

          <div>
            <p className="text-2xl font-heading font-bold text-orange-400">
              {schedule.seatsBooked}
            </p>
            <p className="text-xs text-muted-foreground">Booked</p>
          </div>

          <div>
            <p className="text-2xl font-heading font-bold text-success">
              {seatsRemaining}
            </p>
            <p className="text-xs text-muted-foreground">Balance</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatAvailabilityCard;