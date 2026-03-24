import { Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Schedule } from "@/types/booking.types";
import { formatDateRange } from "@/utils/combine-date-formater";

function lowestPricePerHead(schedule: Schedule): number {
  return Math.min(
    ...schedule.pricing.map((p) => Math.round(p.price / p.peopleCount)),
  );
}

interface Step1ScheduleProps {
  schedules: Schedule[];
  selectedSchedule: Schedule | null;
  onSelect: (schedule: Schedule) => void;
  onContinue: () => void;
}

export function Step1Schedule({
  schedules,
  selectedSchedule,
  onSelect,
  onContinue,
}: Step1ScheduleProps) {
  return (
    <Card className="border border-gray-200 shadow-sm rounded-2xl overflow-hidden shadow-premium">
      <div className="mx-4 mt-4 mb-3 px-4 py-3 rounded-xl bg-foreground/70 border border-primary/20 space-y-1.5">
        <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">
          Book your slot
        </p>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-card">Select a Date</h2>

          <span className="text-xs font-medium text-gray-600 bg-card px-2 py-1 rounded-md shrink-0">
            {schedules.length} batches
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="px-5 pb-5 pt-2 space-y-3">
        {schedules.map((schedule) => {
          const isSoldOut = schedule.status === "sold_out";
          const isSelected =
            selectedSchedule?.scheduleId === schedule.scheduleId;
          const dateRange = formatDateRange(schedule.startDate, schedule.endDate);
          const priceFrom = lowestPricePerHead(schedule);

          return (
            <button
              key={schedule.scheduleId}
              disabled={isSoldOut}
              onClick={() => !isSoldOut && onSelect(schedule)}
              className={`w-full text-left rounded-xl border px-4 py-3 transition-all
                ${isSoldOut
                  ? "opacity-50 cursor-not-allowed border-gray-100 bg-gray-50"
                  : "cursor-pointer hover:border-gray-400"
                }
                ${isSelected
                  ? "border-gray-400 bg-white shadow-sm"
                  : "border-gray-200 bg-white"
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* LEFT */}
                <div className="min-w-0 space-y-1">
                  <p
                    className={`font-medium truncate ${isSoldOut ? "text-gray-400" : "text-gray-900"
                      }`}
                  >
                    {dateRange}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {schedule.status === "upcoming" && (
                      <div className="flex flex-wrap items-center gap-1.5">

                        {/* Seats badge */}
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Zap className="w-3 h-3 shrink-0" />
                          <span>{schedule.seatsRemaining} seats left</span>
                        </span>

                        {/* Status badge */}
                        <span className="inline-flex items-center text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          Upcoming
                        </span>

                      </div>
                    )}

                    {schedule.status === "sold_out" && (
                      <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Sold out
                      </span>
                    )}
                  </div>
                </div>

                {/* RIGHT */}
                <div className="text-right shrink-0 space-y-0.5">
                  <p
                    className={`font-semibold ${isSoldOut ? "text-gray-400" : "text-gray-900"
                      }`}
                  >
                    ₹{priceFrom.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400">from /head</p>
                </div>
              </div>
            </button>
          );
        })}

        <Button
          className="w-full mt-4 bg-gray-600 text-white rounded-xl py-5 text-sm font-semibold
             transition-all duration-200 ease-out
           hover:bg-gray-800 hover:-translate-y-[1px] hover:shadow-md
             active:translate-y-0 active:shadow-sm
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none
             group"
          disabled={!selectedSchedule}
          onClick={onContinue}
        >
          <span className="flex items-center justify-center gap-1.5">
            Continue
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
