import { Plus } from "lucide-react";
import { useMemo } from "react";
import { FilterWithDateSort } from "@/components/shared/filter-with-date-sort";
import DataTable from "@/components/table/DataTable";
import { PageHeader } from "@/components/shared/page-header";
import TableFooter from "@/components/table/TableFooter";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { useScheduleList } from "../hooks/schedule-list";
import StatCard from "@/features/admin/category-management/components/start-card";
import type { ScheduleListItemResponse } from "../types/types";
import { ScheduleColumns } from "../components/schedules-column";
import { useNavigate } from "react-router-dom";

type FilterTab =
  | "all"
  | "upcomming"
  | "completed"
  | "ongoing"
  | "cancelled"
  | "sold_out";

export default function SchedulesListPage() {
  const navigate = useNavigate();

  const {
    activeTab,
    setActiveTab,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    page,
    setPage,
    schedules,
    states,
    totalPages,
    isLoading,
    isError,
    totalDocs,
    error,
    refetch,
  } = useScheduleList();

  const tabs = useMemo(
    () => [
      { key: "all" as FilterTab, label: "All", count: totalDocs },
      {
        key: "upcoming" as FilterTab,
        label: "Upcoming",
      },
      {
        key: "ongoing" as FilterTab,
        label: "Ongoing",
      },
      {
        key: "completed" as FilterTab,
        label: "Completed",
      },
      {
        key: "cancelled" as FilterTab,
        label: "Cancelled",
      },
      {
        key: "sold_out" as FilterTab,
        label: "Sold Out",
      },
    ],
    [states],
  );
 
  const handleViewSchedule = (scheduleId: string, packageId:string) => {
    navigate(`/vendor/schedules/${scheduleId}/${packageId}`);
};
  const columns = useMemo(() => ScheduleColumns(handleViewSchedule), []);

  if (isError && error)
    return (
      <Error
        message={error.response?.data?.message}
        code={error.response?.status}
        onRetry={refetch}
      />
    );
  if (isLoading) return <Loader message="Loading..." />;

  return (
    <div className="min-h-screen bg-gradient-premium selection:bg-foreground/10 selection:text-foreground pb-20 ">
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 py-12">
        {/* Page Header */}
        <PageHeader
          title="Schedules"
          description="Manage trip runs across all your packages."
          primaryAction={{
            label: "Add Schedule",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => navigate("/vendor/packages"),
          }}
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
          <StatCard
            label="UPCOMING"
            value={states?.upcoming ?? 0}
            subtitle="● Accepting bookings"
            color="text-success"
            accentColor="bg-success"
            delay={0.15}
          />
          <StatCard
            label="ONGOING"
            value={states?.ongoing ?? 0}
            subtitle="○ Currently running"
            color="text-blue-500"
            accentColor="bg-blue-500"
            delay={0.2}
          />
          <StatCard
            label="COMPLETED"
            value={states?.completed ?? 0}
            subtitle="● Past trips"
            color="text-yellow-500"
            accentColor="bg-yellow-500"
            delay={0.25}
          />
          <StatCard
            label="CANCELLED"
            value={states?.completed ?? 0}
            subtitle="● Refunds issued"
            color="text-red-500"
            accentColor="bg-destructive"
            delay={0.25}
          />
          <StatCard
            label="SOLD OUT"
            value={states?.soldOut ?? 0}
            subtitle="● All seats filled"
            color="text-orange-400"
            accentColor="bg-orange-400"
            delay={0.25}
          />
        </div>

        {/* Filters */}
        <FilterWithDateSort
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          startDate={startDate}
          endDate={endDate}
          onStartDate={setStartDate}
          onEndDate={setEndDate}
        />

        <DataTable<ScheduleListItemResponse>
          data={schedules ?? []}
          columns={columns}
          loading={false}
          rowKey={(row) => row.scheduleId}
        />

        <TableFooter
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
