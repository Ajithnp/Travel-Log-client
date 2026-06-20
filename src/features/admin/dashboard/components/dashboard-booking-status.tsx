import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { fadeUp } from "@/animation/variants";

export interface BookingStatusItem {
  label: string;
  count: number;
  color: string;
  pct: number;
}

interface DashboardBookingStatusProps {
  bookingStatus: BookingStatusItem[];
}



export function DashboardBookingStatus({ bookingStatus }: DashboardBookingStatusProps) {
  return (
    <motion.div
      custom={9}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-2 px-5 pt-5">
          <CardTitle className="text-base font-semibold text-gray-900">Booking Status</CardTitle>
          <p className="text-xs text-gray-400">This month · 393 total</p>
        </CardHeader>
        <CardContent className="px-5 pb-5 space-y-4">
          {bookingStatus.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.07 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-xs text-gray-600 font-medium">{s.label}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">{s.count}</span>
              </div>
              <Progress
                value={s.pct * 2.5}
                className="h-1.5 bg-gray-100"
                style={{ ["--progress-foreground" as string]: s.color }}
              />
            </motion.div>
          ))}

          <Separator className="bg-gray-100" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-500">Payment success rate</span>
            </div>
            <span className="text-sm font-bold text-emerald-600">94.2%</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
