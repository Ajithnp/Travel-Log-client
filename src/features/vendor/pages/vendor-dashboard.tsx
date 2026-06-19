import { useState, useMemo } from "react";
import {
  Wallet,
  Map,
  XCircle,
  Users,
  Star,
  Package,
} from "lucide-react";
import { useVendorDashboardAnalyticsQuery, useVendorDashboardRecentActivityQuery, useVendorDashboardSummaryQuery, type ChartFilters } from "../hooks/api.hooks";
import { formatAmount } from "@/utils/format-amount";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStatCards, type StatCard } from "../components/dashboard-stat-cards";
import { DashboardRevenueChart,  type PeriodKey } from "../components/dashboard-revenue-chart";
import { DashboardTopPackages } from "../components/dashboard-top-packages";
import { DashboardRecentBookings,} from "../components/dashboard-recent-bookings";
import { DashboardUpcomingSchedules } from "../components/dashboard-upcoming-schedules";
import { useAuthUser } from "@/hooks/useAuthUser";

export default function VendorDashboard() {

  const [filters, setFilters] = useState<ChartFilters>({ period: '7d' });
  
  const {user} = useAuthUser();

  const summaryQuery = useVendorDashboardSummaryQuery();
  const analyticsQuery = useVendorDashboardAnalyticsQuery(filters);
  const recentActivityQuery = useVendorDashboardRecentActivityQuery();

  const summary = summaryQuery.data?.data;
  const analytics = analyticsQuery.data?.data;
  const recentActivity = recentActivityQuery.data?.data;

  const chartData = useMemo(() => analytics?.trend ?? [], [analytics]);

  const handlePeriodChange = (period: PeriodKey) => {
    setFilters(period === 'custom' ? { period } : { period });
  };
 
  const handleCustomRange = (start: Date, end: Date) => {
    setFilters({ period: 'custom', customStart: start, customEnd: end });
  };


  const statCards = useMemo<StatCard[]>(() => [
    {
      label: "Total Revenue (All Time)",
      value: summary ? `₹${formatAmount(summary.revanueStats.totalRevanue)}` : "—",
      sub: summary
        ? `${summary.revanueStats.hasGrowth ? "+" : ""}₹${formatAmount(summary.revanueStats.currentMonthRevanue)} this month`
        : "Loading...",
      trend: summary?.revanueStats.hasGrowth ? "up" : "neutral",
      icon: Wallet,
      accent: "#10b981",
      iconBg: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Bookings",
      value: summary ? String(summary.totalBookings) : "—",
      sub: "Confirmed & completed",
      trend: "up",
      icon: Users,
      accent: "#3b82f6",
      iconBg: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published Packages",
      value: summary ? String(summary.totalPackages) : "—",
      sub: "Active packages",
      trend: "neutral",
      icon: Package,
      accent: "#a855f7",
      iconBg: "bg-purple-50 text-purple-600",
    },
    {
      label: "Active Trips",
      value: summary ? String(summary.scheduleStats.activeSchedule) : "—",
      sub: summary
        ? `${summary.scheduleStats.ongoingSchedule} ongoing · ${summary.scheduleStats.totalSchedule} total`
        : "Loading...",
      trend: summary && summary.scheduleStats.activeSchedule > 0 ? "up" : "neutral",
      icon: Map,
      accent: "#f59e0b",
      iconBg: "bg-amber-50 text-amber-600",
    },
    {
      label: "Total Trips Completed",
      value: summary?.scheduleStats? String(summary.scheduleStats.totalSchedule):"-",
      sub: summary
        ? `${summary.scheduleStats.ongoingSchedule} ongoing · ${summary.scheduleStats.totalSchedule} total`
        : "Loading...",
      trend: "up",
      icon: Star,
      accent: "#f97316",
      iconBg: "bg-orange-50 text-orange-600",
    },
    {
      label: "Total Blogs",
      value: "1",
      sub: "Below 3-cancellation flag threshold",
      trend: "neutral",
      icon: XCircle,
      accent: "#ef4444",
      iconBg: "bg-red-50 text-red-500",
    },
  ], [summary]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <DashboardHeader 
        vendorName = {user?.name ?? "Vendor"}
         isVerified = {true}
         totalPackages = {summary?.totalPackages ?? 0}
         liveTrips = {summary?.scheduleStats.activeSchedule ?? 0}
        
      />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        <DashboardStatCards statCards={statCards} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <DashboardRevenueChart
            chartData={chartData}
            granularity={analytics?.granularity}
            activePeriod={filters.period}
            customStart={filters.customStart}
            customEnd={filters.customEnd}
            onPeriodChange={handlePeriodChange}
            onCustomRange={handleCustomRange}
            isLoading={analyticsQuery.isLoading}
          />
          <DashboardTopPackages 
          topPackages={analytics?.bookingsByPackage ?? []}
          currentMonthRevanue={summary?.revanueStats.currentMonthRevanue ?? 0}
          previousMonthRevanue={summary?.revanueStats.previousMonthRevanue ?? 0}
           />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <DashboardRecentBookings recentBookings={recentActivity?.bookings ?? []} />
          <DashboardUpcomingSchedules upcomingSchedules={recentActivity?.schedules ?? []} />
        </div>
      </main>
    </div>
  );
}
