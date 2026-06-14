import type { Column } from "@/components/table/DataTable";
import type { PayoutScheduleListResponseDto } from "../services/api.services";
import { Clock, IndianRupee, User } from "lucide-react";
import { formatDateRange } from "@/utils/combine-date-formater";
import { TableActions, type TableAction } from "@/components/table/TableActions";

export const PayoutSchedulesColumns = (
    onPayoutAction: (id: string) => void,
): Column<PayoutScheduleListResponseDto>[] => [
    {
      key: "vendorname",
      label: "VENDOR",
      render: (vendors) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            {vendors.vendorname}
          </span>
        </div>
      ),
    },
    {
      key: "scheduleId",
      label: "SCHEDULE",
      render: (schedule) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            {formatDateRange(schedule.scheduleStartDate, schedule.scheduleEndDate)}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            {schedule.packageTittle}
          </span>
        </div>
      )
    },


    {
      key: "grossAmount",
      label: "GROSS",
      render: (schedule) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary-500 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {schedule.grossAmount}
          </span>
        </div>
      ),
    },

    {
      key: "commissionAmount",
      label: "PLATFORM COMMISSION (15%)",
      render: (schedule) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary-500 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {schedule.commissionAmount}
          </span>
        </div>
      ),
    },
    {
      key: "netAmount",
      label: "NET PAYABLE",
      render: (schedule) => (
        <div className="flex flex-col">
          <span className="font-medium text-orange-500 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {schedule.netAmount}
          </span>
        </div>
      ),
    },

    {
      key: "status",
      label: "STATUS",
      render: (schedule) => {
        const isReady = schedule.readyToPayout;
        const statusText = isReady ? 'Ready to pay' : 'Upcoming';
        const textColor = isReady ? 'text-green-700' : 'text-orange-700';
        const bgColor = isReady ? 'bg-green-100/80' : 'bg-orange-100/80';
        const dotColor = isReady ? 'bg-green-500' : 'bg-orange-500';

        return (
          <div className="flex flex-col">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${textColor} ${bgColor}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
              {statusText}
            </span>
          </div>
        );
      },
    },

      {
    key: "actions",
    label: "Actions",
    render: (schedule) => {
      const actions: TableAction[] = [
        {
          label: "Pay",
          icon:
            schedule.readyToPayout ? (
              <IndianRupee className="w-4 h-4" />
            ) : (
              <Clock className="w-4 h-4" />
            ),
          disabled: !schedule.readyToPayout,
          variant:"success",
          onClick: () => onPayoutAction(schedule.id),
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
  ];