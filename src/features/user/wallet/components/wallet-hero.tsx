import { motion } from "framer-motion";
import {
  ArrowUpRight, ArrowDownLeft, Gift,
  TrendingUp, TrendingDown, Clock, type LucideIcon
} from "lucide-react";

function StatCard({
  label, value, sub, trend, icon: Icon, accent,
}: {
  label: string; value: string; sub: string;
  trend?: "up" | "down"; icon: LucideIcon; accent: string;
}) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-xl border bg-white p-4
        space-y-2 shadow-sm
        ${accent} shadow-premium
      `}
    >
      {/* <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-500" /> */}

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400 font-medium">
          {label}
        </p>

        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-gray-50">
          <Icon className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      <p className="text-xl font-bold text-gray-900 tracking-tight">
        {value}
      </p>

      <div className="flex items-center gap-1">
        {trend === "up" && (
          <TrendingUp className="w-3 h-3 text-emerald-500" />
        )}

        {trend === "down" && (
          <TrendingDown className="w-3 h-3 text-rose-400" />
        )}

        <p className="text-[11px] text-gray-400">
          {sub}
        </p>
      </div>
    </div>
  );
}

interface WalletHeroProps {
  totalBalance: number;
  totalIn: number;
  totalOut: number;
  totalReward:number;
}

export default function WalletHero({ totalBalance, totalIn, totalOut,totalReward }: WalletHeroProps) {

  return (
    <>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5"
      >
        <StatCard label="Available Balance" value={`₹ ${totalBalance.toLocaleString()}`} sub="" icon={Clock} accent="border-gray-100" />
        <StatCard label="Total In" value={`₹ ${totalIn.toLocaleString()}`} sub="" trend="up" icon={ArrowDownLeft} accent="border-gray-100" />
        <StatCard label="Total Out" value={`₹ ${totalOut.toLocaleString()}`} sub="" trend="down" icon={ArrowUpRight} accent="border-gray-100" />
        <StatCard label="Rewards" value={`₹ ${totalReward.toLocaleString()}`} sub="" trend="up" icon={Gift} accent="border-gray-100" />
      </motion.div>
    </>
  );
}
