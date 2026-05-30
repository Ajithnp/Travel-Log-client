import type { Column } from "@/components/table/DataTable";
import type { PackageScheduleResponseDTO} from "../services/api.services";
import { Calendar, IndianRupee, User } from "lucide-react";
import StatusBadge from "@/features/vendor/schedule-package/components/status-badge";
import { formatDateRange } from "@/utils/combine-date-formater";

export const VendorsPackageDetailsColumns = (
): Column<PackageScheduleResponseDTO>[] => [
  {
    key: "packageName",
    label: "Dates",
    render: (schedule) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-500" />
          {formatDateRange(schedule.startDate.toString(), schedule.endDate.toString())}
        </span>
      </div>
    ),
  },
  {
    key: "totalSeats",
    label: "Total Seats",
    render: (schedule) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-orange-600" />
          {schedule.totalSeats}
        </span>
      </div>
    )
  },

  {
    key: "bookingsCount",
    label: "Bookings",
    render: (schedule) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            {schedule.bookingsCount}
          </span>
        </div>
      );
    },
  },

  {
    key: "totalRevanue",
    label: "Revanue",
    render: (schedule) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-green-600" />
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