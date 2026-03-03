import type { Column } from "@/components/table/DataTable";
import { motion } from "framer-motion";
import type { VendorRequestedCategoryResponse } from "../types/types";
import { statusStyles, statusLabel } from "@/lib/constants/ui/mapping-ui";

export const RequestedCalegoryColumns =
  (): Column<VendorRequestedCategoryResponse>[] => [
    {
      key: "name",
      label: "",
      render: (cat) => (
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-card text-white font-semibold bg-gradient-to-br from-yellow-500 via-yellow-500/40 to-green-100">
          {cat.name?.[0]?.toUpperCase()}
        </div>
      ),
    },
    {
      key: "name",
      label: "Name",
      render: (cat) => (
        <span className="font-semibold text-slate-800 tracking-tight">
          {cat.name}
        </span>
      ),
    },
    { key: "note", label: "Note" },
    { key: "adminNote", label: "AdminNote" },
    { key: "createdAt", label: "RequestedDate" },
    {
      key: "status",
      label: "Status",
      render: (cat) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusStyles[cat.status] ||
            "bg-gray-100 text-gray-600 border border-gray-200"
          }`}
        >
          {statusLabel[cat.status] || "Unknown"}
        </motion.div>
      ),
    },
  ];
