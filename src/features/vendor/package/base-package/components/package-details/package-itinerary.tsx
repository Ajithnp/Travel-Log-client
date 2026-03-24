import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import {activitySchema } from "../../validations/base-package-schema";
import type z from "zod";

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
        <h2 className="section-title font-semibold text-lg">DAY-WISE  ITINERARY</h2>
        <span className="text-medium font-semibold text-muted-foreground">{totalDays} days</span>
      </div>

      <div className="space-y-3">
        {itinerary.map((day) => {
          const isOpen = openDays.includes(Number(day.dayNumber));
          return (
            <div key={day.dayNumber} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(Number(day.dayNumber))}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {day.dayNumber}
                  </span>
                  <span className="font-medium text-medium text-foreground">{day.title}</span>
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
                    {day.activities?.map((act, i) => (
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

function ActivityRow({ activity }: { activity: Partial<Activity> }) {
  const [isSpecialsOpen, setIsSpecialsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="text-sm font-medium shrink-0 w-[72px]">
          <span className="text-orange-500">{activity.startTime}</span>
          <span className="text-muted-foreground"> –</span>
          <br />
          <span className="text-muted-foreground">{activity.endTime}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-snug">
            {activity.title}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
            {activity.description}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {activity.location && (
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3 text-orange-800 shrink-0" />
                {activity.location}
              </span>
            )}
            {activity.included ? (
              <span className="text-xs text-success font-medium">✓ Included</span>
            ) : (
              <span className="text-xs text-destructive font-medium">✗ Not included</span>
            )}
          </div>
        </div>
      </div>
      {activity.specials && activity.specials.length > 0 && (
        <div className="sm:w-[140px] shrink-0 self-start">
          <button
            onClick={() => setIsSpecialsOpen((prev) => !prev)}
            className="flex items-center justify-between gap-1 w-full text-sm font-semibold text-foreground hover:text-orange-500 transition-colors"
          >
            <span>Activities</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                isSpecialsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-200 ease-in-out ${
              isSpecialsOpen ? "grid-rows-[1fr] opacity-100 mt-1.5" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="space-y-1">
                {activity.specials.map((special, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-1.5 text-sm text-orange-500"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    {special}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}