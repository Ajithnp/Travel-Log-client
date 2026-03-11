import { motion } from 'framer-motion';

function StatCard({ label, value, subtitle, color, delay = 0, accentColor }: { label: string; value: number | string; subtitle: string; color?: string; delay?: number; accentColor?:string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="bg-card rounded-xl border shadow-premium flex flex-col gap-2 px-5 py-4 relative overflow-hidden"
    >
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${accentColor}`} />
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">{label}</span>
      <span className={`text-2xl font-semibold tracking-tight ${color ?? "text-foreground"}`} style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </span>
      <span className="text-sm font-medium text-muted-foreground">{subtitle}</span>
    </motion.div>
  );
}
export default StatCard