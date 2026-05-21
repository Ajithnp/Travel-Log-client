export  const generatePoints = (rules: { daysBeforeTrip: number; refundPercent: number }[]) => {
    if (!rules || rules.length === 0) return ["No refund at any time after booking"];
    const sortedRules = [...rules].sort((a, b) => b.daysBeforeTrip - a.daysBeforeTrip);
    return sortedRules.map((rule) => {
      if (rule.refundPercent === 0) {
        if (rule.daysBeforeTrip === 0) return "No refund on the day of trip";
        return `No refund if cancelled within ${rule.daysBeforeTrip} days of trip`;
      }
      return `${rule.refundPercent}% refund if cancelled ${rule.daysBeforeTrip} or more days before trip`;
    });
  };

export  function getRefundLabel(refundPercent: number): string {
  if (refundPercent === 0) return "No refund";
  if (refundPercent === 100) return "Full refund";
  return `${refundPercent}% refund`;
}

export  function getDaysLabel(daysBeforeTrip: number): string {
  if (daysBeforeTrip === 0) return "On the day of trip";
  if (daysBeforeTrip === 1) return "1 day before trip";
  return `${daysBeforeTrip}+ days before trip`;
}