import { motion } from "framer-motion";
import {
  Calendar,
  Copy,
  Gauge,
  Sun,
  Tag,
  Users,
} from "lucide-react";
import type { PackageDTO, ScheduleDTO } from "../../types";
import { formatDateRange } from "@/utils/combine-date-formater";
import { Link } from "react-router-dom";
import { formatISODate } from "@/utils/iso-date-format";
import { StarRating } from "@/components/common/start-rating";

interface DetailsHeroCardProps {
  basePackage: PackageDTO;
  schedule: ScheduleDTO;
  totalAmount: number;
  travelersCount: number;
  bookingCode: string;
  bookedDate:string;
}

const DetailsHeroCard = ({
  basePackage,
  schedule,
  totalAmount,
  travelersCount,
  bookingCode,
  bookedDate
}: DetailsHeroCardProps) => {
  const startDate = schedule?.startDate;
  const endDate = schedule?.endDate;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
      className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm"
    >
      <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400" />
      <div className="p-5 sm:p-6">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0">
            🧳
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold">
                {basePackage?.title}
              </h1>
            </div>
            <p className="text-md text-gray-700 mb-2">
              {basePackage?.location}, {basePackage?.state}  <div className="flex items-center gap-1"> <StarRating rating={basePackage?.averageRating ||0} size={"sm"} /> <span className="text-xs text-gray-400">{basePackage?.totalReviews ||0} reviews</span></div>
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-5 h-4 text-red-400" />
                {startDate && endDate
                  ? formatDateRange(startDate, endDate)
                  : "Date unavailable"}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Users className="w-5 h-4 text-blue-500" />
                {travelersCount} Travelers
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Sun className="w-5 h-4 text-orange-500" />
                {basePackage?.days} Days {basePackage?.nights} Nights
              </span>
            </div>
          </div>
          <div className="sm:text-right flex-shrink-0">
            <p className="text-sm font-semibold text-gray-500 mb-0.5">
              Total Paid
            </p>
            <p className="text-2xl font-bold text-gray-900">₹ {totalAmount}</p>
            <div className="flex items-center sm:justify-end gap-1.5 mt-1">
              <p className="flex items-center gap-1 text-sm font-semibold text-indigo-500 hover:text-indigo-700 font-mono transition-colors">
                {bookingCode}
                <Copy className="w-2.5 h-2.5" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[10px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {basePackage?.category?.name}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-medium bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">
              <Gauge className="w-3 h-3" />
              {basePackage?.difficultyLevel}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-medium bg-green-100 text-green-600 px-2.5 py-1 rounded-full">
              <Calendar className="w-3 h-3" />
              Booked on {formatISODate(bookedDate)}
            </span>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Link
              to={`/package/${basePackage?.id}`}
              className="flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-full hover:bg-amber-100 transition"
            >
              More package details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsHeroCard;
