import { formatDistanceToNow } from "date-fns";

export function formatTimeToAMPM(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export const formatRelativeTime = (date: string): string => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

