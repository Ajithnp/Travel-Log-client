import { fadeUp } from "@/animation/variants";
import { motion } from "framer-motion";

export function SectionCard({
  label,
  icon: Icon,
  children,

}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-100 overflow-hidden">
        <div className="flex items-center gap-2 px-5 sm:px-6 py-3.5 border-b border-slate-100 bg-slate-50/60">
          <Icon className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
        </div>
        <div className="px-5 sm:px-6">{children}</div>
      </div>
    </motion.div>
  );
}