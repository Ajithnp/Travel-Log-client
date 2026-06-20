import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { fadeUp } from "@/animation/variants";

export interface PlatformHealthItem {
  label: string;
  value: string;
  color: string;
  good: boolean | null;
}

interface DashboardPlatformHealthProps {
  platformHealth: PlatformHealthItem[];
}


export function DashboardPlatformHealth({ platformHealth }: DashboardPlatformHealthProps) {
  return (
    <motion.div
      custom={12}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-3 px-5 pt-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              Platform Health
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-4 space-y-0">
          {platformHealth.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-2">
                {item.good === true && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />}
                {item.good === false && <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />}
                {item.good === null && <div className="w-1.5 h-1.5 rounded-full bg-gray-300 flex-shrink-0" />}
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
              <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
