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

export const formatCurrentDate = () => {
  const date = new Date();

  return `${date.toLocaleDateString("en-US", {
    weekday: "long",
  })}, ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} ${date.getFullYear()}`;
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};