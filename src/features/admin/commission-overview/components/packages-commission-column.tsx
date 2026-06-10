import { Luggage, User, IndianRupee } from "lucide-react";
import type { Column } from "@/components/table/DataTable";
import type { CommissionOverviewByPackages } from "../services/api.services";

export const PackagesCommissionColumns = (
): Column<CommissionOverviewByPackages>[] => [
    {
      key: "packageName",
      label: "Packages",
      render: (packages) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <Luggage className="w-4 h-4 text-indigo-500" />
            {packages.packageName}
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
            <User className="w-4 h-4 text-indigo-500" />
            {packages.vendorName}
          </span>
        </div>
      )
    },

    {
      key: "totalScedule",
      label: "Total Schedules",
      render: (packages) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium text-slate-800 flex items-center gap-2">
              {packages.totalScedule}
            </span>
          </div>
        );
      },
    },

   {
      key: "totalBookings",
      label: "Total Bookings",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            {packages.totalBookings}
          </span>
        </div>
      ),
    },

    {
      key: "totalGrossAmount",
      label: "Gross Amount",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.totalGrossAmount}
          </span>
        </div>
      ),
    },

    {
      key: "totalPlatformCommission",
      label: "Platform Commission (15%)",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.totalPlatformCommission}
          </span>
        </div>
      ),
    },
    {
      key: "totalVendorEarnings",
      label: "Vendor Earnings",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.totalVendorEarnings}
          </span>
        </div>
      ),
    },
  ];