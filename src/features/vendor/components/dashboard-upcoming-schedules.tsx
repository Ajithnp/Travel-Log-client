import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronRight } from "lucide-react";
import type { UpcomingScheduleResult } from "../services/api.services";
import { fadeUp } from "@/animation/variants";

interface DashboardUpcomingSchedulesProps {
  upcomingSchedules: UpcomingScheduleResult[];
}

export function DashboardUpcomingSchedules({ upcomingSchedules }: DashboardUpcomingSchedulesProps) {
  return (
    <motion.div
      custom={9}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Upcoming Schedules
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -mr-2 gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-2">
          {upcomingSchedules.map((schedule, i) => (
            <motion.div
              key={schedule._id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.07 }}
              className={`flex items-center gap-4 p-3 rounded-xl transition-colors cursor-pointer ${
                schedule.status==="ongoing"
                  ? "bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/60"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
           
              <div className={`flex-shrink-0 w-12 text-center rounded-xl py-1.5 ${
                schedule.status ? "bg-emerald-100" : "bg-gray-100"
              }`}>
                <p className={`text-xs font-bold leading-tight ${schedule.status ? "text-emerald-600" : "text-gray-500"}`}>
                  {new Date(schedule.startDate).toDateString().split(' ')[1]}
                </p>
                <p className={`text-xl font-bold leading-tight ${schedule.status ? "text-emerald-700" : "text-gray-900"}`}>
                  {new Date(schedule.startDate).toDateString().split(' ')[2]}
                </p>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{schedule.packageTitle}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    schedule.status === "ongoing" ? "bg-emerald-500" : "bg-blue-400"
                  }`} />
                  <span className={`text-xs font-medium ${
                    schedule.status === "ongoing" ? "text-emerald-600" : "text-blue-500"
                  }`}>
                    {schedule.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    · {schedule.bookedCount}/{schedule.totalSeats} booked
                  </span>
                </div>
                <Progress
                  value={(schedule.bookedCount / schedule.totalSeats) * 100}
                  className="h-1 mt-1.5 bg-gray-200"
                />
              </div>

              <div className="text-right flex-shrink-0">

                    <p className="text-sm font-semibold text-gray-900">{schedule.bookedCount}</p>
                    <p className="text-xs text-gray-400">Seats filled</p>
              
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
