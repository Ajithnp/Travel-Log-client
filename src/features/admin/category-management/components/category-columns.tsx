// userColumns.tsx
import type { Column } from "@/components/table/DataTable";
import { Ban, Check, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import {
  TableActions,
  type TableAction,
} from "@/components/table/TableActions";
import type { ICategory } from "../types/ICategory";

type CategoryActionHandler = (
  id: string,
  name: string,
  type: "activate" | "inactivate",
) => void;

export const CategoryColumns = (
  onCategoryAction: CategoryActionHandler,
): Column<ICategory>[] => [
  {
    key: "name",
    label: "",
    render: (user) => (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-card text-white font-semibold bg-gradient-to-br from-orange-500 via-orange-500/40 to-blue-500">
        {user.name?.[0]?.toUpperCase()}
      </div>
    ),
  },
  {
    key: "name",
    label: "Name",
    render: (user) => (
      <span className="font-semibold text-slate-800 tracking-tight">
        {user.name}
      </span>
    ),
  },
  { key: "description", label: "Description" },
  {
    key: "status",
    label: "Status",
    render: (user) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === "inactive"
            ? "bg-destructive/10 text-destructive border border-destructive/20"
            : "bg-green-200 text-green-700 border border-green-300"
        }`}
      >
        {user.status === "active" ? "Avtive" : "Inactive"}
      </motion.div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (category) => {
      const actions: TableAction[] = [
        {
          label: category.status === "active" ? "Inactivate" : "Activate",
          icon:
            category.status === "inactive" ? (
              <Check className="w-4 h-4" />
            ) : (
              <Ban className="w-4 h-4" />
            ),
          variant: category.status === "active" ? "success" : "danger",
          onClick: () =>
            onCategoryAction(
              category.id,
              category.name,
              category.status === "active" ? "inactivate" : "activate",
            ),
        },
        {
          label: "Edit",
          icon: <Pencil className="w-4 h-4" />,
          onClick: () => console.log("Edit user", category.id),
          variant: "primary",
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
];
