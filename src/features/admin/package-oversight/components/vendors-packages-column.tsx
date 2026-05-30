import type { Column } from "@/components/table/DataTable";
import type { VendorsPackagesResponse } from "../services/api.services";
import { TableActions, type TableAction } from "@/components/table/TableActions";
import { MapPin, View, Layers, Luggage, User } from "lucide-react";
import StatusBadge from "@/features/vendor/schedule-package/components/status-badge";

export const VendorsPackagesColumns = (
  onView: (bookingId: string) => void
): Column<VendorsPackagesResponse>[] => [
  {
    key: "packageName",
    label: "Package",
    render: (packages) => (
      <div className="flex flex-col gap-1">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <Luggage className="w-4 h-4 text-indigo-500" />
          {packages.packageName}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500"/>{packages.location}, {packages.state}, {packages.totalDays} Days
        </span>
      </div>
    ),
  },
  {
    key: "vendorName",
    label: "Vendor",
    render: (packages) => (
      <div className="flex flex-col">
        <span className="font-medium text-slate-800 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          {packages.vendorName}
        </span>
      </div>
    )
  },

  {
    key: "categoryName",
    label: "Category",
    render: (packages) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            {packages.categoryName}
          </span>
        </div>
      );
    },
  },

  {
    key: "status",
    label: "Status",
    render: (packages) => (
      <div className="flex flex-col">
        <StatusBadge status={packages.status} />
      </div>
    ),
  },

  {
    key: "scheduleCount",
    label: "No. of Schedules",
    render: (packages) => (
      <div className="flex flex-col">
        <span className="font-medium text-orange-500">{packages.scheduleCount}</span>
      </div>
    ),
  },

  {
    key: "actions",
    label: "Actions",
    render: (packages) => {
      const actions: TableAction[] = [
        {
          label: "View",
          icon: <View className="w-4 h-4" />,
          variant: "success",
          onClick: () => onView(packages._id),
        },
      ];

      return <TableActions actions={actions} />;
    },
  },
];