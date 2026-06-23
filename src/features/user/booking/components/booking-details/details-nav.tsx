import { motion } from "framer-motion";
import { ArrowLeft, Download, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingStatus, CancelStatus } from "../../types";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "../booking-card";
import { useNavigate } from "react-router-dom";
import { BOOKING_STATUS } from "../../constants";

interface DetailsNavProps {
  status: BookingStatus;
  cancelationStatus: CancelStatus | null;
  canCancel: boolean;
  lastDate: Date | null;
  openCancelModal: () => void;
  downloadTicket: () => void;
  showReviewModal: () => void;
  isDownloading: boolean;
  hasReviwed: boolean;
}
const getCancelStatusStyle = (status: CancelStatus) => {
  switch (status) {
    case "pending":
      return "border-yellow-200 bg-yellow-50 text-yellow-700";
    case "approved":
      return "border-green-200 bg-green-50 text-green-700";
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700";
  }
};

const DetailsNav = ({ status, openCancelModal, cancelationStatus, canCancel, downloadTicket, showReviewModal, isDownloading, hasReviwed }: DetailsNavProps) => {
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
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
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

          {status === BOOKING_STATUS.COMPLETED && !hasReviwed && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-yellow-200 text-yellow-500 gap-1.5 hover:bg-yellow-50 hover:text-yellow-700"
              onClick={() => showReviewModal()}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Give a Feedback
            </Button>
          )}

          {cancelationStatus ? (
            <Badge
              className={`flex items-center text-[13px] font-semibold px-2.5 py-1 border ${getCancelStatusStyle(cancelationStatus)}`}
            >
              <Icon className="w-3 h-3 mr-1" />
              {cancelationStatus === "pending"
                ? "REQUESTED TO CANCEL"
                : `CANCELLATION REQUEST: ${cancelationStatus.toUpperCase()}`}
            </Badge>
          ) : status === "confirmed" ? (
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-red-200 text-red-500 gap-1.5 hover:bg-red-500 hover:text-white"
              disabled={!canCancel}
              onClick={openCancelModal}
            >
              <X className="w-3.5 h-3.5" /> Cancel Booking
            </Button>
          ) : null}
          {status === BOOKING_STATUS.CONFIRMED && (
            <Button
              size="sm"
              className="h-8 px-3 text-xs bg-indigo-500 hover:bg-indigo-600 text-white border-0 gap-1.5"
              onClick={downloadTicket}
              disabled={isDownloading}
            >
              <Download className="w-3.5 h-3.5" /> {isDownloading ? "Downloading..." : "Download Ticket"}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsNav;
