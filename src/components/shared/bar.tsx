interface SeatBarProps {
  filled: number;
  total: number;
  color: string;
}

const Bar = ({ filled, total, color }: SeatBarProps) => {
  const pct = Math.min((filled / total) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 bg-muted rounded-xl overflow-hidden">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-mono text-muted-foreground">{filled}/{total}</span>
    </div>
  );
};

export default Bar;