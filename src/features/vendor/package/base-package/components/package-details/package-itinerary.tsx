import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
// import type { ItineraryDay, Activity } from "@/types/package";
import { itineraryDaySchema, activitySchema } from "../../validations/base-package-schema";
import type z from "zod";
import { typeLabel } from "@/lib/constants/ui/mapping-ui";
// export type ItineraryDay = z.infer<typeof itineraryDaySchema>;
export type Activity = z.infer<typeof activitySchema>;
import { draftItineraryDaySchema } from "../../validations/draft-base-package-schema";
export type ItineraryDay = z.infer<typeof draftItineraryDaySchema>;

interface PackageItineraryProps {
  itinerary?: ItineraryDay[];
  totalDays?: string;
}

export function PackageItinerary({ itinerary, totalDays }: PackageItineraryProps) {
  const [openDays, setOpenDays] = useState<number[]>([1]);
  if (!itinerary?.length) return null;

  const toggle = (day: number) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="bg-card rounded-xl border animate-fade-up p-6 shadow-premium" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title font-semibold">Day-wise Itinerary</h2>
        <span className="text-sm text-muted-foreground">{totalDays} days</span>
      </div>

      <div className="space-y-3">
        {itinerary.map((day) => {
          const isOpen = openDays.includes(day.dayNumber);
          return (
            <div key={day.dayNumber} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(day.dayNumber)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {day.dayNumber}
                  </span>
                  <span className="font-medium text-sm text-foreground">{day.title}</span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 space-y-3 border-t pt-3">
                    {day.activities.map((act, i) => (
                      <ActivityRow key={i} activity={act} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="text-xs text-secondary font-medium mt-0.5 w-[72px] shrink-0">
          <span className="text-orange-500">{activity.startTime}</span>
          <span className="text-muted-foreground"> – <br /> {activity.endTime}</span>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{activity.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
          <div className="flex items-center gap-3 mt-1">
            {activity.location && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {activity.location}
              </span>
            )}
            {activity.included && (
              <span className="text-xs text-success font-medium">✓ Included</span>
            )}
            {!activity.included && (
              <span className="text-xs text-destructive font-medium">✗ Not included</span>
            )}
          </div>
        </div>
      </div>
      <span className="bg-purple-100 text-orange-500 rounded-xl text-xs px-1.5 font-semibold">
        {typeLabel[activity.type]}
      </span>
    </div>
  );
}