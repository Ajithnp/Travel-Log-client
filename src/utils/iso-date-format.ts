import { format } from "date-fns";

export function formatISODateToDDMMYYYY(iso: string) {
  return format(new Date(iso), "dd,MM,yyyy");
}

export function formatISODate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

