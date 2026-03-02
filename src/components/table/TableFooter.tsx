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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-8 flex justify-between items-center p-6 px-2 shadow-premium"
    >
      <p className="text-sm text-muted-foreground font-medium">
        Showing page <span className="text-foreground font-bold">{currentPage}</span> of <span className="text-foreground font-bold">{totalPages}</span>
      </p>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={isEmpty || currentPage === 1}
              onClick={(e) => {
                e.preventDefault();
                if (!isEmpty && currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={clsx("rounded-xl transition-all h-9 px-3", {
                "pointer-events-none opacity-50 cursor-default": isEmpty || currentPage === 1,
                "cursor-pointer hover:bg-muted": !isEmpty && currentPage > 1,
              })}
            />
          </PaginationItem>
          {/* {page numbers} */}
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
                  className={clsx("rounded-xl font-medium transition-all h-9 w-9", {
                    "bg-foreground text-background hover:bg-foreground hover:text-background shadow-md": currentPage === i + 1,
                    "hover:bg-muted text-muted-foreground hover:text-foreground": currentPage !== i + 1
                  })}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          {/* next button */}
          <PaginationItem>
            <PaginationNext
              aria-disabled={isEmpty || currentPage === totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (!isEmpty && currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={clsx("rounded-xl transition-all h-9 px-3", {
                "pointer-events-none opacity-50 cursor-default": isEmpty || currentPage === totalPages,
                 "cursor-pointer hover:bg-muted": !isEmpty && currentPage < totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </motion.div>
  );
};

export default TableFooter;
