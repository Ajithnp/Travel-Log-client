import type { Granularity } from "@/features/vendor/components/dashboard-revenue-chart";

export function formatTick(value: string, granularity?: Granularity): string {
  if (!value) return '';
  if (granularity === 'year') return value;
  if (granularity === 'week') {
    const weekNum = value.split('W')[1];
    return weekNum ? `Wk ${parseInt(weekNum, 10)}` : value;
  }
  if (granularity === 'month') {
   
    const [year, month] = value.split('-');
    return new Date(+year, +month - 1).toLocaleDateString('en-US', { month: 'short' });
  }

  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}