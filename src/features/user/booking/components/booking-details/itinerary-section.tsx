import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import SectionCard from "./section-card";
import type { ItineraryDayDTO } from "../../types";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";

interface ItinerarySectionProps {
  itinerary: ItineraryDayDTO[];
}

const ItinerarySection = ({ itinerary }: ItinerarySectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.16 }}
    >
      <SectionCard title="Itinerary" icon={Calendar} defaultOpen={false}>
        <div className="space-y-6">
          {itinerary?.map((day) => (
            <div key={day.dayNumber} className="relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-300 to-violet-200" />

              {/* Day header */}
              <div className="mb-3">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white ring-2 ring-indigo-200" />

                <p className="text-xs font-bold text-indigo-500 uppercase">
                  Day {day.dayNumber}
                </p>

                {day.title && (
                  <p className="text-sm font-semibold text-gray-800">
                    {day.title}
                  </p>
                )}
              </div>

              {/* Activities */}
              <div className="space-y-3 ml-2">
                {day.activities?.map((activity, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-gray-100 bg-gray-50"
                  >
                    {/* Title */}
                    {activity.title && (
                      <p className="text-sm font-semibold text-gray-800">
                        {activity.title}
                      </p>
                    )}

                    {/* Time + Location */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                      {(activity.startTime || activity.endTime) && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-orange-600" />
                          {activity.startTime
                            ? formatTimeToAMPM(activity.startTime)
                            : "--"}{" "}
                          -{" "}
                          {activity.endTime
                            ? formatTimeToAMPM(activity.endTime)
                            : "--"}
                        </span>
                      )}

                      {activity.location && (
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3 text-red-400" />
                          {activity.location}
                        </span>
                      )}
                    </div>

                    {/* Specials*/}
                    {activity.specials && activity.specials.length > 0 && (
                      <div className="mt-2">
                        <p className="flex items-center gap-1 text-xs uppercase text-gray-400 mb-1 font-semibold tracking-wide">
                          <Sparkles className="w-3 h-3 text-indigo-400 " />
                          Highlights
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {activity.specials.map((special, i) => (
                            <span
                              key={i}
                              className="text-[12px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 font-medium"
                            >
                              {special}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {activity.description && (
                      <p className="text-[13px] text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    )}

                    {/* Included badge */}
                    <div className="mt-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          activity.included
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {activity.included ? "Included" : "Optional"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </motion.div>
  );
};

export default ItinerarySection;
