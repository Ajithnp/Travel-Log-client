import { motion } from 'framer-motion';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import clsx from "clsx";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TableFooter = ({
  currentPage,
  totalPages,
  onPageChange
}: TableFooterProps) => {
  const isEmpty: boolean = totalPages === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-2xl border border-border/40 bg-background/60 backdrop-blur-xl px-5 py-3.5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
    >
      {/* Page info badge */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
          Page
          <span className="font-bold text-foreground">{currentPage}</span>
          <span className="text-border">/</span>
          <span className="font-bold text-foreground">{totalPages || 1}</span>
        </span>
      </div>

      {/* Pagination controls */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={isEmpty || currentPage === 1}
              onClick={(e) => {
                e.preventDefault();
                if (!isEmpty && currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={clsx(
                "h-8 rounded-xl border border-border/50 bg-card px-3 text-xs font-medium transition-all duration-200",
                {
                  "pointer-events-none cursor-default opacity-40": isEmpty || currentPage === 1,
                  "cursor-pointer hover:border-primary/40 hover:bg-primary/5 hover:text-primary": !isEmpty && currentPage > 1,
                }
              )}
            />
          </PaginationItem>

          {!isEmpty &&
            Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i} className="hidden sm:inline-block">
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                  className={clsx(
                    "h-8 w-8 rounded-xl border text-xs font-semibold transition-all duration-200",
                    {
                      "border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_hsl(var(--primary)/0.35)] hover:bg-primary hover:text-primary-foreground scale-105":
                        currentPage === i + 1,
                      "border-border/50 bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary":
                        currentPage !== i + 1,
                    }
                  )}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={isEmpty || currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (!isEmpty && currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={clsx(
                "h-8 rounded-xl border border-border/50 bg-card px-3 text-xs font-medium transition-all duration-200",
                {
                  "pointer-events-none cursor-default opacity-40": isEmpty || currentPage === totalPages,
                  "cursor-pointer hover:border-primary/40 hover:bg-primary/5 hover:text-primary": !isEmpty && currentPage < totalPages,
                }
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default TableFooter;
