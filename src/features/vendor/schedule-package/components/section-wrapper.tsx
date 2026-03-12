import { motion } from "framer-motion";
import type{ ReactNode } from "react";

interface SectionWrapperProps {
  number: number;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const SectionWrapper = ({ number, title, subtitle, children }: SectionWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: number * 0.1 }}
      className="bg-card/50 rounded-xl border border-border p-5 sm:p-8 shadow-premium"
    >
      <div className="flex items-start gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-primary-foreground text-sm font-bold shrink-0">
          {number}
        </span>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
};

export default SectionWrapper;