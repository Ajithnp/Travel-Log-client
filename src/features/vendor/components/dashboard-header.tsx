import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Package } from "lucide-react";

interface DashboardHeaderProps {
  vendorName: string;
  isVerified?:boolean
  totalPackages?:number;
  liveTrips?:number;
  
}

export function DashboardHeader({vendorName,isVerified,totalPackages,liveTrips}:DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 sm:justify-between">
       
        <div className="flex flex-col gap-1">

          <h1 className="text-lg font-bold text-gray-900 leading-tight">
           {vendorName}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            {isVerified ? (
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-xs gap-1 py-0">
                <ShieldCheck className="w-3 h-3" /> KYC Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 text-xs gap-1 py-0">
                <ShieldCheck className="w-3 h-3" /> Not Verified
              </Badge>
            )}
            <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 text-xs gap-1 py-0">
              <Package className="w-3 h-3" /> {totalPackages ?? 0} active packages
            </Badge>
            {/* <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-xs gap-1 py-0">
              <Star className="w-3 h-3" /> 4.9 avg rating
            </Badge>
            <Badge variant="outline" className="text-gray-500 border-gray-200 bg-gray-50 text-xs gap-1 py-0">
              <CalendarDays className="w-3 h-3" /> Tuesday, Jun 09 2026
            </Badge> */}
          </div>
        </div>


        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 cursor-pointer"
          >
            <span className="text-xs text-amber-600 font-medium">Pending payout</span>
            <span className="text-lg font-bold text-amber-700">₹4.9L</span>
          </motion.div> */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex flex-col items-center bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 cursor-pointer"
          >
            <span className="text-xs text-emerald-600 font-medium">Live trips</span>
            <span className="text-lg font-bold text-emerald-700">{liveTrips ?? 0}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
