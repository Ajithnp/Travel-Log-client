import { Luggage, IndianRupee, MapPin } from "lucide-react";
import type { Column } from "@/components/table/DataTable";
import type { PackagesEarningsByVendor } from "../services/api.services";

export const PackagesCommissionColumns = (
): Column<PackagesEarningsByVendor>[] => [
    {
      key: "title",
      label: "Packages",
      render: (packages) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <Luggage className="w-4 h-4 text-indigo-500"/>
            {packages.title}
          </span>
          <span className="text-xs text-muted-foreground flex  gap-2">
            <MapPin className="w-3 h-3 text-rose-500"/>
            {packages.location}
          </span>
        </div>
      ),
    },
    {
      key: "totalScheduled",
      label: "Schedules Done",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            {packages.totalScheduled}
          </span>
        </div>
      )
    },

    {
      key: "totalBookings",
      label: "Total Bookings",
      render: (packages) => {
        return (
          <div className="flex flex-col">
            <span className="font-medium text-slate-800 flex items-center gap-2">
              {packages.totalBookings}
            </span>
          </div>
        );
      },
    },

    {
      key: "totalRevenue",
      label: "Gross Amount",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.totalRevenue}
          </span>
        </div>
      ),
    },

    {
      key: "totalCommission",
      label: "Platform Commission (15%)",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.totalCommission}
          </span>
        </div>
      ),
    },
    {
      key: "netEarnings",
      label: "Vendor Earnings",
      render: (packages) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-800 flex items-center gap-2">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            {packages.netEarnings}
          </span>
        </div>
      ),
    },
  ];