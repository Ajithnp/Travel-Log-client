import { formatCurrentDate, getGreeting } from "@/utils/format-trip-date";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";


export function DashboardHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
      
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shadow-sm">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-500">{getGreeting()}, Admin 👋</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Platform Overview</h1>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            <span className="text-xs text-gray-400">{formatCurrentDate()}</span>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-600 font-medium">All systems operational</span>
            </div>
          </div>
        </div>

   
        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center bg-red-50 border border-red-200 rounded-xl px-3 py-1.5 cursor-pointer"
          >
            <span className="text-xs text-red-500 font-medium">Pending Refunds</span>
            <span className="text-base font-bold text-red-600">12</span>
          </motion.div> */}
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 cursor-pointer"
          >
            <span className="text-xs text-amber-600 font-medium">KYC Reviews</span>
            <span className="text-base font-bold text-amber-700">7</span>
          </motion.div> */}
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 cursor-pointer"
          >
            <span className="text-xs text-emerald-600 font-medium">Today's Revenue</span>
            <span className="text-base font-bold text-emerald-700">₹4.2L</span>
          </motion.div> */}
        </div>
      </div>
    </motion.header>
  );
}
