import type { CancellationRuleDTO } from "@/features/user/booking/types";


export const getLastCancellationDate = (
  startDate: string,
  rules: CancellationRuleDTO[]
): Date | null => {

  if (!rules.length) return null;
  const leastRule = rules.reduce((min, rule) => rule.daysBeforeTrip < min.daysBeforeTrip ? rule : min);

  const tripStart = new Date(startDate);
  const lastCancellationDate = new Date(tripStart);
  lastCancellationDate.setDate(tripStart.getDate() - leastRule.daysBeforeTrip);
  lastCancellationDate.setHours(23, 59, 59, 999); // end of that day

  return lastCancellationDate;
};

export const isCancellationAllowed = (
  startDate: string,
  rules: CancellationRuleDTO[]
): boolean => {
  const lastCancellationDate = getLastCancellationDate(startDate, rules);
  if (!lastCancellationDate) return false;
  return new Date() <= lastCancellationDate;
};