import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fadeUp } from "@/animation/variants";
import { calculateGrowth } from "@/utils/calculateGrowth";

export interface TopPackage {
  packageTitle: string;
  bookingCount: number;
}

interface DashboardTopPackagesProps {
  topPackages: TopPackage[];
  currentMonthRevanue:number;
  previousMonthRevanue:number;
}

const COLORS = [
  "#10b981",
  "#334155",
  "#3b82f6",
  "#a855f7",
  "#f59e0b"
];

export function DashboardTopPackages({ topPackages, currentMonthRevanue, previousMonthRevanue }: DashboardTopPackagesProps) {

  const {percentage,trend} = calculateGrowth(currentMonthRevanue, previousMonthRevanue);

  return (
    <motion.div
      custom={7}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-2 px-5 pt-5">
          <CardTitle className="text-base font-semibold text-gray-900">Top Packages</CardTitle>
          <p className="text-xs text-gray-400">By booking count (all time)</p>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-4">
          {topPackages.map((pkg, i) => (
            <motion.div
              key={pkg.packageTitle}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-700 truncate max-w-[130px]">{pkg.packageTitle}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900">{pkg.bookingCount}</span>
              </div>
              <Progress
                value={pkg.bookingCount}
                className="h-1.5 bg-gray-100"
                style={{ ["--progress-foreground" as string]: COLORS[i % COLORS.length] }}
              />
            </motion.div>
          ))}

          <Separator className="bg-gray-100 my-3" />

          <div>
            <p className="text-xs text-gray-400 mb-1">Revenue this month</p>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-gray-900">₹{currentMonthRevanue}</span>
              <div className={`flex items-center gap-1 text-xs font-semibold ${
                trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-600" : "text-gray-500"
              }`}>
                {trend === "up" && <TrendingUp className="w-3.5 h-3.5" />}
                {trend === "down" && <TrendingDown className="w-3.5 h-3.5" />}
                {percentage}%
                <span className="text-gray-400 font-normal">vs last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
