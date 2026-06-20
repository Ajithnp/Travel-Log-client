import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Clock } from "lucide-react";
import { fadeUp } from "@/animation/variants";
import type { RecentBookingActivityResult } from "../services/api.services";
import { formatRelativeTime } from "@/utils/format-time-to-ampm";

interface DashboardRecentBookingsProps {
  recentBookings: RecentBookingActivityResult[];
}

export const AVATAR_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
];

export function DashboardRecentBookings({ recentBookings }: DashboardRecentBookingsProps) {
  return (
    <motion.div
      custom={8}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Recent Bookings
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -mr-2 gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-1">
          {recentBookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Avatar className="w-9 h-9 flex-shrink-0">
                <AvatarFallback className={`${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold`}>
                  {booking.userName.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-900 truncate">{booking.userName}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs py-0 px-1.5 border-0 font-medium ${
                      booking.status === "confirmed"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-red-50 text-red-500"
                    }`}
                  >
                    {booking.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {booking.packageTitle} · {new Date(booking.startDate).toDateString().split(' ')[1] + ' ' + new Date(booking.startDate).toDateString().split(' ')[2]} · {booking.groupType} · {booking.travellerCount} traveler{booking.travellerCount > 1 ? "s" : ""}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-gray-900">{booking.finalAmount}</p>
                <div className="flex items-center gap-1 justify-end text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{formatRelativeTime(booking.createdAt.toString())}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
