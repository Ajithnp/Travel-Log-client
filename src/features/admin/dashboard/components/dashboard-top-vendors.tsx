import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, BadgePercent } from "lucide-react";
import { fadeUp } from "@/animation/variants";
import { AVATAR_COLORS } from "@/features/vendor/components/dashboard-recent-bookings";
import type { TopPerformingVendorsResult } from "../services/api.service";
import { formatAmount } from "@/utils/format-amount";

interface DashboardTopVendorsProps {
  topVendors:TopPerformingVendorsResult[];
}


export function DashboardTopVendors({ topVendors }: DashboardTopVendorsProps) {
  return (
    <motion.div
      custom={13}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                Top Vendors
              </CardTitle>
            </div>
            <span className="text-xs text-gray-400">By revenue over time</span>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-1">
          {topVendors.map((v, i) => (
            <motion.div
              key={v.vendorId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.07 }}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {/* <span className="text-xs font-bold text-gray-300 w-4 text-center flex-shrink-0">
                {v.rank}
              </span> */}
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={`${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold`}>
                  {v.vendorName?.charAt(0)?.toLocaleUpperCase() || '?'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{v.vendorName}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <BadgePercent className="w-3 h-3 text-emerald-500" />
                <span className="text-sm font-bold text-emerald-600">{formatAmount(v.totalRevenue)}</span>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
