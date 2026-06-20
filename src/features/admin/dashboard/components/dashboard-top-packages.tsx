import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fadeUp } from "@/animation/variants";
import type { TopPerfomingPackagesResult } from "../services/api.service";
import { AVATAR_COLORS } from "@/features/vendor/components/dashboard-recent-bookings";



interface DashboardTopPackagesProps {
  packages: TopPerfomingPackagesResult[];
}



export function DashboardTopPackages({ packages }: DashboardTopPackagesProps) {
  return (
    <motion.div
      custom={11}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              TOP PERFORMING PACKAGES
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 -mr-2 gap-1">
              {/* View All <ChevronRight className="w-3 h-3" /> */}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-1">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.packageId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.06 }}
              className="flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className={`${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white text-xs font-bold`}>
                  {pkg.packageTitle?.charAt(0).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{pkg.packageTitle}</p>
                <p className="text-xs text-gray-400 truncate">
                  Total Schedule Completed : {pkg.totalScheduleCompleted}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-blue-600">₹{pkg.revanueGenerate}</p>
                {/* <div className="flex items-center gap-1 justify-end text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{b.time}</span>
                </div> */}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
