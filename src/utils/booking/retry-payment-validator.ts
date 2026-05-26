
export const getRetryDeadline = (createdAt: Date, startDate: Date): Date => {
  const twentyFourHoursAfterCreation = new Date(createdAt.getTime() + 24 * 60 * 60 * 1000);
  const twentyFourHoursBeforeTrip = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
  return new Date(
    Math.min(twentyFourHoursAfterCreation.getTime(), twentyFourHoursBeforeTrip.getTime())
  );
};

export const canRetryPayment = (
  paymentStatus: string,
  bookingStatus: string,
  createdAt: Date,
  startDate: Date
): boolean => {
  if (paymentStatus !== "pending" || bookingStatus !== "pending") return false;
  return new Date() < getRetryDeadline(createdAt, startDate);
};