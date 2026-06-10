import { Luggage, Layers, MapPin, User, View, Currency, IndianRupee } from "lucide-react";
import type { CommissionOverviewByVendors } from "../services/api.services";
import type { Column } from "@/components/table/DataTable";

export const VendorsCommissionColumns = (
): Column<CommissionOverviewByVendors>[] => [
    {
      key: "vendorName",
      label: "vendors",
      render: (vendors) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <User className="w-4 h-4 text-indigo-500" />
            {vendors.vendorName}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-2">
            <Luggage className="w-3 h-3 text-red-500" />{vendors.totalPackages} Packages
          </span>
        </div>
      ),
    },
    {
      key: "totalCompletedSchedules",
      label: "Schedules Done",
      render: (vendors) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            {vendors.totalCompletedSchedules}
          </span>
        </div>
      )
    },

    {
      key: "totalBookings",
      label: "Total Bookings",
      render: (vendors) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium text-slate-800 flex items-center gap-2">
              {vendors.totalBookings}
            </span>
          </div>
        );
      },
    },

    {
      key: "totalGrossAmount",
      label: "Gross Amount",
      render: (vendors) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {vendors.totalGrossAmount}
          </span>
        </div>
      ),
    },

    {
      key: "totalPlatformCommission",
      label: "Platform Commission (15%)",
      render: (vendors) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {vendors.totalPlatformCommission}
          </span>
        </div>
      ),
    },
    {
      key: "totalVendorEarnings",
      label: "Vendor Earnings",
      render: (vendors) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {vendors.totalVendorEarnings}
          </span>
        </div>
      ),
    },
  ];