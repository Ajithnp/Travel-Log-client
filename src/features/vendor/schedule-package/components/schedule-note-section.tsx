import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SectionWrapper from "./section-wrapper";
import {type ScheduleFormValues } from "../validations/validation schemas";
import { useFormContext } from "react-hook-form";

const ScheduleNotesSection = () => {

    const {
    register,
    formState: { errors },
  } = useFormContext<ScheduleFormValues>()

  return (
    <SectionWrapper number={4} title="Schedule Notes" subtitle="Optional — anything special about this specific run">
      <div>
        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Notes (optional)
        </Label>
        <Textarea
          className="mt-1.5 min-h-[120px] resize-y"
          placeholder="e.g. This batch includes a bonfire night on Day 3. Early morning photography session added on Day 5..."
          {...register('notes')}
        />
        <div className="flex items-center justify-between mt-1.5">
          {errors.notes ? (
            <p className="text-xs text-destructive">{errors.notes.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Visible to users who book this schedule.
            </p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ScheduleNotesSection;