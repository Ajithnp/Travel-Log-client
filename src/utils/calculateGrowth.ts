export const calculateGrowth = (current:number, previous:number):{percentage:number; trend: "up" | "down"} => {
  if (previous === 0) {
    return {
      percentage: 100,
      trend: "up",
    };
  }

  const percentage = ((current - previous) / previous) * 100;

  return {
    percentage: Math.abs(Number(percentage.toFixed(1))),
    trend: percentage >= 0 ? "up" : "down",
  };
};