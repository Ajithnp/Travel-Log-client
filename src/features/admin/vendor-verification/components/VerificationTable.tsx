// userColumns.tsx
import type { Column } from "@/components/table/DataTable";
import { Ban, Check, Eye } from "lucide-react";
import { motion } from "framer-motion";
import {
  TableActions,
  type TableAction,
} from "@/components/table/TableActions";
import type { IVendorInfo } from "@/types/IVendorInfo";

type VendorActionHandler = (id: string, type: "reject" | "approve") => void;
type VendorViewActionHandler = (vendor: IVendorInfo) => void;

export const VendorVerificationColumns = (
  onUserAction: VendorActionHandler,
  onViewAction: VendorViewActionHandler
): Column<IVendorInfo>[] => [
    {
      key: "profileLogo",
      label: "Profile",
      render: (user) => (
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-card text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500">
          {user.name?.[0]?.toUpperCase()}
        </div>
      ),
    },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "createdAt", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${user.status === "Pending"
              ? "bg-yellow-100 text-yellow-700 border-yellow-300"
              : user.status === "Approved"
                ? "bg-green-100 text-green-700 border-green-300"
                : user.status === "Rejected"
                  ? "bg-red-100 text-red-700 border-red-300"
                  : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
        >
          {user.status}
        </motion.div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user) => {
        const actions: TableAction[] = [
          {
            label: "View",
            icon: <Eye className="w-4 h-4" />,
            onClick: () => onViewAction(user),
            variant: "primary",
          },
          
          {
            label: "Accept",
            icon: <Check />,
            variant: "success",
            show:user.status === 'Pending',
            onClick: () => onUserAction(user.id, "approve"),
          },
          {
            label: "Reject",
            icon: <Ban />,
            variant: "danger",
            show:user.status === 'Pending',
            onClick: () => onUserAction(user.id, "reject"),
          },
        ];

        return <TableActions actions={actions} />;
      },
    },
  ];
