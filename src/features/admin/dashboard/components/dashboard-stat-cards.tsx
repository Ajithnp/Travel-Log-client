import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ElementType } from "react";
import { fadeUp } from "@/animation/variants";

export interface StatCard {
  label: string;
  value: string;
  sub?: string;
  trend?: string;
  icon: ElementType;
  accent: string;
  iconBg: string;
}

interface DashboardStatCardsProps {
  statCards: StatCard[];
}


export function DashboardStatCards({ statCards }: DashboardStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-white border-gray-200 hover:shadow-md hover:border-gray-300 transition-all overflow-hidden relative">
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: card.accent }}
              />
              <CardContent className="pt-5 pb-4 px-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-2 truncate">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
                    <div className="flex items-center gap-1">
                      {card.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-500 flex-shrink-0" />}
                      {card.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500 flex-shrink-0" />}
                      <p className={`text-xs truncate ${
                        card.trend === "up" ? "text-emerald-600"
                        : card.trend === "down" ? "text-red-500"
                        : "text-gray-400"
                      }`}>
                        {card.sub}
                      </p>
                    </div>
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-2 ${card.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
