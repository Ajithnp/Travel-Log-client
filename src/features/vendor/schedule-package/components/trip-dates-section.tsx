import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import { useFormContext } from "react-hook-form";
import {
  type ScheduleFormValues,
  diffInDays,
} from "../validations/validation schemas";

const formatDisplayDate = (dateStr: string) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  return {
    date: d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    weekday: d.toLocaleDateString("en-IN", { weekday: "long" }),
  };
};

const TripDatesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ScheduleFormValues>();

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const startDisplay = formatDisplayDate(startDate);
  const endDisplay = formatDisplayDate(endDate);
  const nights = startDate && endDate ? diffInDays(startDate, endDate) : null;

  return (
    <SectionWrapper
      number={1}
      title="Trip Dates"
      subtitle="When does this specific run start and end?"
    >
      {/* Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2 ">
        <div>
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Start Date <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              type="date"
              className="pr-10 shadow-premium h-12"
              {...register("startDate")}
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-orange-400"/>
          </div>
          {errors.startDate && (
            <p className="text-xs text-destructive mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div>
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">
            End Date <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              type="date"
              {...register("endDate")}
              className="pr-10 shadow-premium h-12"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
          </div>
          {errors.endDate && (
            <p className="text-xs text-destructive mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      {/* Date Display Cards */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 my-5 p-4 bg-secondary/100 rounded-lg">
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary uppercase">Start</p>
          <p className="text-xl font-bold text-foreground">
            {startDisplay?.date}
          </p>
          <p className="text-sm text-muted-foreground">
            {startDisplay?.weekday}
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground hidden sm:block shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary uppercase">End</p>
          <p className="text-xl font-bold text-foreground">
            {endDisplay?.date}
          </p>
          <p className="text-sm text-muted-foreground">{endDisplay?.weekday}</p>
        </div>
        {nights !== null && nights > 0 && (
          <Badge
            variant="outline"
            className="self-start sm:self-center text-white font-semibold bg-foreground/50"
          >
            {nights} night{nights !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>

      {/* Time & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Reporting Time <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              type="time"
              {...register("reportingTime")}
              className="shadow-premium h-12"
            />
            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
          </div>
          {errors.reportingTime && (
            <p className="text-xs text-destructive mt-1">
              {errors.reportingTime.message}
            </p>
          )}
        </div>
        <div>
          <Label className="text-xs font-semibold text-foreground uppercase tracking-wide">
            Reporting Location <span className="text-destructive">*</span>
          </Label>
          <div className="relative mt-1.5">
            <Input
              placeholder="e.g. Shimla ISBT Bus Stand, Gate 2"
              className="shadow-premium h-12"
              {...register("reportingLocation")}
            />
            <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400 pointer-events-none" />
          </div>
          {errors.reportingLocation && (
            <p className="text-xs text-destructive mt-1">
              {errors.reportingLocation.message}
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TripDatesSection;
