import type { CancellationPolicyDTO, CancellationRuleDTO } from "@/features/user/booking/types";

export interface RefundCalculationResult {
  daysUntilTrip: number;
  applicableRule: CancellationRuleDTO;
  refundPercentage: number;                 
  refundAmount: number;                 
  deductionAmount: number;               
  originalAmount: number;                
}

export interface RefundCalculationInput {
  finalAmount: number;
  tripStartDate: string;                 
  cancellationPolicy: CancellationPolicyDTO;
}

export function calculateRefund(
  input: RefundCalculationInput
): RefundCalculationResult {
  const { finalAmount, tripStartDate, cancellationPolicy } = input;

  const today = new Date();
  const start = new Date(tripStartDate);
  const daysUntilTrip = Math.ceil(
    (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const sortedRules = [...cancellationPolicy.rules].sort(
    (a, b) => b.daysBeforeTrip - a.daysBeforeTrip
  );

  const applicableRule =
    sortedRules.find((rule) => daysUntilTrip >= rule.daysBeforeTrip) ??
    sortedRules[sortedRules.length - 1];

  const refundAmount = (finalAmount * applicableRule.refundPercent) / 100;

  return {
    daysUntilTrip,
    applicableRule,
    refundPercentage: applicableRule.refundPercent,
    refundAmount:Math.floor(refundAmount),
    deductionAmount: Math.floor(finalAmount - refundAmount),
    originalAmount: finalAmount,
  };
}