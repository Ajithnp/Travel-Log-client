import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fadeUp } from "@/animation/variants";
import { useState } from "react";
import { formatTick } from "@/utils/format-tick";

const PERIOD_BUTTONS: { key: PeriodKey; label: string }[] = [
  { key: '7d',    label: 'Last 7d' },
  { key: 'week',  label: 'Weekly'  },
  { key: 'month', label: 'Monthly' },
  { key: 'year',  label: 'Yearly'  },
  { key: 'custom', label: 'Custom' },
];


export type PeriodKey = '7d' | 'week' | 'month' | 'year' | 'custom';
export type Granularity = 'day' | 'week' | 'month' | 'year';

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-400 mb-1 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-semibold text-gray-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

export interface ChartDataPoint {
  date: string;
  revenue: number;
  bookings: number;
}

interface DashboardRevenueChartProps {
  chartData: ChartDataPoint[];
  granularity?: Granularity;
  activePeriod: PeriodKey;
  customStart?: Date;
  customEnd?: Date;
  isLoading?: boolean;
  onPeriodChange: (period: PeriodKey) => void;
  onCustomRange: (start: Date, end: Date) => void;
}

export function DashboardRevenueChart({
  chartData,
  granularity,
  activePeriod,
  customStart,
  customEnd,
  isLoading,
  onPeriodChange,
  onCustomRange,
}: DashboardRevenueChartProps) {

  const [localStart, setLocalStart] = useState('');
  const [localEnd, setLocalEnd]     = useState('');
 
  const handleApplyCustom = () => {
    if (!localStart || !localEnd) return;
    onCustomRange(new Date(localStart), new Date(localEnd));
  };
    const xAxisInterval =
    chartData.length <= 10 ? 0 :
    chartData.length <= 20 ? 1 : 3;
 
  return (
    <motion.div
      custom={6}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="xl:col-span-2"
    >
      <Card className="bg-white border-gray-200 h-full">
        <CardHeader className="pb-2 px-5 pt-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold text-gray-900">
                Revenue & Bookings Trend
              </CardTitle>
              <p className="text-xs text-gray-400 mt-0.5">Activity for selected period</p>
            </div>
 
            
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-wrap">
              {PERIOD_BUTTONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onPeriodChange(key)}
                  className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                    activePeriod === key
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
 
          
          {activePeriod === 'custom' && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <input
                type="date"
                value={localStart}
                max={localEnd || undefined}
                onChange={(e) => setLocalStart(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <span className="text-xs text-gray-400">to</span>
              <input
                type="date"
                value={localEnd}
                min={localStart || undefined}
                onChange={(e) => setLocalEnd(e.target.value)}
                className="text-xs border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-400"
              />
              <button
                onClick={handleApplyCustom}
                disabled={!localStart || !localEnd}
                className="text-xs bg-emerald-500 text-white rounded-md px-3 py-1 disabled:opacity-40 hover:bg-emerald-600 transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </CardHeader>
 
        <CardContent className="px-3 pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activePeriod}-${customStart}-${customEnd}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-52 sm:h-64"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  Loading…
                </div>
              ) : chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barGap={2} barSize={8}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="date"                            
                      tickFormatter={(v) => formatTick(v, granularity)} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      interval={xAxisInterval}
                    />
                    <YAxis
                      tick={{ fill: '#94a3b8', fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      width={30}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                    <Legend
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{ fontSize: '11px', color: '#64748b', paddingTop: '8px' }}
                    />
                    <Bar dataKey="revenue"  name="Revenue"  fill="#10b981" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No data for this period.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
