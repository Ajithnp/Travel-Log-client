import { containerVariants, itemVariants } from '@/animation/variants';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export interface SummaryItem {
    label: string;
    value: string | number;
    icon?: ReactNode;
    color?: string;
    prefix?: string;
}

interface TableSummaryFooterProps {
    data: SummaryItem[];
    title?: string;
}


export default function TableSummaryFooter({ data, title = 'Summary' }: TableSummaryFooterProps) {
    if (!data || data.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
            className="
                rounded-b-2xl border border-t-0 border-border/40
                bg-background/60 backdrop-blur-xl
                shadow-[0_2px_16px_rgba(0,0,0,0.04)]
                px-5 py-4 mt-1
            "
        >

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">

                <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
                    {title}
                </span>

                <div className="hidden sm:block h-5 w-px bg-border/50 shrink-0" />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-2"
                >
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="
                                group flex items-center gap-2
                                rounded-xl border border-border/50 bg-card
                                px-3 py-1.5
                                shadow-[0_1px_4px_rgba(0,0,0,0.04)]
                                hover:border-primary/30 hover:bg-primary/5
                                hover:shadow-[0_2px_8px_hsl(var(--primary)/0.12)]
                                transition-all duration-200
                                cursor-default
                            "
                        >

                            {item.icon && (
                                <span className={`shrink-0 ${item.color ?? 'text-muted-foreground'}`}>
                                    {item.icon}
                                </span>
                            )}
                            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                                {item.label}
                            </span>

                            <span className="text-border text-xs select-none">·</span>
                            <span
                                className={`text-xs font-bold tabular-nums whitespace-nowrap ${item.color ?? 'text-foreground'}`}
                            >
                                {item.prefix ?? ''}{item.value}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
