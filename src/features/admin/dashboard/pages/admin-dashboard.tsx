import { useState } from "react";
import {
    Users,
    Store,
    Package,
    CalendarDays,
    Wallet,
    BookOpen,
    CreditCard,
    RefreshCcw,
    ShieldCheck,
    XCircle,
    Flag,
    Banknote,
} from "lucide-react";
import { useAdminDashboardActionsRequiredQuery, useAdminDashboardRevanueTrendQuery, useAdminDashboardSummaryQuery, useAdminDashboardTopPerformersQuery } from "../hooks/api.hooks";
import type { ChartFilters } from "@/features/vendor/hooks/api.hooks";
import { DashboardHeader } from "../components/dashboard-header";
import { DashboardStatCards } from "../components/dashboard-stat-cards";
import { AdminDashboardRevenueChart } from "../components/dashboard-revenue-chart";
import { DashboardBookingStatus } from "../components/dashboard-booking-status";
import { DashboardActionsRequired } from "../components/dashboard-actions-required";
import { DashboardTopPackages } from "../components/dashboard-top-packages";
import { DashboardPlatformHealth } from "../components/dashboard-platform-health";
import { DashboardTopVendors } from "../components/dashboard-top-vendors";
import type { PeriodKey } from "@/features/vendor/components/dashboard-revenue-chart";
import { formatAmount } from "@/utils/format-amount";





export default function AdminDashboard() {

    const [filters, setFilters] = useState<ChartFilters>({ period: 'week' });

    const summaryQuery = useAdminDashboardSummaryQuery();
    const revanueQuery = useAdminDashboardRevanueTrendQuery(filters);
    const topPerformersQuery = useAdminDashboardTopPerformersQuery();
    const actionsRequiredQuery = useAdminDashboardActionsRequiredQuery();


    const top5Vendors = topPerformersQuery.data?.data?.top5Vendors || [];
    const top5Packages = topPerformersQuery.data?.data?.top5Packages || [];
    const actionsRequired = actionsRequiredQuery.data?.data;
    const summary = summaryQuery.data?.data;
    const revanueChart = revanueQuery.data?.data;

    const actionItems = [
        {
            id: 1,
            title: "Pending Refunds",
            desc: "Pending cancellation requests",
            count: actionsRequired?.pendingCancellationRequests ?? 0,
            icon: RefreshCcw,
            bg: "bg-red-50",
            border: "border-red-200",
            iconBg: "bg-red-100 text-red-500",
            countColor: "text-red-500",
        },
        {
            id: 2,
            title: "KYC Verifications",
            desc: "Pending vendor verifications",
            count: actionsRequired?.pendingVendorVerifications ?? 0,
            icon: ShieldCheck,
            bg: "bg-amber-50",
            border: "border-amber-200",
            iconBg: "bg-amber-100 text-amber-600",
            countColor: "text-amber-600",
        },
        {
            id: 3,
            title: "Failed Payouts",
            desc: "Failed payout requests due to technical issues",
            count: actionsRequired?.failedPayouts ?? 0,
            icon: XCircle,
            bg: "bg-orange-50",
            border: "border-orange-200",
            iconBg: "bg-orange-100 text-orange-500",
            countColor: "text-orange-500",
        },
        {
            id: 4,
            title: "Pending Payouts",
            desc: "Pending payout requests , ready to payout",
            count: actionsRequired?.pendingPayouts ?? 0,
            icon: Flag,
            bg: "bg-purple-50",
            border: "border-purple-200",
            iconBg: "bg-purple-100 text-purple-500",
            countColor: "text-purple-500",
        },
    ];

    const statCards = [
        {
            label: "Total Registered Users",
            value: summary?.totalUsers?.toLocaleString() || '0',
            icon: Users,
            accent: "#3b82f6",
            iconBg: "bg-blue-50 text-blue-600",
        },
        {
            label: "Active Vendors",
            value: summary?.totalVendors?.toLocaleString() || '0',
            icon: Store,
            accent: "#10b981",
            iconBg: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Live Packages",
            value: summary?.activePackages?.toLocaleString() || '0',
            icon: Package,
            accent: "#f59e0b",
            iconBg: "bg-amber-50 text-amber-600",
        },
        {
            label: "Active Schedules",
            value: summary?.activeSchedules?.toLocaleString() || '0',
            icon: CalendarDays,
            accent: "#a855f7",
            iconBg: "bg-purple-50 text-purple-600",
        },
        {
            label: "Total Gross Revenue",
            value: summary?.totalRevenue ? formatAmount(Number(summary.totalRevenue)) : '0',
            icon: Wallet,
            accent: "#10b981",
            iconBg: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Total Bookings",
            value: summary?.totalBookings?.toLocaleString() || '0',
            icon: BookOpen,
            accent: "#3b82f6",
            iconBg: "bg-blue-50 text-blue-600",
        },
        {
            label: "Total Schedules Completed",
            value: summary?.totalScheduleCompleted?.toLocaleString() || '0',
            icon: Banknote,
            accent: "#f97316",
            iconBg: "bg-orange-50 text-orange-600",
        },
        {
            label: "Total Vendor Earnings",
            value: summary?.totalVendorEarnings ? formatAmount(Number(summary.totalVendorEarnings)) : '0',
            icon: CreditCard,
            accent: "#ef4444",
            iconBg: "bg-red-50 text-red-500",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <DashboardHeader />

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">
                <DashboardStatCards statCards={statCards} />

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="xl:col-span-3">
                        <AdminDashboardRevenueChart
                            chartData={revanueChart?.trend || []}
                            granularity={revanueChart?.granularity}
                            activePeriod={filters.period}
                            customStart={filters.customStart}
                            customEnd={filters.customEnd}
                            isLoading={revanueQuery.isLoading}
                            onPeriodChange={(period: PeriodKey) =>
                                setFilters({ ...filters, period })
                            }
                            onCustomRange={(start: Date, end: Date) =>
                                setFilters({ ...filters, period: 'custom', customStart: start, customEnd: end })
                            }
                        />
                    </div>
                    {/* <DashboardBookingStatus bookingStatus={bookingStatus} /> */}
                </div>

                <DashboardActionsRequired actionItems={actionItems} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <DashboardTopPackages packages={top5Packages} />
                    {/* <DashboardPlatformHealth platformHealth={platformHealth} /> */}
                    <DashboardTopVendors topVendors={top5Vendors} />
                </div>
            </main>
        </div>
    );
}
