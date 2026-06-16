import type { Column } from "@/components/table/DataTable";
import { Calendar, Eye, IndianRupee, Rotate3D, User } from "lucide-react";
import type { FindAllPayoutsResponseDto } from "../services/api.services";
import { formatDateRange } from "@/utils/combine-date-formater";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { formatISODate } from "@/utils/iso-date-format";

export const PayoutHistoryColumns = (
    onPayoutViewAction: (id: string) => void,
    onRetryAction: (id: string) => void,
): Column<FindAllPayoutsResponseDto>[] => [
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
      key: "scheduledAt",
      label: "SCHEDULED AT",
      render: (payout) => (
        <div className="flex flex-col">
          <span className="font-medium text-primary-500 flex items-center gap-2">
            <Calendar className="w-3 h-3 text-emerald-600" />
            {formatISODate(payout.scheduledAt.toString())}
          </span>
        </div>
      ),
    },

    {
      key: "status",
      label: "STATUS",
      render: (schedule) => {
        let statusText = '';
        let textColor = '';
        let bgColor = '';
        let dotColor = '';

        switch (schedule.status) {
          case 'pending':
            statusText = 'Pending';
            textColor = 'text-amber-700';
            bgColor = 'bg-amber-100/80';
            dotColor = 'bg-amber-500';
            break;
          case 'processing':
            statusText = 'Processing';
            textColor = 'text-blue-700';
            bgColor = 'bg-blue-100/80';
            dotColor = 'bg-blue-500';
            break;
          case 'completed':
            statusText = 'Completed';
            textColor = 'text-green-700';
            bgColor = 'bg-green-100/80';
            dotColor = 'bg-green-500';
            break;
          case 'failed':
            statusText = 'Failed';
            textColor = 'text-red-700';
            bgColor = 'bg-red-100/80';
            dotColor = 'bg-red-500';
            break;
          default:
            statusText = schedule.status;
            textColor = 'text-gray-700';
            bgColor = 'bg-gray-100/80';
            dotColor = 'bg-gray-500';
        }

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
          label: "View",
          icon: 
          <Eye className="w-4 h-4" />,
          
          onClick: () => onPayoutViewAction(schedule.scheduleId),
        },
        {
          label: "Retry",
          icon: 
          <Rotate3D className="w-4 h-4" />,
        //   variant:"success",
          onClick: () => onRetryAction(schedule.id),
          show:schedule.status === "failed",
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
  ];