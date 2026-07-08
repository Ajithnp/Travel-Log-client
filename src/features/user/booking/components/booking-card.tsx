import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, Eye, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingListItem, BookingStatus } from "../types";
import { FALLBACK_STATUS, STATUS_CONFIG } from "../constants";
import { formatDateRange } from "@/utils/combine-date-formater";
import { canRetryPayment } from "@/utils/booking/retry-payment-validator";
import { useRetryPayment } from "../hooks/retry-payment";

export default function BookingCard({
  booking,
  index,
  onClick,
}: {
  booking: BookingListItem;
  index: number;
  onClick: () => void;
}) {
  const { retryPayment, isLoading: isRetryLoading } = useRetryPayment();

  const handleRetry = () => {
    retryPayment(booking._id);
  }

  const cfg = getStatusConfig(booking.bookingStatus);
  const Icon = cfg.icon;

  const startDate = booking.scheduleId?.startDate || '';
  const endDate = booking.scheduleId?.endDate || '';

  const showRetry = canRetryPayment(
    booking.paymentStatus,
    booking.bookingStatus,
    new Date(booking.createdAt),
    new Date(startDate?.toString())
  )

  return (
    <motion.div
      key={booking._id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 rounded-xl border border-gray-100 bg-white hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-50/60 transition-all duration-200"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center text-2xl flex-shrink-0">
        {"🧳"}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="text-md font-semibold text-gray-900 truncate">
            {booking.packageId.title}
          </h3>
          <Badge
            className={`text-xs font-semibold px-2 py-0.5 border ${cfg.bg} ${cfg.color} ${cfg.border}`}
          >
            <Icon className="w-5 h-5 mr-1 inline-block text-md" />
            {cfg.label}
          </Badge>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
          <span className="flex items-center text-sm gap-1">
            <MapPin className="w-3 h-3 text-red-500" />
            {booking.packageId.location}, {booking.packageId.state}
          </span>
          <span className="flex items-center gap-1 text-sm">
            <Calendar className="w-3 h-3 text-black" />
            {startDate && endDate
              ? formatDateRange(startDate, endDate)
              : "Date unavailable"}

          </span>
          <span className="flex items-center gap-1 text-sm">
            <Users className="w-3 h-3 text-orange-500" />
            {booking.travelerCount} Adults
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-3 sm:gap-2 flex-shrink-0 w-full sm:w-auto">

        <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-0.5">
          <div className="flex items-center gap-1.5">
            <p className="text-sm text-gray-600 font-semibold">Total:</p>
            <p className="text-sm font-bold text-gray-900">
              ₹ {booking.grossAmount}
            </p>
          </div>
          <p className="text-xs text-gray-400">
            ID:
            <span className="ml-1 font-mono text-gray-500">{booking.bookingCode}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {showRetry && (
            <Button
              onClick={handleRetry}
              className="h-8 flex-1 sm:flex-none px-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700
                         text-white text-xs font-semibold rounded-md whitespace-nowrap
                         transition-colors duration-150 disabled:opacity-50"
            >
              ⚡ {isRetryLoading ? "Processing..." : "Retry Payment"}
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors flex-shrink-0"
            onClick={onClick}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            View
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function getStatusConfig(status: BookingStatus | string) {
  return STATUS_CONFIG[status as BookingStatus] ?? FALLBACK_STATUS;
}
