// userColumns.tsx
import type{ Column } from "@/components/table/DataTable";
import type { IUser } from "@/types/IUser";
import { Ban, Check } from "lucide-react";
import { motion } from "framer-motion"; 
import { TableActions, type TableAction } from "@/components/table/TableActions";

type UserActionHandler = (id: string, type: "block" | "unblock") => void;

export const UserColumns = (

    onUserAction: UserActionHandler 
    
): Column<IUser>[] => [
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
    key: "isBlocked",
    label: "Status",
    render: (user) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.isBlocked
            ? "bg-destructive/10 text-destructive border border-destructive/20"
            : "bg-green-200 text-green-700 border border-green-300" 
        }`}
      >
        {user.isBlocked ? "Blocked" : "Active"}
      </motion.div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (user) => {
      const actions: TableAction[] = [
        {
          label: user.isBlocked ? "Unblock" : "Block",
          icon: user.isBlocked ? (
            <Check className="w-4 h-4" />
          ) : (
            <Ban className="w-4 h-4" />
          ),
          variant: user.isBlocked ? "success" : "danger",
          onClick: () =>
            onUserAction(user.id, user.isBlocked ? "unblock" : "block"),
        },
        // You can add more actions here if needed, e.g., 'View Details', 'Edit User'
        // {
        //   label: "Edit",
        //   icon: <Pencil className="w-4 h-4" />,
        //   onClick: () => console.log("Edit user", user.id),
        //   variant: "primary"
        // },
      ];

      return <TableActions actions={actions} />; 
    },
  },
];