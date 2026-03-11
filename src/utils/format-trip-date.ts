export function formatTripDateRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const monthDay = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const year = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  });

  return {
    range: `${monthDay.format(startDate)} – ${monthDay.format(endDate)}`,
    year: year.format(startDate),
  };
}