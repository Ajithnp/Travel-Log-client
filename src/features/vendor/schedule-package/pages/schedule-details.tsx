import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScheduleHero from "../components/schedule-hero";
import DateInfoGrid from "../components/date-info-grid";
import ReportingLocationCard from "../components/reporting-location";
import PricingSection from "../components/pricing-details";
import ScheduleNotesCard from "../components/schedule-notes";
import SeatAvailabilityCard from "../components/seat-availability-card";
import QuickActionsCard from "../components/quick-actions-card";
import { useSheduleFetch } from "../hooks/api.hooks";
import { usePackageScheduleContext } from "../../package/base-package/hooks/api.hooks";
import { InvalidState } from "@/components/common/invalidate-state";
import { Loader } from "@/components/common/loader";
import { Error } from "@/components/common/error";
import { formatTripDateRange } from "@/utils/format-trip-date";
import { format } from "date-fns";
import CancelledCard from "../components/cancelled-card";

const ScheduleDetails = () => {
  const { scheduleId, packageId } = useParams<{
    scheduleId: string;
    packageId: string;
  }>();

  const navigate = useNavigate();

  const {
    data: packageData,
    isLoading: isPackagefetching,
    isError: isPackageFetchError,
    error: packageError,
  } = usePackageScheduleContext(packageId ?? "", {
    enabled: !!packageId,
  });
  const {
    data: schedule,
    isLoading,
    error,
    isError,
  } = useSheduleFetch(scheduleId ?? "", {
    enabled: !!scheduleId,
  });

  if (!scheduleId || !packageId ) return <InvalidState />;
  if (isPackagefetching || isLoading || !packageData?.data || !schedule?.data) return <Loader message="Loading..." />;
  if (isError || isPackageFetchError || packageError || error)
    return (
      <Error
        message={
          error?.response?.data.message || packageError?.response?.data.message
        }
      />
    );

  const { year } = formatTripDateRange(
    schedule?.data.startDate.toString(),
    schedule?.data.endDate.toString(),
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-[fade-in_0.4s_ease-out]">
        <button
          onClick={() => navigate("/vendor/scheduled-trips")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Schedules</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="font-heading text-foreground text-medium font-semibold">
            {packageData?.data?.title} —{" "}
            {format(schedule.data.startDate, "MMM dd")}, {year}
          </span>
        </button>

        <ScheduleHero
          schedule={schedule.data}
          pkg={packageData.data}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <DateInfoGrid schedule={schedule.data} />
            <ReportingLocationCard schedule={schedule.data} />
            <PricingSection schedule={schedule.data} />
            <ScheduleNotesCard schedule={schedule.data} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <SeatAvailabilityCard schedule={schedule.data} />

            <QuickActionsCard />
         </div>
                        {schedule?.data?.status === "cancelled" &&
          schedule?.data?.cancellationReason && (
            <CancelledCard schedule={schedule.data} />
          )}  
        </div>

      </div>
    </div>
  );
};

export default ScheduleDetails;
