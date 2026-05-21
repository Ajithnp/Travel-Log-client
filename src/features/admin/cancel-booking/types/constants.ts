export const CANCELATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type CancelationStatus = (typeof CANCELATION_STATUS)[keyof typeof CANCELATION_STATUS];
