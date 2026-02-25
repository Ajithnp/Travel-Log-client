import { useFormState } from "react-hook-form";
import type { BasePackageFormData } from "../../validations/base-package.schema";

interface DayErrorSummaryProps {
  dayIndex: number;
}

export function DayErrorSummary({ dayIndex }: DayErrorSummaryProps) {
  const { errors } = useFormState<BasePackageFormData>({
    name: `itinerary.${dayIndex}`,
  });

  const dayErrors = errors.itinerary?.[dayIndex];

  if (!dayErrors) return null;

  const hasActivityErrors =
    Array.isArray(dayErrors.activities) && dayErrors.activities.some(Boolean);

  if (!dayErrors.title && !hasActivityErrors) return null;

  return (
    <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3">
      <p className="text-xs font-semibold text-destructive mb-1">
       Day {dayIndex + 1} has some missing or invalid details
      </p>

      {dayErrors.title && (
        <p className="text-xs text-destructive">• Day title is required</p>
      )}

      {hasActivityErrors && (
        <p className="text-xs text-destructive">
          • One or more activities have problems
        </p>
      )}
    </div>
  );
}
