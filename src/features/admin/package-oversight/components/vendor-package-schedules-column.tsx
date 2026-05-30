import type { Column } from "@/components/table/DataTable";
import type { SchedulesResponseDTO } from "../services/api.services";
import { Calendar, IndianRupee, Luggage, MapPin, User } from "lucide-react";
import { formatDateRange } from "@/utils/combine-date-formater";
import StatusBadge from "@/features/vendor/schedule-package/components/status-badge";
import Bar from "@/components/shared/bar";
import { seatColor } from "@/features/vendor/schedule-package/components/schedules-column";

export const VendorPackageSchedulesColumns = (): Column<SchedulesResponseDTO>[] => [
  {
    key: "packageTittle",
    label: "Package",
    render: (packages) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <Luggage className="w-4 h-4 text-indigo-500" />
          {packages.packageTittle}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500"/>{packages.packageLocation}, {packages.totalDays} Days
        </span>
      </div>
    ),
  },
  {
    key: "vendorName",
    label: "Vendor",
    render: (packages) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          {packages.vendorName}
        </span>
      </div>
    )
  },

  {
    key: "startDate",
    label: "Date",
    render: (schedule) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-500" />
           {formatDateRange(schedule.startDate.toString(), schedule.endDate.toString())}
          </span>
        </div>
      );
    },
  },

  {
    key: "totalSeats",
    label: "Seats",
    render: (schedule) => (
      <div className="flex flex-col">
        <Bar
          filled={schedule.totalBooked}
          total={schedule.totalSeats}
          color={
            seatColor[schedule.status.toLowerCase()] ?? "bg-muted-foreground"
          }
        />
      </div>
    ),
  },
    {
    key: "totalRevanue",
    label: "Revenue",
    render: (schedule) => (
      <div className="flex flex-col">
        <span className="font-medium text-orange-500 flex items-center gap-1">
          <IndianRupee className="w-4 h-4 text-emerald-600" />
          {schedule.totalRevanue}
        </span>
      </div>
    ),
  },

  {
    key: "status",
    label: "Status",
    render: (packages) => (
      <div className="flex flex-col">
        <StatusBadge status={packages.status} />
      </div>
    ),
  },
];