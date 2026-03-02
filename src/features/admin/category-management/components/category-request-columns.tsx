import {
  TableActions,
  type TableAction,
} from "@/components/table/TableActions";
import type { CategoryRequestResponse } from "../types/response.dtos";
import type { Column } from "@/components/table/DataTable";
import { motion } from "framer-motion";
import { Ban, Check } from "lucide-react";
import type{ ReviewType } from "../pages/vendor-request-category";

type CategoryActionHandler = (
  id: string,
  name: string,
  type: ReviewType,
) => void;

export const categoryRequestColumns = (
  onCategoryAction: CategoryActionHandler,
): Column<CategoryRequestResponse>[] => [
  {
    key: "name",
    label: "",
    render: (category) => (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-card text-white font-semibold bg-gradient-to-br from-yellow-500 to-pink-500">
        {category.name?.[0]?.toUpperCase()}
      </div>
    ),
  },
  {
    key: "name",
    label: "Requested Category",
    render: (category) => (
      <span className="font-semibold text-slate-800 tracking-tight">
        {category.name}
      </span>
    ),
  },
  {
    key: "requested",
    label: "Vendor",
    render: (category) =>
      category.requested ? (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800">
            {category.requested.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {category.requested.email}
          </span>
        </div>
      ) : (
        <span className="text-muted-foreground italic">—</span>
      ),
  },
  { key: "vendorNote", label: "Reason/Note" },
  { key: "date", label: "Date" },
  {
    key: "status",
    label: "Status",
    render: (category) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${"bg-orange-100 text-orange-500 border border-orange-300"}`}
      >
        {category.status}
      </motion.div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (category) => {
      const actions: TableAction[] = [
        {
          label: "Approve",
          icon: <Check className="w-4 h-4" />,
          variant: category.status ? "success" : "danger",
          onClick: () =>
            onCategoryAction(category.id, category.name, "approve"),
        },
        {
          label: "Reject",
          icon: <Ban className="w-4 h-4" />,
          variant: category.status ? "success" : "danger",
          onClick: () => onCategoryAction(category.id, category.name, "rejected"),
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
];
