import type { Column } from "@/components/table/DataTable";
import type { ScheduleBookingDetailDTO } from "../services/api.services";
import StatusBadge from "../../schedule-package/components/status-badge";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { View } from "lucide-react";
import { format } from "date-fns";


const paymentStatusColor: Record<string, string> = {
  pending: "bg-red-500",
  completed: "bg-green-500",
  partial: "bg-yellow-500",
  failed: "bg-destructive",
  refunded: "bg-orange-500",
  cancelled: "bg-orange-500",
  pending_review: "bg-blue-500",
  hold: "bg-yellow-500",
  expired: "bg-orange-500",
};

export const ScheduleBookingColumns = (
  onView: (bookingId: string) => void
): Column<ScheduleBookingDetailDTO>[] => [
  {
    key: "username",
    label: "Traveller / Booking",
    render: (booking) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">
          {booking.username}
        </span>
        <span className="text-xs text-muted-foreground">
          {booking.bookingCode}
        </span>
      </div>
    ),
  },
  {
    key: "groupType",
    label: "Group Type",
    render: (booking) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800">
          {booking.groupType} - {booking.travallersCount}
        </span>
        </div>
    )
  },

  {
    key: "bookedOn",
    label: "Booked On",
    render: (booking) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">{format(new Date(booking.bookedOn), "dd/MMM/yy - hh:mm a")}</span>
        </div>
      );
    },
  },

  {
    key: "paymentStatus",
    label: "Payment Status",
    render: (booking) => (
      <div className="flex flex-col">
        <StatusBadge status={booking.paymentStatus} />
      </div>
    ),
  },

  {
    key: "bookingStatus",
    label: "BookingStatus",
    render: (booking) => (
      <div className="flex flex-col">
        <StatusBadge status={booking.bookingStatus} />
      </div>
    ),
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
          onClick: () => onView(schedule.id),
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
];