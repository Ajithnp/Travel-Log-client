import type { Column } from "@/components/table/DataTable";
import type { IUser } from "@/types/IUser";
import { motion } from "framer-motion";
import { TableActions } from "@/components/table/TableActions";
import { Ban, Check, Eye } from "lucide-react";
import type { IVendorInfo } from "@/types/IVendorInfo";

export const userColumns = (
  handleOpenDialog: (id: string, type: "block" | "unblock") => void
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
            : "bg-yellow-200 text-success border border-success/20"
        }`}
      >
        {user.isBlocked ? "Blocked" : "Active"}
      </motion.div>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    render: (user) => (
      <TableActions
        row={user}
        actions={[
          {
            label: user.isBlocked ? "Unblock" : "Block",
            icon: user.isBlocked ? (
              <Check className="w-4 h-4" />
            ) : (
              <Ban className="w-4 h-4" />
            ),
            variant: user.isBlocked ? "success" : "danger",
            onClick: () =>
              handleOpenDialog(user.id, user.isBlocked ? "unblock" : "block"),
          },
        ]}
      />
    ),
  },
];

export const vendorColumns = (
  handleOpenDialog: (id: string, type: "block" | "unblock") => void
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
          user.isBlocked === false
            ? "bg-yellow-200 text-success border border-success/20"
            : "bg-destructive/10 text-destructive border border-destructive/20"
        }`}
      >
        {user.isBlocked ? "Block" : "Active"}
      </motion.div>
    ),
  },

  {
    key: "actions",
    label: "Actions",
    render: (user) => (
      <TableActions<IUser>
        row={user}
        actions={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onClick: () => {
              // setSelectedVendor(row);
              // setVendorDetailsOpen(true)
            },
          },
          {
            label: user.isBlocked ? "Unblock" : "Block",
            icon: user.isBlocked ? (
              <Check className="w-4 h-4" />
            ) : (
              <Ban className="w-4 h-4" />
            ),
            variant: user.isBlocked ? "success" : "danger",
            onClick: () =>
              handleOpenDialog(user.id, user.isBlocked ? "unblock" : "block"),
          },
        ]}
      />
    ),
  },
];

export const vendorsVerificationColumns = (
    handleOpenDialog: (id: string, type: "reject" | "approve") => void,
    handleViewVendor: (vendor: IVendorInfo) => void
): Column<IVendorInfo>[] => [
  {
    key: "profileLogo",
    label: "Profile",
    render: (user) => (
      <img
        src={user.profileLogo}
        alt={user.name}
        className="w-10 h-10 rounded-full object-cover shadow-card"
      />
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
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          user.status === "Pending"
            ? "bg-yellow-200 text-success border border-success/20"
            : "bg-destructive/10 text-destructive border border-destructive/20"
        }`}
      >
        {user.status}
      </motion.div>
    ),
  },

  {
    key: "actions",
    label: "Actions",
    render: (user) => (
      <TableActions
        row={user}
        actions={[
          {
            label: "View",
            icon: <Eye className="h-4 w-4" />,
            onClick: () => handleViewVendor(user)
          },
          {
            label: "Accept",
            icon: <Check />,
            variant: "success",
            onClick: () => handleOpenDialog(user.id, "approve"),
          },
          {
            label: "Reject",
            icon: <Ban />,
            variant: "danger",
            onClick: () => handleOpenDialog(user.id, "reject"),
          },
        ]}
      />
    ),
  },
];


