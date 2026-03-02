
import type{ Column } from "@/components/table/DataTable";
import { motion } from "framer-motion"; 
import type { CategoryRequestReviewedResponse } from "../types/response.dtos";


export const CategoryRequestReviewedColumns = (

): Column<CategoryRequestReviewedResponse>[] => [
  {
    key: "name",
    label: "",
    render: (cat) => (
      <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-card text-white font-semibold bg-gradient-to-r from-blue-500 to-green-500">
        {cat.name?.[0]?.toUpperCase()}
      </div>
    ),
  },
    {
    key: "name",
    label: "Requested Category",
    render: (cat) => (
      <span className="font-semibold text-slate-800 tracking-tight">
        {cat.name}
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
        { key: "adminNote", label: "AdminNote" },
   { key: "updatedDate", label: "Resolved" },
  {
    key: "status",
    label: "Status",
    render: (cat) => (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          cat.status === 'rejected'
            ? "bg-destructive/10 text-destructive border border-destructive/20"
            : "bg-green-200 text-green-700 border border-green-300" 
        }`}
      >
        {cat.status === 'active' ? "Approved" : "Rejected"}
      </motion.div>
    ),
  },
];