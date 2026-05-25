import { motion } from "framer-motion";
import type { Column } from "@/components/table/DataTable";
import { Eye} from "lucide-react";
import type { CancellationRequestRsponse } from "../services/api.service";
import { CANCELATION_STATUS } from "../types/constants";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { formatDate } from "date-fns";


type UserViewActionHandler = (bookingId:string) => void;

export const CancellationColumns = (
  onViewAction: UserViewActionHandler,
): Column<CancellationRequestRsponse>[] => [

    { key: "packageTittle", label: "Package" },
    { key: "userName", label: "User" },
    { key: "bookingCode", label: "Booking Code" },
    { key: "cancelationRefundAmount", label: "Refund Amount",      render: (booking) => (
        <span className="tracking-tight text-red-600 ">
          ₹{booking.cancelationRefundAmount}
        </span>
      ), },
    { key: "finalAmount", label: "Final Amount",      render: (booking) => (
        <span className="tracking-tight text-green-600 ">
          ₹{booking.finalAmount}
        </span>
      ), },
    { key: "updatedAt" , label: "Date", render: (booking) => (
      <span className="tracking-tight ">
        {formatDate(booking.updatedAt,'dd/MM/yyyy')}
      </span>
    ), },
    {
      key: "cancellationStatus",
      label: "Status",
      render: (cancelBooking) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${cancelBooking.cancellationStatus === CANCELATION_STATUS.PENDING
              ? "bg-yellow-100 text-yellow-700 border-yellow-300"
              : cancelBooking.cancellationStatus === CANCELATION_STATUS.APPROVED
                ? "bg-green-100 text-green-700 border-green-300"
                : cancelBooking.cancellationStatus === CANCELATION_STATUS.REJECTED
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          {cancelBooking.cancellationStatus}
        </motion.div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (cancelBooking) => {
        const actions: TableAction[] = [
          {
            label: "View Details",
            icon: <Eye className="w-4 h-4" />,
            onClick: () => onViewAction(cancelBooking._id),
            variant: "primary",
          },
        ];

        return <TableActions actions={actions} />;
      },
    },
  ];