import { format, isSameMonth, isSameYear } from "date-fns";

export function formatDateRange(startISO: string, endISO: string) {
  const start = new Date(startISO);
  const end = new Date(endISO);

  if (isSameMonth(start, end) && isSameYear(start, end)) {
    return `${format(start, "d")} – ${format(end, "d MMM yyyy")}`;
  }

  if (isSameYear(start, end)) {
    return `${format(start, "d MMM")}  –  ${format(end, "d MMM yyyy")}`;
  }

  return `${format(start, "d MMM yyyy")}  –  ${format(end, "d MMM yyyy")}`;
}