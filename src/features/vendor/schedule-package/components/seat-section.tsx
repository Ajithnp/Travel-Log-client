import { ChevronUp, ChevronDown } from "lucide-react";
import SectionWrapper from "./section-wrapper";
import { AppAlert } from "@/components/common/app-alert";
import {
  type ScheduleFormValues,
  MAX_SEATS,
} from "../validations/validation schemas";
import { useFormContext, useController } from "react-hook-form";

const SeatsSection = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ScheduleFormValues>();

  // useController is the right choice here — the increment/decrement buttons
  const { field } = useController({
    name: "totalSeats",
    control,
    rules: {
      min: { value: 1, message: "Must have at least 1 seat" },
      max: {
        value: MAX_SEATS,
        message: `Total seats cannot exceed ${MAX_SEATS}`,
      },
    },
  });

  const increment = () =>
    field.onChange(Math.min(MAX_SEATS, (field.value ?? 0) + 1));

  const decrement = () => field.onChange(Math.max(1, (field.value ?? 1) - 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      field.onChange(Math.max(1, Math.min(MAX_SEATS, parsed)));
    }
  };

  return (
    <SectionWrapper
      number={3}
      title="Seats"
      subtitle="Set the maximum number of participants.."
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="rounded-lg p-5 text-center"></div>

        <div className="bg-card rounded-lg p-5 text-center border-2 border-primary/20 relative">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Total Seats
          </p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              min={1}
              max={MAX_SEATS}
              value={field.value ?? ""}
              onChange={handleInputChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              className="text-3xl font-bold text-foreground bg-transparent text-center w-20 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <div className="flex flex-col">
              <button
                type="button"
                onClick={increment}
                aria-label="Increase seats"
                className="text-muted-foreground font-bold hover:text-foreground"
              >
                <ChevronUp className="w-4 h-4 text-3xl" />
              </button>
              <button
                type="button"
                onClick={decrement}
                aria-label="Decrease seats"
                className="text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">You set this</p>
          {errors.totalSeats && (
            <p className="text-xs text-destructive mt-2">
              {errors.totalSeats.message}
            </p>
          )}
        </div>
        <div className="rounded-lg p-5 text-center"></div>
      </div>

      <AppAlert
        message="Set the seat count carefully. Once the package is published, the seat count cannot be changed."
        variant="warning"
      />
    </SectionWrapper>
  );
};

export default SeatsSection;
