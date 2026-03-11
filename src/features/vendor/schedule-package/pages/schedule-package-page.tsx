import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import PackageHeader from "../components/package-header";
import TripDatesSection from "../components/trip-dates-section";
import PricingSection from "../components/pricing-section";
import SeatsSection from "../components/seat-section";
import ScheduleNotesSection from "../components/schedule-note-section";
import { FormProvider} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { usePackageScheduleContext } from "../../package/base-package/hooks/api.hooks";
import { Error } from "@/components/common/error";
import { Loader } from "@/components/common/loader";
import { InvalidState } from "@/components/common/invalidate-state";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { useSchedulePackageForm } from "../hooks/shedule-package";

const SchedulePackagePage = () => {

  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate()

  const { data, isLoading, error } = usePackageScheduleContext(
    packageId ?? "",
    {
      enabled: !!packageId,
    },
  );

  const {
    methods,
    confirmOpen,
    setConfirmOpen,
    onSubmit,
    handleConfirm,
    isPending,
  } = useSchedulePackageForm(packageId ?? "");

  if (!packageId) return <InvalidState type="package" title="Package Missing" />;
  if (isLoading || !data?.data) return <Loader message="Loading.." />;
  if (error) return <Error message={error.response?.data.message} />;

  const pkg = data?.data;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="bg-foreground/50 text-primary-foreground px-4 sm:px-6 py-3 flex justify-between">
        <p className="text-medium max-w-4xl ">
          Define a specific run of this package with dates, pricing and seats
        </p>
        <Button
          type="button"
          variant={"ghost"}
          className="items-end border"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate 
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="shadow-premium"
            >
              <PackageHeader pkgData={pkg} />
            </motion.div>

            <TripDatesSection />
            <PricingSection />
            <SeatsSection />
            <ScheduleNotesSection />

            {/* Footer Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 pb-8"
            >
              <Button variant="ghost" className="text-muted-foreground">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground font-semibold gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Create Schedule
              </Button>
            </motion.div>
          </div>
        </form>
          </FormProvider>
         <ConfirmDialog
          open={confirmOpen}
          onOpenChange={(open) => {
            if (isPending) return
            setConfirmOpen(open);
          }}
          title="Confirm Trip Schedule"
          description="This will create a new trip schedule for the selected package using the dates, pricing, and seat configuration you provided. Once confirmed, the schedule will become available for bookings and cannot be edited later."
          onConfirm={handleConfirm}
          confirmText="Create Schedule"
          loading={isPending}/>
    </div>
  );
};

export default SchedulePackagePage;
