import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingStatus } from "../../types";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "../booking-card";
import { useNavigate } from "react-router-dom";

interface DetailsNavProps {
  status: BookingStatus;
}
const DetailsNav = ({ status }: DetailsNavProps) => {
  const navigate = useNavigate();
  const cfg = getStatusConfig(status);
  const Icon = cfg.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        <button
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => navigate("/user/bookings")}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">My Bookings</span>
        </button>
        <div className="flex items-center gap-1.5">
          <Badge
            className={`flex items-center text-[13px] font-semibold px-2.5 py-1 border ${cfg.bg} ${cfg.color} ${cfg.border}`}
          >
            <Icon className="w-3 h-3 mr-1" />
            {cfg.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs border-gray-200 text-gray-500 gap-1.5 hover:bg-gray-50"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </Button>
          <Button
            size="sm"
            className="h-8 px-3 text-xs bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsNav;
