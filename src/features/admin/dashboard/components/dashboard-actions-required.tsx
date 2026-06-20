import { fadeUp } from "@/animation/variants";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { ElementType } from "react";

export interface ActionItem {
  id: number;
  title: string;
  desc?: string;
  count: number;
  icon: ElementType;
  bg: string;
  border: string;
  iconBg: string;
  countColor: string;
}

interface DashboardActionsRequiredProps {
  actionItems: ActionItem[];
}



export function DashboardActionsRequired({ actionItems }: DashboardActionsRequiredProps) {
  return (
    <motion.div
      custom={10}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Action Required</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {actionItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              className={`${item.bg} ${item.border} border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition-shadow hover:shadow-sm`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
              <span className={`text-2xl font-bold flex-shrink-0 ${item.countColor}`}>{item.count}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
