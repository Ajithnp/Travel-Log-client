import type { Column } from "@/components/table/DataTable";
import {View, XCircle } from "lucide-react";
import {
  TableActions,
  type TableAction,
} from "@/components/table/TableActions";
import type { ScheduleListItemResponse } from "../types/types";
import { formatTripDateRange } from "@/utils/format-trip-date";
import { formatTimeToAMPM } from "@/utils/format-time-to-ampm";
import Bar from "@/components/shared/bar";
import StatusBadge from "./status-badge";

const seatColor: Record<string, string> = {
  upcoming: "bg-success",
  ongoing: "bg-blue-500",
  completed: "bg-yellow-500",
  cancelled: "bg-orange-500",
  sold_out: "bg-destructive",
};

export const ScheduleColumns = (): Column<ScheduleListItemResponse>[] => [
  {
    key: "packageTittle",
    label: "Package",
    render: (schedule) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">
          {schedule.packageTitle}
        </span>
        <span className="text-xs text-muted-foreground">
          {schedule.packageDays} Days {schedule.difficultyLevel}
        </span>
      </div>
    ),
  },
  {
    key: "startDate",
    label: "Dates",
    render: (schedule) => {
      const { range, year } = formatTripDateRange(
        schedule.startDate,
        schedule.endDate,
      );

      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{range}</span>
          <span className="text-xs text-muted-foreground">{year}</span>
        </div>
      );
    },
  },

  {
    key: "reportingTime",
    label: "Reporting",
    render: (schedule) => {
      const time = formatTimeToAMPM(schedule.reportingTime);

      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{time}</span>
          <span className="text-xs text-muted-foreground">
            {schedule.reportingLocation}
          </span>
        </div>
      );
    },
  },

  {
    key: "soloPricing",
    label: "Pricing(SOLO)",
    render: (schedule) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">
          {schedule.soloPricing}
        </span>
        <span className="text-xs text-muted-foreground">per head</span>
      </div>
    ),
  },

  {
    key: "",
    label: "SEATS",
    render: (schedule) => (
      <div className="flex flex-col">
        <Bar
          filled={schedule.seatsBooked}
          total={schedule.totalSeats}
          color={
            seatColor[schedule.status.toLowerCase()] ?? "bg-muted-foreground"
          }
        />
      </div>
    ),
  },

  {
    key: "status",
    label: "Status",
    render: (schedule) => <StatusBadge status={schedule.status} />,
  },
  {
    key: "actions",
    label: "Actions",
    render: (schedule) => {
      const actions: TableAction[] = [
        {
          label: "View",
          icon: <View className="w-4 h-4" />,
          variant: "success",
          onClick: () => schedule.packageId,
        },
        {
          label: "Cancel Trip",
          icon: <XCircle className="w-4 h-4" />,
          onClick: () => console.log("Edit user", schedule.scheduleId),
          variant: "primary",
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
];
