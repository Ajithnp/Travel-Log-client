import { format, isSameMonth, isSameYear } from "date-fns";

export function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (isSameMonth(start, end) && isSameYear(start, end)) {
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  }

  if (isSameYear(start, end)) {
    return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
  }

  return `${format(start, "MMM d, yyyy")} – ${format(end, "MMM d, yyyy")}`;
}